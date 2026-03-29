import { NextResponse } from "next/server";
import { businessSchema } from "@/lib/validators";
import { createAdminPb, createPb } from "@/lib/pb";
import { slugify } from "@/lib/utils";
import { cookies } from "next/headers";

async function geocodePostcode(postcode: string) {
  try {
    const clean = postcode.replace(/\s+/g, "");
    const res = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
    if (!res.ok) return null;
    const data = await res.json();
    return { lat: data.result.latitude, lng: data.result.longitude };
  } catch {
    return null;
  }
}

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

    // Auto-prepend https:// to website if user forgot
    if (fields.website && fields.website.trim() && !/^https?:\/\//i.test(fields.website)) {
      fields.website = `https://${fields.website.trim()}`;
    }

    const parsed = businessSchema.safeParse(fields);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    const data = parsed.data;
    const geo = await geocodePostcode(data.postcode);
    const slug = slugify(data.name);
    const tags = data.tags
      ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const pb = await createAdminPb();
    const user = await getLoggedInUser();

    if (user) {
      // Logged-in user: create directly in businesses collection with owner
      const record = await pb.collection("businesses").create({
        name: data.name,
        slug,
        description: data.description,
        category: data.category || "",
        region: data.region || "",
        town: data.town,
        postcode: data.postcode,
        address: data.address || "",
        phone: data.phone || "",
        email: data.email,
        website: data.website,
        tags: JSON.stringify(tags),
        status: "pending",
        owner: user.id,
        claimed: true,
        lat: geo?.lat || 0,
        lng: geo?.lng || 0,
      });

      const logo = formData.get("logo") as File | null;
      if (logo && logo.size > 0) {
        const logoForm = new FormData();
        logoForm.append("logo", logo);
        await pb.collection("businesses").update(record.id, logoForm);
      }

      return NextResponse.json({ success: true, message: "Business submitted for review" });
    } else {
      // Anonymous: write to submissions_business
      const submission = await pb.collection("submissions_business").create({
        name: data.name,
        slug,
        description: data.description,
        category: data.category || "",
        region: data.region || "",
        town: data.town,
        postcode: data.postcode,
        address: data.address || "",
        phone: data.phone || "",
        email: data.email,
        website: data.website,
        tags: JSON.stringify(tags),
        status: "pending",
        lat: geo?.lat || 0,
        lng: geo?.lng || 0,
      });

      const logo = formData.get("logo") as File | null;
      if (logo && logo.size > 0) {
        const logoForm = new FormData();
        logoForm.append("logo", logo);
        await pb.collection("submissions_business").update(submission.id, logoForm);
      }

      // Send confirmation email (non-blocking)
      fetch(new URL("/api/emails/submission-confirm", req.url).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: data.email, businessName: data.name }),
      }).catch(() => {});

      // Send admin alert (non-blocking)
      fetch(new URL("/api/emails/admin-alert", req.url).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "business", name: data.name, id: submission.id }),
      }).catch(() => {});

      return NextResponse.json({ success: true, message: "Business submitted for review" });
    }
  } catch (err) {
    console.error("Submit business error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
