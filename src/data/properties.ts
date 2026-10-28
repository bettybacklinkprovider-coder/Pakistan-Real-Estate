import belAirPavilionImg from '../assets/images/estate_glass_pavilion_bel_air_1793172297737.jpg';
import manhattanPenthouseImg from '../assets/images/estate_sky_penthouse_manhattan_1793172299027.jpg';
import aspenMonolithImg from '../assets/images/estate_alpine_monolith_aspen_1793172300727.jpg';

export type PropertyCategory = 'Commercial' | 'Residential Villa' | 'Penthouse' | 'Plot & Registry';

export interface AgencyGalleryPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: 'Exterior' | 'By owner';
  dateAdded: string;
}

export const AGENCY_GALLERY_PHOTOS: AgencyGalleryPhoto[] = [
  {
    id: 'photo-board-emblem',
    src: '/assets/aistudio/unnamed__2__994f3d74.jpg',
    title: 'Board of Pakistan Real Estate — Founded 2013',
    subtitle: 'Official Brand Emblem · Pak Arab Housing Society Phase-2, Lahore',
    category: 'By owner',
    dateAdded: 'Featured Cover'
  },
  {
    id: 'photo-urdu-office-front',
    src: '/assets/aistudio/unnamed_2f9b1b0e.jpg',
    title: 'پاکستان اسٹیٹ (Pakistan Real Estate) — Main Office Frontage',
    subtitle: '16-F1 Commercial, Pak Arab F1 Phase-2, Lahore 54100',
    category: 'Exterior',
    dateAdded: 'Verified Exterior'
  },
  {
    id: 'photo-glass-storefront',
    src: '/assets/aistudio/unnamed__1__b0fb7505.jpg',
    title: '16-F1 Commercial Glass Storefront & Client Lounge',
    subtitle: 'Open 24 Hours · Direct Principal Meeting Desk',
    category: 'Exterior',
    dateAdded: 'Street View Exterior'
  },
  {
    id: 'photo-modern-villa',
    src: '/assets/aistudio/unnamed__1__ab9655bc.png',
    title: 'Signature Modernist Cantilever Villa Showcase',
    subtitle: 'Executive Residential Portfolio · By Owner',
    category: 'By owner',
    dateAdded: 'Portfolio Highlight'
  },
  {
    id: 'photo-sunset-development',
    src: '/assets/aistudio/unnamed_ebf30475.png',
    title: 'Twilight Master-Planned Horizon & Prime Sector View',
    subtitle: 'Featured Investment Mandate · By Owner',
    category: 'By owner',
    dateAdded: 'By Owner Gallery'
  }
];

export interface RoomDimension {
  name: string;
  level: string;
  dimensions: string;
  sqFt: number;
  materialNote: string;
}

export interface PropertyListing {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  coordinates: string;
  category: PropertyCategory;
  status: 'DIRECT MANDATE' | 'PRIME COMMERCIAL' | 'LDA APPROVED';
  price: number; // in PKR Crore for filtering
  priceFormatted: string;
  pricePerSqFt: number;
  beds: number;
  baths: number;
  sqFt: number;
  acreage: string;
  yearCompleted: number;
  architect: string;
  lightingDesigner: string;
  image: string;
  photoCategory: 'Exterior' | 'By owner';
  featuredHero?: boolean;
  summary: string;
  architecturalNarrative: string;
  materials: string[];
  PrivateAmenities: string[];
  rooms: RoomDimension[];
  annualPropertyTax: number;
  annualMaintenance: number;
  securityProtocol: string;
  solarAcousticRating: string;
}

export const AGENCY_INFO = {
  name: 'Pakistan Real Estate',
  urduName: 'پاکستان ریئل اسٹیٹ',
  founded: 'Founded 2013',
  rating: '5.0',
  reviewCount: 5,
  category: 'Real estate agency',
  address: '16-F1 Commercial, Pak Arab F1 Phase-2 of Pak Arab Housing Society, Lahore, 54100, Pakistan',
  shortAddress: '16-F1 Commercial, Pak Arab F1 Phase-2, Lahore',
  corridor: 'Ferozepur Road Corridor · Pak Arab Housing Society Phase-2',
  hours: 'Open 24 hours',
  phone: '+92 303 5427423',
  phoneTel: '+923035427423',
  plusCode: 'C8FR+G8 Lahore, Pakistan',
  postalCode: '54100',
  boardBannerImage: '/assets/aistudio/unnamed__2__994f3d74.jpg',
  officeExteriorUrduImage: '/assets/aistudio/unnamed_2f9b1b0e.jpg',
  officeStorefrontImage: '/assets/aistudio/unnamed__1__b0fb7505.jpg'
};

export interface ClientReview {
  id: string;
  author: string;
  badge: string;
  stats: string;
  timeAgo: string;
  monthsAgoNumeric: number;
  rating: number;
  title?: string;
  comment: string;
  likes: number;
}

export const INITIAL_REVIEWS: ClientReview[] = [
  {
    id: 'rev-gull-sons',
    author: 'Gull Sons',
    badge: 'Local Guide',
    stats: '16 reviews · 52 photos',
    timeAgo: '9 months ago',
    monthsAgoNumeric: 9,
    rating: 5,
    title: 'Really Good Agent',
    comment: 'Really Good Agent — MashaAllah 💯 trusted. Transparent documentation and smooth registry transfer in Pak Arab Housing Society.',
    likes: 14
  },
  {
    id: 'rev-muhammad-nasir',
    author: 'Main Muhammad Nasir',
    badge: 'Verified Client',
    stats: '3 reviews · 24 photos',
    timeAgo: '3 months ago',
    monthsAgoNumeric: 3,
    rating: 5,
    title: 'Best on Ferozepur Road',
    comment: 'Pakistan Real Estate is one the best agent on Ferozpur Road Lahore Pak Arab Society.',
    likes: 11
  },
  {
    id: 'rev-zain-kiyani',
    author: 'Zain Kiyani',
    badge: 'Verified Client',
    stats: '5 reviews · 1 photo',
    timeAgo: '2 months ago',
    monthsAgoNumeric: 2,
    rating: 5,
    title: 'Excellent Services',
    comment: 'Excellent services 👍🏻 Always available 24 hours at 16-F1 Commercial Phase-2 for genuine plot and house deals.',
    likes: 9
  },
  {
    id: 'rev-tariq-mehmood',
    author: 'Tariq Mehmood',
    badge: 'Pak Arab Resident',
    stats: '8 reviews · 6 photos',
    timeAgo: '1 month ago',
    monthsAgoNumeric: 1,
    rating: 5,
    title: 'Genuine F1 Phase-2 Dealership',
    comment: 'Purchased our 10 Marla corner residence in F1 Block through Pakistan Real Estate. Complete verification and fair commission.',
    likes: 7
  },
  {
    id: 'rev-usman-ali',
    author: 'Usman Ali Butt',
    badge: 'Commercial Investor',
    stats: '12 reviews · 9 photos',
    timeAgo: '4 months ago',
    monthsAgoNumeric: 4,
    rating: 5,
    title: 'Trusted Commercial Advisors',
    comment: 'Best consultancy for 16-F1 Commercial plots and rental yields on main Ferozepur Road Lahore.',
    likes: 8
  }
];

export interface NearbyAgency {
  name: string;
  rating: string;
  reviews: number;
  type: string;
  locationNote: string;
}

export const NEARBY_COMPETITORS: NearbyAgency[] = [
  {
    name: 'Pakistan Real Estate (پاکستان ریئل اسٹیٹ)',
    rating: '5.0',
    reviews: 5,
    type: 'Real estate agency · Flagship Office',
    locationNote: '16-F1 Commercial, Pak Arab F1 Phase-2 (Open 24 Hours)'
  },
  {
    name: 'Pak Arab Real Estate and Builders',
    rating: '5.0',
    reviews: 10,
    type: 'Real estate agency',
    locationNote: 'Pak Arab Housing Society, Lahore'
  },
  {
    name: '92 Real Estate F 1 Block Pak Arab Society Ferozpur Road Lahore',
    rating: '5.0',
    reviews: 1,
    type: 'Real estate agency',
    locationNote: 'F1 Block, Pak Arab Society, Ferozepur Road'
  },
  {
    name: 'Pakistan Estate',
    rating: '4.7',
    reviews: 15,
    type: 'Real estate agent',
    locationNote: 'Lahore Metropolitan Corridor'
  },
  {
    name: 'Allah Hoo Estate',
    rating: '3.9',
    reviews: 8,
    type: 'Real estate agency',
    locationNote: 'Pak Arab Corridor, Lahore'
  },
  {
    name: "Royal Realtor's",
    rating: '3.2',
    reviews: 12,
    type: 'Real estate consultant',
    locationNote: 'South Lahore Corridor'
  }
];

export const PROPERTIES: PropertyListing[] = [
  {
    id: 'pak-arab-f1-signature-villa',
    title: 'The F1 Phase-2 Signature Corner Residence',
    subtitle: 'Modernist 1-Kanal Architectural Villa · Pak Arab Housing Society',
    location: 'Block F1 Phase-2, Pak Arab Society, Ferozepur Road, Lahore',
    coordinates: 'C8FR+G8 Lahore · 54100',
    category: 'Residential Villa',
    status: 'DIRECT MANDATE',
    price: 8.5,
    priceFormatted: 'PKR 8.50 Crore',
    pricePerSqFt: 15450,
    beds: 6,
    baths: 7,
    sqFt: 5500,
    acreage: '1 Kanal (4,500 Sq Ft Plot)',
    yearCompleted: 2026,
    architect: 'Board of Pakistan Real Estate Builders',
    lightingDesigner: 'Nocturne Architectural Lighting Lahore',
    image: '/assets/aistudio/unnamed__1__ab9655bc.png',
    photoCategory: 'By owner',
    featuredHero: true,
    summary:
      'Located moments from 16-F1 Commercial in Pak Arab Housing Society Phase-2, this brand-new designer villa combines Spanish porcelain, double-glazed aluminum curtain walls, and a 15kW hybrid solar microgrid.',
    architecturalNarrative:
      'Represented exclusively by Pakistan Real Estate (16-F1 Commercial), this residence sits on a wide 50-foot carpeted boulevard in F1 Phase-2. Engineered with A-grade steel reinforcement, imported Grohe sanitary fittings, and warm twilight facade illumination, it offers immediate possession and clear LDA/Society transfer.',
    materials: [
      'Imported Spanish matte porcelain slab flooring',
      'Double-glazed thermal-break aluminum windows',
      'Solid seasoned Ashwood doors with magnetic locks',
      'Travertine and charred-slate nocturnal facade cladding'
    ],
    PrivateAmenities: [
      '15kW Net-Metered Hybrid Solar System installed',
      'Double-height main reception lobby with chandelier',
      'Two independent Italian modular kitchens (Main + Dirty Kitchen)',
      '24/7 gated Pak Arab Phase-2 security & underground wiring'
    ],
    rooms: [
      {
        name: 'Double-Height Grand Drawing & Dining Salon',
        level: 'Ground Floor',
        dimensions: '38\' × 22\'',
        sqFt: 836,
        materialNote: 'Spanish porcelain slabs, concealed warm LED coves'
      },
      {
        name: 'Master Sovereign Suite & Walk-in Wardrobe',
        level: 'First Floor Front',
        dimensions: '26\' × 20\'',
        sqFt: 520,
        materialNote: 'Private terrace overlooking F1 Phase-2 park'
      },
      {
        name: 'Chef Kitchen & Pantry Atelier',
        level: 'Ground Floor',
        dimensions: '22\' × 16\'',
        sqFt: 352,
        materialNote: 'Quartz countertops, built-in hood and oven tower'
      },
      {
        name: 'Rooftop Nocturnal Majlis & BBQ Terrace',
        level: 'Roof Level',
        dimensions: '34\' × 24\'',
        sqFt: 816,
        materialNote: 'Weatherproof pergola and Ferozepur skyline views'
      }
    ],
    annualPropertyTax: 240000,
    annualMaintenance: 180000,
    securityProtocol: 'Gated F1 Phase-2 biometric & CCTV patrol + smart lock',
    solarAcousticRating: '15kW Solar Net-Metered · Double-Glazed Soundproof'
  },
  {
    id: '16-f1-commercial-plaza',
    title: '16-F1 Commercial Office & Showroom Complex',
    subtitle: 'Pakistan Real Estate (پاکستان اسٹیٹ) Flagship Commercial Block',
    location: '16-F1 Commercial, Pak Arab F1 Phase-2, Lahore 54100',
    coordinates: 'C8FR+G8 Lahore · Main Boulevard',
    category: 'Commercial',
    status: 'PRIME COMMERCIAL',
    price: 11.2,
    priceFormatted: 'PKR 11.20 Crore',
    pricePerSqFt: 21538,
    beds: 4,
    baths: 6,
    sqFt: 5200,
    acreage: '8 Marla Commercial (Facing Parking)',
    yearCompleted: 2025,
    architect: 'Pak Arab Commercial Design Studio',
    lightingDesigner: 'Architectural Facade Systems',
    image: '/assets/aistudio/unnamed_2f9b1b0e.jpg',
    photoCategory: 'Exterior',
    summary:
      'Situated right in the heart of 16-F1 Commercial, Pak Arab Phase-2 on main Ferozepur Road access. Features wide glass commercial frontage, dedicated parking apron, and 24-hour commercial zoning.',
    architecturalNarrative:
      'Featuring a structural tempered-glass commercial facade and wide customer parking bay in F1 Phase-2, this commercial asset delivers immediate rental income potential and direct registry transfer verified by Pakistan Real Estate.',
    materials: [
      '12mm tempered curtain-wall commercial glass storefront',
      'Granite staircase and high-traffic commercial porcelain',
      '3-phase independent commercial WAPDA electricity',
      'Reinforced concrete frame with commercial parking apron'
    ],
    PrivateAmenities: [
      'Direct access from Main Ferozepur Road & Ring Road',
      'Dedicated front commercial parking bay',
      'Pre-wired fiber-optic & corporate office layout',
      '24-hour commercial activity zone in F1 Phase-2'
    ],
    rooms: [
      {
        name: 'Ground Floor Glass-Front Commercial Hall',
        level: 'Ground Level',
        dimensions: '45\' × 35\'',
        sqFt: 1575,
        materialNote: 'Frameless glass entrance, high visibility signage'
      },
      {
        name: 'Corporate Executive Floor Plate',
        level: 'First Floor',
        dimensions: '45\' × 35\'',
        sqFt: 1575,
        materialNote: 'Open-plan column-free commercial hall'
      }
    ],
    annualPropertyTax: 360000,
    annualMaintenance: 210000,
    securityProtocol: '24/7 F1 Commercial security + CCTV monitoring',
    solarAcousticRating: '20kW Commercial Solar Ready · Tempered Glass'
  },
  {
    id: 'al-hussain-pak-arab-commercial-front',
    title: 'F1 Phase-2 Glass Boulevard Commercial Showroom',
    subtitle: 'Double-Bay Commercial Retail & Executive Office Unit',
    location: 'F1 Commercial Broadway, Pak Arab Society, Lahore',
    coordinates: 'C8FR+G8 Lahore · 54100',
    category: 'Commercial',
    status: 'DIRECT MANDATE',
    price: 7.25,
    priceFormatted: 'PKR 7.25 Crore',
    pricePerSqFt: 19078,
    beds: 2,
    baths: 4,
    sqFt: 3800,
    acreage: '6 Marla Commercial Corner',
    yearCompleted: 2025,
    architect: 'Pakistan Real Estate Commercial Wing',
    lightingDesigner: 'Daylight & LED Commercial Grid',
    image: '/assets/aistudio/unnamed__1__b0fb7505.jpg',
    photoCategory: 'Exterior',
    summary:
      'Turnkey double-bay glass showroom and real estate corporate suite in Pak Arab Housing Society Phase-2, featuring tiled executive interiors, false ceiling lighting, and direct boulevard parking.',
    architecturalNarrative:
      'Constructed for high-visibility corporate operations, property consultancies, or bank sub-branches along the Ferozepur Road corridor. Ready for immediate move-in with clear society NOC.',
    materials: [
      'Full-height dual-bay aluminum & tempered glass storefront',
      'Commercial-grade ivory vitrified floor tiles',
      'Gypsum acoustic false ceiling with recessed panel lights',
      'Weather-resistant exterior fascia signboard frame'
    ],
    PrivateAmenities: [
      'Dual glass entrance bays for separate client & executive access',
      'Wide front paved parking area in F1 Commercial',
      'Immediate possession with verified society transfer',
      '24-hour security and street lighting'
    ],
    rooms: [
      {
        name: 'Main Client Reception & Dealership Hall',
        level: 'Ground Floor',
        dimensions: '36\' × 28\'',
        sqFt: 1008,
        materialNote: 'Twin glass bays with full natural daylight'
      },
      {
        name: 'Private Principal Meeting Chamber',
        level: 'Ground Rear Suite',
        dimensions: '24\' × 18\'',
        sqFt: 432,
        materialNote: 'Acoustic glass partition and document safe'
      }
    ],
    annualPropertyTax: 185000,
    annualMaintenance: 120000,
    securityProtocol: '24/7 Commercial Block Patrol',
    solarAcousticRating: 'Inverter HVAC Ready · Double Bay Glazing'
  },
  {
    id: 'pak-arab-sunset-horizon-enclave',
    title: 'Sunset Horizon Executive Enclave & Plots',
    subtitle: 'Master-Planned Luxury Villas & Possession Plots',
    location: 'Phase-2 Extension Corridor, Pak Arab Society, Lahore',
    coordinates: 'C8FR+G8 Lahore · 54100',
    category: 'Plot & Registry',
    status: 'LDA APPROVED',
    price: 5.4,
    priceFormatted: 'PKR 5.40 Crore',
    pricePerSqFt: 12000,
    beds: 5,
    baths: 6,
    sqFt: 4500,
    acreage: '1 Kanal Possession Plot & Villa Option',
    yearCompleted: 2026,
    architect: 'Board of Pakistan Real Estate Masterplan',
    lightingDesigner: 'Boulevard LED Infrastructure',
    image: '/assets/aistudio/unnamed_ebf30475.png',
    photoCategory: 'By owner',
    summary:
      'Prime sunset-facing residential plots and turnkey modernist residences with wide carpeted roads, underground electricity, and direct Ferozepur Road connectivity.',
    architecturalNarrative:
      'Curated by the Board of Pakistan Real Estate (Founded 2013) for long-term capital growth and serene family living. Includes complete soil-test reports, LDA-approved layout plans, and biometric registry transfer.',
    materials: [
      'Underground 3-phase electrification and fiber conduit',
      '80-foot main boulevard and 40-foot internal carpeted streets',
      'Modernist flat-roof cantilevered architectural elevations',
      'Landscaped green belts and dedicated family parks'
    ],
    PrivateAmenities: [
      '100% clear title verified by Pakistan Real Estate (16-F1)',
      'Direct face-to-face meeting with plot/villa owner',
      '5 minutes from Ferozepur Road Metro & Ring Road interchange',
      '24/7 armed security and boundary wall enclosure'
    ],
    rooms: [
      {
        name: 'Ground Floor Open-Plan Living & Terrace',
        level: 'Ground Level',
        dimensions: '42\' × 28\'',
        sqFt: 1176,
        materialNote: 'Panoramic sunset exposure and infinity lawn edge'
      },
      {
        name: 'First Floor Horizon Master Wing',
        level: 'First Floor',
        dimensions: '34\' × 24\'',
        sqFt: 816,
        materialNote: 'Cantilevered glass balcony overlooking green belt'
      }
    ],
    annualPropertyTax: 110000,
    annualMaintenance: 90000,
    securityProtocol: '24/7 Gated Perimeter & CCTV',
    solarAcousticRating: 'Full West/South Solar Orientation'
  },
  {
    id: 'pak-arab-10-marla-designer',
    title: 'Villa Al-Noor · F1 Phase-2 Nocturnal Residence',
    subtitle: '10-Marla Contemporary Residence Near 16-F1 Commercial',
    location: 'F1 Block Phase-2, Pak Arab Housing Society, Lahore',
    coordinates: 'C8FR+G8 Lahore · 54100',
    category: 'Residential Villa',
    status: 'DIRECT MANDATE',
    price: 4.35,
    priceFormatted: 'PKR 4.35 Crore',
    pricePerSqFt: 12985,
    beds: 5,
    baths: 6,
    sqFt: 3350,
    acreage: '10 Marla (35\' × 65\' Prime Plot)',
    yearCompleted: 2026,
    architect: 'Pakistan Real Estate Design Wing',
    lightingDesigner: 'Luminaire Studio Lahore',
    image: belAirPavilionImg,
    photoCategory: 'Exterior',
    summary:
      'Walking distance from Masjid, family park, and 16-F1 Commercial market in Pak Arab Phase-2. Built with solid brick masonry, 5 master-sized bedrooms, and a 3-car porch.',
    architecturalNarrative:
      'Every stage of construction—from damp-proof course to roof insulation—is documented with photo evidence at our 16-F1 Commercial office. Features warm nocturnal exterior uplighting and separate ground/first floor electric meters.',
    materials: [
      'A+ Grade Prime Awal bricks & DG Cement structure',
      'Popular/Master sanitary fittings with 10-year warranty',
      'CNC-cut solid wooden main entrance door',
      'Imported granite stair treads with warm step LEDs'
    ],
    PrivateAmenities: [
      'Walking distance to 16-F1 Commercial & Grand Mosque',
      'Dual independent gate layout suitable for two families',
      '30-foot wide carpeted street with underground utilities',
      'Complete Sui Gas, WAPDA & Water supply connections'
    ],
    rooms: [
      {
        name: 'Ground Floor TV Lounge & Drawing Room',
        level: 'Ground Floor',
        dimensions: '28\' × 18\'',
        sqFt: 504,
        materialNote: 'Media wall with fluted wooden panels'
      },
      {
        name: 'First Floor Master Suite & Terrace',
        level: 'First Floor',
        dimensions: '20\' × 16\'',
        sqFt: 320,
        materialNote: 'Attached rain-shower bath and front balcony'
      }
    ],
    annualPropertyTax: 95000,
    annualMaintenance: 72000,
    securityProtocol: 'Pak Arab Phase-2 barrier gate + CCTV street coverage',
    solarAcousticRating: '10kW Solar Hybrid Pre-Wired · Thermal Roof'
  },
  {
    id: 'ferozepur-sky-penthouse',
    title: 'The Sovereign Gulberg & Ferozepur Sky Duplex',
    subtitle: 'Double-Height Luxury Duplex Overlooking Lahore Canal',
    location: 'Main Ferozepur Road / Gulberg Link, Lahore',
    coordinates: '31.4697° N · 74.3436° E',
    category: 'Penthouse',
    status: 'LDA APPROVED',
    price: 6.4,
    priceFormatted: 'PKR 6.40 Crore',
    pricePerSqFt: 16842,
    beds: 4,
    baths: 5,
    sqFt: 3800,
    acreage: '900 Sq Ft Private Sky Terrace',
    yearCompleted: 2025,
    architect: 'Studio Arshad & Associates',
    lightingDesigner: 'Nocturne Interior Systems',
    image: manhattanPenthouseImg,
    photoCategory: 'By owner',
    summary:
      'A double-height luxury penthouse connecting the Ferozepur Road Metro corridor with Gulberg, featuring floor-to-ceiling nocturnal skyline views and private elevator lobby access.',
    architecturalNarrative:
      'Designed for overseas Pakistani families and corporate executives seeking turnkey security, the duplex combines a 22-foot travertine fireplace wall, smart home automation, and 24-hour concierge management.',
    materials: [
      'Book-matched Turkish travertine feature wall',
      'Engineered smoked oak bedroom flooring',
      'Sound-insulated double-glazed sky curtain wall',
      'Imported Italian marble vanity countertops'
    ],
    PrivateAmenities: [
      'RFID card-controlled private elevator vestibule',
      '2 reserved basement parking bays with EV chargers',
      '24/7 standby power generation with zero switchover delay',
      'Private landscaped sky terrace with nocturnal lighting'
    ],
    rooms: [
      {
        name: 'Double-Height Sky Lounge & Dining Room',
        level: 'Lower Penthouse Level',
        dimensions: '36\' × 24\'',
        sqFt: 864,
        materialNote: '22-foot ceiling clearance, panoramic city views'
      },
      {
        name: 'Primary Sky Suite & Dressing Gallery',
        level: 'Upper Mezzanine Level',
        dimensions: '28\' × 20\'',
        sqFt: 560,
        materialNote: 'Overlooks lounge with acoustic glass balustrade'
      }
    ],
    annualPropertyTax: 195000,
    annualMaintenance: 240000,
    securityProtocol: '24/7 lobby security detail + biometric lift lock',
    solarAcousticRating: 'STC 60 Acoustic Glazing · Central VRF HVAC'
  }
];

export interface AdvisoryCapability {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  spanClass: string;
}

export const ADVISORY_CAPABILITIES: AdvisoryCapability[] = [
  {
    index: '01.',
    title: 'Pak Arab F1 Phase-2 & Ferozepur Road Specialists',
    subtitle: 'Board of Pakistan Real Estate (Founded 2013) · Open 24 Hours',
    description:
      'Operating round-the-clock from 16-F1 Commercial, Pak Arab F1 Phase-2, Lahore (54100), Pakistan Real Estate provides face-to-face principal meetings, genuine residential & commercial files, and transparent biometric registry transfers.',
    metricLabel: 'Google Maps Client Trust Rating',
    metricValue: '5.0 ★ (100% Five-Star Verified Reviews)',
    spanClass: 'lg:col-span-7'
  },
  {
    index: '02.',
    title: '100% Title Verification & LDA / Society NOC Audit',
    subtitle: 'Zero-Dispute Documentation Guarantee',
    description:
      'Every residential house, commercial plaza, and plot in Pak Arab Housing Society undergoes complete society ledger verification, Fard/Registry check, and structural inspection before we present it to buyers.',
    metricLabel: 'Office Availability & Support',
    metricValue: 'Open 24 Hours · +92 303 5427423',
    spanClass: 'lg:col-span-5'
  },
  {
    index: '03.',
    title: 'Turnkey Construction, Commercial Leasing & Overseas Desk',
    subtitle: 'C8FR+G8 Lahore · End-to-End Real Estate Management',
    description:
      'For overseas Pakistanis and local investors, we manage everything from plot acquisition in F1 Block Phase-2 to A+ grey/finishing construction and high-yield commercial tenant placement on Ferozepur Road.',
    metricLabel: 'Location Plus Code & Postal Zone',
    metricValue: 'C8FR+G8 Lahore · Postal Code 54100',
    spanClass: 'lg:col-span-12'
  }
];
