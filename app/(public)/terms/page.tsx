import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — British Lookup",
  description: "Terms and conditions for using the BritishLookup UK business directory.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">Terms of Service</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: March 2026</p>

      <div className="mt-6 prose max-w-none text-text-muted">
        <h2 className="text-text">1. Acceptance of Terms</h2>
        <p>
          By accessing or using BritishLookup (&ldquo;the Service&rdquo;), you agree to these
          Terms of Service. If you do not agree, please do not use the Service.
        </p>

        <h2 className="text-text">2. Accounts</h2>
        <ul>
          <li>You must provide accurate information when creating an account.</li>
          <li>You are responsible for maintaining the security of your account.</li>
          <li>You must be at least 16 years old to create an account.</li>
          <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
        </ul>

        <h2 className="text-text">3. Business Listings</h2>
        <ul>
          <li>Listings must be for genuine, lawful businesses operating in the UK.</li>
          <li>You must have the authority to list or claim a business.</li>
          <li>Listing information must be accurate and not misleading.</li>
          <li>We reserve the right to remove or modify listings at our discretion.</li>
          <li>Listings are subject to review and approval before publication.</li>
        </ul>

        <h2 className="text-text">4. User Content</h2>
        <ul>
          <li>You retain ownership of content you submit (articles, reviews, listings).</li>
          <li>By submitting content, you grant BritishLookup a non-exclusive, royalty-free licence to display and distribute it on our platform.</li>
          <li>Content must not be defamatory, obscene, fraudulent, or infringe on others&apos; rights.</li>
          <li>We may remove content that violates these terms.</li>
        </ul>

        <h2 className="text-text">5. Claiming a Business</h2>
        <p>
          When you claim a business listing, you confirm that you are the owner or an authorised
          representative. False claims may result in account termination.
        </p>

        <h2 className="text-text">6. Prohibited Conduct</h2>
        <ul>
          <li>Submitting false or misleading information.</li>
          <li>Spamming, scraping, or automated access to the Service.</li>
          <li>Impersonating another person or business.</li>
          <li>Attempting to circumvent security measures.</li>
        </ul>

        <h2 className="text-text">7. Disclaimer</h2>
        <p>
          BritishLookup is provided &ldquo;as is&rdquo; without warranties of any kind. We do
          not guarantee the accuracy of business listings or user-submitted content. We are
          not liable for any transactions between users and listed businesses.
        </p>

        <h2 className="text-text">8. Changes to Terms</h2>
        <p>
          We may update these terms at any time. Continued use of the Service after changes
          constitutes acceptance of the new terms.
        </p>

        <h2 className="text-text">9. Governing Law</h2>
        <p>
          These terms are governed by the laws of England and Wales.
        </p>

        <h2 className="text-text">10. Contact</h2>
        <p>
          Questions about these terms? Contact us at{" "}
          <a href="mailto:hello@britishlookup.co.uk" className="text-brand">hello@britishlookup.co.uk</a>.
        </p>
      </div>
    </div>
  );
}
