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
              The UK&apos;s trusted business directory. Find verified tradespeople,
              suppliers, and local services across Britain.
            </p>
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
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/write-for-us" className="hover:text-white transition-colors">
                Write For Us
              </Link>
              <Link href="/login" className="hover:text-white transition-colors">
                Sign In
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
