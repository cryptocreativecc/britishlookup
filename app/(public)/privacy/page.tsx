import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — British Lookup",
  description: "How BritishLookup collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">Privacy Policy</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: March 2026</p>

      <div className="mt-6 prose max-w-none text-text-muted">
        <h2 className="text-text">1. Information We Collect</h2>
        <p>When you use BritishLookup, we may collect:</p>
        <ul>
          <li><strong>Account information:</strong> Name, email address, and password when you create an account.</li>
          <li><strong>Business listing data:</strong> Business name, address, contact details, website, and description when you submit a listing.</li>
          <li><strong>Article submissions:</strong> Author name, bio, company, and article content.</li>
          <li><strong>Usage data:</strong> Pages visited, browser type, device information, and IP address via cookies and analytics.</li>
        </ul>

        <h2 className="text-text">2. How We Use Your Information</h2>
        <ul>
          <li>To display your business listing or article on our directory.</li>
          <li>To manage your account and provide customer support.</li>
          <li>To send transactional emails (verification, password reset, claim notifications).</li>
          <li>To improve our website and services.</li>
          <li>To prevent fraud and abuse.</li>
        </ul>

        <h2 className="text-text">3. Data Sharing</h2>
        <p>
          We do not sell your personal data. Business listing information is displayed publicly
          as part of the directory. We may share data with:
        </p>
        <ul>
          <li>Email service providers (for transactional emails).</li>
          <li>Analytics providers (anonymised usage data).</li>
          <li>Law enforcement, if required by law.</li>
        </ul>

        <h2 className="text-text">4. Cookies</h2>
        <p>
          We use essential cookies for authentication and session management. We may use
          analytics cookies to understand how visitors use our site. You can control cookie
          preferences in your browser settings.
        </p>

        <h2 className="text-text">5. Data Retention</h2>
        <p>
          Account and listing data is retained for as long as your account is active. You
          can request deletion of your account and associated data at any time by contacting us.
        </p>

        <h2 className="text-text">6. Your Rights</h2>
        <p>Under UK GDPR, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request deletion of your data.</li>
          <li>Object to processing of your data.</li>
          <li>Request data portability.</li>
        </ul>

        <h2 className="text-text">7. Contact</h2>
        <p>
          For privacy-related enquiries, contact us at{" "}
          <a href="mailto:hello@britishlookup.co.uk" className="text-brand">hello@britishlookup.co.uk</a>.
        </p>
      </div>
    </div>
  );
}
