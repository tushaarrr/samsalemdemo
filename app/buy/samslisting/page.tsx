import { getAllPresaleListings } from '@/lib/supabase';
import SamsListingGrid from './SamsListingGrid';

export const revalidate = 60;

export const metadata = {
    title: "Sam's Listings | Sam Salem | PREC",
    description: "Browse Sam Salem's current presale properties across Greater Vancouver. Top 1% REALTOR.",
};

export default async function SamSalemsListingPage() {
    const listings = await getAllPresaleListings();

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-primary pt-28 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-3">
                        Sam Salem&apos;s Listings
                    </p>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Properties for sale
                    </h1>
                    <p className="text-white/70 font-body mt-2 text-base">
                        Browse Sam Salem&apos;s current listings across Greater Vancouver.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <SamsListingGrid listings={listings} />
            </div>
        </div>
    );
}
