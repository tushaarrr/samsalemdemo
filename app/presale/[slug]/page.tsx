import { getListingBySlug, getAllListingSlugs } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ImageGallery from '@/components/presale/ImageGallery';
import Link from 'next/link';

export const revalidate = 60;

// Pre-generate all presale slugs at build time
export async function generateStaticParams() {
    const slugs = await getAllListingSlugs();
    return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata per listing
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const listing = await getListingBySlug(params.slug);
    if (!listing) return {};

    return {
        title: `${listing.title} | Presale | Sam Salem`,
        description: listing.short_description || `${listing.title} presale development in ${listing.city}`,
        openGraph: {
            title: `${listing.title} | Presale | Sam Salem`,
            description: listing.short_description || '',
            images: listing.hero_image_url ? [listing.hero_image_url] : [],
            type: 'website',
        },
    };
}

export default async function PresaleDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const listing = await getListingBySlug(params.slug);

    if (!listing) notFound();

    const images = listing.images || [];

    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumb */}
            <div className="pt-28 pb-4 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-muted">
                        <Link href="/presale" className="hover:text-accent transition-colors">
                            Presale Properties
                        </Link>
                        <span>/</span>
                        <span className="text-foreground font-medium">{listing.title}</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Column - Gallery + Details */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Image Gallery */}
                        <ImageGallery images={images} title={listing.title} />

                        {/* Title & Address */}
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {listing.property_types.map((type) => (
                                    <span
                                        key={type}
                                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold tracking-wide"
                                    >
                                        {type}
                                    </span>
                                ))}
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold tracking-wide">
                                    Presale
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-heading font-medium text-foreground mb-2 tracking-tight">
                                {listing.title}
                            </h1>
                            <p className="text-muted font-body text-lg">
                                {listing.address}
                            </p>
                        </div>

                        {/* Key Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {listing.floors && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Floors</p>
                                    <p className="text-2xl font-heading font-medium text-foreground">{listing.floors}</p>
                                </div>
                            )}
                            {listing.total_units && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Total Units</p>
                                    <p className="text-2xl font-heading font-medium text-foreground">{listing.total_units}</p>
                                </div>
                            )}
                            {listing.bedrooms && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Bedrooms</p>
                                    <p className="text-2xl font-heading font-medium text-foreground">{listing.bedrooms}</p>
                                </div>
                            )}
                            {listing.estimated_completion && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Completion</p>
                                    <p className="text-lg font-heading font-medium text-foreground">{listing.estimated_completion}</p>
                                </div>
                            )}
                        </div>

                        {/* Developer & Architect */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {listing.developer && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Developer</p>
                                    <p className="text-base font-heading font-medium text-foreground">{listing.developer}</p>
                                </div>
                            )}
                            {listing.architect && (
                                <div className="bg-white rounded-2xl border border-border p-5">
                                    <p className="text-xs text-muted font-semibold tracking-widest uppercase mb-1">Architect</p>
                                    <p className="text-base font-heading font-medium text-foreground">{listing.architect}</p>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        {listing.short_description && (
                            <div>
                                <h2 className="text-xl font-heading font-medium text-foreground mb-4">About This Development</h2>
                                <p className="text-muted font-body text-base leading-relaxed">
                                    {listing.short_description}
                                </p>
                            </div>
                        )}

                        {/* Materials */}
                        {listing.materials && listing.materials.length > 0 && (
                            <div>
                                <h2 className="text-xl font-heading font-medium text-foreground mb-4">Materials</h2>
                                <div className="flex flex-wrap gap-2">
                                    {listing.materials.map((material) => (
                                        <span
                                            key={material}
                                            className="px-4 py-2 bg-cream/50 rounded-full text-sm font-medium text-foreground border border-border"
                                        >
                                            {material}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Amenities */}
                        {listing.amenities && listing.amenities.length > 0 && (
                            <div>
                                <h2 className="text-xl font-heading font-medium text-foreground mb-4">Amenities</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {listing.amenities.map((amenity) => (
                                        <div key={amenity} className="flex items-center gap-3 py-2">
                                            <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            <span className="text-sm font-body text-foreground">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Nearby Facilities */}
                        {listing.nearby_facilities && listing.nearby_facilities.length > 0 && (
                            <div>
                                <h2 className="text-xl font-heading font-medium text-foreground mb-4">Nearby</h2>
                                <div className="flex flex-wrap gap-2">
                                    {listing.nearby_facilities.map((facility) => (
                                        <span
                                            key={facility}
                                            className="px-4 py-2 bg-primary/5 rounded-full text-sm font-medium text-foreground border border-border"
                                        >
                                            {facility}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Contact CTA (Sticky) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            {/* Contact Card */}
                            <div className="bg-primary rounded-3xl p-8 text-white">
                                <h3 className="text-xl font-heading font-medium mb-2">
                                    Interested in {listing.title}?
                                </h3>
                                <p className="text-white/70 text-sm font-body mb-6 leading-relaxed">
                                    Contact Sam Salem for exclusive presale pricing, floor plans, and VIP access to this development.
                                </p>

                                <div className="space-y-4">
                                    <a
                                        href="tel:+16044452030"
                                        className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors"
                                    >
                                        <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                            </svg>
                                        </span>
                                        <span className="text-sm font-medium">+1 (604) 445-2030</span>
                                    </a>
                                    <a
                                        href="mailto:info@sam-salem.com"
                                        className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors"
                                    >
                                        <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>
                                        </span>
                                        <span className="text-sm font-medium">info@sam-salem.com</span>
                                    </a>
                                </div>

                                <Link
                                    href="/contact"
                                    className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white font-body font-semibold rounded-full hover:bg-accent/90 transition-all duration-300 shadow-lg text-sm"
                                >
                                    Contact Sam
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-white rounded-3xl border border-border p-6">
                                <h4 className="text-sm font-heading font-semibold text-foreground mb-4">Quick Facts</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted">City</span>
                                        <span className="font-medium text-foreground">{listing.city}</span>
                                    </div>
                                    {listing.sub_location && listing.sub_location !== listing.city && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted">Area</span>
                                            <span className="font-medium text-foreground">{listing.sub_location}</span>
                                        </div>
                                    )}
                                    {listing.listing_brokerage && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted">Brokerage</span>
                                            <span className="font-medium text-foreground">{listing.listing_brokerage}</span>
                                        </div>
                                    )}
                                    {listing.price_on_request && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted">Price</span>
                                            <span className="font-medium text-accent">Contact for pricing</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
