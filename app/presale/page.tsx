import { getAllPresaleListings } from '@/lib/presale';
import PresaleGrid from './PresaleGrid';

export const revalidate = 3600;

export const metadata = {
    title: 'Presale Properties | Sam Salem | PREC',
    description: 'Explore the latest presale and pre-construction developments across Greater Vancouver. Get early access with Sam Salem, top 1% REALTOR.',
};

export default async function PresalePage() {
    const listings = await getAllPresaleListings();

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <div className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-primary" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-background" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-white mb-4 tracking-tight">
                            Presale Properties
                        </h1>
                        <p className="text-white/70 font-body text-lg md:text-xl max-w-2xl leading-relaxed">
                            Your most reliable resource for up-to-date insights on new and upcoming real estate developments in Greater Vancouver.
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid with Client-Side Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <PresaleGrid listings={listings} />
            </div>
        </div>
    );
}
