import Link from 'next/link';
import listingsData from '@/lib/data/listings.json';
import { Listing } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface Props {
    params: { id: string };
}

export function generateStaticParams() {
    return (listingsData as Listing[]).map((listing) => ({ id: listing.id }));
}

export default function ListingDetailPage({ params }: Props) {
    const listing = (listingsData as Listing[]).find((l) => l.id === params.id);
    if (!listing) notFound();

    const statusColors: Record<string, string> = {
        'For Sale': 'bg-accent text-white',
        Sold: 'bg-red-500 text-white',
        Presale: 'bg-primary text-white',
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Image */}
            <div className="relative h-[50vh] md:h-[60vh]">
                <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="max-w-7xl mx-auto">
                        <span
                            className={`inline-block px-4 py-1.5 text-sm font-body font-semibold rounded-full mb-3 ${statusColors[listing.status] || 'bg-gray-500 text-white'
                                }`}
                        >
                            {listing.status}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                            {formatPrice(listing.price)}
                        </h1>
                        <p className="text-white/90 font-body text-lg">{listing.address}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: 'Bedrooms', value: listing.bedrooms },
                                { label: 'Bathrooms', value: listing.bathrooms },
                                { label: 'Sq Ft', value: listing.sqft.toLocaleString() },
                                { label: 'Type', value: listing.propertyType },
                            ].map((stat) => (
                                <div key={stat.label} className="p-4 bg-white rounded-xl border border-gray-100 text-center">
                                    <p className="text-2xl font-heading font-bold text-primary">{stat.value}</p>
                                    <p className="text-muted font-body text-xs mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-heading font-bold text-foreground mb-4">About this property</h2>
                            <p className="text-muted font-body text-base leading-relaxed">{listing.description}</p>
                        </div>

                        {/* Features */}
                        <div>
                            <h2 className="text-xl font-heading font-bold text-foreground mb-4">Features</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {listing.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                                        <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-foreground font-body text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image Gallery */}
                        {listing.images.length > 1 && (
                            <div>
                                <h2 className="text-xl font-heading font-bold text-foreground mb-4">Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {listing.images.slice(1).map((img, i) => (
                                        <div key={i} className="h-48 rounded-xl overflow-hidden">
                                            <img src={img} alt={`View ${i + 2}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
                            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                                Interested in this property?
                            </h3>
                            <p className="text-muted font-body text-sm mb-6">
                                Contact Sam Salem for a private showing or more information.
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="tel:+16045551234"
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-body font-semibold rounded-full hover:bg-accent-dark transition-all duration-300"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                    Call Sam Salem
                                </a>
                                <a
                                    href="mailto:sam@samsalemrealty.ca"
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-body font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                    Email Sam Salem
                                </a>
                            </div>
                        </div>

                        {/* Details Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                                Property Details
                            </h3>
                            <dl className="space-y-3">
                                {[
                                    { label: 'Type', value: listing.propertyType },
                                    { label: 'Area', value: listing.area },
                                    { label: 'Brokerage', value: listing.listingBrokerage },
                                    { label: 'MLS #', value: listing.mlsId || 'N/A' },
                                ].map((detail) => (
                                    <div key={detail.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                        <dt className="text-muted font-body text-sm">{detail.label}</dt>
                                        <dd className="text-foreground font-body text-sm font-medium">{detail.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-10">
                    <Link
                        href="/buy/samslisting"
                        className="inline-flex items-center text-primary font-body font-medium hover:text-accent transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Back to all listings
                    </Link>
                </div>
            </div>
        </div>
    );
}
