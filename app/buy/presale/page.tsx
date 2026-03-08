import listingsData from '@/lib/data/listings.json';
import { Listing } from '@/lib/types';
import ListingGrid from '@/components/listings/ListingGrid';

export default function PresalePage() {
    const presaleListings = (listingsData as Listing[]).filter(
        (l) => l.status === 'Presale'
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-primary pt-28 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-3">
                        Presale Opportunities
                    </p>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Presale & pre-construction
                    </h1>
                    <p className="text-white/70 font-body mt-2 text-base">
                        Get early access to new construction and presale projects in North Vancouver.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <p className="text-muted font-body text-sm mb-6">
                    {presaleListings.length} {presaleListings.length === 1 ? 'project' : 'projects'} available
                </p>
                <ListingGrid listings={presaleListings} />
            </div>
        </div>
    );
}
