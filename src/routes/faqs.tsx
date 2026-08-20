import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  HelpCircle,
  Search,
  ChevronDown,
  Wrench,
  Zap,
  ShieldCheck,
  Building2,
  Phone,
  MessageSquare,
  ArrowRight,
  Filter,
} from "lucide-react";

export const Route = createFileRoute("/faqs")({
  component: FaqsPage,
});

type FaqCategory =
  | "All"
  | "Booking & Doorstep"
  | "Battery & Telemetry"
  | "Pricing & Payments"
  | "Warranty & Parts"
  | "Franchise & B2B"
  | "Account & Platform";

interface FAQItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

const FAQ_DATABASE: FAQItem[] = [
  // Booking & Doorstep
  {
    id: "b1",
    category: "Booking & Doorstep",
    question: "How do I book a doorstep EV service appointment?",
    answer:
      "Select 'Book Service' on our platform or mobile app, choose your EV vehicle category (2W or 3W), select your specific vehicle model and required service package, enter your location, and pick a convenient time slot. A certified mobile technician equipped with an EV diagnostic kit will be dispatched to your location.",
  },
  {
    id: "b2",
    category: "Booking & Doorstep",
    question: "Which electric vehicles (EVs) do you service?",
    answer:
      "MY EV SERVICE currently provides complete maintenance, battery diagnostics, controller tuning, and repair for all 2W and 3W electric vehicles (scooters, bikes, electric rickshaws, and e-loaders) across major OEM brands including Ola Electric, Ather Energy, TVS iQube, Bajaj Chetak, Hero Electric, Revolt, Ampere, Piaggio Ape EV, Mahindra Electric, and Kinetic Green.",
  },
  {
    id: "b3",
    category: "Booking & Doorstep",
    question: "How does 24/7 Roadside Assistance (RSA) emergency dispatch work?",
    answer:
      "If your EV suffers a sudden breakdown, battery thermal alert, or flat tire, call our toll-free hotline (1800 123 4567) or click 'Emergency Breakdown RSA'. Our GPS dispatch system locates the nearest mobile service van and dispatches a certified technician with an ETA under 15 minutes in covered cities.",
  },
  {
    id: "b4",
    category: "Booking & Doorstep",
    question: "Can I reschedule or cancel my service booking?",
    answer:
      "Yes. You can reschedule your booking free of charge up to 2 hours prior to the scheduled time slot via your account dashboard or by contacting support. Cancellations made before technician dispatch are eligible for a 100% full refund.",
  },

  // Battery & Telemetry
  {
    id: "bt1",
    category: "Battery & Telemetry",
    question: "What is included in the Complete EV Battery Health Diagnostic?",
    answer:
      "Our battery diagnostic service evaluates individual cell voltage delta, internal resistance, state of charge (SoC) calibration, state of health (SoH) percentage, Battery Management System (BMS) MOSFET integrity, and thermal sensor accuracy. You receive a digital BMS diagnostic certificate upon completion.",
  },
  {
    id: "bt2",
    category: "Battery & Telemetry",
    question: "How often should I get cell balancing performed on my EV battery pack?",
    answer:
      "We recommend cell balancing every 5,000 km or 6 months, or whenever you notice a sudden drop in range or premature power shutoff. Active cell balancing equalizes cell voltages and restores lost battery range.",
  },
  {
    id: "bt3",
    category: "Battery & Telemetry",
    question: "Do you repair swollen or water-damaged battery packs?",
    answer:
      "Swollen or severely water-immersed Lithium-ion battery packs present severe thermal runaway risks. Our technicians conduct high-voltage isolation tests first. If safe, cell module replacement or BMS rewiring is performed in our specialized dry workshop isolation bays.",
  },

  // Pricing & Payments
  {
    id: "p1",
    category: "Pricing & Payments",
    question: "Is there any hidden visiting charge for doorstep service?",
    answer:
      "No. All pricing displayed on MY EV SERVICE is transparent. Standard doorstep inspection charges are included in the transparent package rates. If additional spare parts or deep component repairs are needed, a detailed cost estimate is shared for approval before work begins.",
  },
  {
    id: "p2",
    category: "Pricing & Payments",
    question: "What payment methods are supported on the platform?",
    answer:
      "We accept all major credit/debit cards, UPI payments (GPay, PhonePe, Paytm), net banking, digital wallets, and cash on delivery after service completion.",
  },
  {
    id: "p3",
    category: "Pricing & Payments",
    question: "How are enterprise fleet billing and invoices processed?",
    answer:
      "Commercial B2B fleet operators receive automated GST-compliant tax invoices, monthly credit billing cycles, and detailed itemized job sheets under agreed Service Level Agreements (SLAs).",
  },

  // Warranty & Parts
  {
    id: "w1",
    category: "Warranty & Parts",
    question: "Do you provide a warranty on repairs and spare parts?",
    answer:
      "Yes! All standard services come with a 90-day MY EV SERVICE Workmanship Warranty. Installed OEM or approved spare parts carry manufacturer warranty coverage ranging from 6 to 36 months.",
  },
  {
    id: "w2",
    category: "Warranty & Parts",
    question: "Are the spare parts used OEM genuine?",
    answer:
      "We use 100% OEM genuine parts and OEM-approved high-voltage electrical components sourced directly through verified manufacturer procurement channels.",
  },
  {
    id: "w3",
    category: "Warranty & Parts",
    question: "How do I claim a warranty if an issue recurs?",
    answer:
      "Simply open 'Service Warranty' on the app, enter your Job Card ID or registered phone number, and click 'File Warranty Claim'. A senior engineer will inspect the vehicle at zero cost.",
  },

  // Franchise & B2B
  {
    id: "f1",
    category: "Franchise & B2B",
    question: "How can I apply for a MY EV SERVICE Franchise Hub?",
    answer:
      "Visit our Franchise Page or click 'Franchise Partner' on the Contact page. Submit your details including city, target location, and investment budget. Our network expansion team will contact you within 24 hours.",
  },
  {
    id: "f2",
    category: "Franchise & B2B",
    question: "What support does MY EV SERVICE provide to franchise partners?",
    answer:
      "We provide complete end-to-end support including workshop layout architecture, Level 1-3 technician certification, high-voltage diagnostic tools, spare parts supply chain access, marketing campaigns, and exclusive OS software license.",
  },

  // Account & Platform
  {
    id: "a1",
    category: "Account & Platform",
    question: "Do I need an account to browse services and estimate costs?",
    answer:
      "No! You can freely browse service packages, brand catalogs, diagnostic tools, and store items without logging in. Creating an account or logging in via OTP is required to confirm bookings and access live service tracking.",
  },
];

function FaqsPage() {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ b1: true, bt1: true, w1: true });
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATABASE.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const CATEGORIES: FaqCategory[] = [
    "All",
    "Booking & Doorstep",
    "Battery & Telemetry",
    "Pricing & Payments",
    "Warranty & Parts",
    "Franchise & B2B",
    "Account & Platform",
  ];

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans overflow-x-hidden">
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-[#020403]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00D084]/12 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00D084] shadow-md backdrop-blur-md">
            <HelpCircle className="w-4 h-4" />
            <span>Complete Knowledge Base &amp; FAQ Center</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Frequently Asked <br />
            <span className="text-[#00D084] drop-shadow-[0_0_20px_rgba(0,208,132,0.4)]">
              Questions
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            Everything you need to know about EV doorstep servicing, battery diagnostics, pricing, warranty guarantees, and franchise partnerships.
          </p>

          {/* Search Input Bar */}
          <div className="max-w-xl mx-auto pt-4 relative">
            <Search className="w-5 h-5 text-[#00D084] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. battery warranty, visiting fee, Ather repair...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050c08] border border-white/20 focus:border-[#00D084] rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder:text-white/40 focus:outline-none transition-colors shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Main Filter & Accordion Section */}
      <section className="py-12 px-6 max-w-5xl mx-auto space-y-8">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4 border-b border-white/10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#00D084] text-[#020403] shadow-[0_0_15px_rgba(0,208,132,0.3)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl overflow-hidden transition-all hover:border-[#00D084]/50"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D084] block font-bold">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00D084] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#00D084]/20 border-[#00D084]/40" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-white/80 leading-relaxed font-light border-t border-white/10 mt-2 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-16 backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-8 space-y-3">
              <HelpCircle className="w-10 h-10 text-white/30 mx-auto" />
              <h4 className="text-lg font-bold text-white">No questions found</h4>
              <p className="text-xs text-white/60 font-light">
                Try clearing your search query or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-[#00D084] text-[#020403] text-xs font-bold uppercase cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="backdrop-blur-xl bg-[#00D084]/10 border border-[#00D084]/40 rounded-3xl p-8 text-center space-y-4">
          <MessageSquare className="w-8 h-8 text-[#00D084] mx-auto" />
          <h3 className="text-2xl font-bold text-white">Still Have Questions?</h3>
          <p className="text-xs text-white/70 font-light max-w-md mx-auto">
            Our technical support team is available 24/7 to answer your custom queries or schedule doorstep inspections.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Contact Support Advisor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
