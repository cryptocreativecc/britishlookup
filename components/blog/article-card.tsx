import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  authorName: string;
  readTime: number;
  publishedAt: string;
  coverImage?: string;
}

export function ArticleCard({
  title,
  slug,
  excerpt,
  category,
  authorName,
  readTime,
  publishedAt,
  coverImage,
}: ArticleCardProps) {
  return (
    <Link href={`/guides/${slug}`}>
      <Card className="h-full hover:border-brand/30 overflow-hidden">
        {coverImage ? (
          <div className="h-44 overflow-hidden">
            <img src={coverImage} alt={title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-44 bg-gradient-to-br from-brand-light to-surface flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
        )}
        <CardContent>
          <div className="flex items-center gap-2 mb-2">
            {category && <Badge variant="brand">{category}</Badge>}
            <span className="text-xs text-text-muted">{readTime} min read</span>
          </div>
          <h3 className="font-semibold text-text line-clamp-2">{title}</h3>
          <p className="text-sm text-text-muted mt-1.5 line-clamp-2">{excerpt}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-text-muted">
            <span>{authorName}</span>
            <span>{publishedAt ? new Date(publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
