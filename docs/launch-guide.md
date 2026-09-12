# HappyFlying — Production Launch & Go-Live Guide

This document outlines the step-by-step checklist and procedures to launch the **HappyFlying Tours & Travels** website (`happyflying.com`) into production.

---

## 🚀 Launch Roadmap Overview

```
Phase 1: Pre-Launch Verification  ──▶  Phase 2: Studio Deployment  ──▶  Phase 3: Web App (Vercel) Deployment  ──▶  Phase 4: Domain & CORS  ──▶  Phase 5: Post-Launch QA
```

---

## Phase 1: Pre-Launch Verification & Content Readiness

Before deploying to production, verify that both the codebase and CMS content are ready.

### 1. Codebase Validation
Run local builds to ensure zero TypeScript, linting, or packaging errors:

```bash
# 1. Regenerate Sanity types
npm run typegen

# 2. Build Next.js Web App
npm run build:web

# 3. Build Sanity Studio
npm run build:studio
```
Ensure all builds complete with exit code `0`.

### 2. CMS Content Readiness Checklist
Open your local Studio (`http://localhost:3333`) or Sanity Lake and confirm:

- [ ] **Site Settings**:
  - Company Name: `HappyFlying Tours & Travels LLP`
  - Phone: `+91 9900113691`
  - WhatsApp: `919900113691` (country code without `+` or spaces)
  - Email: `operations@happyflyingtravels.com`
  - Address: `No 145, 3rd Floor, 80 Feet Road KHB Colony, 5th Block, Koramangala, Bangalore, Karnataka 560034`
  - Social Links: Instagram, YouTube, WhatsApp URLs configured.
- [ ] **Travel Packages**:
  - At least 1–3 active packages published with status set to `active`.
  - High-resolution hero banner images uploaded with hotspot focal points.
  - Day-by-day itineraries, hotels, and inclusions/exclusions filled.
  - Pricing display and package codes entered.
- [ ] **Destinations**:
  - Destinations (e.g. *Andaman & Nicobar Islands*) published with hero images and descriptions.
- [ ] **Services & Team**:
  - Core service pages (Bespoke Holidays, Flights & Cruises) published.
  - Team concierges and customer testimonials populated.

---

## Phase 2: Deploy Standalone Sanity Studio

Deploy the Sanity Studio so content editors can access the CMS from anywhere.

### Recommended: Sanity Managed Cloud Hosting (Free & Fast)

1. Navigate to the studio directory:
   ```bash
   cd apps/studio
   ```
2. Run the deployment command:
   ```bash
   npm run deploy
   ```
3. Enter your desired studio hostname:
   - **Hostname**: `happyflying`
   - **Deployed URL**: [`https://happyflying.sanity.studio`](https://happyflying.sanity.studio)
4. Visit the URL and verify that you can log in and see your content.

---

## Phase 3: Deploy Next.js Web Application on Vercel

### 1. Push Latest Code to GitHub
Ensure all changes are committed and pushed to your `main` branch:

```bash
git add .
git commit -m "chore: prepare for production launch"
git push origin main
```

### 2. Import Project on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/new) and click **Add New... > Project**.
2. Select and import the `happyflying` repository.

### 3. Configure Monorepo Project Settings
In the Vercel project configuration screen:
- **Project Name**: `happyflying-web`
- **Framework Preset**: `Next.js`
- **Root Directory**: Click **Edit** and choose [`apps/web`](file:///d:/websites/happyflying/apps/web).
- **Build Command**: `next build` (default)
- **Output Directory**: `.next` (default)

### 4. Add Production Environment Variables
Under the **Environment Variables** section in Vercel, add:

| Environment Variable | Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `819qznh7` | Sanity Project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity Dataset |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-02-01` | Sanity API Version |
| `SANITY_API_READ_TOKEN` | `*sk...*` | Viewer token from sanity.io/manage |
| `SANITY_API_TOKEN` | `*sk...*` | Editor token for live draft mode |
| `NEXT_PUBLIC_SITE_URL` | `https://happyflying.com` | Production website URL |
| `NEXT_PUBLIC_STUDIO_URL` | `https://happyflying.sanity.studio` | Deployed Sanity Studio URL |

> [!TIP]
> To generate `SANITY_API_READ_TOKEN` or `SANITY_API_TOKEN`, go to [sanity.io/manage](https://www.sanity.io/manage) > Project `819qznh7` > **API** > **Tokens** > **Add API token**.

### 5. Deploy
Click **Deploy**. Vercel will build and assign your production deployment URL (e.g. `https://happyflying-web.vercel.app`).

---

## Phase 4: Configure Sanity CORS & Custom Domain

### 1. Add CORS Origins in Sanity
To allow your live frontend to query data from Sanity Content Lake:

1. Open [sanity.io/manage](https://www.sanity.io/manage) > Select project `819qznh7`.
2. Go to **API** > **CORS Origins** > Click **Add CORS origin**.
3. Add the following entries (ensure **"Allow credentials"** is checked for each):
   - `https://happyflying.com`
   - `https://www.happyflying.com`
   - `https://happyflying-web.vercel.app` (your Vercel project URL)
   - `https://*.vercel.app` (for preview deployments)
   - `https://happyflying.sanity.studio`

### 2. Connect Custom Domain in Vercel
1. In Vercel, open your `happyflying-web` project > **Settings** > **Domains**.
2. Add your custom domains:
   - `happyflying.com`
   - `www.happyflying.com`
3. Configure DNS records at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - **A Record**: `@` points to `76.76.21.21` (Vercel IP)
   - **CNAME Record**: `www` points to `cname.vercel-dns.com`
4. Wait for DNS propagation and SSL certificate issuance (usually 5–15 minutes).

---

## Phase 5: Post-Launch Verification & Testing

Perform these final sanity checks on the live production domain (`https://happyflying.com`):

### 1. Functional Testing
- [ ] **Homepage**: Verify hero carousel, featured packages, Bangalore company address, and footer.
- [ ] **Packages Listing (`/packages`)**: Test search bar, destination filter, theme pills, and sorting.
- [ ] **Package Detail (`/packages/[slug]`)**: Verify high-res images, day-by-day accordion timeline, inclusions, and pricing display.
- [ ] **Destinations (`/destinations` & `/destinations/[slug]`)**: Check destination guides and linked tour packages.
- [ ] **Direct Booking CTAs**:
  - Click **"Inquire on WhatsApp"** on mobile/desktop — verify WhatsApp opens with pre-filled package inquiry message.
  - Click **"Call Advisor"** (`+91 9900113691`) — verify phone dialer triggers.
- [ ] **Enquiry Form (`/api/enquiry`)**: Submit a test inquiry via the modal / contact page and verify successful submission.

### 2. SEO & Performance Verification
- [ ] **Sitemap**: Verify `https://happyflying.com/sitemap.xml` is valid and contains all active package & destination URLs.
- [ ] **Robots.txt**: Verify `https://happyflying.com/robots.txt` allows indexing for search engines.
- [ ] **Google Search Console**:
  - Add `https://happyflying.com` to [Google Search Console](https://search.google.com/search-console).
  - Submit `https://happyflying.com/sitemap.xml`.
- [ ] **Social Media Previews**:
  - Test package links in WhatsApp, Facebook Sharing Debugger, or Twitter Card Validator to confirm luxury OpenGraph images and descriptions render properly.

---

## 📞 Support & Maintenance Reference

- **CMS Dashboard**: [`https://happyflying.sanity.studio`](https://happyflying.sanity.studio)
- **Sanity Project ID**: `819qznh7` (Dataset: `production`)
- **Hosting Dashboard**: [vercel.com](https://vercel.com/)
- **Repository**: [github.com/ucbrijesh/happyflying](https://github.com/ucbrijesh/happyflying)
- **Headquarters**: Koramangala 5th Block, Bangalore, Karnataka
