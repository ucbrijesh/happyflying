# HAPPYFLYING TOURS & TRAVELS ✈️🌴
### Production-Ready Headless Travel Platform

[![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Sanity.io](https://img.shields.io/badge/Sanity.io-v3-F03E2F?style=flat&logo=sanity)](https://sanity.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Compatible-black?style=flat&logo=vercel)](https://vercel.com/)

A modern, ultra-fast, and fully CMS-driven headless travel website built for **HappyFlying Tours & Travels LLP** (Bangalore, India). Engineered with Next.js App Router, Sanity Studio v3, TypeScript, GROQ query architecture, and Tailwind CSS.

---

## 🧭 Architecture Overview

```
happyflying/
├── apps/
│   ├── web/                    # Next.js 15+ App Router Website
│   │   ├── src/
│   │   │   ├── app/            # App Router pages & API handlers
│   │   │   │   ├── page.tsx                    # Luxury Homepage
│   │   │   │   ├── packages/                   # /packages & /packages/[slug]
│   │   │   │   ├── destinations/               # /destinations & /destinations/[slug]
│   │   │   │   ├── services/                   # /services & /services/[slug]
│   │   │   │   ├── about/                      # /about page
│   │   │   │   ├── contact/                    # /contact page
│   │   │   │   ├── blog/                       # /blog & /blog/[slug]
│   │   │   │   ├── travel-planner/             # /travel-planner (AI planner)
│   │   │   │   ├── not-found.tsx               # Luxury 404 handler
│   │   │   │   ├── loading.tsx                 # Loading state
│   │   │   │   ├── error.tsx                   # Runtime Error Boundary
│   │   │   │   ├── robots.ts                   # Dynamic robots.txt
│   │   │   │   ├── sitemap.ts                  # Dynamic sitemap.xml
│   │   │   │   └── api/
│   │   │   │       ├── enquiry/route.ts        # Lead & Booking API endpoint
│   │   │   │       └── draft-mode/             # Sanity Live Draft mode
│   │   │   ├── components/     # High-polish luxury React components
│   │   │   │   ├── Header.tsx                  # Responsive luxury nav bar
│   │   │   │   ├── Footer.tsx                  # CMS-driven footer & social links
│   │   │   │   ├── FloatingContact.tsx         # Mobile sticky CTA & Floating buttons
│   │   │   │   ├── PackageCard.tsx             # Interactive tour cards
│   │   │   │   ├── DestinationCard.tsx         # Destination exploration card
│   │   │   │   ├── ItineraryTimeline.tsx       # Day-by-day vertical timeline & accordion
│   │   │   │   ├── InclusionsExclusions.tsx    # Dual-column structured items
│   │   │   │   ├── EnquiryModal.tsx            # Modal dialogue booking form
│   │   │   │   ├── EnquiryForm.tsx             # Full responsive booking form
│   │   │   │   ├── PartnerMarquee.tsx          # Airline & hotel partner ribbon
│   │   │   │   ├── TestimonialSlider.tsx       # Verified traveler reviews
│   │   │   │   ├── CustomPortableText.tsx      # Portable Text renderer
│   │   │   │   └── JsonLd.tsx                  # Schema.org structured data
│   │   │   ├── lib/
│   │   │   │   └── sanity/
│   │   │   │       ├── fetch.ts                # Typed Sanity data fetch layer
│   │   │   │       └── queries/                # Centralized GROQ queries
│   │   │   └── sanity/         # Sanity client, image builder & live helpers
│   │   └── tailwind.config.ts  # Luxury travel theme & design tokens
│   │
│   └── studio/                 # Standalone Sanity Studio v3
│       ├── schemaTypes/
│       │   ├── documents/      # 12 Document schemas
│       │   │   ├── destination.ts
│       │   │   ├── travelPackage.ts
│       │   │   ├── itineraryDay.ts
│       │   │   ├── hotel.ts
│       │   │   ├── activity.ts
│       │   │   ├── pricing.ts
│       │   │   ├── testimonial.ts
│       │   │   ├── faq.ts
│       │   │   ├── service.ts
│       │   │   ├── teamMember.ts
│       │   │   ├── blogPost.ts
│       │   │   └── siteSettings.ts (singleton)
│       │   └── objects/        # 10+ Reusable object schemas
│       ├── structure.ts        # Clean desk structure (Content & Website groups)
│       ├── sanity.config.ts    # Studio configuration & plugins
│       ├── sanity.cli.ts       # Sanity CLI & TypeGen configuration
│       └── seed-data.ndjson    # Complete Andaman seed dataset
├── docs/                       # Project Documentation
│   ├── developer-guide.md      # Technical architecture & developer handbook
│   ├── editor-guide.md         # CMS editor & content manager manual
│   └── launch-guide.md         # Step-by-step production launch & go-live checklist
│
└── packages/
    └── types/                  # Shared TypeScript models across web & studio
```

---

## 📚 Documentation & Guides

- 👨‍💻 **[Developer Guide](file:///d:/websites/happyflying/docs/developer-guide.md)**: Technical architecture, environment variables, Sanity TypeGen, GROQ query patterns, and image handling.
- ✍️ **[Content Editor Guide](file:///d:/websites/happyflying/docs/editor-guide.md)**: Step-by-step guide for publishing packages, destinations, itineraries, hotel profiles, and updating site settings.
- 🚀 **[Production Launch Guide](file:///d:/websites/happyflying/docs/launch-guide.md)**: Pre-launch verification, Sanity Studio deployment, Vercel setup, custom domain DNS, and post-launch QA.

---

## 🛠️ Sanity Content Models

### Document Types
1. `destination`: Name, slug, country, region, descriptions, heroImage, gallery, highlights, bestTimeToVisit, idealDuration, thingsToDo, travelTips, faqs, relatedPackages, SEO.
2. `travelPackage`: Title, slug, packageCode, destination reference, packageType, status, featured, hero, summary, highlights, **referenced `itineraryDay` documents**, hotels, activities, transfers, inclusions, exclusions, importantNotes, cancellationPolicy, referenced pricing, bookingCTA, FAQs, SEO.
3. `itineraryDay`: Day number, title, location, description, morning, afternoon, evening, overnight, meals, activities references, transfers, images, map location, important notes, Portable Text.
4. `hotel`: Name, slug, destination, category, starRating, description, heroImage, gallery, amenities, roomTypes, mealPlan, location, checkIn/checkOut, SEO.
5. `activity`: Name, slug, destination, category, shortDescription, duration, difficulty, ageSuitability, inclusions, price, operatingSeason, SEO.
6. `pricing`: Package reference, validFrom, validTo, occupancy, adults, children, rooms, mealPlan, basePrice, taxes, markup, finalPrice, currency, notes.
7. `testimonial`: Author name, location, tour package reference, rating, text, traveler image, date.
8. `faq`: Question, answer (Portable Text), category, target page/package reference.
9. `service`: Title, slug, icon, shortDescription, fullDescription, features, heroImage, ctaText.
10. `teamMember`: Name, role, bio, image, email, phone, socialLinks.
11. `blogPost`: Title, slug, excerpt, mainImage, author, categories, publishedAt, body (Portable Text), SEO.
12. `siteSettings` *(Singleton)*: Company name, logo, phone, WhatsApp, email, address, social links, navigation menu, footer text, global booking CTA, default SEO.

---

## ⚡ Quickstart & Local Setup

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+
- **npm**: v9+
- **Sanity CLI** (optional global install): `npm install -g sanity`

### 2. Environment Variables
Create `.env.local` inside `apps/web/`:
```bash
cp apps/web/.env.example apps/web/.env.local
```

Fill in your Sanity project details:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=819qznh7
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Required for Draft Mode / Live Editing
SANITY_API_TOKEN=
SANITY_API_READ_TOKEN=
```

### 3. Run Locally

To run the Next.js Frontend:
```bash
cd apps/web
npm run dev
# Opens at http://localhost:3000
```

To run the Sanity Studio:
```bash
cd apps/studio
npm run dev
# Opens at http://localhost:3333
```

---

## 📦 Seeding Andaman Content into Sanity

The project includes an official dataset for the Andaman 5D/4N Package, Complete Day 1-5 Itinerary (Port Blair, Cellular Jail, Havelock, Radhanagar, Elephant Beach Snorkelling, Neil Island, Natural Bridge), Makruzz/Nautika Cruise transfers, Symphony Palms / Sea Shell hotels, and Site Settings.

To import the seed data into your Sanity dataset:
```bash
cd apps/studio
npm run seed
```
*(Or manually via Sanity CLI: `sanity dataset import seed-data.ndjson production --replace`)*

---

## 🚀 Deployment

### A. Deploy Next.js Web App (Vercel)
1. Push repository to GitHub.
2. In [Vercel Dashboard](https://vercel.com/), click **Add New Project** and select the repository.
3. Set **Root Directory** to `apps/web`.
4. Configure Environment Variables in Vercel:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: `819qznh7`
   - `NEXT_PUBLIC_SANITY_DATASET`: `production`
   - `NEXT_PUBLIC_SANITY_API_VERSION`: `2026-02-01`
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.vercel.app`
   - `SANITY_API_READ_TOKEN`: `[Your Sanity Viewer/Editor Token]`
5. Click **Deploy**.

### B. Deploy Sanity Studio
You can host Sanity Studio on Sanity's free managed hosting or Vercel:
```bash
cd apps/studio
npm run deploy
```
This deploys the studio to `https://happyflying.sanity.studio`.

---

## 📖 Operational Guide for Travel Operations Team

### How to Add a New Travel Package
1. Open Sanity Studio (`http://localhost:3333` or `https://happyflying.sanity.studio`).
2. Go to **CONTENT → Itinerary Days** and create the day-by-day itinerary records (e.g., *Day 1: Arrival & Sunset Beach*, *Day 2: Coral Reef Diving*).
3. Go to **CONTENT → Packages** and click **Create Package**.
4. Fill in:
   - **Title & Slug**: e.g., `Kerala Backwaters Luxury Tour`
   - **Destination**: Link to the Kerala destination document.
   - **Duration**: e.g., `6 Days / 5 Nights`
   - **Itinerary**: Reference the `itineraryDay` documents in order.
   - **Inclusions & Exclusions**: Add structured items.
   - **Pricing**: Link to a pricing document.
5. Click **Publish**. The package instantly appears on `/packages` and `/packages/[slug]`.

### How to Add a New Destination
1. In Sanity Studio, navigate to **CONTENT → Destinations**.
2. Click **Create Destination**.
3. Provide the destination name, hero image, description, best time to visit, top highlights, and travel tips.
4. Click **Publish**. It automatically generates `/destinations/[slug]` and links to all matching packages.

### How to Update Site-Wide Phone, Email, or WhatsApp
1. In Sanity Studio, click on **WEBSITE → Site Settings**.
2. Update the **Phone Number**, **WhatsApp Number**, or **Headquarters Address**.
3. Click **Publish**. All headers, footers, mobile bottom sticky CTA bars, enquiry forms, and WhatsApp click-to-chat links will immediately update across the entire website.

---

## 🔒 Security & Performance
- Zero private tokens exposed in client code.
- Responsive images powered by Sanity CDN with automatic WebP/AVIF generation.
- JSON-LD Structured Data for `TravelAgency`, `TouristDestination`, `Product`, and `FAQPage`.
- Fast Core Web Vitals with minimal client JavaScript.

---

© 2026 HappyFlying Tours & Travels LLP. All rights reserved.
