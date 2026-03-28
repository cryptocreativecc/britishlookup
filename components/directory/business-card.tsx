import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BusinessCardProps {
  name: string;
  slug: string;
  category: string;
  town: string;
  description: string;
  isFeatured?: boolean;
  isVerified?: boolean;
}

export function BusinessCard({
  name,
  slug,
  category,
  town,
  description,
  isFeatured,
  isVerified,
}: BusinessCardProps) {
  return (
    <Link href={`/directory/${slug}`}>
      <Card className="h-full hover:border-brand/30">
        <CardContent>
          <div className="flex items-start justify-between gap-2">
            <div className="w-12 h-12 rounded-[var(--radius-btn)] bg-brand-light flex items-center justify-center text-brand font-bold text-lg shrink-0">
              {name.charAt(0)}
            </div>
            <div className="flex gap-1.5">
              {isFeatured && <Badge variant="brand">Featured</Badge>}
              {isVerified && <Badge variant="outline">✓ Verified</Badge>}
            </div>
          </div>
          <h3 className="mt-3 font-semibold text-text line-clamp-1">{name}</h3>
          <p className="text-sm text-text-muted mt-0.5">
            {category} · {town}
          </p>
          <p className="text-sm text-text-muted mt-2 line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
