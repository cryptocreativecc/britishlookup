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
    const expectedFields = ["name", "category", "region", "town", "postcode", "address", "phone", "email", "website", "description", "services", "social_links", "opening_hours", "amenities"];
    for (const f of expectedFields) fields[f] = "";
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
      console.error("Business validation failed:", JSON.stringify(errors), "Fields:", JSON.stringify(fields));
      const fieldMessages = Object.entries(errors)
        .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(", ")}`)
        .join("; ");
      return NextResponse.json({ error: `Validation failed — ${fieldMessages}`, errors }, { status: 400 });
    }

    const data = parsed.data;
    const geo = await geocodePostcode(data.postcode);
    let slug = slugify(data.name);

    // Ensure unique slug
    const pb2 = await createAdminPb();
    try {
      await pb2.collection("businesses").getFirstListItem(`slug="${slug}"`);
      slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
    } catch { /* slug is unique */ }

    const pb = await createAdminPb();
    const user = await getLoggedInUser();

    const baseRecord = {
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
      anchor_text: data.anchor_text || "",
      services: data.services || "[]",
      social_links: data.social_links || "{}",
      opening_hours: data.opening_hours || "{}",
      amenities: data.amenities || "[]",
      youtube_url: formData.get("youtube_url") as string || "",
      team_members: formData.get("team_members") as string || "[]",
      faqs: formData.get("faqs") as string || "[]",
      status: "pending",
      lat: geo?.lat || 0,
      lng: geo?.lng || 0,
    };

    if (user) {
      const record = await pb.collection("businesses").create({
        ...baseRecord,
        owner: user.id,
        claimed: true,
      });

      // Handle file uploads
      const fileForm = new FormData();
      let hasFiles = false;
      const logo = formData.get("logo") as File | null;
      if (logo && logo.size > 0) { fileForm.append("logo", logo); hasFiles = true; }
      const banner = formData.get("banner") as File | null;
      if (banner && banner.size > 0) { fileForm.append("banner", banner); hasFiles = true; }
      const gallery = formData.getAll("gallery") as File[];
      gallery.forEach((f) => { if (f.size > 0) { fileForm.append("gallery", f); hasFiles = true; } });
      if (hasFiles) await pb.collection("businesses").update(record.id, fileForm);

      return NextResponse.json({ success: true, message: "Business submitted for review" });
    } else {
      const submission = await pb.collection("submissions_business").create(baseRecord);

      const fileForm = new FormData();
      let hasFiles = false;
      const logo = formData.get("logo") as File | null;
      if (logo && logo.size > 0) { fileForm.append("logo", logo); hasFiles = true; }
      const banner = formData.get("banner") as File | null;
      if (banner && banner.size > 0) { fileForm.append("banner", banner); hasFiles = true; }
      if (hasFiles) await pb.collection("submissions_business").update(submission.id, fileForm);

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
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("Submit business error:", errMsg, err);
    if (errMsg.includes("unique") || errMsg.includes("slug")) {
      return NextResponse.json({ error: "A business with this name already exists. Please use a different name." }, { status: 400 });
    }
    return NextResponse.json({ error: `Submission failed: ${errMsg}` }, { status: 500 });
  }
}
