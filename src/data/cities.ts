export interface EVCity {
  id: string; // URL slug e.g. "pune", "mumbai"
  name: string;
  state: string;
  centersCount: number;
  areas: string[];
  heroImage: string;
  status: "active" | "launching_soon";
  description: string;
  contactNumber?: string;
}

export const INITIAL_CITIES: EVCity[] = [
  {
    id: "pune",
    name: "Pune",
    state: "Maharashtra",
    centersCount: 5,
    areas: ["Aundh", "Baner", "Bhavdhan", "Camp Pune Railway", "Hadapsar", "Kalyani Nagar", "Katraj", "Kharadi"],
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&auto=format&fit=crop&q=80",
    status: "active",
    description: "5+ Certified multi-brand EV diagnostic hubs operational across Aundh, Baner, Kalyani Nagar & Kharadi.",
    contactNumber: "+91 98765 43210",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    centersCount: 8,
    areas: ["Andheri West", "Bandra West", "Powai", "Thane West", "Navi Mumbai (Vashi)", "Borivali"],
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&auto=format&fit=crop&q=80",
    status: "active",
    description: "8+ Diagnostic and battery quick-swap hubs servicing commercial 2W & 3W delivery fleets.",
    contactNumber: "+91 98765 43211",
  },
  {
    id: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    centersCount: 12,
    areas: ["Indiranagar", "Koramangala", "Whitefield", "HSR Layout", "Electronic City", "Yelahanka"],
    heroImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&auto=format&fit=crop&q=80",
    status: "active",
    description: "12+ High-voltage battery diagnostic centers and EV specialist training hubs across IT corridors.",
    contactNumber: "+91 98765 43212",
  },
  {
    id: "delhi-ncr",
    name: "Delhi NCR",
    state: "Delhi & NCR",
    centersCount: 10,
    areas: ["Noida Sector 62", "Gurugram Cyber City", "Dwarka Sector 10", "Okhla Phase 3", "Faridabad", "Ghaziabad"],
    heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80",
    status: "active",
    description: "10+ Certified centers with rapid 45-minute turnaround for electric scooter fleets and commuters.",
    contactNumber: "+91 98765 43213",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    centersCount: 6,
    areas: ["Gachibowli", "HITECH City", "Banjara Hills", "Kukatpally", "Secunderabad"],
    heroImage: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=1200&auto=format&fit=crop&q=80",
    status: "active",
    description: "6+ Diagnostic hubs equipped with cell-level active balancing and fast charging diagnostic gear.",
    contactNumber: "+91 98765 43214",
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    centersCount: 4,
    areas: ["SG Highway", "Navrangpura", "Satellite", "Prahlad Nagar", "Bodakdev"],
    heroImage: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1200&auto=format&fit=crop&q=80",
    status: "active",
    description: "4+ Full-stack EV service centers supporting 2W & 3W fleet operations.",
    contactNumber: "+91 98765 43215",
  },
];

// In-memory + LocalStorage cache for dynamically onboarded cities
const STORAGE_KEY = "my_ev_onboarded_cities";

export function getOnboardedCities(): EVCity[] {
  if (typeof window === "undefined") return INITIAL_CITIES;
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge initial with cached avoiding duplicates
        const existingIds = new Set(INITIAL_CITIES.map((c) => c.id));
        const customAdded = parsed.filter((c: EVCity) => !existingIds.has(c.id));
        return [...INITIAL_CITIES, ...customAdded];
      }
    }
  } catch (err) {
    console.error("Failed to load onboarded cities cache", err);
  }
  return INITIAL_CITIES;
}

export function findMatchingAvailableCity(inputQuery: string): EVCity | null {
  if (!inputQuery || !inputQuery.trim()) return null;
  const query = inputQuery.trim().toLowerCase();
  const cities = getOnboardedCities();

  // 1. Direct slug or name match
  for (const city of cities) {
    if (city.id.toLowerCase() === query || city.name.toLowerCase() === query) {
      return city;
    }
  }

  // 2. Partial city name or common alias match
  for (const city of cities) {
    if (
      city.name.toLowerCase().includes(query) ||
      query.includes(city.name.toLowerCase()) ||
      (query.includes("bengaluru") && city.id === "bangalore") ||
      (query.includes("bangalore") && city.id === "bangalore") ||
      (query.includes("delhi") && city.id === "delhi-ncr") ||
      (query.includes("gurgaon") && city.id === "delhi-ncr") ||
      (query.includes("noida") && city.id === "delhi-ncr")
    ) {
      return city;
    }
  }

  // 3. Area name match (e.g. Baner -> Pune, Bandra -> Mumbai, HSR -> Bangalore)
  for (const city of cities) {
    for (const area of city.areas) {
      if (area.toLowerCase().includes(query) || query.includes(area.toLowerCase())) {
        return city;
      }
    }
  }

  return null;
}

export function onboardNewCity(cityData: Partial<EVCity> & { name: string }): EVCity {
  const slug = (cityData.id || cityData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")).trim();
  const newCity: EVCity = {
    id: slug,
    name: cityData.name,
    state: cityData.state || "India",
    centersCount: cityData.centersCount || 3,
    areas: cityData.areas || [`Central ${cityData.name}`, "North Hub", "South Hub"],
    heroImage: cityData.heroImage || "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&auto=format&fit=crop&q=80",
    status: cityData.status || "active",
    description: cityData.description || `Certified MY EV SERVICE diagnostic hubs now operational in ${cityData.name}.`,
    contactNumber: cityData.contactNumber || "+91 1800 123 4567",
  };

  const current = getOnboardedCities();
  const existsIdx = current.findIndex((c) => c.id === slug);
  let updatedList: EVCity[];
  if (existsIdx >= 0) {
    updatedList = [...current];
    updatedList[existsIdx] = newCity;
  } else {
    updatedList = [...current, newCity];
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      // Dispatch custom browser event so components re-render automatically
      window.dispatchEvent(new Event("ev_cities_updated"));
    } catch (e) {
      console.error("Failed to save city", e);
    }
  }

  return newCity;
}

export interface ServiceCenter {
  id: string;
  name: string;
  address: string;
  area: string;
  distanceKm: number;
  rating: number;
  reviewsCount: number;
  status: "open" | "busy" | "closed";
  phone: string;
  mapUrl: string;
  brandsServiced: string[];
  servicesOffered: string[];
  baysAvailable: number;
  techniciansOnDuty: number;
  isNearest?: boolean;
}

export function getCityServiceCenters(cityNameOrSlug: string, searchArea?: string): ServiceCenter[] {
  const clean = cityNameOrSlug.toLowerCase().trim();
  const formatted = cityNameOrSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const activeArea = searchArea ? searchArea.trim() : `Central ${formatted}`;

  const centers: ServiceCenter[] = [
    {
      id: `${clean}-1`,
      name: `MY EV SERVICE - ${formatted} ${activeArea} Flagship Hub`,
      address: `Plot 42, High-Tech EV Zone, Main Road, ${activeArea}, ${formatted}`,
      area: activeArea,
      distanceKm: 0.8,
      rating: 4.9,
      reviewsCount: 384,
      status: "open",
      phone: "+91 98765 43210",
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`MY EV SERVICE ${activeArea} ${formatted}`)}`,
      brandsServiced: ["Ather", "Ola Electric", "TVS", "Hero Electric", "Vida", "Bajaj Chetak"],
      servicesOffered: ["Battery Diagnostics", "Cell Equalization", "Motor & FOC Tuning", "BMS Software Flashing"],
      baysAvailable: 4,
      techniciansOnDuty: 8,
      isNearest: true,
    },
    {
      id: `${clean}-2`,
      name: `MY EV SERVICE - ${formatted} North Express Center`,
      address: `Shop 18-B, Auto Market Complex, North Avenue, ${formatted}`,
      area: `North ${formatted}`,
      distanceKm: 2.4,
      rating: 4.8,
      reviewsCount: 219,
      status: "open",
      phone: "+91 98765 43211",
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`EV Service Center North ${formatted}`)}`,
      brandsServiced: ["Ather", "Ola Electric", "TVS"],
      servicesOffered: ["Periodic General Service", "Battery Diagnostics", "Doorstep Pickup"],
      baysAvailable: 2,
      techniciansOnDuty: 5,
    },
    {
      id: `${clean}-3`,
      name: `MY EV SERVICE - ${formatted} West Fleet & Diagnostic Care`,
      address: `Building 7, Green Technology Park, West Bypass, ${formatted}`,
      area: `West ${formatted}`,
      distanceKm: 4.5,
      rating: 4.7,
      reviewsCount: 156,
      status: "open",
      phone: "+91 98765 43212",
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`EV Battery Repair ${formatted}`)}`,
      brandsServiced: ["Hero Electric", "Vida", "Bajaj Chetak", "Ola Electric"],
      servicesOffered: ["BMS Firmware Flashing", "Battery Pack Repair", "Motor Tuning"],
      baysAvailable: 3,
      techniciansOnDuty: 6,
    },
    {
      id: `${clean}-4`,
      name: `MY EV SERVICE - ${formatted} South Diagnostic Hub`,
      address: `Gate 2, Ring Road Industrial Area, South ${formatted}`,
      area: `South ${formatted}`,
      distanceKm: 6.8,
      rating: 4.9,
      reviewsCount: 290,
      status: "busy",
      phone: "+91 98765 43213",
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`EV Hub South ${formatted}`)}`,
      brandsServiced: ["Ather", "TVS", "Ola Electric", "Bajaj Chetak"],
      servicesOffered: ["Battery Health Scan", "General Maintenance", "Emergency RSA"],
      baysAvailable: 1,
      techniciansOnDuty: 4,
    },
  ];

  return centers;
}
