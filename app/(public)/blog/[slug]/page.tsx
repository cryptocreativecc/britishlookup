import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Article — BritishLookup Blog" };
}

export default function ArticlePage() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="brand">Roofing</Badge>
        <span className="text-sm text-text-muted">5 min read</span>
        <span className="text-sm text-text-muted">· 25 March 2026</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-text">
        How to Choose a Reliable Roofer in 2026
      </h1>
      <p className="mt-3 text-lg text-text-muted">
        Finding a trustworthy roofer doesn&apos;t have to be stressful. Here&apos;s what to look for and the questions to ask before hiring.
      </p>

      <div className="mt-8 prose prose-lg max-w-none">
        <p>When it comes to roofing work, choosing the right contractor can mean the difference between a job that lasts decades and one that causes problems within months. Here&apos;s our guide to finding a reliable roofer in the UK.</p>
        <h2>Check credentials and insurance</h2>
        <p>Any reputable roofer should be able to provide proof of public liability insurance and, ideally, membership of a recognised trade body such as the NFRC (National Federation of Roofing Contractors).</p>
        <h2>Get multiple quotes</h2>
        <p>Always get at least three written quotes for comparison. Be wary of any quote that seems significantly cheaper than the others — it often indicates corners will be cut.</p>
        <p className="text-text-muted italic">This is a placeholder article. Real content will be loaded from PocketBase.</p>
      </div>

      {/* Author bio */}
      <Card className="mt-10">
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand font-bold">
              BL
            </div>
            <div>
              <p className="font-semibold text-text">BritishLookup Editorial</p>
              <p className="text-sm text-text-muted mt-1">
                The BritishLookup editorial team writes guides and insights to help UK homeowners find trusted tradespeople.
              </p>
              <a href="https://britishlookup.co.uk" className="text-sm text-brand hover:text-brand-dark mt-1 inline-block">
                britishlookup.co.uk
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
