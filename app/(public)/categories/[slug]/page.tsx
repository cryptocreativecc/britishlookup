export const dynamic = "force-dynamic";
import { BusinessCard } from "@/components/directory/business-card";
import { createAdminPb } from "@/lib/pb";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pb = await createAdminPb();
  try {
    const cat = await pb.collection("categories").getFirstListItem(`slug="${slug}"`);
    return {
      title: `${cat.name} in the UK | Find Local ${cat.name} | British Lookup`,
      description: `Find trusted ${cat.name.toLowerCase()} businesses across the UK. Verified listings with reviews, contact details and dofollow backlinks.`,
      alternates: { canonical: `https://britishlookup.co.uk/categories/${slug}` },
    };
  } catch {
    return { title: "Category — British Lookup" };
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const pb = await createAdminPb();

  let category;
  try {
    category = await pb.collection("categories").getFirstListItem(`slug="${slug}"`);
  } catch {
    notFound();
  }

  let businesses: { name: string; slug: string; category: string; town: string; description: string; isFeatured: boolean; isVerified: boolean; banner: string }[] = [];
  try {
    const result = await pb.collection("businesses").getFullList({
      filter: `category="${category.id}" && (status="approved" || status="featured")`,
      sort: "-created",
      expand: "category",
    });
    businesses = result.map((b) => ({
      name: b.name,
      slug: b.slug,
      category: b.expand?.category?.name || category.name,
      town: b.town || "",
      description: b.description || "",
      isFeatured: b.status === "featured" || b.is_featured,
      isVerified: b.is_verified || false,
      banner: b.banner ? `https://pb.britishlookup.co.uk/api/files/businesses/${b.id}/${b.banner}` : b.logo ? `https://pb.britishlookup.co.uk/api/files/businesses/${b.id}/${b.logo}` : "",
    }));
  } catch {}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">{category.name} Businesses</h1>
      <p className="mt-2 text-text-muted">
        Find trusted {category.name.toLowerCase()} businesses across the UK
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {businesses.length > 0 ? (
          businesses.map((biz) => <BusinessCard key={biz.slug} {...biz} />)
        ) : (
          <div className="col-span-full text-center py-12 text-text-muted">
            <p>No {category.name.toLowerCase()} businesses listed yet.</p>
            <a href="/submit" className="text-brand hover:underline mt-2 inline-block">Submit yours →</a>
          </div>
        )}
      </div>
    </div>
  );
}
