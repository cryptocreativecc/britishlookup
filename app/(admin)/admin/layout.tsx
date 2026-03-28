import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "@/components/providers/session-provider";
import { AdminNav } from "@/components/ui/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <SessionProvider>
      <AdminNav email={session.user.email || ""} />
      {children}
    </SessionProvider>
  );
}
