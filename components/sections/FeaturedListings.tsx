import { getAllPresaleListings } from '@/lib/supabase';
import FeaturedListingsClient from './FeaturedListingsClient';

export default async function FeaturedListings() {
    const listings = await getAllPresaleListings();
    return <FeaturedListingsClient listings={listings} />;
}
