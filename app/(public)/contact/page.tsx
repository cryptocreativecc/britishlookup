import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — British Lookup",
  description: "Get in touch with the BritishLookup team. Questions about listings, partnerships, or contributions.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">Contact Us</h1>
      <p className="mt-3 text-text-muted">
        Have a question about your listing, want to partner with us, or need help?
        We&apos;d love to hear from you.
      </p>

      <div className="mt-8 space-y-6">
        <div className="bg-surface rounded-[var(--radius-card)] p-6 border border-border">
          <h2 className="text-lg font-semibold text-text mb-3">General Enquiries</h2>
          <p className="text-text-muted">
            For questions about listings, account issues, or general feedback:
          </p>
          <a href="mailto:hello@britishlookup.co.uk" className="mt-2 inline-block text-brand font-medium hover:underline">
            hello@britishlookup.co.uk
          </a>
        </div>

        <div className="bg-surface rounded-[var(--radius-card)] p-6 border border-border">
          <h2 className="text-lg font-semibold text-text mb-3">Business Listings</h2>
          <p className="text-text-muted">
            Need help submitting or claiming your business? Having trouble with your listing?
          </p>
          <a href="mailto:listings@britishlookup.co.uk" className="mt-2 inline-block text-brand font-medium hover:underline">
            listings@britishlookup.co.uk
          </a>
        </div>

        <div className="bg-surface rounded-[var(--radius-card)] p-6 border border-border">
          <h2 className="text-lg font-semibold text-text mb-3">Blog &amp; Contributions</h2>
          <p className="text-text-muted">
            Interested in writing for us or have questions about article submissions?
          </p>
          <a href="mailto:editorial@britishlookup.co.uk" className="mt-2 inline-block text-brand font-medium hover:underline">
            editorial@britishlookup.co.uk
          </a>
        </div>

        <div className="bg-surface rounded-[var(--radius-card)] p-6 border border-border">
          <h2 className="text-lg font-semibold text-text mb-3">Built By</h2>
          <p className="text-text-muted">
            BritishLookup is designed and built by{" "}
            <a href="https://speedyweb.design" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
              Speedy Web Design
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
