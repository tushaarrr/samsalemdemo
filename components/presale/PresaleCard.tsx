'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PresaleListing } from '@/lib/types';

interface PresaleCardProps {
    listing: PresaleListing;
}

export default function PresaleCard({ listing }: PresaleCardProps) {
    return (
        <Link href={`/presale/${listing.slug}`} className="group block">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl overflow-hidden border border-border bg-white hover:shadow-xl transition-all duration-500 h-full flex flex-col"
            >
                {/* Hero Image */}
                <div className="relative h-[260px] overflow-hidden">
                    {listing.hero_image_url ? (
                        <Image
                            src={listing.hero_image_url}
                            alt={listing.title}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-muted text-sm">No image available</span>
                        </div>
                    )}
                    {/* Property type badges */}
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                        {listing.property_types.map((type) => (
                            <span
                                key={type}
                                className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold tracking-wide text-foreground shadow-sm"
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                    {/* Presale badge */}
                    <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full text-xs font-bold tracking-wide text-white shadow-sm">
                            Presale
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
                        {listing.title}
                    </h3>
                    <p className="text-muted text-sm mb-4">
                        {listing.city}{listing.sub_location && listing.sub_location !== listing.city ? ` · ${listing.sub_location}` : ''}
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        {listing.bedrooms && (
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-muted/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                <span className="text-xs text-muted font-medium">{listing.bedrooms} Beds</span>
                            </div>
                        )}
                        {listing.floors && (
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-muted/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                </svg>
                                <span className="text-xs text-muted font-medium">{listing.floors} Floors</span>
                            </div>
                        )}
                        {listing.total_units && (
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-muted/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                                <span className="text-xs text-muted font-medium">{listing.total_units} Units</span>
                            </div>
                        )}
                        {listing.estimated_completion && (
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-muted/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                                <span className="text-xs text-muted font-medium">{listing.estimated_completion}</span>
                            </div>
                        )}
                    </div>

                    {/* Developer */}
                    {listing.developer && (
                        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                            <span className="text-xs text-muted/70 font-medium">by {listing.developer}</span>
                            <span className="text-xs font-semibold text-accent group-hover:underline">
                                View Details →
                            </span>
                        </div>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}
