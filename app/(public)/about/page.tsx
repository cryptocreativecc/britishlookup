import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — British Lookup",
  description: "BritishLookup is a free UK business directory connecting consumers with businesses across every industry and region in Britain.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">About British Lookup</h1>

      <div className="mt-6 prose max-w-none text-text-muted">
        <p className="text-lg">
          BritishLookup is a free UK business directory designed to help consumers find trusted
          businesses and help businesses get discovered online.
        </p>

        <h2 className="text-text">Our Mission</h2>
        <p>
          We believe every business — from a one-person startup to an established enterprise —
          deserves a professional online presence. BritishLookup provides free, verified listings
          with dofollow backlinks to help businesses improve their visibility and SEO.
        </p>

        <h2 className="text-text">What We Offer</h2>
        <ul>
          <li><strong>Free listings</strong> — No subscriptions, no hidden fees. Every business gets a listing page at no cost.</li>
          <li><strong>Every industry</strong> — From trades and construction to tech, hospitality, retail, and professional services.</li>
          <li><strong>Every region</strong> — Full UK coverage across England, Scotland, Wales, and Northern Ireland.</li>
          <li><strong>Dofollow backlinks</strong> — Every approved listing includes a dofollow link to your website, boosting your SEO.</li>
          <li><strong>Blog platform</strong> — Contribute articles to share your expertise and reach a wider audience.</li>
          <li><strong>Verified badges</strong> — Earn trust with customers through our verification process.</li>
        </ul>

        <h2 className="text-text">For Business Owners</h2>
        <p>
          Create an account, submit your business, and you&apos;re listed. It&apos;s that simple.
          If your business is already listed, you can claim it to take control of your listing.
        </p>

        <h2 className="text-text">For Contributors</h2>
        <p>
          We welcome guest articles from industry professionals, business owners, and writers.
          Share your knowledge, build your authority, and get a published byline with a link
          back to your website.
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link href="/submit"><Button size="lg">List Your Business</Button></Link>
        <Link href="/write-for-us"><Button variant="outline" size="lg">Write For Us</Button></Link>
      </div>
    </div>
  );
}
