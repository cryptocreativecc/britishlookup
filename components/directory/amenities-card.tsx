import { Card, CardContent } from "@/components/ui/card";

export function AmenitiesCard({ amenities }: { amenities: string[] }) {
  if (amenities.length === 0) return null;

  return (
    <Card>
      <CardContent>
        <h3 className="font-semibold text-text mb-3">Amenities</h3>
        <div className="flex flex-wrap gap-2">
          {amenities.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-light text-brand-dark"
            >
              ✓ {a}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
