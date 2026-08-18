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

export const NETWORK_UPDATES = [
  "Pune – 5 service centres launched",
  "Bangalore – Hub centre operational",
  "Delhi – Territory pre-booking open",
  "100+ centres planned by 2026",
  "Chennai Partnership – Announcement coming soon",
  "Hyderabad – New Centre Model franchise awarded",
  "Mumbai – Franchise territory reserved",
];

export const FRANCHISE_FAQS = [
  {
    q: "What is MY EV SERVICE Franchise?",
    a: "MY EV SERVICE is India's first tech-enabled multi-brand EV service network. We empower entrepreneurs to set up multi-brand 2W & 3W EV repair hubs powered by Autobot OS, certified technician training, and OEM parts supply.",
  },
  {
    q: "What is the FOCO Model, and how does MY EV SERVICE business model operate?",
    a: "FOCO (Franchise Owned Company Operated) and FOFO options are available. Under FOCO, you invest in the physical workshop while our central operating team handles daily technician dispatch, software automation, and customer lead acquisition.",
  },
  {
    q: "Is FOCO a good franchise model for new entrepreneurs?",
    a: "Yes! FOCO minimizes operational stress for investors who want to participate in the high-growth EV sector without needing deep technical automotive repair experience.",
  },
  {
    q: "Why is the FOCO model ideal for EV service networks?",
    a: "EV servicing involves high-voltage safety and diagnostic SOPs. Company-guided management ensures strict safety standards, centralized parts fulfillment, and uniform quality.",
  },
  {
    q: "Why is EV service business a good opportunity in India?",
    a: "EV adoption is growing at 25-30% CAGR, yet fewer than 3% of garages in India are equipped to service electric vehicles. This huge demand-supply gap guarantees high customer inflow.",
  },
  {
    q: "Do I need technical knowledge to start an EV service centre franchise?",
    a: "No prior EV technical knowledge is required. We provide full technician recruitment, Autobot Academy master certification training, and step-by-step SOP manuals.",
  },
  {
    q: "I do not have an EV business or technical background. Am I eligible?",
    a: "Yes. Any business owner, real estate owner, or investor with passion for clean energy mobility is eligible to apply.",
  },
  {
    q: "I am from a Tier 2 or Tier 3 city. Which franchise model is suitable for me?",
    a: "The GARAGE Model (₹7.5L + GST) or CENTRE Model (₹15L + GST) are ideal for Tier 2 and Tier 3 markets due to lower setup footprint and fast 14-18 month payback.",
  },
  {
    q: "What types of EV vehicles can be serviced at MY EV SERVICE centres?",
    a: "All multi-brand Electric 2-Wheelers (Ola, Ather, TVS, Hero, Revolt, Bajaj) and 3-Wheeler Cargo/Passenger Autos (Mahindra, Piaggio, Yulu, etc.).",
  },
  {
    q: "What support does MY EV SERVICE provide to franchise partners?",
    a: "We provide complete site layout design, workshop tools, battery diagnostic lab equipment, technician recruitment, digital marketing leads, and Autobot OS software.",
  },
  {
    q: "What is Autobot OS and how does it help franchise partners?",
    a: "Autobot OS is an AI-powered cloud platform that automates customer bookings, job cards, parts inventory tracking, technician dispatch, and real-time P&L analytics.",
  },
  {
    q: "What investment is required to start an EV service centre franchise?",
    a: "Investment starts at ₹7.5L + GST for the Garage Model, ₹15L + GST for the Centre Model, and ₹25L + GST for the Master Hub Model. 100% of your investment goes directly into building your workshop.",
  },
  {
    q: "How long does it take to start the franchise after approval?",
    a: "Launch takes between 45 to 60 days from initial approval to site setup, technician certification, and live grand opening.",
  },
  {
    q: "How profitable is an EV service centre business?",
    a: "Average net profit margins range from 20% to 30%. Additional income comes from spare parts sales, battery balancing, and commercial fleet AMC contracts.",
  },
  {
    q: "How do customers find MY EV SERVICE centres?",
    a: "Customers book through the MY EV SERVICE Mobile App, central website, Google Maps local SEO, and B2B commercial fleet tie-ups.",
  },
  {
    q: "What makes MY EV SERVICE different from traditional garages?",
    a: "Traditional garages lack diagnostic tools and high-voltage training. We offer 100% transparent digital job cards, AI diagnostics, and 100% OEM spare parts supply.",
  },
  {
    q: "Is the EV service business future-proof?",
    a: "Extremely future-proof. With 1 Crore+ EVs projected on Indian roads by 2030, demand for professional EV maintenance will only increase over the next 20+ years.",
  },
  {
    q: "How can I apply for the MY EV SERVICE franchise?",
    a: "Fill out the Partner Application form on this page. Our franchise onboarding team will reach out within 24 hours.",
  },
];
