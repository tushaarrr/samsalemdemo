# Navid Realtor Website — Project Context for Claude Code / Cursor

## Project Summary

You are building a complete real estate website for **Navid**, a top-performing realtor in **North Vancouver, BC, Canada**. He is a RE/MAX agent ranked in the top 1% of Greater Vancouver realtors by sales volume.

**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS  
**Design ref:** https://realisting.framer.website/  
**Listing data:** Static JSON (hardcoded sample listings — MLS API integration comes later when client provides CREA DDF credentials)

Build everything completely. No placeholders, no "coming soon" pages. Every page must be fully functional and visually complete.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Charts | Recharts |
| Maps | Google Maps Embed API |
| Deployment | Vercel |

---

## Site Map

```
Home
Buy
  ├── Navid's Listings
  ├── MLS Search
  └── Request for Presale
Sell
  ├── Sold by Navid
  └── Request for Sale
News
  ├── Market Trends
  └── Articles
Tools
Areas We Serve
About Navid
Contact Navid
```

---

## Folder Structure

```
/app
  /page.tsx
  /buy
    /navidslisting/page.tsx
    /navidslisting/[id]/page.tsx
    /mls-search/page.tsx
    /request-presale/page.tsx
  /sell
    /sold/page.tsx
    /request-sale/page.tsx
  /news
    /market-trends/page.tsx
    /articles/page.tsx
    /articles/[slug]/page.tsx
  /tools/page.tsx
  /areas/page.tsx
  /areas/[slug]/page.tsx
  /about/page.tsx
  /contact/page.tsx
  /api
    /contact/route.ts
    /listings/route.ts

/components
  /layout
    Navbar.tsx
    Footer.tsx
    MobileMenu.tsx
  /ui
    Button.tsx
    Badge.tsx
    Input.tsx
  /listings
    ListingCard.tsx
    ListingGrid.tsx
    ListingFilters.tsx
  /sections
    HeroSection.tsx
    StatsSection.tsx
    AchievementsSection.tsx
    FeaturedListings.tsx
    AreasGrid.tsx
    WhyNavid.tsx
    Testimonials.tsx
    LatestNews.tsx
    ContactCTA.tsx

/lib
  types.ts
  listings.ts
  utils.ts
  /data
    listings.json
    sold.json
    testimonials.json
    areas.json
    articles.json

/public
  /images/
```

---

## TypeScript Interfaces

```typescript
// /lib/types.ts

export interface Listing {
  id: string;
  title: string;
  address: string;
  city: string;
  area: string;
  price: number;
  status: 'For Sale' | 'Sold' | 'Presale';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: 'Detached' | 'Condo' | 'Townhouse' | 'Duplex' | 'Land';
  images: string[];
  description: string;
  features: string[];
  listedDate: string;
  soldDate: string | null;
  mlsId: string | null;
  listingBrokerage: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  photo?: string;
  source: string;
}

export interface Area {
  slug: string;
  name: string;
  description: string;
  image: string;
  avgPrice: number;
  highlights: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Buying Tips' | 'Selling Tips' | 'Market Updates' | 'Neighbourhood Guide';
  date: string;
  image: string;
  author: string;
}
```

---

## Static Data

### listings.json — 8 sample North Vancouver listings
Mix: 3 For Sale, 2 Presale, 3 Sold. Price range $900K to $3.5M.
Areas: Lynn Valley, Lonsdale, Deep Cove, West Vancouver, Edgemont.
Use Unsplash image URLs (luxury homes, mountain views).

```json
[
  {
    "id": "listing-001",
    "title": "Stunning 4BR Family Home with Mountain Views",
    "address": "123 Mountain View Rd, North Vancouver, BC",
    "city": "North Vancouver",
    "area": "Lynn Valley",
    "price": 2150000,
    "status": "For Sale",
    "bedrooms": 4,
    "bathrooms": 3,
    "sqft": 2850,
    "propertyType": "Detached",
    "images": ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"],
    "description": "Exceptional family home in the heart of Lynn Valley with panoramic mountain views...",
    "features": ["Mountain views", "Hardwood floors", "Updated kitchen", "Double garage", "Large backyard"],
    "listedDate": "2026-02-10",
    "soldDate": null,
    "mlsId": null,
    "listingBrokerage": "RE/MAX Navid Realty"
  }
]
```

Generate 7 more with realistic variety.

### testimonials.json — 5 reviews
Realistic names, North Vancouver locations, 5-star ratings, source "RankMyAgent".

### areas.json — 7 areas
Lynn Valley, Lonsdale, Deep Cove, West Vancouver, Edgemont, Seymour, North Vancouver Central.
Each: slug, name, description, Unsplash image URL, avgPrice, 3-4 highlights.

### articles.json — 6 articles
2 per category: Buying Tips, Market Updates, Neighbourhood Guide.
Each: slug, title, excerpt, full content (3-4 paragraphs), date, Unsplash image URL.

---

## Data Layer

```typescript
// /lib/listings.ts
import listingsData from './data/listings.json';
import { Listing } from './types';

export async function getAllListings(): Promise<Listing[]> {
  return listingsData as Listing[];
}

export async function getListingById(id: string): Promise<Listing | null> {
  const all = await getAllListings();
  return all.find(l => l.id === id) ?? null;
}

export async function getSoldListings(): Promise<Listing[]> {
  const all = await getAllListings();
  return all.filter(l => l.status === 'Sold');
}

export async function searchListings(filters: {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  propertyType?: string;
  area?: string;
}): Promise<Listing[]> {
  const all = await getAllListings();
  return all.filter(l => {
    if (filters.city && !l.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.area && l.area !== filters.area) return false;
    if (filters.minPrice && l.price < filters.minPrice) return false;
    if (filters.maxPrice && l.price > filters.maxPrice) return false;
    if (filters.beds && l.bedrooms < filters.beds) return false;
    if (filters.propertyType && l.propertyType !== filters.propertyType) return false;
    return true;
  });
}
```

```typescript
// /lib/utils.ts
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(price);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

---

## Navid's Content

### Stats
- Happy Clients: 265+
- Awards Won: 15
- Team Members: 8
- Years of Experience: 8+

### Achievement Bullets
- Top 1% Greater Vancouver Realtor by sales volume
- Top 100 RE/MAX Canada
- More than 90 solo deals in a single year
- Over 100 verified 5-star reviews on RankMyAgent
- Strong repeat and referral business from North Shore clients

### Hero Tagline
"Proven results for North Vancouver buyers and sellers"

### Supporting Paragraph
"When you choose a real estate agent in North Vancouver, you are trusting someone with years of savings and equity. Navid's record reflects that responsibility."

---

## Part 1 — Foundation

- Next.js 14 project init with TypeScript and Tailwind
- Create all files in `/lib/types.ts`, `/lib/utils.ts`, `/lib/listings.ts`
- Create all JSON data files with realistic sample data
- Set up `.env.local` with `RESEND_API_KEY` and `NEXT_PUBLIC_GOOGLE_MAPS_KEY`
- Install dependencies: `react-hook-form`, `zod`, `@hookform/resolvers`, `recharts`, `resend`

**Done when:** `getAllListings()` returns typed data correctly, utils functions work.

---

## Part 2 — Layout

### Navbar
- Logo left: "Navid | RE/MAX" text (placeholder)
- Desktop nav: Home, Buy (dropdown), Sell (dropdown), News (dropdown), Tools, Areas We Serve, About Navid
- Dropdowns on hover, smooth animation
- Sticky on scroll with backdrop blur background
- "Contact Navid" CTA button on right (brand color, filled)
- Mobile: hamburger icon, full-screen slide-in overlay with all links and sub-links

### Footer
- 4 columns: Logo + tagline | Quick Links | Areas | Contact Info
- Social icons: Instagram, Facebook, LinkedIn
- Bottom bar: copyright text
- CREA disclaimer: "The trademarks MLS, Multiple Listing Service and the associated logos are owned by CREA."

**Done when:** Sticky navbar works, all dropdown menus open and close, mobile menu fully functional.

---

## Part 3 — Home Page

### Hero
- Full-width, min-height 100vh, background image with dark overlay
- Headline: "Proven results for North Vancouver buyers and sellers"
- Sub-headline: "Top 1% Greater Vancouver Realtor. 265+ happy clients. 8+ years of trusted service."
- CTA buttons: "View Listings" (primary) and "Get a Free Valuation" (secondary/outlined)
- Scroll-down arrow at bottom

### Stats
- 4 cards in a row (responsive to 2x2 on mobile)
- Numbers animate/count up when scrolled into view
- 265+ Happy Clients / 15 Awards Won / 8 Team Members / 8+ Years Experience

### Achievements
- Two-column: left has heading + supporting paragraph, right has 5 bullet points with check icons

### Featured Listings
- Heading: "Take a peek at the hottest homes"
- 4 listing cards (For Sale only)
- "View All Listings" button

### Areas We Serve
- Heading: "Where you live matters"
- 6 area cards in a grid: image, area name, avg price
- Links to /areas/[slug]

### Why Choose Navid
- Two-column comparison: "Other Agents" (gray) vs "Navid" (brand color)
- 8 comparison rows

### Testimonials
- 4 testimonial cards in a carousel with prev/next arrows and dot indicators
- Each card: quote, name, location, 5-star rating, "RankMyAgent" badge

### Latest News
- 3 article preview cards: image, category badge, date, title, excerpt
- "Read All Articles" CTA

### Contact CTA Strip
- Dark/brand color background, full width
- "Ready to buy or sell in North Vancouver?" heading
- Phone, email, CTA button side by side

**Done when:** All 9 sections visible on homepage, fully responsive.

---

## Part 4 — Listings Pages

### /buy/navidslisting
- Filter bar: Property Type, Price Range (min/max inputs), Bedrooms (select), Area (select)
- Client-side filtering on static data, updates instantly on change
- Count: "X properties found"
- 3-col desktop / 2-col tablet / 1-col mobile grid
- ListingCard: image, address, beds/baths/sqft row, price, status badge
- Empty state with icon if no results

### /buy/navidslisting/[id]
- Image gallery: large main image + clickable thumbnails
- Left: title, address, price (large), status badge, specs grid (beds/baths/sqft/type)
- Right: sticky "Contact Navid" sidebar card with phone, email, and 3-field mini form
- Full description paragraph
- Features list with bullet/check icons
- Google Maps embed (search by address string)
- "Similar Listings" at bottom: 3 cards filtered by same area, excluding current listing

### /buy/mls-search
- Same filter bar and results grid
- Static data same as Navid's Listings
- Footer note: "Live MLS data powered by CREA DDF coming soon."
- CREA disclaimer line

**Done when:** Filters update results instantly, detail page loads for every listing, similar listings show.

---

## Part 5 — Sell and Form Pages

### /sell/sold
- Heading: "Sold by Navid"
- Stats strip: total sold count, total value sold
- Grid of sold cards: image, address, sold price, sold date, area badge
- Brief paragraph: Navid's selling track record

### /sell/request-sale
- Heading: "Thinking of selling? Let's talk."
- Form: Name, Email, Phone, Property Address, Estimated Value (dropdown: Under $1M / $1M-$2M / $2M-$3M / $3M+), Timeline (dropdown: ASAP / 1-3 months / 3-6 months / Just exploring), Message
- Zod validation on all fields
- Submit calls /api/contact
- Success state: "Thank you! Navid will be in touch within 2 hours."

### /buy/request-presale
- Heading: "Interested in presale properties?"
- Form: Name, Email, Phone, Areas of Interest (checkboxes: Lynn Valley, Lonsdale, Deep Cove, West Vancouver, Edgemont), Budget Range (dropdown), Message
- Same submit and success flow

**Done when:** Both forms validate, submit, show success state, API route sends email.

---

## Part 6 — News and Articles

### /news/market-trends
- Heading: "North Vancouver Real Estate Market"
- 3 stat cards: Avg Home Price ($1.85M) / Active Listings (142) / Months of Inventory (2.3)
- Recharts line chart: avg price trend over 12 months (hardcoded monthly data)
- Recharts bar chart: monthly sales volume (hardcoded data)
- Commentary paragraph below each chart

### /news/articles
- Tab filters: All / Buying Tips / Selling Tips / Market Updates / Neighbourhood Guide
- Article cards: image, category badge, date, title, excerpt, "Read More" link
- Clicking filter tab updates grid (client-side)

### /news/articles/[slug]
- Header image full width
- Title, date, category badge, author
- Article content in readable prose layout (max-width centered)
- Sidebar: "Contact Navid" card + 3 related article links
- Share buttons: copy link, LinkedIn

**Done when:** Filter tabs work, all 6 articles render, individual pages load by slug.

---

## Part 7 — Tools, Areas, About, Contact

### /tools
**Mortgage Calculator**
- Inputs: Property Price, Down Payment ($), Annual Interest Rate (%), Amortization Period (years: 10/15/20/25/30)
- Live output (no submit needed, recalculates on any input change):
  - Monthly Payment
  - Total Interest Paid
  - Total Amount Paid
- Use standard Canadian mortgage formula: M = P[r(1+r)^n]/[(1+r)^n-1]

**BC Land Transfer Tax Calculator**
- Input: Purchase Price
- Output: LTT amount (BC formula: 1% on first $200K, 2% on $200K-$2M, 3% on $2M+)
- First-time buyer rebate checkbox (rebate up to $8,000)

### /areas
- Grid of all 7 area cards with image, name, avg price, 3 highlights
- Each card links to /areas/[slug]

### /areas/[slug]
- Hero image for the area
- Area name, description
- Avg price callout card
- Highlights list
- Filtered listing cards (listings from that area, max 4)
- CTA strip: "Ask Navid about [Area Name]" with link to /contact

### /about
- Hero: large photo placeholder (Unsplash professional headshot) + headline
- Bio: realistic content for a 8+ year North Vancouver RE/MAX realtor
- Same animated stat counters (265+ / 15 / 8 / 8+)
- 5 achievement bullets
- Awards section: RE/MAX awards cards
- "100+ verified 5-star reviews" callout with RankMyAgent mention
- Team section: 8 cards with placeholder names, roles, Unsplash photos
- 3 featured testimonial cards

### /contact
- Left column: form (Name, Email, Phone, Inquiry Type dropdown: Buying / Selling / General, Message)
- Right column: phone number, email, office address (North Vancouver), social icons, "Navid typically responds within 2 hours"
- Google Maps embed below (North Vancouver area)
- Form submits via /api/contact, shows success state

**Done when:** Mortgage calculator computes correctly on input change, LTT calculator works, all area pages load, about and contact pages complete.

---

## Part 8 — API Routes

### /app/api/contact/route.ts
```typescript
// POST: { name, email, phone, inquiryType?, message, formType? }
// Send email to Navid using Resend
// Return: { success: true } or { error: string }
// Handle errors gracefully, never crash
```

### /app/api/listings/route.ts
```typescript
// GET with optional query params: city, minPrice, maxPrice, beds, propertyType, area
// Return filtered listings from static data
// This route will later proxy to CREA RESO API — keep the filter logic reusable
```

**Done when:** Both routes work, contact form sends email, listings route returns filtered data.

---

## Part 9 — Polish and Deploy

- Test every page at 375px (mobile), 768px (tablet), 1440px (desktop)
- Scroll animations: fade-in/slide-up on sections using Intersection Observer
- Stat counter animation on Home and About
- Loading spinners on all form submit buttons
- Error messages on form validation failures
- Meta tags on all pages: `<title>`, `<meta name="description">`, Open Graph tags
- Favicon (use a simple text-based SVG placeholder)
- `robots.txt` and `sitemap.xml`
- Deploy to Vercel

---

## Design Guidelines

- **Tone:** Premium, trustworthy, clean. North Vancouver is a luxury market.
- **Primary color:** Deep navy (#0F2942) or deep teal (#1A3C5E)
- **Accent:** Warm gold (#C9A84C) for highlights and CTAs
- **Background:** Off-white (#F8F8F6)
- **Text:** Near-black (#1A1A1A) for headings, medium gray (#555) for body
- **Typography:** Playfair Display for headings (serif, premium feel), DM Sans for body text
- **Images:** All Unsplash URLs. Use luxury homes, mountain views, North Vancouver skyline.
- **Animations:** Subtle entrance animations. Stat counters animate on scroll. Smooth hover transitions.
- **No em dashes anywhere in copy.** Use commas or rewrite.
- **Mobile-first** on all components.

---

## Environment Variables

```env
RESEND_API_KEY=your_key_here
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key_here
```

---

## Build Order — Follow Exactly

| Part | What | Start When |
|---|---|---|
| Part 1 | Foundation (types, data, utils) | First |
| Part 2 | Layout (Navbar, Footer) | After Part 1 |
| Part 3 | Home Page | After Part 2 |
| Part 4 | Listings Pages | After Part 3 |
| Part 5 | Sell and Form Pages | After Part 4 |
| Part 6 | News and Articles | After Part 5 |
| Part 7 | Tools, Areas, About, Contact | After Part 6 |
| Part 8 | API Routes | After Part 7 |
| Part 9 | Polish and Deploy | Last |

Complete each part fully before starting the next.
