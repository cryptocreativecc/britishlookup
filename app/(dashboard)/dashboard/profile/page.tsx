import { requireAuth } from "@/lib/auth";
import { ProfileForm } from "./profile-form";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Profile — British Lookup" };

export default async function ProfilePage() {
  const auth = await requireAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Your Profile</h1>
      <ProfileForm user={auth.user} />
    </div>
  );
}
