'use client';

interface FilterState {
    propertyType: string;
    minPrice: string;
    maxPrice: string;
    beds: string;
    area: string;
}

interface ListingFiltersProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    areas: string[];
}

export default function ListingFilters({ filters, onFilterChange, areas }: ListingFiltersProps) {
    const update = (key: keyof FilterState, value: string) => {
        onFilterChange({ ...filters, [key]: value });
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Property Type */}
                <div>
                    <label className="block text-xs font-body font-medium text-muted mb-1.5">
                        Property Type
                    </label>
                    <select
                        value={filters.propertyType}
                        onChange={(e) => update('propertyType', e.target.value)}
                        className="w-full px-3 py-2.5 bg-background border border-gray-200 rounded-lg text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    >
                        <option value="">All Types</option>
                        <option value="Detached">Detached</option>
                        <option value="Condo">Condo</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Land">Land</option>
                    </select>
                </div>

                {/* Min Price */}
                <div>
                    <label className="block text-xs font-body font-medium text-muted mb-1.5">
                        Min Price
                    </label>
                    <input
                        type="number"
                        placeholder="No min"
                        value={filters.minPrice}
                        onChange={(e) => update('minPrice', e.target.value)}
                        className="w-full px-3 py-2.5 bg-background border border-gray-200 rounded-lg text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                </div>

                {/* Max Price */}
                <div>
                    <label className="block text-xs font-body font-medium text-muted mb-1.5">
                        Max Price
                    </label>
                    <input
                        type="number"
                        placeholder="No max"
                        value={filters.maxPrice}
                        onChange={(e) => update('maxPrice', e.target.value)}
                        className="w-full px-3 py-2.5 bg-background border border-gray-200 rounded-lg text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                </div>

                {/* Bedrooms */}
                <div>
                    <label className="block text-xs font-body font-medium text-muted mb-1.5">
                        Bedrooms
                    </label>
                    <select
                        value={filters.beds}
                        onChange={(e) => update('beds', e.target.value)}
                        className="w-full px-3 py-2.5 bg-background border border-gray-200 rounded-lg text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                    </select>
                </div>

                {/* Area */}
                <div>
                    <label className="block text-xs font-body font-medium text-muted mb-1.5">
                        Area
                    </label>
                    <select
                        value={filters.area}
                        onChange={(e) => update('area', e.target.value)}
                        className="w-full px-3 py-2.5 bg-background border border-gray-200 rounded-lg text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    >
                        <option value="">All Areas</option>
                        {areas.map((area) => (
                            <option key={area} value={area}>
                                {area}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
