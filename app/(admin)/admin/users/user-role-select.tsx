"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function UserRoleSelect({ userId, currentRole }: { userId: string; currentRole: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLoading(true);
    try {
      await fetch(`/api/admin/users/${userId}/role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: e.target.value }),
      });
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const colors: Record<string, string> = {
    admin: "text-purple-700 bg-purple-50 border-purple-200",
    business_owner: "text-blue-700 bg-blue-50 border-blue-200",
    user: "text-gray-700 bg-gray-50 border-gray-200",
  };

  return (
    <select
      value={currentRole}
      onChange={handleChange}
      disabled={loading}
      className={`text-xs font-medium px-2 py-1 rounded border ${colors[currentRole] || colors.user} cursor-pointer`}
    >
      <option value="user">User</option>
      <option value="business_owner">Business Owner</option>
      <option value="admin">Admin</option>
    </select>
  );
}
