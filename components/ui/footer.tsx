import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/British-Lookup-Logo-Secondary.svg"
                alt="British Lookup"
                className="w-[278px] h-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The free UK business directory. Find and list businesses across
              every industry and region in Britain.
            </p>
            {/* Social links */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://facebook.com/britishlookup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a
                href="https://x.com/britishlookup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              &copy; {new Date().getFullYear()} British Lookup. All rights reserved.
            </p>
          </div>

          {/* Directory */}
          <div>
            <h4 className="mb-3 font-semibold text-white text-sm uppercase tracking-wider">
              Directory
            </h4>
            <nav className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/directory" className="hover:text-white transition-colors">
                Browse All
              </Link>
              <Link href="/category/trades-services" className="hover:text-white transition-colors">
                Categories
              </Link>
              <Link href="/submit" className="hover:text-white transition-colors">
                Submit Business
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 font-semibold text-white text-sm uppercase tracking-wider">
              Company
            </h4>
            <nav className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/write-for-us" className="hover:text-white transition-colors">
                Write For Us
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 font-semibold text-white text-sm uppercase tracking-wider">
              Legal
            </h4>
            <nav className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        {/* Speedy Web Design credit */}
        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col items-center gap-2 text-sm text-gray-500">
          <Image
            src="/speedy-web-design.svg"
            alt="Speedy Web Design"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span>
            Website by{" "}
            <a
              href="https://speedyweb.design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Speedy Web Design
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
