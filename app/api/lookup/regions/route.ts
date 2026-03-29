import { createAdminPb } from "@/lib/pb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pb = await createAdminPb();
    const regs = await pb.collection("regions").getFullList({ sort: "name" });
    return NextResponse.json(regs.map((r) => ({ id: r.id, name: r.name })));
  } catch {
    return NextResponse.json([]);
  }
}
