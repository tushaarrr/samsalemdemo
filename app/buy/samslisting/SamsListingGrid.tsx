'use client';

import { useState, useMemo } from 'react';
import { PresaleListing } from '@/lib/types';
import PresaleCard from '@/components/presale/PresaleCard';

interface SamsListingGridProps {
    listings: PresaleListing[];
}

export default function SamsListingGrid({ listings }: SamsListingGridProps) {
    const [cityFilter, setCityFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const cities = useMemo(() => {
        return Array.from(new Set(listings.map((l) => l.city))).sort();
    }, [listings]);

    const propertyTypes = useMemo(() => {
        return Array.from(new Set(listings.flatMap((l) => l.property_types))).sort();
    }, [listings]);

    const filtered = useMemo(() => {
        return listings.filter((l) => {
            if (cityFilter && l.city !== cityFilter) return false;
            if (typeFilter && !l.property_types.includes(typeFilter)) return false;
            return true;
        });
    }, [listings, cityFilter, typeFilter]);

    return (
        <div>
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-8 p-5 bg-white rounded-2xl border border-border shadow-sm">
                <div className="flex-1 min-w-[160px]">
                    <label className="text-xs font-semibold tracking-widest uppercase text-muted mb-2 block">City</label>
                    <select
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-accent/50 transition-all"
                    >
                        <option value="">All Cities</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 min-w-[160px]">
                    <label className="text-xs font-semibold tracking-widest uppercase text-muted mb-2 block">Property Type</label>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-accent/50 transition-all"
                    >
                        <option value="">All Types</option>
                        {propertyTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-end pt-6">
                    <span className="text-sm text-muted font-medium">
                        {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
                    </span>
                </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">No properties found</h3>
                    <p className="text-muted font-body text-sm">Try adjusting your filters to see more results.</p>
                    <button
                        onClick={() => { setCityFilter(''); setTypeFilter(''); }}
                        className="mt-4 text-accent text-sm font-semibold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((listing) => (
                        <PresaleCard key={listing.id} listing={listing} />
                    ))}
                </div>
            )}
        </div>
    );
}
