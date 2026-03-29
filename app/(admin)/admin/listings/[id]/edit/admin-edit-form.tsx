"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServicesEditor, type ServiceItem } from "@/components/forms/services-editor";
import { OpeningHoursEditor, defaultOpeningHours, type OpeningHours } from "@/components/forms/opening-hours-editor";
import { AmenitiesEditor } from "@/components/forms/amenities-editor";
import { SocialLinksEditor, emptySocialLinks, type SocialLinks } from "@/components/forms/social-links-editor";
import { TeamMembersEditor, type TeamMemberInput } from "@/components/forms/team-members-editor";
import { FAQEditor, type FAQInput } from "@/components/forms/faq-editor";

const inputClass = "w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseJson<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === "object") return val;
  try { return JSON.parse(val); } catch { return fallback; }
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listing: Record<string, any>;
  categories: { id: string; name: string }[];
  regions: { id: string; name: string }[];
}

export function AdminEditForm({ listing, categories, regions }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [category, setCategory] = useState(listing.category || "");
  const [region, setRegion] = useState(listing.region || "");
  const [services, setServices] = useState<ServiceItem[]>(parseJson(listing.services, []));
  const [openingHours, setOpeningHours] = useState<OpeningHours>(() => {
    const raw = parseJson<Record<string, Record<string, unknown>>>(listing.opening_hours, {});
    const base = defaultOpeningHours();
    for (const [day, d] of Object.entries(raw)) {
      if (base[day]) {
        base[day] = {
          closed: d.closed !== undefined ? !!d.closed : d.enabled !== undefined ? !d.enabled : true,
          is24: !!(d.is24 ?? d.is24h),
          slots: Array.isArray(d.slots) ? d.slots as { open: string; close: string }[] : [{ open: "09:00", close: "17:00" }],
        };
      }
    }
    return base;
  });
  const [amenities, setAmenities] = useState<string[]>(parseJson(listing.amenities, []));
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(parseJson(listing.social_links, emptySocialLinks));
  const [teamMembers, setTeamMembers] = useState<TeamMemberInput[]>(parseJson(listing.team_members, []));
  const [faqs, setFaqs] = useState<FAQInput[]>(parseJson(listing.faqs, []));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const fd = new FormData(e.currentTarget);
    const payload = new FormData();

    payload.set("name", fd.get("name") as string);
    payload.set("email", fd.get("email") as string);
    payload.set("phone", fd.get("phone") as string || "");
    payload.set("website", fd.get("website") as string || "");
    payload.set("anchor_text", fd.get("anchor_text") as string || "");
    payload.set("town", fd.get("town") as string);
    payload.set("postcode", fd.get("postcode") as string);
    payload.set("address", fd.get("address") as string || "");
    payload.set("description", fd.get("description") as string);
    payload.set("category", category);
    payload.set("region", region);
    payload.set("services", JSON.stringify(services));
    payload.set("opening_hours", JSON.stringify(openingHours));
    payload.set("amenities", JSON.stringify(amenities));
    payload.set("social_links", JSON.stringify(socialLinks));
    payload.set("youtube_url", fd.get("youtube_url") as string || "");
    payload.set("team_members", JSON.stringify(teamMembers.filter((m) => m.name)));
    payload.set("faqs", JSON.stringify(faqs.filter((f) => f.question && f.answer)));

    const logo = fd.get("logo") as File;
    if (logo && logo.size > 0) payload.set("logo", logo);
    const banner = fd.get("banner") as File;
    if (banner && banner.size > 0) payload.set("banner", banner);
    const galleryFiles = fd.getAll("gallery") as File[];
    galleryFiles.forEach((f) => { if (f.size > 0) payload.append("gallery", f); });

    try {
      const res = await fetch(`/api/admin/listings/${listing.id}/update`, {
        method: "POST",
        body: payload,
      });
      if (!res.ok) throw new Error((await res.json()).error || "Update failed");
      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {error && <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">{error}</div>}
        {success && <div className="mb-4 rounded-lg bg-green-50 text-green-700 p-3 text-sm">Listing updated successfully.</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Business Name *</label>
            <input name="name" required defaultValue={listing.name} className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Category *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} required className={inputClass}>
                <option value="">Select</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Region *</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} required className={inputClass}>
                <option value="">Select</option>
                {regions.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Town / City *</label>
              <input name="town" required defaultValue={listing.town} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Postcode *</label>
              <input name="postcode" required defaultValue={listing.postcode} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Full Address</label>
            <input name="address" defaultValue={listing.address} className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Phone</label>
              <input name="phone" defaultValue={listing.phone} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Email *</label>
              <input name="email" required defaultValue={listing.email} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Website URL</label>
            <input name="website" defaultValue={listing.website} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Anchor Text</label>
            <input name="anchor_text" defaultValue={listing.anchor_text} className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Description *</label>
            <textarea name="description" required defaultValue={listing.description} rows={6} maxLength={2400} className="w-full px-4 py-3 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none" />
          </div>

          <ServicesEditor value={services} onChange={setServices} />

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Icon Upload</label>
            <input type="file" name="logo" accept="image/jpeg,image/png" className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-[var(--radius-btn)] file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand hover:file:bg-brand-light/80" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Logo / Banner Upload</label>
            <input type="file" name="banner" accept="image/jpeg,image/png" className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-[var(--radius-btn)] file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand hover:file:bg-brand-light/80" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Image Gallery (up to 6)</label>
            <input type="file" name="gallery" accept="image/jpeg,image/png,image/webp" multiple className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-[var(--radius-btn)] file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand hover:file:bg-brand-light/80" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">YouTube Video URL</label>
            <input name="youtube_url" defaultValue={listing.youtube_url || ""} placeholder="https://youtube.com/watch?v=..." className={inputClass} />
          </div>

          <TeamMembersEditor value={teamMembers} onChange={setTeamMembers} />
          <FAQEditor value={faqs} onChange={setFaqs} />

          <SocialLinksEditor value={socialLinks} onChange={setSocialLinks} />
          <OpeningHoursEditor value={openingHours} onChange={setOpeningHours} />
          <AmenitiesEditor value={amenities} onChange={setAmenities} />

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
