import { getAllOfficeListings } from '@/lib/office-listings';
import OfficeListingGrid from './OfficeListingGrid';

export const revalidate = 3600;

export const metadata = {
    title: 'Office Listings | Sam Salem | PREC',
    description: 'Browse office listings from Sincerealty. Contact Sam Salem for exclusive access to the best properties in Greater Vancouver.',
};

export default async function OfficeListingPage() {
    const listings = await getAllOfficeListings();

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <div className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-primary" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-background" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-white mb-4 tracking-tight">
                            Office Listings
                        </h1>
                        <p className="text-white/70 font-body text-lg md:text-xl max-w-2xl leading-relaxed">
                            Explore properties listed by our office at Sincerealty. Contact Sam Salem for personalized guidance on any listing.
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid with Client-Side Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <OfficeListingGrid listings={listings} />
            </div>
        </div>
    );
}
