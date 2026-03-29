import PocketBase from "pocketbase";

const PB_URL = process.env.POCKETBASE_URL || "https://pb.britishlookup.co.uk";

export function createPb(): PocketBase {
  const pb = new PocketBase(PB_URL);
  pb.autoCancellation(false);
  return pb;
}

let adminPb: PocketBase | null = null;
let adminAuthPromise: Promise<PocketBase> | null = null;

export async function createAdminPb(): Promise<PocketBase> {
  if (adminPb?.authStore?.isValid) return adminPb;

  // Deduplicate concurrent auth requests
  if (adminAuthPromise) return adminAuthPromise;

  adminAuthPromise = (async () => {
    const email = process.env.POCKETBASE_ADMIN_EMAIL;
    const password = process.env.POCKETBASE_ADMIN_PASSWORD;
    if (!email || !password) throw new Error("PocketBase admin credentials not set");

    const pb = new PocketBase(PB_URL);
    pb.autoCancellation(false);
    await pb.collection("_superusers").authWithPassword(email, password);
    adminPb = pb;
    adminAuthPromise = null;
    return pb;
  })();

  return adminAuthPromise;
}
