import { createAdminPb } from "@/lib/pb";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Users — Admin" };

export default async function AdminUsersPage() {
  const pb = await createAdminPb();

  let users: { id: string; name: string; email: string; role: string; verified: boolean; created: string }[] = [];
  try {
    const result = await pb.collection("users").getFullList({ sort: "-created" });
    users = result.map((u) => ({
      id: u.id,
      name: u.name || "",
      email: u.email,
      role: u.role || "user",
      verified: u.verified || false,
      created: u.created,
    }));
  } catch { /* collection may not exist */ }

  const roleColor: Record<string, string> = {
    admin: "bg-purple-100 text-purple-800",
    business_owner: "bg-blue-100 text-blue-800",
    user: "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Users ({users.length})</h1>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left p-3 font-medium text-text-muted">Name</th>
              <th className="text-left p-3 font-medium text-text-muted">Email</th>
              <th className="text-left p-3 font-medium text-text-muted">Role</th>
              <th className="text-left p-3 font-medium text-text-muted">Status</th>
              <th className="text-left p-3 font-medium text-text-muted">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0">
                <td className="p-3 font-medium text-text">{user.name || "—"}</td>
                <td className="p-3 text-text-muted">{user.email}</td>
                <td className="p-3">
                  <Badge className={roleColor[user.role] || ""}>{user.role}</Badge>
                </td>
                <td className="p-3">
                  {user.verified ? (
                    <span className="text-green-600 text-xs font-medium">Verified</span>
                  ) : (
                    <span className="text-yellow-600 text-xs font-medium">Unverified</span>
                  )}
                </td>
                <td className="p-3 text-text-muted">
                  {new Date(user.created).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
