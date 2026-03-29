import { createAdminPb } from "@/lib/pb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pb = await createAdminPb();
    const cats = await pb.collection("categories").getFullList({ sort: "name" });
    return NextResponse.json(cats.map((c) => ({ id: c.id, name: c.name })));
  } catch {
    return NextResponse.json([]);
  }
}
