import { requireAuth } from "@/lib/auth";
import Link from "next/link";
import { LogoutButton } from "@/components/ui/logout-button";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/listings", label: "My Listings", icon: "🏢" },
  { href: "/dashboard/posts", label: "My Posts", icon: "✍️" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-brand font-semibold text-sm">← Back to site</Link>
            <span className="text-sm text-text-muted">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-muted">{auth.user.name || auth.user.email}</span>
            {auth.user.role === "admin" && (
              <Link href="/admin" className="text-xs bg-brand/10 text-brand px-2 py-1 rounded font-medium">Admin</Link>
            )}
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-56 shrink-0">
            <nav className="space-y-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-text-muted hover:text-text hover:bg-white rounded-lg transition-colors"
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
