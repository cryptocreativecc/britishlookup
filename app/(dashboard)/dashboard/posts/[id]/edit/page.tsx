import { requireAuth } from "@/lib/auth";
import { createAdminPb } from "@/lib/pb";
import { notFound } from "next/navigation";
import { EditPostForm } from "./edit-form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const auth = await requireAuth();
  const pb = await createAdminPb();

  try {
    const post = await pb.collection("articles").getOne(id);
    if (post.author !== auth.user.id && auth.user.role !== "admin") {
      notFound();
    }
    return <EditPostForm post={JSON.parse(JSON.stringify(post))} />;
  } catch {
    notFound();
  }
}
