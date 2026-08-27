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

// Brand Collaborations & PR Showcase Data
export interface BrandCollaboration {
  id: string;
  name: string;
  logo: string;
  category: string;
  flipStats: { label: string; value: string }[];
  description: string;
  mediaShowcase: {
    id: string;
    title: string;
    tag: string;
    img: string;
    prUrl: string;
    date: string;
  }[];
}

export const BRAND_COLLABORATIONS: BrandCollaboration[] = [
  {
    id: "ola",
    name: "Ola Electric",
    logo: "/brands/ola.jpeg",
    category: "OEM Partner",
    flipStats: [
      { label: "Authorized Service", value: "3-Star Level" },
      { label: "Serviced Intake", value: "14,500+ EVs" },
      { label: "Network Cities", value: "28 Cities" },
    ],
    description: "Official diagnostic and quick service partner for Ola S1 Pro, S1 Air, and S1 X battery & motor assemblies.",
    mediaShowcase: [
      {
        id: "ola-pr-1",
        title: "MY EV SERVICE & Ola Electric MoU Signing Ceremony in Pune Hub",
        tag: "MoU & Partnership",
        img: "/ev-services-hero.jpg",
        prUrl: "/news",
        date: "Jan 2026",
      },
      {
        id: "ola-pr-2",
        title: "National Service Fleet Alignment & Diagnostic Automation Launch",
        tag: "Press Release",
        img: "/ev-franchise-hero.jpg",
        prUrl: "/media",
        date: "Nov 2025",
      },
    ],
  },
  {
    id: "ather",
    name: "Ather Energy",
    logo: "/brands/ather.jpeg",
    category: "Powertrain Partner",
    flipStats: [
      { label: "Diagnostic Certification", value: "Level 4" },
      { label: "Grid Fast Chargers", value: "40+ Points" },
      { label: "Battery Balancers", value: "100% Online" },
    ],
    description: "Multi-point diagnostic support, battery health balancing, and Ather Grid charging point integration.",
    mediaShowcase: [
      {
        id: "ather-pr-1",
        title: "Ather Energy Executive Delegation Visits MY EV SERVICE Master Hub",
        tag: "Group Photo & Review",
        img: "/find-services-hero.jpg",
        prUrl: "/media",
        date: "Feb 2026",
      },
      {
        id: "ather-pr-2",
        title: "Joint Technician Certification & High-Voltage Battery Workshop",
        tag: "Collaborative Event",
        img: "/ev-workshop-careers.png",
        prUrl: "/events",
        date: "Dec 2025",
      },
    ],
  },
  {
    id: "tvs",
    name: "TVS EV",
    logo: "/brands/tvs.webp",
    category: "2W EV Fleet",
    flipStats: [
      { label: "iQube Units", value: "9,800+ Serviced" },
      { label: "Parts Fulfillment", value: "24-Hour SLA" },
      { label: "SOP Standard", value: "Autobot Verified" },
    ],
    description: "Engineered periodic service, braking overhaul, and controller flashing for TVS iQube series.",
    mediaShowcase: [
      {
        id: "tvs-pr-1",
        title: "TVS EV Workshop Expansion Across Maharashtra Tier-2 Clusters",
        tag: "Network Expansion",
        img: "/franchise-banner-building.png",
        prUrl: "/news",
        date: "Jan 2026",
      },
      {
        id: "tvs-pr-2",
        title: "TVS iQube Rapid Diagnostic Protocols Handover to Autobot Technicians",
        tag: "Technical MOU",
        img: "/webinar-hero.png",
        prUrl: "/media",
        date: "Oct 2025",
      },
    ],
  },
  {
    id: "hero-electric",
    name: "Hero Electric",
    logo: "/brands/hero-electric.jpeg",
    category: "Legacy 2W EV",
    flipStats: [
      { label: "Optima & Nyx Units", value: "22,000+" },
      { label: "Hub Outlets", value: "35 Outlets" },
      { label: "Battery Swaps", value: "Daily Sync" },
    ],
    description: "Comprehensive spare parts distribution and legacy battery restoration for Hero Electric models.",
    mediaShowcase: [
      {
        id: "hero-pr-1",
        title: "MY EV SERVICE Awarded Best Multi-Brand EV Aftermarket Partner",
        tag: "Award & Recognition",
        img: "/blog-hero-bg.png",
        prUrl: "/news",
        date: "Dec 2025",
      },
      {
        id: "hero-pr-2",
        title: "Hero Electric Joint Fleet Maintenance Program Announcement",
        tag: "Press Release",
        img: "/ev-franchise-hero.jpg",
        prUrl: "/media",
        date: "Aug 2025",
      },
    ],
  },
  {
    id: "blusmart",
    name: "BluSmart Mobility",
    logo: "/brands/blu_smart_mobility_logo.jpeg",
    category: "Commercial Fleet",
    flipStats: [
      { label: "Fleet AMC", value: "1,200+ EVs" },
      { label: "Uptime SLA", value: "99.4%" },
      { label: "Turnaround Time", value: "< 3.5 Hours" },
    ],
    description: "Dedicated rapid fleet servicing corridor for high-utilization commercial rideshare electric vehicles.",
    mediaShowcase: [
      {
        id: "blu-pr-1",
        title: "BluSmart Commercial EV Fleet Service Contract Exchange in Delhi NCR",
        tag: "Fleet AMC Contract",
        img: "/ev-services-hero.jpg",
        prUrl: "/news",
        date: "Feb 2026",
      },
      {
        id: "blu-pr-2",
        title: "Express 24/7 Service Bay Launch for Ride-Hailing EV Fleets",
        tag: "Infrastructure Launch",
        img: "/find-services-hero.jpg",
        prUrl: "/media",
        date: "Jan 2026",
      },
    ],
  },
  {
    id: "mahindra",
    name: "Mahindra EV",
    logo: "/brands/mahindra.jpeg",
    category: "3W Heavy Cargo",
    flipStats: [
      { label: "Treor & Zor Cargo", value: "3W Specialized" },
      { label: "Hydraulic Lifts", value: "Heavy-Duty 2T" },
      { label: "Cell Balancing", value: "60-Min Fast Track" },
    ],
    description: "3-Wheeler electric passenger and heavy cargo chassis diagnostics, differential repair, and battery balancing.",
    mediaShowcase: [
      {
        id: "mah-pr-1",
        title: "3W Cargo EV Servicing Initiative Expansion Announced",
        tag: "National PR",
        img: "/franchise-bg.png",
        prUrl: "/news",
        date: "Dec 2025",
      },
      {
        id: "mah-pr-2",
        title: "Mahindra Electric Cargo Fleet Engineers Joint Training Meetup",
        tag: "Group Photo",
        img: "/ev-workshop-careers.png",
        prUrl: "/media",
        date: "Nov 2025",
      },
    ],
  },
  {
    id: "bajaj",
    name: "Bajaj Chetak",
    logo: "/brands/bajaj.png",
    category: "Premium 2W EV",
    flipStats: [
      { label: "Chetak Premium", value: "Metal Body SOP" },
      { label: "BMS Diagnostics", value: "CAN Bus Direct" },
      { label: "Intake Units", value: "8,200+ Serviced" },
    ],
    description: "Full service diagnostic support for Bajaj Chetak EV metal-chassis, battery management system & CAN bus analysis.",
    mediaShowcase: [
      {
        id: "bajaj-pr-1",
        title: "Bajaj Chetak Metal Chassis Specialized EV Repair Bay Launch",
        tag: "Service Launch",
        img: "/find-services-hero.jpg",
        prUrl: "/news",
        date: "Jan 2026",
      },
      {
        id: "bajaj-pr-2",
        title: "MY EV SERVICE Partner Engineers Certified for Chetak Premium Series",
        tag: "Certification Meet",
        img: "/ev-workshop-careers.png",
        prUrl: "/media",
        date: "Dec 2025",
      },
    ],
  },
  {
    id: "revolt",
    name: "Revolt Motors",
    logo: "/brands/revolt.webp",
    category: "Electric Motorcycle",
    flipStats: [
      { label: "RV400 & RV300", value: "Motorcycle Hub" },
      { label: "Belt Drive Tuning", value: "100% Precision" },
      { label: "Swap Battery", value: "Quick Check" },
    ],
    description: "High-performance electric motorcycle drivetrain tuning, belt tension calibration, and battery pack diagnostics.",
    mediaShowcase: [
      {
        id: "revolt-pr-1",
        title: "Revolt Motors Partner Alignment for Electric Bike Servicing Hubs",
        tag: "MoU Signing",
        img: "/ev-services-hero.jpg",
        prUrl: "/news",
        date: "Feb 2026",
      },
      {
        id: "revolt-pr-2",
        title: "Performance EV Motorcycle Tuning & High-Voltage Workshop Seminar",
        tag: "Press Release",
        img: "/ev-franchise-hero.jpg",
        prUrl: "/media",
        date: "Nov 2025",
      },
    ],
  },
  {
    id: "ampere",
    name: "Ampere EV",
    logo: "/brands/ampere.jpg",
    category: "Urban Commuter",
    flipStats: [
      { label: "Primus & Magnus", value: "Urban Lineup" },
      { label: "Doorstep RSA", value: "Active 24/7" },
      { label: "Service Outlets", value: "40+ Outlets" },
    ],
    description: "Urban EV commuter quick maintenance, controller tuning, and doorstep roadside emergency support.",
    mediaShowcase: [
      {
        id: "ampere-pr-1",
        title: "Ampere Electric Scooter Quick Maintenance Partnership Announcement",
        tag: "National Media",
        img: "/franchise-banner-building.png",
        prUrl: "/news",
        date: "Jan 2026",
      },
      {
        id: "ampere-pr-2",
        title: "Multi-City Doorstep Service Dispatch Integration for Ampere Owners",
        tag: "App Feature PR",
        img: "/webinar-hero.png",
        prUrl: "/media",
        date: "Oct 2025",
      },
    ],
  },
];

// Video Interviews Data for "What Partners Say"
export interface PartnerVideoInterview {
  id: string;
  partnerName: string;
  role: string;
  city: string;
  model: string;
  videoTitle: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  quoteOneLiner: string;
  statBadge: string;
}

export const PARTNER_VIDEO_INTERVIEWS: PartnerVideoInterview[] = [
  {
    id: "video-pune",
    partnerName: "Rajesh Kulkarni",
    role: "Master Hub Owner",
    city: "Pune Central",
    model: "Master Hub (25L)",
    videoTitle: "From Traditional Mechanic Shop to ₹18L/Month Automated EV Hub",
    thumbnail: "/ev-services-hero.jpg",
    videoUrl: "/lab-3d-centre.mp4",
    duration: "3:45 mins",
    quoteOneLiner: "Autobot OS automated our job cards completely — daily vehicle intake tripled within 60 days!",
    statBadge: "₹18L/Mo Revenue",
  },
  {
    id: "video-blore",
    partnerName: "Anand R. Murthy",
    role: "Franchise Partner",
    city: "Bengaluru East",
    model: "Centre Model (15L)",
    videoTitle: "How I Scaled My EV Service Outlet with 100% Corporate Fleet Support",
    thumbnail: "/ev-franchise-hero.jpg",
    videoUrl: "/lab-3d-centre.mp4",
    duration: "4:12 mins",
    quoteOneLiner: "The Founding Partner support and OEM parts supply gave us an unbeatable edge in Whitefield.",
    statBadge: "14-Month Payback",
  },
  {
    id: "video-delhi",
    partnerName: "Sanjay Sharma",
    role: "Express Garage Owner",
    city: "Delhi South",
    model: "Garage Model (7.5L)",
    videoTitle: "Setting Up 3-Bay EV Workshop in 45 Days with Autobot Academy",
    thumbnail: "/find-services-hero.jpg",
    videoUrl: "/lab-3d-centre.mp4",
    duration: "2:58 mins",
    quoteOneLiner: "Zero technical friction. Their 10-day hands-on academy trained my technicians to diagnose BMS errors effortlessly.",
    statBadge: "35+ EVs Daily",
  },
];

// Developed EV Service Centers Gallery Data
export interface DevelopedCenter {
  id: string;
  title: string;
  city: string;
  state: string;
  type: "hub" | "centre" | "garage";
  typeLabel: string;
  image: string;
  sqft: string;
  bays: string;
  openedYear: string;
  monthlyVehicles: string;
  highlights: string[];
}

export const DEVELOPED_CENTERS_GALLERY: DevelopedCenter[] = [
  {
    id: "center-pune",
    title: "Pune Master Regional EV Hub",
    city: "Pune",
    state: "Maharashtra",
    type: "hub",
    typeLabel: "Master Regional Hub",
    image: "/franchise-banner-building.png",
    sqft: "1,200 sq ft",
    bays: "6 Heavy Bays",
    openedYear: "2025",
    monthlyVehicles: "480+ Vehicles",
    highlights: ["Battery Balancing Lab", "3W Cargo Hydraulic Lift", "24/7 Mobile Van Unit"],
  },
  {
    id: "center-blore",
    title: "Bengaluru Tech Corridor Workshop",
    city: "Bengaluru",
    state: "Karnataka",
    type: "centre",
    typeLabel: "Standard Centre",
    image: "/ev-workshop-careers.png",
    sqft: "750 sq ft",
    bays: "4 Active Bays",
    openedYear: "2025",
    monthlyVehicles: "320+ Vehicles",
    highlights: ["Ather & Ola Fast Charge", "FOC Controller Flashing", "Customer Lounge"],
  },
  {
    id: "center-delhi",
    title: "Delhi NCR Commercial Fleet Hub",
    city: "Delhi NCR",
    state: "Delhi",
    type: "hub",
    typeLabel: "Master Regional Hub",
    image: "/franchise-bg.png",
    sqft: "1,400 sq ft",
    bays: "8 Heavy Bays",
    openedYear: "2026",
    monthlyVehicles: "650+ Vehicles",
    highlights: ["BluSmart AMC Dedicated Bay", "3W Heavy Cargo Overhaul", "Express Battery Swap"],
  },
  {
    id: "center-hyd",
    title: "Hyderabad Cyberabad EV Centre",
    city: "Hyderabad",
    state: "Telangana",
    type: "centre",
    typeLabel: "Standard Centre",
    image: "/ev-services-hero.jpg",
    sqft: "650 sq ft",
    bays: "3 Active Bays",
    openedYear: "2026",
    monthlyVehicles: "280+ Vehicles",
    highlights: ["Rapid Doorstep Service", "32-Point Battery Health Scan", "Zero-Downtime Spares"],
  },
  {
    id: "center-jaipur",
    title: "Jaipur Heritage Express Garage",
    city: "Jaipur",
    state: "Rajasthan",
    type: "garage",
    typeLabel: "Express Garage",
    image: "/find-services-hero.jpg",
    sqft: "400 sq ft",
    bays: "2 Compact Bays",
    openedYear: "2026",
    monthlyVehicles: "190+ Vehicles",
    highlights: ["2W EV Quick Repair", "Brake & Suspension Overhaul", "App Automated Billing"],
  },
  {
    id: "center-mumbai",
    title: "Mumbai Western Express Master Hub",
    city: "Mumbai",
    state: "Maharashtra",
    type: "hub",
    typeLabel: "Master Regional Hub",
    image: "/ev-franchise-hero.jpg",
    sqft: "1,500 sq ft",
    bays: "8 Heavy Bays",
    openedYear: "2026",
    monthlyVehicles: "720+ Vehicles",
    highlights: ["High-Voltage Safety Bay", "Commercial Fleet Fast-Track", "Automated Job Card OS"],
  },
  {
    id: "center-chennai",
    title: "Chennai Coastal EV Centre",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "centre",
    typeLabel: "Standard Centre",
    image: "/webinar-hero.png",
    sqft: "800 sq ft",
    bays: "4 Active Bays",
    openedYear: "2025",
    monthlyVehicles: "380+ Vehicles",
    highlights: ["Motor Rewinding & FOC", "Battery SOH Calibration", "Express Spare Fulfillment"],
  },
  {
    id: "center-ahmedabad",
    title: "Ahmedabad SG Highway Outlet",
    city: "Ahmedabad",
    state: "Gujarat",
    type: "centre",
    typeLabel: "Standard Centre",
    image: "/blog-hero-bg.png",
    sqft: "700 sq ft",
    bays: "3 Active Bays",
    openedYear: "2026",
    monthlyVehicles: "310+ Vehicles",
    highlights: ["Doorstep Mobile Dispatch", "32-Point Diagnostic Inspection", "Customer Lounge & Wifi"],
  },
  {
    id: "center-pune-express",
    title: "Pune Hinjewadi Tech Express",
    city: "Pune",
    state: "Maharashtra",
    type: "garage",
    typeLabel: "Express Garage",
    image: "/tech.jpg",
    sqft: "450 sq ft",
    bays: "2 Compact Bays",
    openedYear: "2026",
    monthlyVehicles: "210+ Vehicles",
    highlights: ["2W Rapid Battery Swap", "Brake Overhaul & Tuning", "App Booking Direct Bay"],
  },
];


