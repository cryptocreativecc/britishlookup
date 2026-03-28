import PocketBase from "pocketbase";

let pb: PocketBase | null = null;

export function getPB(): PocketBase {
  if (!pb) {
    const url = process.env.POCKETBASE_URL;
    if (!url) throw new Error("POCKETBASE_URL is not set");
    pb = new PocketBase(url);
    pb.autoCancellation(false);
  }
  return pb;
}

export async function getAuthPB(): Promise<PocketBase> {
  const client = getPB();
  const email = process.env.POCKETBASE_ADMIN_EMAIL;
  const password = process.env.POCKETBASE_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("PocketBase admin credentials not set");
  }
  await client.collection("_superusers").authWithPassword(email, password);
  return client;
}
