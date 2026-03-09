// MLS Search — CREA DDF RESO Web API integration
// Phase 1: Mock data (credentials not available yet)
// Phase 2: Swap for real CREA API calls — no other changes needed

// ─────────────────────────────────────────────────────────
// Types — matches CREA RESO Web API Property resource shape
// ─────────────────────────────────────────────────────────

export interface MLSListing {
    ListingKey: string;
    MlsNumber: string;
    ListPrice: number;
    StreetAddress: string;
    City: string;
    Province: string;
    PostalCode: string;
    PropertyType: 'Detached' | 'Condo' | 'Townhouse' | 'Land' | 'Commercial';
    BedroomsTotal: number;
    BathroomsTotalInteger: number;
    LivingArea: number; // sqft
    LotSizeArea: number | null;
    YearBuilt: number | null;
    PublicRemarks: string;
    ListingBrokerage: string;
    ListAgentFullName: string;
    ListOfficeName: string;
    PhotoUrl: string;
    Photos: string[];
    ListingStatus: 'Active' | 'Sold' | 'Pending';
    ListDate: string; // ISO string
    ModificationTimestamp: string; // ISO string — for CREA compliance
    Features: string[];
    Parking: string | null;
    ParkingSpaces: number | null;
}

export interface MLSSearchParams {
    city?: string;
    keyword?: string;
    propertyType?: string;
    minPrice?: string;
    maxPrice?: string;
    minBedrooms?: string;
    minBathrooms?: string;
}

// ─────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────

export function formatMLSPrice(price: number): string {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

// ─────────────────────────────────────────────────────────
// OData Query Builder — CREA RESO Web API uses OData v4
// ─────────────────────────────────────────────────────────

export function buildODataQuery(params: URLSearchParams): string {
    const filters: string[] = [];

    const city = params.get('city');
    if (city) filters.push(`City eq '${city}'`);

    const keyword = params.get('keyword');
    if (keyword) filters.push(`contains(PublicRemarks,'${keyword}') or contains(StreetAddress,'${keyword}')`);

    const propertyType = params.get('propertyType');
    if (propertyType) filters.push(`PropertyType eq '${propertyType}'`);

    const minPrice = params.get('minPrice');
    if (minPrice) filters.push(`ListPrice ge ${minPrice}`);

    const maxPrice = params.get('maxPrice');
    if (maxPrice) filters.push(`ListPrice le ${maxPrice}`);

    const minBedrooms = params.get('minBedrooms');
    if (minBedrooms) filters.push(`BedroomsTotal ge ${minBedrooms}`);

    const minBathrooms = params.get('minBathrooms');
    if (minBathrooms) filters.push(`BathroomsTotalInteger ge ${minBathrooms}`);

    const parts: string[] = [];
    if (filters.length > 0) parts.push(`$filter=${filters.join(' and ')}`);
    parts.push('$top=50');
    parts.push('$orderby=ListDate desc');

    return parts.join('&');
}

// ─────────────────────────────────────────────────────────
// Mock Data — 10 realistic Vancouver/North Shore listings
// ─────────────────────────────────────────────────────────

const MOCK_LISTINGS: MLSListing[] = [
    {
        ListingKey: 'mls-001',
        MlsNumber: 'R2924001',
        ListPrice: 2_498_000,
        StreetAddress: '1245 W 14th Avenue',
        City: 'Vancouver',
        Province: 'BC',
        PostalCode: 'V6H 1R1',
        PropertyType: 'Detached',
        BedroomsTotal: 5,
        BathroomsTotalInteger: 4,
        LivingArea: 3200,
        LotSizeArea: 5400,
        YearBuilt: 2019,
        PublicRemarks: 'Stunning custom-built home in sought-after Shaughnessy. Open concept living with gourmet kitchen, spa-like master ensuite, and beautifully landscaped south-facing backyard.',
        ListingBrokerage: 'Sincere Real Estate Services',
        ListAgentFullName: 'Sam Salem',
        ListOfficeName: 'Sincere Real Estate Services',
        PhotoUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        Photos: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        ],
        ListingStatus: 'Active',
        ListDate: '2026-02-15T00:00:00Z',
        ModificationTimestamp: '2026-03-08T14:30:00Z',
        Features: ['Hardwood Floors', 'Air Conditioning', 'Double Garage', 'Smart Home'],
        Parking: 'Double Garage',
        ParkingSpaces: 2,
    },
    {
        ListingKey: 'mls-002',
        MlsNumber: 'R2924002',
        ListPrice: 849_900,
        StreetAddress: '2505-1480 Howe Street',
        City: 'Vancouver',
        Province: 'BC',
        PostalCode: 'V6Z 0G5',
        PropertyType: 'Condo',
        BedroomsTotal: 2,
        BathroomsTotalInteger: 2,
        LivingArea: 1050,
        LotSizeArea: null,
        YearBuilt: 2021,
        PublicRemarks: 'Luxurious 25th-floor condo in the heart of Yaletown with breathtaking harbour views. Floor-to-ceiling windows, premium finishes, concierge service.',
        ListingBrokerage: 'Sincere Real Estate Services',
        ListAgentFullName: 'Sam Salem',
        ListOfficeName: 'Sincere Real Estate Services',
        PhotoUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        Photos: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        ],
        ListingStatus: 'Active',
        ListDate: '2026-02-20T00:00:00Z',
        ModificationTimestamp: '2026-03-07T10:15:00Z',
        Features: ['Concierge', 'Gym', 'Rooftop Deck', 'In-suite Laundry'],
        Parking: 'Underground',
        ParkingSpaces: 1,
    },
    {
        ListingKey: 'mls-003',
        MlsNumber: 'R2924003',
        ListPrice: 1_175_000,
        StreetAddress: '342 E 3rd Street',
        City: 'North Vancouver',
        Province: 'BC',
        PostalCode: 'V7L 1E9',
        PropertyType: 'Townhouse',
        BedroomsTotal: 3,
        BathroomsTotalInteger: 3,
        LivingArea: 1680,
        LotSizeArea: 2100,
        YearBuilt: 2022,
        PublicRemarks: 'Modern 3-level townhouse in vibrant Lower Lonsdale. Walking distance to Lonsdale Quay, SeaBus, and waterfront parks. Rooftop patio with mountain views.',
        ListingBrokerage: 'Royal LePage Sterling Realty',
        ListAgentFullName: 'Jane Park',
        ListOfficeName: 'Royal LePage Sterling Realty',
        PhotoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        Photos: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c0?w=800&q=80',
        ],
        ListingStatus: 'Active',
        ListDate: '2026-01-28T00:00:00Z',
        ModificationTimestamp: '2026-03-06T09:00:00Z',
        Features: ['Rooftop Patio', 'Mountain Views', 'Radiant Heating'],
        Parking: 'Underground',
        ParkingSpaces: 2,
    },
    {
        ListingKey: 'mls-004',
        MlsNumber: 'R2924004',
        ListPrice: 3_250_000,
        StreetAddress: '4589 Prospect Road',
        City: 'North Vancouver',
        Province: 'BC',
        PostalCode: 'V7N 3L5',
        PropertyType: 'Detached',
        BedroomsTotal: 6,
        BathroomsTotalInteger: 5,
        LivingArea: 4500,
        LotSizeArea: 8200,
        YearBuilt: 2023,
        PublicRemarks: 'Brand new luxury estate in Upper Lonsdale with panoramic city and ocean views. State-of-the-art smart home, chef\'s kitchen, wine cellar, and resort-style outdoor living.',
        ListingBrokerage: 'Engel & Völkers Vancouver',
        ListAgentFullName: 'Michael Chen',
        ListOfficeName: 'Engel & Völkers Vancouver',
        PhotoUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
        Photos: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        ],
        ListingStatus: 'Active',
        ListDate: '2026-03-01T00:00:00Z',
        ModificationTimestamp: '2026-03-08T16:45:00Z',
        Features: ['Wine Cellar', 'Home Theatre', 'Pool', 'Smart Home', 'Triple Garage'],
        Parking: 'Triple Garage',
        ParkingSpaces: 3,
    },
    {
        ListingKey: 'mls-005',
        MlsNumber: 'R2924005',
        ListPrice: 629_000,
        StreetAddress: '1108-159 W 2nd Avenue',
        City: 'Vancouver',
        Province: 'BC',
        PostalCode: 'V5Y 0L8',
        PropertyType: 'Condo',
        BedroomsTotal: 1,
        BathroomsTotalInteger: 1,
        LivingArea: 650,
        LotSizeArea: null,
        YearBuilt: 2018,
        PublicRemarks: 'Stylish 1-bedroom in the Olympic Village. Steps to seawall, transit, restaurants, and craft breweries. Ideal for young professionals or investors.',
        ListingBrokerage: 'Sutton Group-West Coast Realty',
        ListAgentFullName: 'Lisa Wong',
        ListOfficeName: 'Sutton Group-West Coast Realty',
        PhotoUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        Photos: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        ],
        ListingStatus: 'Active',
        ListDate: '2026-02-10T00:00:00Z',
        ModificationTimestamp: '2026-03-05T11:20:00Z',
        Features: ['In-suite Laundry', 'Bike Storage', 'Gym'],
        Parking: 'Underground',
        ParkingSpaces: 1,
    },
    {
        ListingKey: 'mls-006',
        MlsNumber: 'R2924006',
        ListPrice: 1_850_000,
        StreetAddress: '1922 William Street',
        City: 'Vancouver',
        Province: 'BC',
        PostalCode: 'V5L 2R6',
        PropertyType: 'Detached',
        BedroomsTotal: 4,
        BathroomsTotalInteger: 3,
        LivingArea: 2400,
        LotSizeArea: 4015,
        YearBuilt: 2015,
        PublicRemarks: 'Character home on a quiet tree-lined street in East Vancouver. Fully renovated with modern open layout, legal suite, and private backyard oasis.',
        ListingBrokerage: 'Sincere Real Estate Services',
        ListAgentFullName: 'Sam Salem',
        ListOfficeName: 'Sincere Real Estate Services',
        PhotoUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
        Photos: [
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
            'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
        ],
        ListingStatus: 'Active',
        ListDate: '2026-02-25T00:00:00Z',
        ModificationTimestamp: '2026-03-08T08:00:00Z',
        Features: ['Legal Suite', 'Renovated Kitchen', 'Backyard', 'Heated Floors'],
        Parking: 'Single Garage',
        ParkingSpaces: 1,
    },
    {
        ListingKey: 'mls-007',
        MlsNumber: 'R2924007',
        ListPrice: 975_000,
        StreetAddress: '201-141 E 3rd Street',
        City: 'North Vancouver',
        Province: 'BC',
        PostalCode: 'V7L 1E5',
        PropertyType: 'Condo',
        BedroomsTotal: 2,
        BathroomsTotalInteger: 2,
        LivingArea: 980,
        LotSizeArea: null,
        YearBuilt: 2020,
        PublicRemarks: 'Corner unit in boutique Lonsdale building with oversized patio and mountain views. Open floor plan, quartz counters, and top-tier amenities.',
        ListingBrokerage: 'Rennie & Associates Realty',
        ListAgentFullName: 'David Liu',
        ListOfficeName: 'Rennie & Associates Realty',
        PhotoUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        Photos: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        ],
        ListingStatus: 'Active',
        ListDate: '2026-03-02T00:00:00Z',
        ModificationTimestamp: '2026-03-07T14:30:00Z',
        Features: ['Corner Unit', 'Mountain Views', 'Oversized Patio', 'Concierge'],
        Parking: 'Underground',
        ParkingSpaces: 1,
    },
    {
        ListingKey: 'mls-008',
        MlsNumber: 'R2924008',
        ListPrice: 1_499_000,
        StreetAddress: '568 Marine Drive',
        City: 'West Vancouver',
        Province: 'BC',
        PostalCode: 'V7T 1A8',
        PropertyType: 'Townhouse',
        BedroomsTotal: 3,
        BathroomsTotalInteger: 2,
        LivingArea: 1850,
        LotSizeArea: 2800,
        YearBuilt: 2017,
        PublicRemarks: 'Waterfront townhouse with direct ocean access. Stunning sunsets, private rooftop terrace, and walking distance to Ambleside shops and restaurants.',
        ListingBrokerage: 'Sotheby\'s International Realty',
        ListAgentFullName: 'Sarah Kim',
        ListOfficeName: 'Sotheby\'s International Realty Canada',
        PhotoUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
        Photos: [
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
        ],
        ListingStatus: 'Active',
        ListDate: '2026-02-18T00:00:00Z',
        ModificationTimestamp: '2026-03-06T17:00:00Z',
        Features: ['Waterfront', 'Rooftop Terrace', 'Ocean Views'],
        Parking: 'Double Garage',
        ParkingSpaces: 2,
    },
    {
        ListingKey: 'mls-009',
        MlsNumber: 'R2924009',
        ListPrice: 450_000,
        StreetAddress: 'Lot 12, Keith Road',
        City: 'North Vancouver',
        Province: 'BC',
        PostalCode: 'V7K 1Y3',
        PropertyType: 'Land',
        BedroomsTotal: 0,
        BathroomsTotalInteger: 0,
        LivingArea: 0,
        LotSizeArea: 6500,
        YearBuilt: null,
        PublicRemarks: 'Rare vacant buildable lot on quiet cul-de-sac in desirable Lynn Valley. Surrounded by nature with easy access to trails, schools, and shopping.',
        ListingBrokerage: 'Macdonald Realty',
        ListAgentFullName: 'Tom Fraser',
        ListOfficeName: 'Macdonald Realty',
        PhotoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
        Photos: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
        ],
        ListingStatus: 'Active',
        ListDate: '2026-01-15T00:00:00Z',
        ModificationTimestamp: '2026-03-04T13:00:00Z',
        Features: ['Buildable', 'Cul-de-sac', 'Near Trails'],
        Parking: null,
        ParkingSpaces: null,
    },
    {
        ListingKey: 'mls-010',
        MlsNumber: 'R2924010',
        ListPrice: 1_350_000,
        StreetAddress: '4200 Rupert Street, Unit A',
        City: 'Vancouver',
        Province: 'BC',
        PostalCode: 'V5R 2J2',
        PropertyType: 'Commercial',
        BedroomsTotal: 0,
        BathroomsTotalInteger: 2,
        LivingArea: 2200,
        LotSizeArea: 3000,
        YearBuilt: 2005,
        PublicRemarks: 'Prime mixed-use commercial space on bustling Rupert Street corridor. Street-level retail with high foot traffic, currently leased with excellent cap rate.',
        ListingBrokerage: 'CBRE Limited',
        ListAgentFullName: 'Alex Patel',
        ListOfficeName: 'CBRE Limited',
        PhotoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        Photos: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        ],
        ListingStatus: 'Active',
        ListDate: '2026-02-05T00:00:00Z',
        ModificationTimestamp: '2026-03-05T09:45:00Z',
        Features: ['Street Level', 'High Foot Traffic', 'Currently Leased'],
        Parking: 'Surface',
        ParkingSpaces: 4,
    },
];

// ─────────────────────────────────────────────────────────
// Mock data with filtering
// ─────────────────────────────────────────────────────────

export function getMockListings(params: URLSearchParams): MLSListing[] {
    let results = [...MOCK_LISTINGS];

    const city = params.get('city');
    if (city) {
        results = results.filter((l) =>
            l.City.toLowerCase().includes(city.toLowerCase())
        );
    }

    const keyword = params.get('keyword');
    if (keyword) {
        const kw = keyword.toLowerCase();
        results = results.filter(
            (l) =>
                l.PublicRemarks.toLowerCase().includes(kw) ||
                l.StreetAddress.toLowerCase().includes(kw) ||
                l.City.toLowerCase().includes(kw)
        );
    }

    const propertyType = params.get('propertyType');
    if (propertyType) {
        results = results.filter((l) => l.PropertyType === propertyType);
    }

    const minPrice = params.get('minPrice');
    if (minPrice) {
        results = results.filter((l) => l.ListPrice >= Number(minPrice));
    }

    const maxPrice = params.get('maxPrice');
    if (maxPrice) {
        results = results.filter((l) => l.ListPrice <= Number(maxPrice));
    }

    const minBedrooms = params.get('minBedrooms');
    if (minBedrooms) {
        results = results.filter((l) => l.BedroomsTotal >= Number(minBedrooms));
    }

    const minBathrooms = params.get('minBathrooms');
    if (minBathrooms) {
        results = results.filter(
            (l) => l.BathroomsTotalInteger >= Number(minBathrooms)
        );
    }

    return results;
}

export function getMockListingByKey(key: string): MLSListing | undefined {
    return MOCK_LISTINGS.find((l) => l.ListingKey === key);
}
