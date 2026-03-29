import { Card, CardContent } from "@/components/ui/card";

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

const ICONS: Record<string, { label: string; icon: string }> = {
  facebook: { label: "Facebook", icon: "📘" },
  twitter: { label: "X / Twitter", icon: "𝕏" },
  instagram: { label: "Instagram", icon: "📸" },
  linkedin: { label: "LinkedIn", icon: "💼" },
  youtube: { label: "YouTube", icon: "▶️" },
  tiktok: { label: "TikTok", icon: "🎵" },
};

export function SocialLinksCard({ links }: { links: SocialLinks }) {
  const entries = Object.entries(links).filter(([, v]) => v);
  if (entries.length === 0) return null;

  return (
    <Card>
      <CardContent>
        <h3 className="font-semibold text-text mb-3">Social Media</h3>
        <div className="space-y-2">
          {entries.map(([key, url]) => {
            const info = ICONS[key] || { label: key, icon: "🔗" };
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted hover:text-brand transition-colors"
              >
                <span>{info.icon}</span>
                <span>{info.label}</span>
              </a>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
