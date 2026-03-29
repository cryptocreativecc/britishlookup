"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  rating: number;
  comment: string;
  author_name: string;
  created: string;
}

export function ReviewsSection({ businessId }: { businessId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/reviews?businessId=${businessId}`)
      .then((r) => r.json())
      .then((data) => setReviews(data.reviews || []))
      .catch(() => {});
  }, [businessId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business: businessId,
          rating: Number(form.get("rating")),
          comment: form.get("comment"),
          author_name: form.get("author_name"),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit review");
      }
      setSubmitted(true);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text">
          Reviews
          {reviews.length > 0 && (
            <span className="ml-2 text-base font-normal text-text-muted">
              ({reviews.length}) · ⭐ {avgRating}
            </span>
          )}
        </h2>
        {!showForm && !submitted && (
          <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
            Write a Review
          </Button>
        )}
      </div>

      {submitted && (
        <div className="mb-4 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
          ✓ Thank you! Your review has been submitted and will appear once approved.
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-surface p-4 rounded-lg border border-border space-y-3">
          {error && <div className="text-sm text-red-700 bg-red-50 p-2 rounded">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-text mb-1">Your Name *</label>
            <input
              name="author_name"
              required
              className="w-full h-10 px-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Rating *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <label key={n} className="cursor-pointer">
                  <input type="radio" name="rating" value={n} required className="sr-only peer" />
                  <span className="text-2xl opacity-30 peer-checked:opacity-100 hover:opacity-70 transition-opacity">⭐</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Review</label>
            <textarea
              name="comment"
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
              placeholder="Share your experience..."
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={loading}>
              {loading ? "Submitting…" : "Submit Review"}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {reviews.length === 0 && !showForm ? (
        <p className="text-sm text-text-muted py-4">No reviews yet. Be the first to leave one!</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text text-sm">{review.author_name}</span>
                  <span className="text-sm">{"⭐".repeat(review.rating)}</span>
                </div>
                <span className="text-xs text-text-muted">
                  {new Date(review.created).toLocaleDateString("en-GB")}
                </span>
              </div>
              {review.comment && (
                <p className="mt-2 text-sm text-text-muted">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
