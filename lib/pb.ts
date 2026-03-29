import PocketBase from "pocketbase";

const PB_URL = process.env.POCKETBASE_URL || "https://pb.britishlookup.co.uk";

export function createPb(): PocketBase {
  const pb = new PocketBase(PB_URL);
  pb.autoCancellation(false);
  return pb;
}

export async function createAdminPb(): Promise<PocketBase> {
  const email = process.env.POCKETBASE_ADMIN_EMAIL;
  const password = process.env.POCKETBASE_ADMIN_PASSWORD;
  if (!email || !password) throw new Error("PocketBase admin credentials not set");

  const pb = new PocketBase(PB_URL);
  pb.autoCancellation(false);
  await pb.collection("_superusers").authWithPassword(email, password);
  return pb;
}
