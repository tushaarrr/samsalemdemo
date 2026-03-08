import listingsData from './data/listings.json';
import { Listing } from './types';

export async function getAllListings(): Promise<Listing[]> {
    return listingsData as Listing[];
}

export async function getListingById(id: string): Promise<Listing | null> {
    const all = await getAllListings();
    return all.find(l => l.id === id) ?? null;
}

export async function getSoldListings(): Promise<Listing[]> {
    const all = await getAllListings();
    return all.filter(l => l.status === 'Sold');
}

export async function searchListings(filters: {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    propertyType?: string;
    area?: string;
}): Promise<Listing[]> {
    const all = await getAllListings();
    return all.filter(l => {
        if (filters.city && !l.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
        if (filters.area && l.area !== filters.area) return false;
        if (filters.minPrice && l.price < filters.minPrice) return false;
        if (filters.maxPrice && l.price > filters.maxPrice) return false;
        if (filters.beds && l.bedrooms < filters.beds) return false;
        if (filters.propertyType && l.propertyType !== filters.propertyType) return false;
        return true;
    });
}
