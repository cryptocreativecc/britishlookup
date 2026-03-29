export const dynamic = "force-dynamic";
import { createAdminPb } from "@/lib/pb";
import { Badge } from "@/components/ui/badge";
import { UserRoleSelect } from "./user-role-select";
import { UserDeleteButton } from "./user-delete-button";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Users — Admin" };

export default async function AdminUsersPage() {
  const pb = await createAdminPb();

  let users: { id: string; name: string; email: string; role: string; verified: boolean; created: string }[] = [];
  try {
    const result = await pb.collection("users").getFullList({ sort: "-id" });
    users = result.map((u) => ({
      id: u.id,
      name: u.name || "",
      email: u.email,
      role: u.role || "user",
      verified: u.verified || false,
      created: u.created,
    }));
  } catch { /* collection may not exist */ }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Users ({users.length})</h1>

      <div className="bg-white rounded-lg border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left p-3 font-medium text-text-muted">Name</th>
              <th className="text-left p-3 font-medium text-text-muted">Email</th>
              <th className="text-left p-3 font-medium text-text-muted">Role</th>
              <th className="text-left p-3 font-medium text-text-muted">Status</th>
              <th className="text-left p-3 font-medium text-text-muted">Joined</th>
              <th className="text-left p-3 font-medium text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0">
                <td className="p-3 font-medium text-text">{user.name || "—"}</td>
                <td className="p-3 text-text-muted">{user.email}</td>
                <td className="p-3">
                  <UserRoleSelect userId={user.id} currentRole={user.role} />
                </td>
                <td className="p-3">
                  {user.verified ? (
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800">Unverified</Badge>
                  )}
                </td>
                <td className="p-3 text-text-muted">
                  {new Date(user.created).toLocaleDateString("en-GB")}
                </td>
                <td className="p-3">
                  <UserDeleteButton userId={user.id} userName={user.name || user.email} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
