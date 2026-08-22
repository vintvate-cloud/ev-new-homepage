export interface DetailedFranchiseModel {
  type: string;
  name: string;
  subtitle: string;
  badge?: string;
  investment: string;
  originalInvestment?: string;
  foundingOffer?: string;
  area: string;
  bays: string;
  vehicles: string;
  includes: string[];
  osSavings: string;
  bestFor: string;
  popular?: boolean;
}

export const DETAILED_FRANCHISE_MODELS: DetailedFranchiseModel[] = [
  {
    type: "garage",
    name: "GARAGE Model",
    subtitle: "Starter • Entry-level EV service shop",
    investment: "₹7.5L + GST",
    area: "300 sq ft",
    bays: "1 Bay",
    vehicles: "EV 2-Wheelers",
    includes: [
      "EV Service Workshop Tools & Equipment",
      "Single Service Bay Setup",
      "Battery Diagnostic Tools",
      "Workshop Branding & Signage",
      "Technician Training (Autobot Academy)",
      "Service SOPs & Manuals",
      "Software & Billing System",
      "Launch Support",
    ],
    osSavings: "₹16,000/mo saved with OS",
    bestFor: "Technicians, small garage owners, micro-entrepreneurs",
  },
  {
    type: "centre",
    name: "CENTRE Model",
    subtitle: "Popular • Full-service EV centre",
    badge: "MOST POPULAR",
    investment: "₹15L + GST",
    originalInvestment: "₹17L + GST",
    foundingOffer: "₹2L saving - Founding Partner offer",
    area: "600 sq ft",
    bays: "3 Bays",
    vehicles: "EV 2-Wheelers",
    includes: [
      "Multi-Bay Workshop Setup",
      "Diagnostic & Testing Tools",
      "Battery Diagnostic & Balancing Equipment",
      "Spare Parts Racks",
      "MY EV SERVICE Software",
      "Staff Training & Certification",
      "Marketing & Launch Support",
      "Safety & Fire Compliance",
      "6 Months Business Ops Support",
    ],
    osSavings: "₹47,000/mo saved with OS",
    bestFor: "Business owners, auto service professionals, multi-outlet operators, fleet service partners",
    popular: true,
  },
  {
    type: "hub",
    name: "HUB Model",
    subtitle: "Premium • Regional anchor hub",
    badge: "REGIONAL ANCHOR",
    investment: "₹25L + GST",
    originalInvestment: "₹30L + GST",
    foundingOffer: "₹5L saving - Founding Partner offer",
    area: "1000–1200 sq ft",
    bays: "6 Bays (4×2W + 2×3W)",
    vehicles: "EV 2W + 3W",
    includes: [
      "2W + 3W Service Bays with Hydraulic Lifts",
      "Complete Infrastructure Setup",
      "Charging Area Setup",
      "Battery Diagnostic & Balancing Equipment",
      "Battery Lab Setup",
      "Wash Bay",
      "Full Branding & Signage",
      "Ongoing Audits & Support",
    ],
    osSavings: "₹80,000/mo saved with OS",
    bestFor: "Established entrepreneurs, fleet operators, multi-city franchise partners, institutional investors",
  },
];

export interface CityRadarNode {
  name: string;
  state: string;
  status: string;
  tag: string;
  color: string;
  demand: string;
  slots: string;
  hubCount: string;
  lat: number;
  lng: number;
  growthRate: string;
}

export const CITIES_RADAR: CityRadarNode[] = [
  {
    name: "Pune",
    state: "Maharashtra",
    status: "5 Service Centres Operational",
    tag: "FOUNDING OFFER ACTIVE",
    color: "#00D084",
    demand: "High 2W & 3W EV Density",
    slots: "2 Territory Slots Available",
    hubCount: "5 Hubs Live",
    lat: 18.5204,
    lng: 73.8567,
    growthRate: "+38% MoM EV Intake",
  },
  {
    name: "Bangalore",
    state: "Karnataka",
    status: "Master Hub Operational",
    tag: "HUB OPERATIONAL",
    color: "#3b82f6",
    demand: "EV Tech Capital & Fleet Corridor",
    slots: "3 Pre-Booking Slots",
    hubCount: "4 Hubs Live",
    lat: 12.9716,
    lng: 77.5946,
    growthRate: "+45% Fleet Growth",
  },
  {
    name: "Delhi NCR",
    state: "Delhi",
    status: "Territory Pre-Booking Open",
    tag: "PRE-BOOKING OPEN",
    color: "#eab308",
    demand: "Commercial 3W & Delivery Surge",
    slots: "5 Territory Slots",
    hubCount: "6 Hubs Reserved",
    lat: 28.6139,
    lng: 77.209,
    growthRate: "+52% Commercial Intake",
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    status: "New Centre Franchise Awarded",
    tag: "CENTRE AWARDED",
    color: "#ec4899",
    demand: "Rapid 2W Commuter EV Growth",
    slots: "1 Hub Slot Available",
    hubCount: "3 Hubs Live",
    lat: 17.385,
    lng: 78.4867,
    growthRate: "+34% MoM Revenue",
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    status: "Partnership Announcement Soon",
    tag: "AUTO HUB EXPANSION",
    color: "#a855f7",
    demand: "Auto Manufacturing Belt & Fleets",
    slots: "4 Slots Open",
    hubCount: "2 Hubs Live",
    lat: 13.0827,
    lng: 80.2707,
    growthRate: "+29% Retail Booking",
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    status: "Franchise Territory Reserved",
    tag: "TERRITORY RESERVED",
    color: "#06b6d4",
    demand: "High Premium 2W EV Intake",
    slots: "2 Slots Remaining",
    hubCount: "4 Hubs Live",
    lat: 19.076,
    lng: 72.8777,
    growthRate: "+41% Premium EV Intake",
  },
  {
    name: "Kolkata",
    state: "West Bengal",
    status: "East Zone Launch Phase",
    tag: "EAST HUB OPENING",
    color: "#f97316",
    demand: "3W E-Rickshaw & Fleet Hub",
    slots: "4 Territory Slots",
    hubCount: "2 Hubs Pre-booked",
    lat: 22.5726,
    lng: 88.3639,
    growthRate: "+50% E-Rickshaw Demand",
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    status: "North Corridor Pre-Booking",
    tag: "FAST TRACK EXPANSION",
    color: "#10b981",
    demand: "Tourist EV Fleets & 2W Service",
    slots: "3 Slots Available",
    hubCount: "1 Hub Live",
    lat: 26.9124,
    lng: 75.7873,
    growthRate: "+31% Local Traffic",
  },
  {
    name: "Ahmedabad",
    state: "Gujarat",
    status: "West Hub Partner Awarded",
    tag: "GUJARAT HUB LIVE",
    color: "#8b5cf6",
    demand: "Industrial & Fleet EV Service",
    slots: "2 Slots Remaining",
    hubCount: "3 Hubs Live",
    lat: 23.0225,
    lng: 72.5714,
    growthRate: "+36% Fleet Growth",
  },
];

export interface OnboardingStep {
  day: string;
  title: string;
  desc: string;
  checklist: string[];
  iconName?: string;
}

export const ONBOARDING_STEPS_90_DAYS: OnboardingStep[] = [
  {
    day: "Day 1 – 15",
    title: "Territory Exclusivity & Site Feasibility",
    desc: "Site location feasibility audit, exclusive 5km radius lock, legal franchise agreement sign-off, and zero-fee onboarding.",
    checklist: [
      "Exclusive 5km Radius Territory Lock",
      "Footfall & EV Density Survey",
      "Lease & Site Blueprint Approval",
      "Franchise Agreement Signoff",
    ],
  },
  {
    day: "Day 16 – 40",
    title: "Workshop Fitout & Diagnostic Lab Setup",
    desc: "Civil modification, installation of hydraulic 2W/3W service bays, battery diagnostic & balancing bench, and OEM parts inventory dispatch.",
    checklist: [
      "Hydraulic Service Bays Installed",
      "High-Voltage Battery Balancing Lab Setup",
      "OEM Spare Parts Racks & Inventory",
      "Signage & Brand Aesthetic Fitout",
    ],
  },
  {
    day: "Day 41 – 65",
    title: "Technician Certification & Autobot Academy",
    desc: "Hands-on master technician certification at Autobot Academy covering high-voltage battery safety, CAN-bus scanners & diagnostic SOPs.",
    checklist: [
      "Autobot Master Level Certification",
      "High-Voltage Battery Safety Protocols",
      "CAN-bus Scanner Diagnostics SOPs",
      "Customer Service & Billing SOP Training",
    ],
  },
  {
    day: "Day 66 – 90",
    title: "Autobot OS Sync & Commercial Grand Launch",
    desc: "Integration of Autobot OS cloud platform, customer mobile app listing, B2B commercial fleet AMC tie-ups, and central digital marketing launch.",
    checklist: [
      "Autobot OS Cloud Automation Live",
      "Google Maps & Customer App Listing",
      "B2B Delivery Fleet AMC Contracts Signed",
      "Grand Opening & Marketing Lead Dispatch",
    ],
  },
];

export interface PartnerTestimonial {
  id: string;
  headline: string;
  quote: string;
  author: string;
  role: string;
  city: string;
  rating: number;
  stats: string;
  avatarBg: string;
}

export const PARTNER_TESTIMONIALS_ROW1: PartnerTestimonial[] = [
  {
    id: "pune-1",
    headline: "Autobot OS turned our local garage into a ₹40L/yr automated EV hub!",
    quote:
      "Starting my MY EV SERVICE workshop in Pune was the best business decision. Autobot OS software handles lead routing and battery diagnostic logs seamlessly.",
    author: "Rajesh Varma",
    role: "Centre Partner",
    city: "Pune",
    rating: 5,
    stats: "28% Net Margins",
    avatarBg: "from-emerald-500 to-teal-700",
  },
  {
    id: "blr-1",
    headline: "90-day roadmap was executed flawlessly — Breakeven in 12 months!",
    quote:
      "The 90-day onboarding roadmap was executed to perfection. Autobot Academy trained our technicians on HV battery cell balancing, enabling 12-month payback.",
    author: "Aniket Kulkarni",
    role: "Master Hub Partner",
    city: "Bangalore",
    rating: 5,
    stats: "12 Month Breakeven",
    avatarBg: "from-blue-500 to-indigo-700",
  },
  {
    id: "del-1",
    headline: "Direct OEM spare parts supply gives us an unbeatable edge over local shops.",
    quote:
      "The constant spare parts supply chain support and 24/7 technical hotline give our workshop a massive competitive edge across Delhi NCR.",
    author: "Priya Sharma",
    role: "Express Garage Partner",
    city: "Delhi NCR",
    rating: 5,
    stats: "140+ Monthly EVs",
    avatarBg: "from-amber-500 to-orange-700",
  },
  {
    id: "hyd-1",
    headline: "120+ customer app bookings in our very first month of operation!",
    quote:
      "The brand trust and doorstep mobile app dispatch brought us 120+ active customer bookings in our very first month in Hyderabad.",
    author: "Siddharth Mehta",
    role: "Centre Partner",
    city: "Hyderabad",
    rating: 5,
    stats: "120+ Month-1 Leads",
    avatarBg: "from-pink-500 to-rose-700",
  },
  {
    id: "chn-1",
    headline: "Diagnose complex battery & motor controller faults in under 10 minutes.",
    quote:
      "Autobot OS diagnostic scanners saved us months of trial-and-error. We accurately diagnose battery health and motor controller issues in minutes.",
    author: "Venkatesh Rao",
    role: "Hub Partner",
    city: "Chennai",
    rating: 5,
    stats: "99.2% CSAT Score",
    avatarBg: "from-purple-500 to-violet-700",
  },
  {
    id: "mum-1",
    headline: "Zero-franchise-fee model let us invest 100% directly into lifts & lab tools.",
    quote:
      "The zero-franchise-fee founding partner model gave us maximum capital allocation towards lifts, battery balancing benches, and inventory.",
    author: "Vikram Malhotra",
    role: "Centre Partner",
    city: "Mumbai",
    rating: 5,
    stats: "5km Exclusive Radius",
    avatarBg: "from-cyan-500 to-blue-700",
  },
];

export const PARTNER_TESTIMONIALS_ROW2: PartnerTestimonial[] = [
  {
    id: "kol-1",
    headline: "3W E-Rickshaw fleet AMC tie-ups brought consistent daily cashflow!",
    quote:
      "Partnering for commercial 3W fleet AMC contracts doubled our daily workshop intake within 45 days of launching our Kolkata hub.",
    author: "Debabrata Banerjee",
    role: "Hub Partner",
    city: "Kolkata",
    rating: 5,
    stats: "+65% Fleet AMC Income",
    avatarBg: "from-orange-500 to-red-700",
  },
  {
    id: "jpr-1",
    headline: "Tier-2 city EV boom was the best investment opportunity we found.",
    quote:
      "MY EV SERVICE brought OEM-grade diagnostic scanners and standardized SOPs to Jaipur, capturing 80% of local multi-brand EV repair demand.",
    author: "Manish Rathore",
    role: "Centre Partner",
    city: "Jaipur",
    rating: 5,
    stats: "80% Market Share",
    avatarBg: "from-emerald-600 to-lime-700",
  },
  {
    id: "ahd-1",
    headline: "Central parts fulfillment means zero downtime for customer battery packs.",
    quote:
      "With 24-hour OEM inventory dispatch, our Gujarat hub completes battery module replacements in record time with 100% customer satisfaction.",
    author: "Ketan Patel",
    role: "Master Hub Partner",
    city: "Ahmedabad",
    rating: 5,
    stats: "24hr Parts Fulfillment",
    avatarBg: "from-violet-600 to-indigo-800",
  },
  {
    id: "pune-2",
    headline: "Autobot Academy trained our fresh mechanics into certified EV specialists.",
    quote:
      "Hands-on training at Autobot Academy taught our staff high-voltage battery safety and BMS protocol analysis from scratch.",
    author: "Sunil Deshmukh",
    role: "Garage Partner",
    city: "Pune",
    rating: 5,
    stats: "Certified EV Techs",
    avatarBg: "from-teal-500 to-emerald-800",
  },
  {
    id: "blr-2",
    headline: "Doorstep service dispatch added ₹1.5L extra monthly recurring revenue.",
    quote:
      "The mobile app doorstep service dispatch allows our mobile vans to handle routine maintenance across Bangalore software parks.",
    author: "Rohan Gowda",
    role: "Hub Partner",
    city: "Bangalore",
    rating: 5,
    stats: "₹1.5L Mobile Service",
    avatarBg: "from-blue-600 to-cyan-700",
  },
  {
    id: "del-2",
    headline: "High net profit margins of 30% surpassed traditional petrol garages by 3x!",
    quote:
      "Transitioning our traditional garage to a tech-enabled EV service centre tripled our profit margins while reducing overhead costs.",
    author: "Amit Chaudhary",
    role: "Centre Partner",
    city: "Delhi NCR",
    rating: 5,
    stats: "30% Net Profit Margin",
    avatarBg: "from-amber-600 to-orange-800",
  },
];

// Combine both rows for full list export
export const PARTNER_TESTIMONIALS: PartnerTestimonial[] = [
  ...PARTNER_TESTIMONIALS_ROW1,
  ...PARTNER_TESTIMONIALS_ROW2,
];

export interface CategorizedFaq {
  category: "all" | "models" | "investment" | "tech" | "territory";
  categoryLabel: string;
  q: string;
  a: string;
}

export const FAQ_CATEGORIES = [
  { id: "all", label: "All FAQs" },
  { id: "models", label: "Franchise Models & FOCO" },
  { id: "investment", label: "Investment & Returns" },
  { id: "tech", label: "Autobot OS & Diagnostics" },
  { id: "territory", label: "Territory & Onboarding" },
];

export const CATEGORIZED_FAQS: CategorizedFaq[] = [
  {
    category: "models",
    categoryLabel: "Franchise Models & FOCO",
    q: "What is MY EV SERVICE Franchise?",
    a: "MY EV SERVICE is India's first tech-enabled multi-brand EV service network. We empower entrepreneurs to set up multi-brand 2W & 3W EV repair hubs powered by Autobot OS, certified technician training, and OEM parts supply.",
  },
  {
    category: "models",
    categoryLabel: "Franchise Models & FOCO",
    q: "What is the FOCO Model, and how does MY EV SERVICE business model operate?",
    a: "FOCO (Franchise Owned Company Operated) and FOFO options are available. Under FOCO, you invest in the physical workshop while our central operating team handles daily technician dispatch, software automation, and customer lead acquisition.",
  },
  {
    category: "models",
    categoryLabel: "Franchise Models & FOCO",
    q: "Is FOCO a good franchise model for new entrepreneurs?",
    a: "Yes! FOCO minimizes operational stress for investors who want to participate in the high-growth EV sector without needing deep technical automotive repair experience.",
  },
  {
    category: "models",
    categoryLabel: "Franchise Models & FOCO",
    q: "Why is the FOCO model ideal for EV service networks?",
    a: "EV servicing involves high-voltage safety and diagnostic SOPs. Company-guided management ensures strict safety standards, centralized parts fulfillment, and uniform quality.",
  },
  {
    category: "investment",
    categoryLabel: "Investment & Returns",
    q: "What investment is required to start an EV service centre franchise?",
    a: "Investment starts at ₹7.5L + GST for the Garage Model, ₹15L + GST for the Centre Model, and ₹25L + GST for the Master Hub Model. 100% of your investment goes directly into building your workshop infrastructure.",
  },
  {
    category: "investment",
    categoryLabel: "Investment & Returns",
    q: "How profitable is an EV service centre business?",
    a: "Average net profit margins range from 20% to 30%. Additional income comes from spare parts margins, battery balancing services, and commercial fleet AMC contracts with 14-18 month payback.",
  },
  {
    category: "investment",
    categoryLabel: "Investment & Returns",
    q: "Why is EV service business a good opportunity in India?",
    a: "EV adoption is growing at 25-30% CAGR, yet fewer than 3% of garages in India are equipped to service electric vehicles. This huge demand-supply gap guarantees high customer inflow.",
  },
  {
    category: "investment",
    categoryLabel: "Investment & Returns",
    q: "I am from a Tier 2 or Tier 3 city. Which franchise model is suitable for me?",
    a: "The GARAGE Model (₹7.5L + GST) or CENTRE Model (₹15L + GST) are ideal for Tier 2 and Tier 3 markets due to lower setup footprint and fast payback.",
  },
  {
    category: "tech",
    categoryLabel: "Autobot OS & Diagnostics",
    q: "What is Autobot OS and how does it help franchise partners?",
    a: "Autobot OS is an AI-powered cloud platform that automates customer bookings, job cards, parts inventory tracking, technician dispatch, battery health diagnostics, and real-time P&L analytics.",
  },
  {
    category: "tech",
    categoryLabel: "Autobot OS & Diagnostics",
    q: "Do I need technical knowledge to start an EV service centre franchise?",
    a: "No prior EV technical knowledge is required. We provide full technician recruitment, Autobot Academy master certification training, and step-by-step SOP manuals.",
  },
  {
    category: "tech",
    categoryLabel: "Autobot OS & Diagnostics",
    q: "What types of EV vehicles can be serviced at MY EV SERVICE centres?",
    a: "All multi-brand Electric 2-Wheelers (Ola, Ather, TVS, Hero, Revolt, Bajaj) and 3-Wheeler Cargo/Passenger Autos (Mahindra, Piaggio, Yulu, etc.).",
  },
  {
    category: "tech",
    categoryLabel: "Autobot OS & Diagnostics",
    q: "What makes MY EV SERVICE different from traditional garages?",
    a: "Traditional garages lack diagnostic tools and high-voltage training. We offer 100% transparent digital job cards, AI diagnostics, and 100% OEM spare parts supply.",
  },
  {
    category: "territory",
    categoryLabel: "Territory & Onboarding",
    q: "How long does it take to start the franchise after approval?",
    a: "Launch takes exactly 90 days from initial territory locking to site setup, technician certification at Autobot Academy, and commercial grand opening.",
  },
  {
    category: "territory",
    categoryLabel: "Territory & Onboarding",
    q: "What exclusive territory protection do franchise partners receive?",
    a: "Every franchise partner gets an exclusive 5km radius territory guarantee where no other MY EV SERVICE hub will be allocated.",
  },
  {
    category: "territory",
    categoryLabel: "Territory & Onboarding",
    q: "How do customers find MY EV SERVICE centres?",
    a: "Customers book through the MY EV SERVICE Mobile App, central website, Google Maps local SEO, and B2B commercial fleet tie-ups.",
  },
  {
    category: "territory",
    categoryLabel: "Territory & Onboarding",
    q: "How can I apply for the MY EV SERVICE franchise?",
    a: "Fill out the Partner Application form on this page. Our franchise onboarding team will reach out within 24 hours.",
  },
];

// Backwards compatibility alias
export const FRANCHISE_FAQS = CATEGORIZED_FAQS.map((f) => ({ q: f.q, a: f.a }));

