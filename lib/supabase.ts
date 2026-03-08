import { createClient } from '@supabase/supabase-js';
import { BlogPost, PresaleListing, ListingImage } from './types';

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ============ Blog Post Functions ============

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

// ============ Presale Listing Functions ============

// Fetch all published presale listings for grid page
export async function getAllPresaleListings(): Promise<PresaleListing[]> {
    const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('listing_type', 'presale')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching presale listings:', error);
        return [];
    }

    return data as PresaleListing[];
}

// Fetch single listing by slug with images
export async function getListingBySlug(slug: string): Promise<PresaleListing | null> {
    const { data: listing, error: listingError } = await supabase
        .from('listings')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

    if (listingError || !listing) {
        console.error('Error fetching listing:', listingError);
        return null;
    }

    // Fetch images for this listing
    const { data: images, error: imagesError } = await supabase
        .from('listing_images')
        .select('*')
        .eq('listing_id', listing.id)
        .order('sort_order', { ascending: true });

    if (imagesError) {
        console.error('Error fetching listing images:', imagesError);
    }

    return {
        ...listing,
        images: (images as ListingImage[]) || [],
    } as PresaleListing;
}

// Fetch all presale slugs for generateStaticParams
export async function getAllListingSlugs(): Promise<string[]> {
    const { data, error } = await supabase
        .from('listings')
        .select('slug')
        .eq('listing_type', 'presale')
        .eq('status', 'published');

    if (error) return [];
    return data.map((listing) => listing.slug);
}
