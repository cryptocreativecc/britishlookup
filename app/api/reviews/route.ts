import { createAdminPb } from "@/lib/pb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const businessId = req.nextUrl.searchParams.get("businessId");
  if (!businessId) return NextResponse.json({ reviews: [] });

  try {
    const pb = await createAdminPb();
    const result = await pb.collection("reviews").getFullList({
      filter: `business="${businessId}" && status="approved"`,
      sort: "-id",
    });
    const reviews = result.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment || "",
      author_name: r.author_name,
      created: r.created,
    }));
    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { business, rating, comment, author_name } = await req.json();

    if (!business || !rating || !author_name) {
      return NextResponse.json({ error: "Name and rating are required" }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
    }

    const pb = await createAdminPb();
    await pb.collection("reviews").create({
      business,
      rating,
      comment: comment || "",
      author_name,
      status: "pending",
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Review submit error:", e);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
