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

export interface ListingImage {
  id: string;
  listing_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_hero: boolean;
  created_at: string;
}

export interface PresaleListing {
  id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  sub_location: string | null;
  province: string;
  listing_type: string;
  status: string;
  price: number | null;
  sold_price: number | null;
  price_on_request: boolean;
  property_types: string[];
  bedrooms: string | null;
  bathrooms: string | null;
  sqft: number | null;
  floors: number | null;
  total_units: number | null;
  listed_date: string | null;
  sold_date: string | null;
  estimated_completion: string | null;
  mls_number: string | null;
  listing_brokerage: string | null;
  developer: string | null;
  architect: string | null;
  materials: string[];
  description: string | null;
  short_description: string | null;
  features: string[];
  amenities: string[];
  nearby_facilities: string[];
  annual_taxes: number | null;
  maintenance_fee: number | null;
  maintenance_freq: string | null;
  year_built: number | null;
  parking_type: string | null;
  parking_spaces: number | null;
  hero_image_url: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  // Joined from listing_images table
  images?: ListingImage[];
}
