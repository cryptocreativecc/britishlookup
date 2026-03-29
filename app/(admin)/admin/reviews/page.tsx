import { createAdminPb } from "@/lib/pb";
import { Badge } from "@/components/ui/badge";
import { ReviewActions } from "./review-actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Reviews — Admin" };

export default async function AdminReviewsPage() {
  const pb = await createAdminPb();

  let reviews: {
    id: string;
    rating: number;
    comment: string;
    author_name: string;
    businessName: string;
    status: string;
    created: string;
  }[] = [];

  try {
    const result = await pb.collection("reviews").getFullList({
      sort: "-id",
      expand: "business",
    });
    reviews = result.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment || "",
      author_name: r.author_name,
      businessName: r.expand?.business?.name || "Unknown",
      status: r.status || "pending",
      created: r.created,
    }));
  } catch { /* */ }

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Reviews ({reviews.length})</h1>

      {reviews.length === 0 ? (
        <p className="text-text-muted">No reviews yet.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg border border-border">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text text-sm">{review.author_name}</span>
                    <span className="text-sm">{"⭐".repeat(review.rating)}</span>
                  </div>
                  <p className="text-xs text-brand mt-0.5">on {review.businessName}</p>
                  {review.comment && (
                    <p className="text-sm text-text-muted mt-1">{review.comment}</p>
                  )}
                  <p className="text-xs text-text-muted mt-1">
                    {new Date(review.created).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge className={statusColor[review.status] || ""}>{review.status}</Badge>
                  {review.status === "pending" && <ReviewActions reviewId={review.id} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
