# BritishLookup.co.uk — Technical Specification

> *UK Business Directory & Contributor Blog Platform*

| Field | Detail |
|---|---|
| Version | 1.1 — Stack Review Update (March 2026) |
| Stack | Next.js 16.2 · React 19.2 · Bun · PocketBase v0.36.7 · Resend · Tailwind CSS 4.2 |
| Domain | britishlookup.co.uk |
| Author | AMGA Design |
| Date | March 2026 |
| Status | Draft for review |

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [System Architecture](#3-system-architecture)
4. [Database Schema — PocketBase Collections](#4-database-schema--pocketbase-collections)
5. [Pages and Routing](#5-pages-and-routing)
6. [Email System — Resend](#6-email-system--resend)
7. [SEO Architecture](#7-seo-architecture)
8. [Form Handling](#8-form-handling)
9. [Styling — Tailwind CSS 4.2](#9-styling--tailwind-css-42)
10. [Deployment](#10-deployment)
11. [Performance Targets](#11-performance-targets)
12. [Recommended Build Order](#12-recommended-build-order)
13. [Package Reference](#13-package-reference)
14. [Security Considerations](#14-security-considerations)
15. [Future Enhancements](#15-future-enhancements)

---

## 1. Project Overview

BritishLookup.co.uk is a UK-focused business directory and trades
publishing platform built to achieve two interconnected goals: provide
genuine value to UK tradespeople and homeowners through high-quality
listings and content, and systematically build domain authority through
structured link distribution, guest content, and citation signals.

The platform is built on a modern, cost-efficient stack centred on
Next.js 16.2 (App Router) with Bun as the sole runtime and package
manager, PocketBase as the backend datastore and admin layer, and Resend
for all transactional email. This combination keeps infrastructure lean
while remaining fully production-grade and scalable.

### 1.1 Primary objectives

-   Build a verified, SEO-optimised directory of UK businesses with
    individual listing pages that pass link equity to listed websites

-   Operate a content platform where trade professionals contribute
    articles in exchange for dofollow author backlinks

-   Grow domain rating from current DR28 toward DR50+ through structured
    content, citations, and inbound link acquisition

-   Provide a featured/premium listing tier for strategic partner sites
    such as troofingsupplies.co.uk

-   Keep operating costs near zero in early stages — Bun, PocketBase,
    and Resend free tier are all capable of supporting significant scale
    before paid tiers are needed

### 1.2 Target audiences

-   UK tradespeople and building contractors seeking directory
    visibility and a backlink

-   Homeowners searching for trusted local roofing, guttering, and
    building suppliers

-   Industry writers and business owners seeking a guest post placement
    with SEO value

-   SEO practitioners using britishlookup.co.uk as a link-building asset
    for client sites

## 2. Technology Stack

### 2.1 Core stack decisions

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 16.2 | App Router, RSC, Turbopack stable by default, React Compiler stable, proxy.ts replaces middleware |
| React | React 19.2 | Required by Next.js 16.2 — includes View Transitions, useEffectEvent, Activity component |
| Runtime / PM | Bun 1.x | Dramatically faster installs, native TypeScript, drop-in Node replacement |
| Backend / DB | PocketBase v0.36.7 | Single binary, SQLite, built-in admin UI, REST + realtime API, JS SDK v0.26.8 |
| Email | Resend | Modern developer-first email API, React Email templates, generous free tier |
| Styling | Tailwind CSS 4.2 | CSS-first @theme config, Oxide engine, new mauve/olive/mist/taupe palettes, logical property utilities |
| Language | TypeScript 5 | End-to-end type safety across frontend and API layer |
| Deployment | Dokploy / Coolify | Self-hosted PaaS on a VPS, zero platform lock-in, low monthly cost |
| Image CDN | Cloudflare R2 + CDN | Free egress, S3-compatible, integrates with Next.js image optimisation |
| Search | PocketBase full-text | Built-in FTS via SQLite, sufficient for directory scale, no Elasticsearch cost |
| Analytics | Umami (self-hosted) | Privacy-first, GDPR compliant, no cookie banner required |
| Maps | Mapbox GL JS | 50k loads/month free, strong UK geocoding, embeds on listing pages |

### 2.2 Why Bun over Node / pnpm

-   Bun installs packages 10–25x faster than npm and 3–5x faster than
    pnpm — critical for CI/CD pipelines

-   Native TypeScript execution — no ts-node or transpile step needed
    for scripts

-   Built-in test runner, bundler, and SQLite driver reduce dependency
    count

-   Drop-in replacement for Node.js — all Next.js and ecosystem
    packages are fully compatible

> *All package.json scripts must use bun run, not npm run. The lockfile
> is bun.lockb. Never commit node_modules.*

### 2.3 Next.js 16.2 — key architectural changes

The spec targets Next.js 16.2 specifically. Several architectural
changes from earlier versions are important to understand before
building.

-   Turbopack is now the stable default bundler for both next dev and
    next build — no --turbopack flag needed, and no webpack config
    should be maintained alongside it

-   proxy.ts replaces middleware.ts — rename the file and the exported function to proxy. The proxy runtime is Node.js only; the edge runtime is no longer supported in this file. Any existing middleware logic must be migrated to proxy.ts

-   React Compiler is stable — enabled via reactCompiler: true in
    next.config.ts. Automatically memoizes components and eliminates
    manual useMemo/useCallback in most cases

-   Cache Components replace experimental PPR — use the use cache
    directive for explicit caching rather than the old experimental.ppr
    flag

-   React 19.2 is required — upgrade @types/react and
    @types/react-dom alongside next

-   use cache directive replaces implicit fetch() caching — data
    fetching should use explicit cache directives rather than relying on
    Next.js fetch patching

> *Upgrade command: bunx @next/codemod@canary upgrade latest — this
> runs the official codemod and handles the middleware → proxy rename
> automatically.*

### 2.4 Tailwind CSS 4.2 — what is new

-   Four new built-in colour palettes: mauve, olive, mist, and taupe —
    all defined in OKLCH for wide-gamut display support

-   New @tailwindcss/webpack plugin — not needed for this
    Next.js/Turbopack build but available if needed

-   Logical property utilities for block-direction spacing, borders, and
    scroll margins

-   Inline/block size utilities (inline-*, block-*) mapping directly
    to CSS logical sizing properties

-   font-features-* utility for OpenType font feature control
    (ligatures, tabular numbers etc.)

-   start-* and end-* utilities deprecated — use inline-s-* and
    inline-e-* instead in all new code

> *The @theme directive approach in this spec is correct for Tailwind
> 4.2 — no tailwind.config.js is needed.*

### 2.5 Why PocketBase over Supabase / Postgres

-   Single Go binary — runs on the cheapest VPS (£4/month Hetzner)
    without a managed database

-   Built-in admin UI at /pb/_/ for managing listings, articles, and
    users without custom admin code

-   Real-time subscriptions available out of the box for future
    notification features

-   SQLite scales comfortably to millions of records for a directory
    workload — no connection pooling complexity

-   Automatic REST API and TypeScript SDK generation from collections

> *Pin PocketBase binary to v0.36.7 and the JS SDK (npm package
> pocketbase) to v0.26.8. Run ./pocketbase update to upgrade the binary
> on the VPS.*

## 3. System Architecture

### 3.1 High-level architecture

The platform follows a decoupled architecture where Next.js handles all
rendering and routing, and PocketBase serves as the data and auth layer
via its REST API. All server-side data fetching happens in React Server
Components, keeping the client bundle lean.

| Layer | Description |
|---|---|
| CDN (Cloudflare) | Edge caching for static assets, images via R2, DNS and DDoS protection |
| Next.js App (VPS) | App Router RSC pages, API routes, ISR for listing and blog pages |
| PocketBase (VPS) | Collections for businesses, articles, categories, regions, users, submissions |
| Resend | Transactional email for submission confirmations, listing approvals, admin alerts |
| Cloudflare R2 | Business logos, article images, uploaded assets — served via CDN |
| Umami (VPS) | Privacy-first analytics, self-hosted alongside PocketBase |

### 3.2 Monorepo structure

The project uses a flat Next.js app with a clear internal module
structure rather than a Turborepo monorepo — this keeps the initial
build simple while remaining easy to extract into a monorepo if a
separate admin app is needed later.

```
britishlookup/
├── app/ # Next.js App Router
│ ├── (public)/ # Public-facing routes
│ │ ├── page.tsx # Homepage
│ │ ├── directory/ # Directory index + search
│ │ │ ├── page.tsx
│ │ │ └── [slug]/page.tsx # Individual listing
│ │ ├── blog/
│ │ │ ├── page.tsx # Blog index
│ │ │ └── [slug]/page.tsx # Article detail
│ │ ├── submit/ # Submit business form
│ │ └── write-for-us/ # Contributor submission form
│ ├── (admin)/ # Protected admin routes
│ │ └── admin/
│ │ ├── listings/ # Approve / manage listings
│ │ └── articles/ # Approve / manage articles
│ └── api/ # Next.js API routes
│ ├── submit-business/ # POST handler for listing form
│ ├── submit-article/ # POST handler for article form
│ └── revalidate/ # On-demand ISR revalidation webhook
├── components/ # Shared UI components
│ ├── directory/ # BusinessCard, ListingRow, FilterSidebar
│ ├── blog/ # ArticleCard, AuthorBio, CategoryChip
│ ├── forms/ # SubmitBusinessForm, SubmitArticleForm
│ └── ui/ # Button, Badge, SearchBar, NavBar, Footer
├── lib/ # Utilities and services
│ ├── pb.ts # PocketBase client (server-side singleton)
│ ├── resend.ts # Resend client and email helpers
│ ├── seo.ts # generateMetadata helpers
│ └── utils.ts # Slug generation, formatting
├── emails/ # React Email templates
│ ├── SubmissionConfirm.tsx
│ ├── ListingApproved.tsx
│ ├── ArticleApproved.tsx
│ └── AdminAlert.tsx
├── public/ # Static assets
├── styles/ # Tailwind CSS 4.2 entry
├── .env.local # Environment variables
├── proxy.ts # Network boundary (replaces middleware.ts in Next.js 16)
├── tailwind.css # @theme directives (Tailwind 4.2, no config.js)
├── package.json
└── bun.lockb

```


## 4. Database Schema — PocketBase Collections

### 4.1 businesses

Core collection for all directory listings. Each approved record
generates a unique public listing page.

| Field | Type | Description |
|---|---|---|
| id | auto | PocketBase auto ID |
| name | text (req) | Business display name |
| slug | text (unique) | URL-safe slug, auto-generated from name |
| description | text | Short description (≤320 chars) for listing cards |
| full_description | editor | Rich text for the full listing page |
| category | relation | → categories collection |
| region | relation | → regions collection |
| town | text | Town / city name for display |
| postcode | text | UK postcode for geocoding and local SEO |
| address | text | Full address string |
| phone | text | Contact telephone number |
| email | email | Contact email (not publicly displayed) |
| website | url | External website URL — the dofollow backlink |
| logo | file | Uploaded logo, stored in R2 |
| tags | json | Array of keyword tags e.g. ["guttering","fascia"] |
| status | select | pending \| approved \| rejected \| featured |
| is_verified | bool | Manually verified by admin |
| is_featured | bool | Premium featured listing |
| rating_avg | number | Computed average from reviews |
| rating_count | number | Total review count |
| lat | number | Latitude for map pin (geocoded from postcode) |
| lng | number | Longitude for map pin |
| created | auto | PocketBase timestamp |

### 4.2 articles

Stores all blog content, both editorial and contributor-submitted. Each
approved article generates a full blog post page with an author bio and
dofollow link.

| Field | Type | Description |
|---|---|---|
| id | auto | PocketBase auto ID |
| title | text (req) | Article title |
| slug | text (unique) | URL-safe slug |
| excerpt | text | Short summary for cards and meta description |
| body | editor | Full rich text article content |
| category | relation | → categories collection |
| author_name | text | Contributor display name |
| author_bio | text | Short author bio shown at end of article |
| author_website | url | The dofollow backlink in the author bio |
| author_company | text | Company or publication name |
| cover_image | file | Featured image, stored in R2 |
| read_time | number | Estimated minutes, computed on save |
| status | select | pending \| approved \| rejected \| published |
| is_editorial | bool | True for in-house content vs contributor |
| seo_title | text | Custom meta title override |
| seo_description | text | Custom meta description override |
| published_at | date | Publication date (can be future-dated) |
| created | auto | PocketBase timestamp |

### 4.3 Supporting collections

| Collection | Key fields and purpose |
|---|---|
| categories | name, slug, icon, description — shared by businesses and articles |
| regions | name, slug, county — 12 UK regions for directory filtering |
| reviews | business (relation), rating (1–5), comment, status — moderated |
| submissions_business | Staging collection for new listing form data awaiting admin approval |
| submissions_article | Staging collection for contributor article submissions awaiting review |
| settings | key/value store for site name, featured listing IDs, announcement text |

## 5. Pages and Routing

### 5.1 Public routes

| Route | Rendering | Description |
|---|---|---|
| / | ISR (1hr) | Homepage: hero search, featured listings, recent blog posts, stats |
| /directory | ISR (30m) | Directory index with search, category + region filters, paginated results |
| /directory/[slug] | ISR (1hr) | Individual business listing: full details, map, related listings, related articles |
| /blog | ISR (30m) | Blog index: featured article, category filter chips, article card grid |
| /blog/[slug] | ISR (1hr) | Article page: full content, author bio with dofollow link, related articles |
| /submit | Static | Submit a business form — posts to /api/submit-business |
| /write-for-us | Static | Contributor submission form — posts to /api/submit-article |
| /category/[slug] | ISR (1hr) | Filtered directory for a single category (Roofing, Guttering etc.) |
| /region/[slug] | ISR (1hr) | Filtered directory for a single UK region |
| /sitemap.xml | Dynamic | Auto-generated sitemap including all published listings and articles |
| /robots.txt | Static | Allows all crawlers, references sitemap |

### 5.2 Admin routes (protected)

A lightweight in-app admin panel handles moderation without requiring
custom PocketBase UI configuration. Protected by NextAuth.js session
middleware.

| Route | Purpose |
|---|---|
| /admin | Dashboard: counts of pending listings, pending articles, total traffic |
| /admin/listings | Table of all listings with approve / reject / feature actions |
| /admin/listings/[id] | Full listing detail + edit form + approve/reject buttons |
| /admin/articles | Table of all article submissions with approve / reject actions |
| /admin/articles/[id] | Full article preview + edit + approve/reject + trigger revalidation |

## 6. Email System — Resend

### 6.1 Overview

All transactional email is handled by Resend using React Email
templates. Resend\'s free tier allows 3,000 emails/month — more than
sufficient for this platform\'s early growth phase. All templates are
built as React components in the /emails directory and rendered
server-side.

### 6.2 Email templates

| Template | Trigger | Recipient |
|---|---|---|
| SubmissionConfirm.tsx | Business form submit | Submitter — confirms receipt, sets expectation of 3–5 day review |
| ArticleConfirm.tsx | Article form submit | Contributor — confirms receipt, links to submission guidelines |
| ListingApproved.tsx | Admin approves listing | Business owner — includes live listing URL and next steps |
| ListingRejected.tsx | Admin rejects listing | Business owner — includes reason and invitation to resubmit |
| ArticleApproved.tsx | Admin approves article | Contributor — includes live article URL and author bio preview |
| ArticleRejected.tsx | Admin rejects article | Contributor — includes feedback notes from admin review |
| AdminAlert.tsx | New submission (either) | Admin email — instant notification with submission details and review link |

### 6.3 Resend setup

// lib/resend.ts

import { Resend } from \"resend\";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendListingConfirm(to: string, name: string) {

await resend.emails.send({

from: \"BritishLookup \<noreply@britishlookup.co.uk\>\",

to,

subject: \`Thanks for submitting ${name} to BritishLookup\`,

react: SubmissionConfirm({ businessName: name }),

});

}

### 6.4 React Email template pattern

// emails/SubmissionConfirm.tsx

import { Html, Head, Body, Container, Text, Button, Heading } from
\"@react-email/components\";

export default function SubmissionConfirm({ businessName }: {
businessName: string }) {

return (

\<Html\>

\<Head /\>

\<Body style={{ fontFamily: \"Arial, sans-serif\", background:
\"#f4f4f2\" }}\>

\<Container style={{ background: \"#fff\", padding: \"32px\",
borderRadius: \"8px\" }}\>

\<Heading style={{ color: \"#0F6E56\" }}\>Submission
received\</Heading\>

\<Text\>Thanks for submitting {businessName} to
BritishLookup.co.uk.\</Text\>

\<Text\>We aim to review your listing within 3–5 working days.\</Text\>

\<Button href=\"https://britishlookup.co.uk\" style={{ background:
\"#1D9E75\" }}\>

Visit BritishLookup

\</Button\>

\</Container\>

\</Body\>

\</Html\>

);

}

> *Resend requires a verified sending domain. Add britishlookup.co.uk
> DNS records (SPF, DKIM, DMARC) via the Resend dashboard before going
> live. Use noreply@britishlookup.co.uk as the from address.*

## 7. SEO Architecture

### 7.1 Metadata strategy

Every page generates unique, keyword-rich metadata using Next.js
generateMetadata. Listing and article pages use ISR to ensure fresh
content is indexed without full rebuilds.

// app/directory/[slug]/page.tsx

export async function generateMetadata({ params }): Promise\<Metadata\>
{

const listing = await getListing(params.slug);

return {

title: \`${listing.name} — ${listing.category} in ${listing.town}
\| BritishLookup\`,

description: listing.description,

alternates: { canonical:
\`https://britishlookup.co.uk/directory/${listing.slug}\` },

openGraph: {

title: listing.name,

description: listing.description,

images: [listing.logo_url],

},

};

}

### 7.2 Structured data (JSON-LD)

Each listing page renders LocalBusiness schema markup. Each article page
renders Article schema. This maximises the chance of rich results in
Google Search.

-   Listing pages: LocalBusiness schema with name, address, telephone,
    url, aggregateRating

-   Article pages: Article schema with headline, author, datePublished,
    image

-   Homepage: WebSite schema with SearchAction for sitelinks search box

-   Category pages: ItemList schema with all listings as ListItem
    entries

### 7.3 Sitemap and robots

-   Dynamic sitemap at /sitemap.xml generated from PocketBase — all
    approved businesses and published articles included

-   Sitemap split into /sitemap-businesses.xml and /sitemap-articles.xml
    for large-scale indexing

-   robots.txt references both sitemaps and disallows /admin and /api
    routes

-   Submitted to Google Search Console and Bing Webmaster Tools on
    launch

### 7.4 Internal linking strategy

-   Each listing page links to its category page and region page

-   Each article links to 2–3 related listings by category,
    distributing authority to listed businesses

-   Category and region pages link to their top 3 featured listings

-   Blog articles use contextual links to related articles within the
    same category

## 8. Form Handling

### 8.1 Submit a business — /submit

The business submission form collects all required listing data and
posts to the /api/submit-business Next.js route handler. On success the
submission is written to the submissions_business PocketBase collection
and two emails are sent: a confirmation to the submitter and an admin
alert.

**Form fields**

-   Business name (required)

-   Category — select from categories collection (required)

-   Region — select from regions collection (required)

-   Town / city (required)

-   Postcode — validated against UK postcode regex (required)

-   Full address

-   Phone number

-   Email address (required, not displayed publicly)

-   Website URL (required — this is the backlink)

-   Business description (required, max 1200 chars)

-   Logo upload — JPG/PNG, max 2MB

-   Tags — comma-separated keywords

**API route**

// app/api/submit-business/route.ts

export async function POST(req: Request) {

const data = await req.formData();

// 1. Validate all required fields

// 2. Geocode postcode via postcodes.io (free UK postcode API)

// 3. Upload logo to Cloudflare R2 if provided

// 4. Write to submissions_business collection in PocketBase

// 5. Send confirmation email to submitter via Resend

// 6. Send admin alert email to admin@britishlookup.co.uk via Resend

return Response.json({ success: true });

}

### 8.2 Submit an article — /write-for-us

The contributor submission form captures author details and article
content. Articles can be submitted as a Google Doc link or as pasted
text. On submission, the article enters a pending state and the admin is
alerted for review.

**Form fields**

-   Author full name (required)

-   Email address (required)

-   Business / publication name

-   Website URL (required — the dofollow link in the author bio)

-   Article title (required)

-   Category — select from categories collection (required)

-   Google Doc URL or pasted article content (required)

-   Short author bio — displayed at end of article (required, max 200
    chars)

-   Cover image upload — JPG/PNG, max 4MB

### 8.3 Form validation

-   Client-side validation with Zod schemas shared between frontend and
    API route

-   UK postcode validated against postcodes.io before submission

-   URL fields validated for HTTPS and valid domain format

-   File uploads checked for type (image only) and size before upload

-   Rate limiting on API routes — 5 submissions per IP per hour via
    Upstash Redis (free tier)

## 9. Styling — Tailwind CSS 4.2

### 9.1 Configuration approach

Tailwind CSS 4.2 uses CSS-first configuration via @theme directives.
There is no tailwind.config.js — all design tokens are defined
directly in the main CSS file. The Oxide engine (Rust-based) provides
significantly faster build times than the previous PostCSS pipeline.

/* styles/tailwind.css */

@import \"tailwindcss\";

@theme {

--color-brand: #1D9E75;

--color-brand-dark: #0F6E56;

--color-brand-light: #E1F5EE;

--color-surface: #F4F4F2;

--color-border: #DDDDDD;

--font-sans: \"Inter Variable\", ui-sans-serif, system-ui;

--font-mono: \"JetBrains Mono\", ui-monospace;

--radius-card: 12px;

--radius-btn: 8px;

--shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.08);

}

### 9.2 Component conventions

-   All components use Tailwind utility classes directly — no CSS
    modules

-   Common patterns extracted into CVA (class-variance-authority)
    variants for buttons, badges, and cards

-   Dark mode supported via Tailwind dark: variant — system preference
    detected via CSS prefers-color-scheme

-   Responsive breakpoints: sm (640px) · md (768px) · lg (1024px) · xl
    (1280px)

### 9.3 Typography

-   Inter Variable loaded via next/font for zero layout shift

-   Prose content in articles uses @tailwindcss/typography plugin with
    custom theme overrides

-   Article body renders rich text from PocketBase editor as sanitised
    HTML within a prose container

## 10. Deployment

### 10.1 Infrastructure

The entire platform runs on a single Hetzner CX21 VPS (£4.50/month)
managed by Dokploy, a self-hosted PaaS that handles deployments,
environment variables, SSL, and reverse proxy via Caddy.

| Service | Cost | Notes |
|---|---|---|
| Hetzner CX21 VPS | ~£4.50/mo | 2 vCPU, 4GB RAM — comfortable for Next.js + PocketBase + Umami |
| Cloudflare (free) | £0 | DNS, CDN, DDoS, R2 free tier (10GB storage, free egress) |
| Resend (free) | £0 | 3,000 emails/month — sufficient until significant scale |
| Dokploy (self-hosted) | £0 | Runs on the same VPS, manages deployments and SSL |
| Upstash Redis (free) | £0 | 10,000 requests/day for rate limiting on form endpoints |
| Mapbox (free) | £0 | 50,000 map loads/month — more than enough for early traffic |
| **Total** | **~£4.50/mo** | Entire platform running for less than a coffee per month |

### 10.2 Deployment process

-   Next.js app built with bun run build and deployed as a Docker
    container via Dokploy

-   PocketBase runs as a separate Docker container on the same VPS with
    a persistent volume for its SQLite data file

-   Caddy reverse proxy (managed by Dokploy) handles HTTPS, routes
    britishlookup.co.uk to Next.js and pb.britishlookup.co.uk to
    PocketBase admin

-   GitHub Actions CI/CD pipeline runs bun test, bun run build, then
    triggers Dokploy webhook on merge to main

-   Environment variables managed in Dokploy dashboard — never
    committed to the repository

### 10.3 Environment variables

POCKETBASE_URL=https://pb.britishlookup.co.uk

POCKETBASE_ADMIN_EMAIL=admin@britishlookup.co.uk

POCKETBASE_ADMIN_PASSWORD=\<secure\>

RESEND_API_KEY=re_xxxxxxxxxxxx

RESEND_FROM=noreply@britishlookup.co.uk

ADMIN_EMAIL=admin@britishlookup.co.uk

CLOUDFLARE_R2_ENDPOINT=https://\<account\>.r2.cloudflarestorage.com

CLOUDFLARE_R2_ACCESS_KEY=\<key\>

CLOUDFLARE_R2_SECRET_KEY=\<secret\>

CLOUDFLARE_R2_BUCKET=britishlookup-assets

NEXTAUTH_SECRET=\<secure-random\>

UPSTASH_REDIS_REST_URL=https://\...upstash.io

UPSTASH_REDIS_REST_TOKEN=\<token\>

## 11. Performance Targets

### 11.1 Core Web Vitals targets

| Metric | Target | Strategy |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | ISR, image optimisation via next/image, Cloudflare CDN |
| CLS (Cumulative Layout Shift) | < 0.1 | Explicit image dimensions, font-display: swap, skeleton loaders |
| INP (Interaction to Next Paint) | < 200ms | Minimal client JS — RSC-first, forms via server actions |
| TTFB (Time to First Byte) | < 600ms | Cloudflare edge cache for ISR pages |
| Lighthouse score | 95+ all | Measured in CI before every production deploy |

### 11.2 Caching strategy

-   Homepage and blog index: ISR revalidation every 60 minutes

-   Individual listing pages: ISR revalidation every 60 minutes,
    on-demand revalidation triggered by admin approval webhook

-   Individual article pages: ISR revalidation every 60 minutes,
    on-demand revalidation on publish/update

-   Static pages (/submit, /write-for-us): fully static, CDN-cached
    indefinitely

-   PocketBase API responses cached in Next.js fetch cache with
    appropriate revalidation intervals

## 12. Recommended Build Order

The following phased approach gets the platform live with core
functionality first, then layers in additional features. Each phase is
independently deployable.

#### Phase 1 — Foundation (Week 1–2)

-   Initialise Next.js 16.2 project with Bun: bunx
    create-next-app@latest --typescript

-   Configure Tailwind CSS 4.2 with brand @theme tokens — no
    tailwind.config.js needed

-   Note: no --turbopack flag needed in package.json scripts — it is
    the default in 16.2

-   Set up PocketBase on VPS via Dokploy and create all collections

-   Build NavBar, Footer, and core UI components

-   Seed database with 20–30 real UK roofing and trades businesses

-   Build homepage with static featured listings and blog section

#### Phase 2 — Directory (Week 2–3)

-   Build /directory page with search, category and region filtering

-   Build individual /directory/[slug] listing pages with ISR

-   Implement sitemap.xml generation

-   Build /submit form with API route, PocketBase write, and Resend
    emails

-   Build /admin/listings moderation interface

#### Phase 3 — Blog & Contributors (Week 3–4)

-   Build /blog index with category filtering

-   Build /blog/[slug] article pages with author bio and dofollow link

-   Build /write-for-us contributor form with API route and Resend
    emails

-   Build /admin/articles moderation interface

-   Write and publish first 5 in-house roofing/guttering articles

#### Phase 4 — Polish & Launch (Week 4–5)

-   Add Mapbox map to all listing pages

-   Implement structured data (JSON-LD) on listing and article pages

-   Set up Umami analytics

-   Lighthouse audit and Core Web Vitals optimisation

-   Submit sitemap to Google Search Console and Bing Webmaster Tools

-   Submit troofingsupplies.co.uk as a featured listing

-   Outreach to 20 roofing and trades businesses for free listings

## 13. Package Reference

### 13.1 Production dependencies

| Package | Purpose |
|---|---|
| next | Framework — App Router, Turbopack, Cache Components, proxy.ts, React Compiler |
| react / react-dom | React 19.2 — required by Next.js 16.2, includes View Transitions and Activity |
| pocketbase | PocketBase JS SDK v0.26.8 — matches PocketBase binary v0.36.7 |
| resend | Email API client |
| @react-email/components | React Email component library for email templates |
| zod | Schema validation for form data and API responses |
| @upstash/ratelimit | Rate limiting on form API routes |
| @upstash/redis | Redis client for Upstash (rate limiting state) |
| next-auth | Admin authentication and session management |
| mapbox-gl | Interactive maps on listing pages |
| @tailwindcss/typography | Prose styling for article rich text content |
| class-variance-authority | Component variant management for buttons, badges etc. |
| clsx | Conditional className utility |
| slugify | Generate URL-safe slugs from business names and article titles |
| @aws-sdk/client-s3 | S3-compatible client for Cloudflare R2 uploads |

### 13.2 Development dependencies

| Package | Purpose |
|---|---|
| typescript | Type system |
| tailwindcss | CSS framework |
| @types/react / @types/node | TypeScript definitions |
| eslint / eslint-config-next | Linting |
| prettier | Code formatting |
| @react-email/tailwind | Tailwind support inside email templates |
| react-email | Email preview server — run with bunx email dev |

### 13.3 Key bun commands

bun install \# Install all dependencies

bun run dev \# Start Next.js dev server (Turbopack default)

bun run build \# Production build (Turbopack default)

bun run start \# Start production server

bun run lint \# ESLint

bun test \# Run tests (Bun built-in runner)

bunx email dev \# Preview React Email templates

bunx pocketbase serve \# Run PocketBase locally for dev

bunx @next/codemod@canary upgrade latest \# Upgrade Next.js with
codemods

## 14. Security Considerations

-   All PocketBase API calls from Next.js use a server-side admin token
    — the token is never exposed to the client

-   Public-facing PocketBase collections have read-only rules — no
    unauthenticated writes are possible directly

-   All form submissions are sanitised server-side before writing to
    PocketBase

-   File uploads validated for MIME type server-side — not just file
    extension

-   Admin routes protected by NextAuth.js middleware — session checked
    on every request

-   Content Security Policy headers configured in next.config.ts

-   Rate limiting on all form API routes via Upstash Redis to prevent
    spam submissions

-   HTTPS enforced by Caddy — HTTP automatically redirected

-   PocketBase admin panel only accessible via subdomain, not exposed on
    the main domain

-   Environment variables rotated if ever accidentally exposed — never
    committed to the repository

## 15. Future Enhancements

#### Phase 2 features (post-launch)

-   Premium featured listing tier — Stripe integration for monthly
    subscription, gives boosted placement and verified badge

-   Business owner dashboard — claim your listing, update details,
    respond to reviews

-   Review system — homeowners can leave star ratings and text reviews
    on listings

-   Newsletter — weekly digest of new listings and articles using
    Resend broadcast API

-   Region-specific landing pages for local SEO — e.g.
    /north-west/roofing

-   API for third-party integrations — allow partner sites to embed
    listing widgets

#### Phase 3 features

-   AI-assisted article review — flag thin content before admin sees
    it

-   Automatic postcode geocoding on listing creation using postcodes.io

-   Business profile photos gallery — multiple images per listing

-   Social sharing optimisation — pre-generated OG images per listing
    via @vercel/og

---

*BritishLookup.co.uk Technical Specification v1.1 · Prepared by AMGA Design · March 2026 · amga.co.uk*
