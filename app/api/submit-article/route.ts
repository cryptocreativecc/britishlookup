import { NextResponse } from "next/server";
import { articleSchema } from "@/lib/validators";
import { createAdminPb, createPb } from "@/lib/pb";
import { slugify } from "@/lib/utils";
import { cookies } from "next/headers";

async function getLoggedInUser() {
  try {
    const jar = await cookies();
    const token = jar.get("bl_auth")?.value;
    if (!token) return null;
    const pb = createPb();
    pb.authStore.save(token, null);
    if (!pb.authStore.isValid) return null;
    const record = await pb.collection("users").authRefresh();
    return record.record;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") fields[key] = value;
    }

    const parsed = articleSchema.safeParse(fields);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    const data = parsed.data;
    const slug = slugify(data.title);
    const wordCount = data.body.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const pb = await createAdminPb();
    const user = await getLoggedInUser();

    if (user) {
      // Logged-in user: create directly in articles with author link
      const record = await pb.collection("articles").create({
        title: data.title,
        slug,
        body: data.body,
        excerpt: data.body.slice(0, 300).trim(),
        category: data.category || "",
        author: user.id,
        author_name: user.name || data.author_name,
        author_bio: data.author_bio || "",
        author_website: data.author_website || "",
        author_company: data.author_company || "",
        read_time: readTime,
        status: "pending",
      });

      const cover = formData.get("cover_image") as File | null;
      if (cover && cover.size > 0) {
        const coverForm = new FormData();
        coverForm.append("cover_image", cover);
        await pb.collection("articles").update(record.id, coverForm);
      }

      return NextResponse.json({ success: true, message: "Article submitted for review" });
    } else {
      // Anonymous: write to submissions_article
      const submission = await pb.collection("submissions_article").create({
        title: data.title,
        slug,
        body: data.body,
        excerpt: data.body.slice(0, 300).trim(),
        category: data.category || "",
        author_name: data.author_name,
        author_bio: data.author_bio || "",
        author_website: data.author_website || "",
        author_company: data.author_company || "",
        email: data.email,
        read_time: readTime,
        status: "pending",
      });

      const cover = formData.get("cover_image") as File | null;
      if (cover && cover.size > 0) {
        const coverForm = new FormData();
        coverForm.append("cover_image", cover);
        await pb.collection("submissions_article").update(submission.id, coverForm);
      }

      fetch(new URL("/api/emails/article-confirm", req.url).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: data.email, authorName: data.author_name, title: data.title }),
      }).catch(() => {});

      fetch(new URL("/api/emails/admin-alert", req.url).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "article", name: data.title, id: submission.id }),
      }).catch(() => {});

      return NextResponse.json({ success: true, message: "Article submitted for review" });
    }
  } catch (err) {
    console.error("Submit article error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
