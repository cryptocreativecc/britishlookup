import Link from "next/link";

const directoryLinks = [
  { href: "/directory", label: "Browse Directory" },
  { href: "/submit", label: "Submit a Business" },
  { href: "/write-for-us", label: "Write For Us" },
];

const resourceLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/directory", label: "Categories" },
  { href: "/directory", label: "Regions" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold">
              <span className="text-brand">British</span>
              <span className="text-white">Lookup</span>
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              The UK&apos;s trusted business directory. Find verified tradespeople,
              suppliers, and local services across Britain.
            </p>
          </div>

          {/* Directory */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Directory
            </h3>
            <ul className="space-y-2">
              {directoryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Get Listed
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Add your business to BritishLookup for free. Get a verified listing
              with a dofollow backlink to your website.
            </p>
            <Link
              href="/submit"
              className="inline-block mt-3 text-sm font-semibold text-brand hover:text-brand-light transition-colors"
            >
              Submit your business →
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BritishLookup. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built by{" "}
            <a
              href="https://amga.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand transition-colors"
            >
              AMGA Design
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
