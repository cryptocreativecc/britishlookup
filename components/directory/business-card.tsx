import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApprovedSeal } from "@/components/ui/approved-seal";

interface BusinessCardProps {
  name: string;
  slug: string;
  category: string;
  town: string;
  description: string;
  isFeatured?: boolean;
  isVerified?: boolean;
  icon?: string;
  banner?: string;
}

export function BusinessCard({
  name,
  slug,
  category,
  town,
  description,
  isFeatured,
  isVerified,
  banner,
}: BusinessCardProps) {
  return (
    <Link href={`/business/${slug}`}>
      <Card className="h-full hover:border-brand/30 overflow-hidden">
        {banner ? (
          <div className="w-full h-40 bg-white border-b border-border flex items-center justify-center p-4">
            <img src={banner} alt={name} className="max-h-full max-w-full object-contain" />
          </div>
        ) : (
          <div className="w-full h-40 bg-brand-light flex items-center justify-center text-brand font-bold text-4xl">
            {name.charAt(0)}
          </div>
        )}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-text line-clamp-1 flex items-center gap-1.5">
              {name}
              <ApprovedSeal className="w-5 h-5 text-brand shrink-0" />
            </h3>
            <div className="flex gap-1.5 shrink-0">
              {isFeatured && <Badge variant="brand">Featured</Badge>}
              {isVerified && <Badge variant="outline">✓ Verified</Badge>}
            </div>
          </div>
          <p className="text-sm text-text-muted mt-0.5">
            {category} · {town}
          </p>
          <p className="text-sm text-text-muted mt-2 line-clamp-2">{description}</p>
        </div>
      </Card>
    </Link>
  );
}
