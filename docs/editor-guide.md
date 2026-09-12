# HappyFlying — Content Editor & CMS Guide

Welcome to the **HappyFlying Tours & Travels** Content Management System (CMS) Guide. This manual is designed for content creators, marketing executives, and tour concierges managing the HappyFlying travel website via **Sanity Studio**.

---

## 1. Accessing Sanity Studio

- **Production Studio URL**: [`https://happyflying.sanity.studio`](https://happyflying.sanity.studio) (or your custom studio URL)
- **Local Development URL**: [`http://localhost:3333`](http://localhost:3333)

### Logging In
1. Open the Studio URL in any modern web browser (Chrome, Edge, Safari, Firefox).
2. Sign in with your authorized Google, GitHub, or Sanity email account.
3. Once authenticated, you will arrive at the main **HappyFlying CMS** dashboard.

---

## 2. Studio Structure & Dashboard Navigation

The Studio sidebar is organized into three distinct operational groups:

```
HappyFlying CMS
├── WEBSITE SETTINGS & GLOBAL INFO
│   ├── ⚙️ Site Settings (Contact, Address, Logo, Navigation, Booking CTA)
│   ├── 💼 Services (Bespoke Holidays, Flight & Cruise Bookings)
│   └── 👤 Team & Concierges (Bangalore Travel Advisors)
│
├── TOUR PACKAGES & ITINERARIES
│   ├── 📦 Travel Packages (Main holiday packages & deals)
│   ├── 📍 Destinations (Andaman, Bali, Kerala, Kashmir, etc.)
│   ├── 📄 Itinerary Days (Day-by-day activity schedules)
│   ├── 🏨 Hotels & Resorts (Accommodations & Meal Plans)
│   ├── 🏄 Activities & Experiences (Water sports, Heritage walks)
│   └── 💳 Pricing & Rates (Starting rates, inclusions & exclusions)
│
└── MARKETING & ENGAGEMENT
    ├── 💬 Testimonials & Reviews (Verified customer stories)
    ├── ❓ FAQs (Frequently asked questions)
    └── 📝 Blog & Travel Stories (Articles, destination guides)
```

---

## 3. Managing Travel Packages

Travel Packages are the core offering of HappyFlying. Each package links destinations, day-by-day itineraries, hotels, activities, and custom pricing.

### Creating a New Travel Package

1. In the sidebar, click on **Travel Packages** > click the **+ Create** button (top right).
2. Complete the tabbed sections:

#### Tab 1: Overview & Media
- **Package Title**: Enter an attractive, descriptive title (e.g. *Andaman Trip — Exotic 5D/4N Island Getaway*).
- **Slug**: Click **Generate** to automatically create the web URL (e.g. `andaman-trip`).
- **Package Code**: Optional internal reference (e.g. `HF-AND-01`).
- **Destination**: Select the associated destination (e.g. *Andaman & Nicobar Islands*).
- **Package Primary Type**: Choose from *Domestic Tour*, *International Tour*, *Honeymoon & Luxury*, *Family Holiday*, etc.
- **Package Tags & Themes**: Add tags like `Beach & Backwaters`, `Snorkeling`, `Luxury Cruise`.
- **Package Status**:
  - `Active & Bookable`: Visible and bookable on the website.
  - `Draft / In Review`: Saved in CMS, hidden from public listings.
  - `Sold Out / Booking Closed`: Displays sold-out notice.
  - `Seasonal`: Displayed only during active seasonal windows.
- **Featured**: Toggle ON to highlight this package on the homepage hero carousel and spotlight grid.
- **Duration**: Specify duration in standard format (e.g. `4 N / 5 D` or `5 Days / 4 Nights`).
- **Rating & Review Count**: Customer rating score (e.g. `4.8`) and number of verified reviews (e.g. `48`).
- **Hero / Main Banner Image**:
  - Click **Upload** or choose from the Media Library.
  - **Important**: Click on the image thumbnail after uploading to adjust the **Hotspot focal point** (ensuring travelers or landmarks are centered on mobile screens).
  - Add **Alternative Text (Alt)** describing the image for Google SEO and accessibility.
- **Package Summary**: 2–4 sentences summarizing what makes this holiday special.
- **Top Trip Highlights**: Bullet points displayed in green spotlight boxes (e.g. *All Island Sightseeing by Private AC Vehicle*, *Makruzz Catamaran Cruise Included*).

#### Tab 2: Itinerary & Stays
- **Day-by-Day Itinerary**: Add references to existing **Itinerary Day** documents in sequential order (Day 1, Day 2, Day 3, etc.).
- **Included / Recommended Hotels & Resorts**: Link the specific resorts travelers stay at during this trip.
- **Included / Optional Activities**: Link activities (e.g. *Cellular Jail Light & Sound*, *Elephant Beach Snorkeling*).
- **Complete Transport & Route Transfers**: List transfer legs (e.g. *Airport to Port Blair Hotel via Private AC Sedan*, *Port Blair to Havelock via Makruzz Catamaran*).

#### Tab 3: Inclusions & Exclusions
- **Package Inclusions**: Add each included service (e.g. *Double sharing accommodation*, *Daily breakfast & dinner (MAP)*, *Airport transfers*).
- **Package Exclusions**: Clearly state what is not included (e.g. *Personal expenses*, *Lunch add-ons*, *Unscheduled cab trips*).
- **Important Travel Notes**: Guidelines such as carrying government ID (Aadhaar / Passport), ferry boarding rules, and weather contingency guidelines.
- **Cancellation & Refund Policy**: Standard cancellation timeline percentages.

#### Tab 4: Pricing & Booking
- **Active Pricing Plan**: Link a **Pricing & Rates** document or enter customized display pricing (e.g. `Call Us / Custom Quote` or `₹24,999 / person`).
- **Custom Booking CTA**: Optionally customize the WhatsApp and phone number for this specific tour.

#### Tab 5: Related & FAQs
- **Similar / Recommended Packages**: Link 2–3 related packages to cross-promote at the bottom of the page.
- **Package Specific FAQs**: Add or link questions specific to this itinerary.

#### Tab 6: SEO Settings
- **Meta Title**: Title for search engine results (under 60 characters).
- **Meta Description**: Compelling summary for Google search (150–160 characters).
- **OpenGraph Image**: Image displayed when sharing the package on WhatsApp, Facebook, or LinkedIn.

3. Click **Publish** (bottom green bar) to make your package live immediately!

---

## 4. Managing Destinations

Destinations categorize and organize tour packages for travelers.

1. Click on **Destinations** > select an existing destination or create a new one.
2. Fill in:
   - **Name**: Destination title (e.g. *Andaman & Nicobar Islands*, *Bali*, *Kerala*).
   - **Slug**: Web URL slug (e.g. `andaman`).
   - **Country & Region**: (e.g. `India`, `Bay of Bengal`).
   - **Hero Image**: High-resolution landscape image (1920x1080 recommended).
   - **Best Time to Visit**: (e.g. `October to May`).
   - **Ideal Duration**: (e.g. `5 to 7 Days`).
   - **Short Description & Highlights**: Key selling points of the destination.
   - **Related Packages**: Link packages available in this region.
3. Click **Publish**.

---

## 5. Managing Itinerary Days & Hotels

### Itinerary Days
Create standalone modular days that can be reused across different package variations (e.g., standard vs luxury versions of the same island tour):
- **Day Number**: `1`, `2`, `3`, etc.
- **Title**: (e.g. *Port Blair to Havelock Cruise & Radhanagar Beach Sunset*).
- **Location**: Island or city name.
- **Morning, Afternoon & Evening Details**: Step-by-step breakdown of the schedule.
- **Meals Included**: Check *Breakfast*, *Lunch*, and/or *Dinner*.

### Hotels & Resorts
- **Name**: Resort or hotel name.
- **Category**: (e.g. *4-Star Luxury Beachfront Resort*, *Heritage Boutique Stay*).
- **Star Rating**: `4` or `5`.
- **Amenities**: List key features (e.g. *Private Beach Access*, *Swimming Pool*, *Multi-Cuisine Restaurant*, *Free Wi-Fi*).
- **Hero Image**: Resort facade or room view.

---

## 6. Managing Site Settings (Global Company Info)

To update company-wide contact numbers, office addresses, or social media links:

1. Click on **Site Settings** in the sidebar.
2. You can modify:
   - **Company Name**: `HappyFlying Tours & Travels LLP`
   - **Tagline**: Brand slogan displayed across page headers.
   - **Phone Number**: Primary contact phone (e.g. `+91 9900113691`).
   - **WhatsApp Number**: Digits only with country code (e.g. `919900113691`) for direct WhatsApp chat routing.
   - **Email**: `operations@happyflyingtravels.com`
   - **Office Address**: `No 145, 3rd Floor, 80 Feet Road KHB Colony, 5th Block, Koramangala, Bangalore, Karnataka 560034`
   - **Social Links**: Instagram, YouTube, WhatsApp URLs.
   - **Navigation Menu**: Edit, reorder, or add header links.
3. Click **Publish**.

---

## 7. Media & SEO Best Practices for Editors

### Image Guidelines
- **Format**: Upload high-quality JPEG, PNG, or WebP images.
- **Resolution**: 
  - Package & Destination Hero Banners: `1600x1000px` to `1920x1080px`.
  - Hotel & Activity Cards: `800x600px`.
- **Focal Point Tool**: Always use Sanity's circular hotspot tool to select the subject's face or central attraction so images do not get cropped awkwardly on mobile phones.
- **Alt Text**: Always add a short description (e.g. *Couple walking on Radhanagar Beach sunset during Andaman holiday tour*).

### Publishing Checklist
Before clicking **Publish**:
- [ ] Title and duration are clearly formatted.
- [ ] At least one high-resolution Hero Image is uploaded with focal point set.
- [ ] Destination reference is linked.
- [ ] Day-by-Day itinerary days are ordered sequentially.
- [ ] Pricing and inclusions/exclusions are filled out.
- [ ] Status is set to **Active & Bookable**.
