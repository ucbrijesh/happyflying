# HappyFlying — Developer Guide

Welcome to the **HappyFlying** developer documentation. This guide details the monorepo architecture, local development workflows, Sanity CMS integration, type generation, styling system, and deployment configurations.

---

## 1. Architecture & Monorepo Overview

HappyFlying is built as an npm workspace monorepo separating the modern Next.js 16 frontend application from the standalone Sanity Studio CMS and shared TypeScript packages.

```
happyflying/
├── apps/
│   ├── web/                     # Next.js 16 (App Router) Frontend Application
│   │   ├── src/
│   │   │   ├── app/             # Next.js App Router pages & API routes
│   │   │   ├── components/      # UI components (SanityImage, PackageCard, etc.)
│   │   │   ├── lib/sanity/      # GROQ queries and data fetching methods
│   │   │   └── sanity/          # Sanity client, image URL builder, and types
│   │   ├── next.config.ts       # Next.js config (remote image patterns, etc.)
│   │   └── package.json
│   │
│   └── studio/                  # Standalone Sanity Studio v3
│       ├── schemaTypes/         # Document and object schemas
│       │   ├── documents/       # Document types (travelPackage, hotel, etc.)
│       │   └── objects/         # Reusable object types (imageWithAlt, seo, etc.)
│       ├── sanity.config.ts     # Sanity Studio configuration & plugins
│       ├── sanity.cli.ts        # CLI config, dataset, TypeGen paths
│       ├── structure.ts         # Custom Studio Desk navigation structure
│       └── package.json
│
├── packages/
│   └── types/                   # Shared TypeScript interfaces & types
│       └── src/index.ts
│
├── docs/                        # Project documentation
│   ├── developer-guide.md       # Technical documentation (this file)
│   └── editor-guide.md          # CMS Editor user manual
│
├── package.json                 # Monorepo root workspaces & orchestrator scripts
└── .env.example                 # Environment variables template
```

---

## 2. Technology Stack

- **Frontend Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **CMS**: [Sanity.io v3](https://sanity.io/) (Headless CMS, Content Lake)
- **Image Optimization**: `@sanity/image-url` with `next/image`, LQIP blur placeholders, and hotspot cropping
- **Type Safety**: TypeScript 5, Sanity TypeGen (`@sanity/cli`), and `@happyflying/types`
- **Hosting & CI/CD**: [Vercel](https://vercel.com/) (Web) + Sanity Managed Hosting (`sanity deploy`)

---

## 3. Getting Started Locally

### Prerequisites
- **Node.js**: `v20.x` or higher (LTS recommended)
- **npm**: `v10.x` or higher
- **Sanity Account Access**: Permission on project `819qznh7` (production dataset)

### Installation
Clone the repository and install all dependencies across the monorepo:

```bash
git clone https://github.com/ucbrijesh/happyflying.git
cd happyflying
npm install
```

### Environment Variables Setup
Create `.env.local` inside `apps/web/`:

```bash
# apps/web/.env.local

# Public Sanity Configuration (Frontend)
NEXT_PUBLIC_SANITY_PROJECT_ID=819qznh7
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-01

# Private Sanity Tokens (Server-side for Draft Previews)
SANITY_API_READ_TOKEN=your_sanity_read_token_here
SANITY_API_TOKEN=your_sanity_editor_token_here

# Site URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STUDIO_URL=http://localhost:3333
```

---

## 4. Development Commands

Run scripts from the repository root:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts both Next.js (`:3000`) and Sanity Studio (`:3333`) concurrently |
| `npm run dev:web` | Starts only the Next.js web application (`http://localhost:3000`) |
| `npm run dev:studio` | Starts only the Sanity Studio (`http://localhost:3333`) |
| `npm run build` | Builds all workspaces (Web and Studio) |
| `npm run build:web` | Builds the production Next.js application |
| `npm run build:studio` | Builds the static Sanity Studio distribution (`dist`) |
| `npm run typegen` | Extracts Sanity schemas and regenerates TypeScript types |

---

## 5. Sanity Studio & Content Modeling

### Schema Architecture
Schemas are organized inside [`apps/studio/schemaTypes/`](file:///d:/websites/happyflying/apps/studio/schemaTypes/):

- **Documents** (`documents/`):
  - `travelPackage.ts`: Complete travel package with day-by-day itineraries, hotels, pricing, and SEO.
  - `destination.ts`: Tour destinations (Andaman, Bali, Kerala, etc.).
  - `itineraryDay.ts`: Individual day breakdown (morning, afternoon, evening, transfers).
  - `hotel.ts`: Accommodation and resort options.
  - `activity.ts`: Island and adventure activities.
  - `pricing.ts`: Pricing tiers, seasonal rates, and meal plans.
  - `service.ts`: Core service pages (Bespoke Holidays, Flights & Cruises).
  - `blogPost.ts`: Travel stories and guides.
  - `testimonial.ts`: Verified customer reviews.
  - `teamMember.ts`: Bangalore travel concierges and management.
  - `faq.ts`: Common traveler questions.
  - `siteSettings.ts`: Singleton containing company info, Koramangala address, contact phones, navigation, and SEO defaults.

- **Objects** (`objects/`):
  - `imageWithAlt.ts`: Standardized image object with `hotspot: true`, descriptive `alt` text, and optional captions.
  - `seo.ts`: Reusable SEO meta title, description, keywords, OpenGraph image, and canonical URL.
  - `contactCta.ts`: Reusable contact and WhatsApp booking CTA block.
  - `transfer.ts`: Transportation leg details (ferry, cab, catamaran).

### Custom Desk Structure
Studio navigation is defined in [`apps/studio/structure.ts`](file:///d:/websites/happyflying/apps/studio/structure.ts). `siteSettings` is configured as a dedicated Singleton to prevent duplicate entries.

### Updating Types with Sanity TypeGen
Whenever you add or modify a schema in `apps/studio/schemaTypes/`:
1. Run TypeGen from the workspace root:
   ```bash
   npm run typegen
   ```
2. This generates updated TypeScript definitions in `apps/web/src/sanity/types.ts`.

---

## 6. Data Fetching & GROQ Queries

Data queries reside in [`apps/web/src/lib/sanity/queries/`](file:///d:/websites/happyflying/apps/web/src/lib/sanity/queries/):
- `packages.ts`: Queries for all packages, featured spotlight packages, and single package by slug.
- `destinations.ts`: Destination listings and single destination overview with related packages.
- `site.ts`: Site settings, testimonials, team members, and global FAQs.
- `services.ts` & `blog.ts`: Service detail pages and travel articles.

### Image Querying & Resiliency
Always query images using `coalesce` and include `hotspot`, `crop`, and LQIP metadata:

```groq
"hero": coalesce(hero, heroImage, image) {
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt,
  hotspot,
  crop
}
```

---

## 7. Image Handling & Next.js Image Optimization

### Image Builder (`apps/web/src/sanity/lib/image.ts`)
Configured using explicit project parameters:

```typescript
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '819qznh7'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => builder.image(source)
```

### `<SanityImage />` Component (`apps/web/src/components/SanityImage.tsx`)
Features built-in fallback resolution:
1. Dynamic resizing and cropping via `urlFor(value).width().height().fit('crop').auto('format').url()`
2. Automatic LQIP blur placeholder rendering when `asset.metadata.lqip` is available
3. Direct fallback to `asset.url` if builder parsing fails
4. Next.js image domain authorization in `next.config.ts`:
   - `cdn.sanity.io`
   - `images.unsplash.com`

---

## 8. Deployment Guide

### Deploying Frontend to Vercel
1. Connect the GitHub repository to [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `apps/web`.
3. Configure environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_STUDIO_URL`).
4. Trigger production deployment.

### Deploying Standalone Sanity Studio
Deploy to Sanity's free managed hosting:
```bash
cd apps/studio
npm run deploy
```
Studio URL: `https://happyflying.sanity.studio`

### Sanity CORS Configuration
Ensure all deployment domains are added under **API > CORS Origins** in [sanity.io/manage](https://www.sanity.io/manage):
- `https://your-domain.vercel.app` (Allow credentials checked)
- `https://happyflying.sanity.studio`
- `http://localhost:3000`
