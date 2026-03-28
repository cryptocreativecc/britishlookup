import { NextResponse } from "next/server";
import { businessSchema } from "@/lib/validators";
import { getAuthPB } from "@/lib/pb";
import { slugify } from "@/lib/utils";

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

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") fields[key] = value;
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

    const pb = await getAuthPB();

    // Write to submissions_business collection
    const submission = await pb.collection("submissions_business").create({
      name: data.name,
      slug,
      description: data.description,
      category: data.category,
      region: data.region,
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

    // Upload logo if provided
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
  } catch (err) {
    console.error("Submit business error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
