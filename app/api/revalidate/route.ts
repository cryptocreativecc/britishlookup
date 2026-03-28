import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { path, secret } = await req.json();

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    return NextResponse.json({ error: "Path required" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
