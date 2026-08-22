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
