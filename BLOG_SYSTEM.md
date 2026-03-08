# Blog System — Navid Realtor Website

## Overview

Build a complete blog system for the Navid realtor website using Supabase as the database and Next.js Server Components for rendering. No CMS needed. Writers write in Google Docs, export HTML, paste into Supabase, set status to published — blog appears automatically.

---

## System Architecture

```
Google Docs
    │
    │ export HTML → paste into Supabase
    ▼
Supabase (Postgres)
blog_posts table
    │
    │ fetch via Supabase anon client
    ▼
Next.js Server Components (ISR, revalidate = 60)
    │
    │ render pages
    ▼
Vercel
    │
    ▼
Users / Search Engines
```

---

## Step 1 — Supabase Setup

### Create table: `blog_posts`

Run this SQL in Supabase SQL editor:

```sql
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content_html TEXT,
  hero_image_url TEXT,
  author TEXT DEFAULT 'Navid',
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);
```

### RLS Policy (Row Level Security)

Run this in Supabase SQL editor:

```sql
-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow anon users to read only published posts
CREATE POLICY "Public can read published posts"
ON blog_posts
FOR SELECT
TO anon
USING (status = 'published');
```

This means:
- Anon frontend users can only see `status = 'published'` rows
- Draft posts are invisible to the frontend
- No service role key needed on the frontend ever

### Insert sample data

```sql
INSERT INTO blog_posts (
  title, slug, excerpt, content_html, hero_image_url,
  author, tags, status, meta_title, meta_description, published_at
) VALUES
(
  'North Vancouver Real Estate Market Update — Spring 2026',
  'north-vancouver-market-update-spring-2026',
  'Home prices in North Vancouver remain strong heading into spring. Here is what buyers and sellers need to know right now.',
  '<h2>Market Overview</h2><p>The North Vancouver real estate market continues to show resilience in early 2026. Despite higher interest rates compared to the pandemic era, demand from local buyers remains steady, particularly for detached homes in Lynn Valley and Edgemont.</p><h2>Price Trends</h2><p>The benchmark price for a detached home in North Vancouver sits at approximately $2.1M as of March 2026, representing a modest 3% increase year over year. Condos and townhomes have seen slightly stronger growth at 5-6%, driven by first-time buyers and downsizers.</p><h2>What This Means for Buyers</h2><p>If you are considering buying in North Vancouver this spring, acting early in the season gives you more choice before competition heats up in April and May. Properties priced correctly are still receiving multiple offers within the first week.</p><h2>What This Means for Sellers</h2><p>Presentation and pricing remain critical. Homes that are professionally staged and priced at market value are selling in 7-14 days. Overpriced listings are sitting for 30+ days and often require price reductions.</p>',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
  'Navid',
  ARRAY['Market Updates', 'North Vancouver', 'Buying Tips'],
  'published',
  'North Vancouver Real Estate Market Update Spring 2026 | Navid',
  'Home prices in North Vancouver remain strong heading into spring 2026. Key insights for buyers and sellers from Navid, top 1% RE/MAX realtor.',
  NOW()
),
(
  'Top 5 Neighbourhoods to Buy in North Vancouver in 2026',
  'top-5-neighbourhoods-north-vancouver-2026',
  'From family-friendly Lynn Valley to the waterfront charm of Lonsdale, here are the top areas to consider when buying in North Vancouver.',
  '<h2>1. Lynn Valley</h2><p>Lynn Valley remains one of the most sought-after neighbourhoods for families. With top-rated schools, proximity to Lynn Canyon, and a strong community feel, it consistently ranks as one of the best places to raise a family on the North Shore. Detached homes range from $1.8M to $3M+.</p><h2>2. Lonsdale</h2><p>Lower Lonsdale has transformed dramatically over the past decade. The waterfront area now features restaurants, the Shipyards Night Market, and excellent Seabus access to downtown Vancouver. Condos here are popular with young professionals.</p><h2>3. Deep Cove</h2><p>If you want a slower pace of life without leaving Metro Vancouver, Deep Cove delivers. This picturesque village on the Indian Arm is perfect for outdoor enthusiasts. Limited inventory keeps prices high but demand consistent.</p><h2>4. Edgemont Village</h2><p>Edgemont offers a charming village atmosphere with boutique shops and cafes. The surrounding streets have some of the best family homes in North Vancouver, with large lots and mountain views.</p><h2>5. Seymour</h2><p>Upper Seymour is ideal for buyers who prioritize space and nature. Larger lots, newer homes, and easy access to Mt. Seymour make this area attractive for outdoor families who need more square footage for their budget.</p>',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200',
  'Navid',
  ARRAY['Neighbourhood Guide', 'Buying Tips', 'North Vancouver'],
  'published',
  'Top 5 Neighbourhoods to Buy in North Vancouver 2026 | Navid',
  'Discover the top neighbourhoods to buy a home in North Vancouver in 2026. Expert guide from Navid, top 1% RE/MAX realtor on the North Shore.',
  NOW() - INTERVAL '7 days'
),
(
  'How to Sell Your North Vancouver Home for Top Dollar',
  'how-to-sell-north-vancouver-home-top-dollar',
  'Selling your home in North Vancouver? These preparation and pricing strategies will help you maximize your sale price.',
  '<h2>Start with Professional Staging</h2><p>The first impression buyers get is online — through photos. Professionally staged homes photograph significantly better and sell for more. Studies consistently show staged homes sell faster and at higher prices than empty or cluttered ones.</p><h2>Price It Right from Day One</h2><p>Overpricing is the single biggest mistake sellers make. A home priced 5-10% over market value sits on the market, gets fewer showings, and often sells for less than it would have if priced correctly from the start. Buyers notice how long a home has been listed.</p><h2>Fix the Small Things</h2><p>Fresh paint, repaired fixtures, clean carpets, and a tidy yard go a long way. Buyers notice deferred maintenance and use it to justify lower offers. A $500 investment in minor repairs can return $5,000+ at the negotiating table.</p><h2>Marketing Matters</h2><p>Professional photography, video walkthroughs, and strong online presence across Realtor.ca, social media, and email campaigns ensure your home reaches every qualified buyer in the market.</p><h2>Work with the Right Agent</h2><p>An experienced North Vancouver agent knows the hyper-local market — which streets command a premium, which buyers are active, and how to negotiate firmly on your behalf.</p>',
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200',
  'Navid',
  ARRAY['Selling Tips', 'North Vancouver'],
  'published',
  'How to Sell Your North Vancouver Home for Top Dollar | Navid',
  'Expert tips on staging, pricing, and marketing your North Vancouver home for the best possible sale price from Navid, RE/MAX top realtor.',
  NOW() - INTERVAL '14 days'
),
(
  'First-Time Buyer Guide: Buying a Home in North Vancouver',
  'first-time-buyer-guide-north-vancouver',
  'Everything first-time buyers need to know about purchasing a home in North Vancouver, from mortgage pre-approval to closing day.',
  '<h2>Step 1: Get Pre-Approved</h2><p>Before you start looking at homes, get a mortgage pre-approval. This tells you exactly how much you can borrow, makes you a serious buyer in the eyes of sellers, and speeds up the process when you find the right home.</p><h2>Step 2: Define Your Must-Haves</h2><p>List your non-negotiables — number of bedrooms, school catchment, commute requirements — separately from your nice-to-haves. North Vancouver offers everything from waterfront condos to mountain-view detached homes, so knowing your priorities saves time.</p><h2>Step 3: Understand the Costs</h2><p>Beyond the purchase price, budget for: property transfer tax (1% on first $200K, 2% on $200K-$2M), home inspection ($400-600), legal fees ($1,500-2,500), and moving costs. First-time buyers may qualify for the BC PTT exemption on homes under $835,000.</p><h2>Step 4: Make a Strong Offer</h2><p>In a competitive market, your offer needs to be clean and compelling. Work with your agent on appropriate subjects, deposit amount, and completion date to make your offer stand out without unnecessary risk.</p><h2>Step 5: Complete Due Diligence</h2><p>Once your offer is accepted, use the subject removal period to complete your home inspection, finalize your mortgage, and review the title. Do not skip the inspection even in a hot market.</p>',
  'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200',
  'Navid',
  ARRAY['Buying Tips', 'First-Time Buyers'],
  'published',
  'First-Time Buyer Guide North Vancouver | Navid',
  'Complete step-by-step guide for first-time home buyers in North Vancouver. From pre-approval to closing day with Navid, top North Shore realtor.',
  NOW() - INTERVAL '21 days'
);
```

---

## Step 2 — Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

NEVER use or expose `SUPABASE_SERVICE_ROLE_KEY` on the frontend. The anon key with RLS is sufficient.

---

## Step 3 — Supabase Client

```typescript
// /lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

Install the package:
```bash
npm install @supabase/supabase-js
```

---

## Step 4 — TypeScript Interface

```typescript
// Add to /lib/types.ts

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content_html: string | null;
  hero_image_url: string | null;
  author: string;
  tags: string[];
  status: 'draft' | 'published';
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}
```

---

## Step 5 — Data Fetching Functions

```typescript
// Add to /lib/supabase.ts

import { BlogPost } from './types';

// Fetch all published posts for blog index page
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('title, slug, excerpt, hero_image_url, author, tags, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data as BlogPost[];
}

// Fetch single post by slug for blog detail page
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data as BlogPost;
}

// Fetch latest 3 posts for homepage
export async function getLatestBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('title, slug, excerpt, hero_image_url, published_at, tags')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }

  return data as BlogPost[];
}

// Fetch all slugs for generateStaticParams
export async function getAllBlogSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published');

  if (error) return [];
  return data.map((post) => post.slug);
}
```

---

## Step 6 — Folder Structure

```
/app
  /news
    /articles
      /page.tsx          → blog index (all posts)
      /[slug]
        /page.tsx        → single blog post

/components
  /BlogCard.tsx          → card used in grid and homepage
  /BlogGrid.tsx          → grid of BlogCards
  /LatestBlogs.tsx       → homepage section (latest 3)
```

---

## Step 7 — Blog Index Page

```typescript
// /app/news/articles/page.tsx

import { getAllBlogPosts } from '@/lib/supabase';
import BlogCard from '@/components/BlogCard';

export const revalidate = 60;

export const metadata = {
  title: 'Real Estate Articles and Market Insights | Navid',
  description: 'Read the latest North Vancouver real estate market updates, buying tips, and neighbourhood guides from Navid.',
};

export default async function ArticlesPage() {
  const posts = await getAllBlogPosts();

  return (
    <main>
      {/* Page Hero */}
      <section className="bg-navy text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-serif font-bold mb-3">Articles and Market Insights</h1>
        <p className="text-lg text-white/70 max-w-xl mx-auto">
          Stay informed with the latest North Vancouver real estate updates, tips, and neighbourhood guides.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No articles published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
```

---

## Step 8 — Blog Post Page

```typescript
// /app/news/articles/[slug]/page.tsx

import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 60;

// Pre-generate all published slugs at build time
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata per post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || '',
    alternates: {
      canonical: post.canonical_url || `https://yourdomain.com/news/articles/${post.slug}`,
    },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
      images: post.hero_image_url ? [post.hero_image_url] : [],
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) notFound();

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <main>
      {/* Hero Image */}
      {post.hero_image_url && (
        <div className="w-full h-[400px] overflow-hidden">
          <img
            src={post.hero_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold uppercase tracking-wide text-brand bg-brand/10 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>

        {/* Content HTML from Supabase */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-brand"
          dangerouslySetInnerHTML={{ __html: post.content_html || '' }}
        />

        {/* Share Buttons */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">Share this article</p>
          <div className="flex gap-3">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://yourdomain.com/news/articles/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              LinkedIn
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Copy Link
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
```

---

## Step 9 — BlogCard Component

```typescript
// /components/BlogCard.tsx

import Link from 'next/link';
import { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: Pick<BlogPost, 'title' | 'slug' | 'excerpt' | 'hero_image_url' | 'published_at' | 'tags'>;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <Link href={`/news/articles/${post.slug}`} className="group block">
      <div className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="overflow-hidden h-48">
          {post.hero_image_url ? (
            <img
              src={post.hero_image_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Category Tag */}
          {post.tags?.[0] && (
            <span className="text-xs font-semibold uppercase tracking-wide text-brand mb-2">
              {post.tags[0]}
            </span>
          )}

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 leading-snug mb-2 group-hover:text-brand transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm text-gray-500 line-clamp-2 flex-1">{post.excerpt}</p>
          )}

          {/* Date and Read More */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">{formattedDate}</span>
            <span className="text-xs font-semibold text-brand group-hover:underline">Read more</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
```

---

## Step 10 — LatestBlogs Component (Homepage)

```typescript
// /components/LatestBlogs.tsx

import { getLatestBlogPosts } from '@/lib/supabase';
import BlogCard from './BlogCard';
import Link from 'next/link';

export default async function LatestBlogs() {
  const posts = await getLatestBlogPosts();

  if (posts.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-2">
            From the Blog
          </p>
          <h2 className="text-3xl font-serif font-bold text-gray-900">
            Market insights and tips
          </h2>
        </div>
        <Link
          href="/news/articles"
          className="text-sm font-semibold text-brand hover:underline hidden md:block"
        >
          Read All Articles
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link href="/news/articles" className="text-sm font-semibold text-brand hover:underline">
          Read All Articles
        </Link>
      </div>
    </section>
  );
}
```

Use on homepage:
```typescript
// /app/page.tsx
import LatestBlogs from '@/components/LatestBlogs';

// Inside homepage JSX:
<LatestBlogs />
```

---

## Step 11 — Tailwind Prose Plugin (for content_html rendering)

Install:
```bash
npm install @tailwindcss/typography
```

Add to `tailwind.config.ts`:
```typescript
plugins: [require('@tailwindcss/typography')],
```

This makes `prose` class work properly for the blog content HTML.

---

## Content Publishing Workflow

When Navid or his team wants to publish a new article:

```
1. Write in Google Docs
2. File → Download → Web Page (.html)
3. Copy the <body> HTML content
4. Open Supabase Table Editor → blog_posts
5. Create new row:
   - title: "Article Title"
   - slug: "article-title-lowercase-hyphenated"
   - excerpt: "One sentence summary"
   - content_html: paste HTML here
   - hero_image_url: paste image URL
   - tags: {Market Updates, Buying Tips} (array format)
   - status: published
   - published_at: now()
6. Save → Article appears on website within 60 seconds
```

No CMS, no deployment, no code changes needed.

---

## Security Rules

NEVER expose or use `SUPABASE_SERVICE_ROLE_KEY` on the frontend.

Frontend only uses:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

RLS policy ensures anon users can only read `status = 'published'` rows. Drafts are never exposed.

---

## Performance

```typescript
export const revalidate = 60;
```

Every blog page and the index page uses ISR with 60-second revalidation. This means:
- Pages are statically cached on Vercel
- Automatically revalidated every 60 seconds
- No manual rebuild needed when new posts are published
- Fast page loads + SEO-friendly

---

## Future Additions (do not build now, just note for later)

```
/news/articles?page=2          → Pagination
/news/articles/tag/buying-tips → Tag filter pages
/sitemap.xml                   → Auto sitemap including blog slugs
/rss.xml                       → RSS feed
/admin/blog                    → Optional admin dashboard with TipTap editor
```
