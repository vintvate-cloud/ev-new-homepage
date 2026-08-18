import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { Nav } from "../components/Nav";
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Wrench,
  TrendingUp,
  Cpu,
  Search,
  X,
  PhoneCall,
  UserCheck,
  Award,
  DollarSign,
  ChevronRight,
  Send,
  Building,
  GraduationCap,
  ChevronLeft,
  Zap,
  Play,
  Heart,
  BookOpen,
  Users,
  Shield,
  Layers,
  Battery,
  Code,
} from "lucide-react";
import { toast } from "sonner";

import { Footer } from "../components/Footer";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
});

interface JobPosition {
  id: string;
  title: string;
  category: string;
  type: string;
  location: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  popular?: boolean;
}

const JOB_CATEGORIES = [
  "All Roles",
  "Technicians & Engineers",
  "Fleet Operations",
  "Software & Telematics",
  "Customer Experience",
  "Franchise & Hub Support",
];

const JOB_POSITIONS: JobPosition[] = [
  {
    id: "JOB-101",
    title: "Senior EV Diagnostic Specialist",
    category: "Technicians & Engineers",
    type: "Full-Time",
    location: "Bengaluru / Mumbai",
    experience: "3+ Years",
    salary: "₹4.5 - ₹7.2 LPA",
    description: "Lead complex diagnostics on high-voltage 2W & 3W battery packs, motor controllers, and CAN-bus telematics.",
    requirements: ["Deep understanding of BLDC motors and MCU controllers", "Experience with battery cell balancing and thermal scanning", "Valid 2-wheeler driving license"],
    popular: true,
  },
  {
    id: "JOB-102",
    title: "Master Battery & BMS Repair Technician",
    category: "Technicians & Engineers",
    type: "Full-Time",
    location: "Delhi NCR / Hyderabad",
    experience: "2+ Years",
    salary: "₹5.0 - ₹8.5 LPA",
    description: "Specialist role focused on cell-level battery diagnostics, nickel spot-welding, BMS firmware flashing, and thermal insulation.",
    requirements: ["Certificate in Electrical / Electronics Engineering or equivalent", "Hands-on experience with spot welding and BMS configuration", "Safety-first mindset with high-voltage systems"],
    popular: true,
  },
  {
    id: "JOB-103",
    title: "Field EV Service Technician (Doorstep & RSA)",
    category: "Technicians & Engineers",
    type: "Full-Time / Part-Time",
    location: "Pune / Chennai",
    experience: "1+ Years",
    salary: "₹3.5 - ₹5.5 LPA",
    description: "Provide rapid mobile doorstep service, roadside jumpstarts, and preventive health checks directly at customer locations.",
    requirements: ["Prior experience servicing EV scooters or motorcycles", "Good communication skills and customer handling", "Mobile smartphone with active GPS navigation"],
  },
  {
    id: "JOB-104",
    title: "Motor & Controller Refurbishment Lead",
    category: "Technicians & Engineers",
    type: "Full-Time",
    location: "Ahmedabad / Surat",
    experience: "4+ Years",
    salary: "₹4.0 - ₹6.5 LPA",
    description: "Manage component-level motor rewinding, MOSFET gate replacement, and high-temp waterproofing at our central hub.",
    requirements: ["Expertise in oscilloscope testing and MOSFET diagnosis", "Experience with hub motor seals and bearing press tools"],
  },
  {
    id: "JOB-105",
    title: "Fleet Operations Manager",
    category: "Fleet Operations",
    type: "Full-Time",
    location: "Mumbai / Gurgaon",
    experience: "3+ Years",
    salary: "₹6.0 - ₹10.0 LPA",
    description: "Manage commercial fleet client relationships, scheduled SLA maintenance turnarounds, and driver uptime tracking.",
    requirements: ["Experience in logistics fleet maintenance or B2B ops", "Proficiency in telemetry analytics tools and Excel"],
  },
  {
    id: "JOB-106",
    title: "EV Telematics & Firmware Test Engineer",
    category: "Software & Telematics",
    type: "Full-Time",
    location: "Remote / Bengaluru",
    experience: "2+ Years",
    salary: "₹8.0 - ₹14.0 LPA",
    description: "Architect and test IoT telematics data streams, OTA ECU update pipelines, and real-time battery analytics algorithms.",
    requirements: ["Strong proficiency in C/C++, Python, and CAN-Bus protocols", "Knowledge of MQTT, BLE, and embedded Linux"],
    popular: true,
  },
  {
    id: "JOB-107",
    title: "Service Hub & QR Inventory Specialist",
    category: "Franchise & Hub Support",
    type: "Full-Time",
    location: "Kolkata / Jaipur",
    experience: "1+ Years",
    salary: "₹4.5 - ₹7.0 LPA",
    description: "Oversee QR-coded OEM spare parts dispatch, daily hub inventory stock, and technician job card verification.",
    requirements: ["Experience with ERP inventory software and barcode scanning", "Organized and detail-oriented workflow management"],
  },
  {
    id: "JOB-108",
    title: "Customer Experience Specialist (EV Technical)",
    category: "Customer Experience",
    type: "Full-Time",
    location: "Remote / Hyderabad",
    experience: "1+ Years",
    salary: "₹3.0 - ₹5.0 LPA",
    description: "Help customers understand diagnostic telemetry reports, recommend maintenance care packs, and resolve service queries.",
    requirements: ["Excellent verbal and written communication skills in English & Hindi", "Technical interest in electric mobility"],
  },
];

const INNOVATIVE_PRODUCTS = [
  {
    id: "prod-1",
    title: "Smart Diagnostic Hubs",
    desc: "Autonomous OBD-II telemetry scanners, cell-level resistance analysis, and cloud ECU logging.",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    tag: "Hardware & Diagnostics",
  },
  {
    id: "prod-2",
    title: "Active BMS Cell Balancing",
    desc: "High-voltage battery active cell balancing, thermal imaging scanners, and capacity degradation audits.",
    img: "https://images.unsplash.com/photo-1558441719-2347b7341ed2?w=800&auto=format&fit=crop&q=80",
    tag: "Energy Systems",
  },
  {
    id: "prod-3",
    title: "IoT Telematics Suite",
    desc: "Over-the-air ECU firmware updates, CAN-bus data stream pipelines, and predictive failure alerts.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    tag: "Software Engineering",
  },
  {
    id: "prod-4",
    title: "Fleet Uptime Operations",
    desc: "SLA maintenance turnaround management, B2B commercial driver telemetry, and automated dispatch.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
    tag: "Operations & Cloud",
  },
];

const MANUFACTURING_DOMAINS = [
  {
    id: "software",
    title: "Software & Telematics",
    desc: "Architect cloud diagnostic pipelines, OTA ECU firmware flashes, and real-time battery analytics algorithms.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "hub-ops",
    title: "Hub Operations & Refurbishment",
    desc: "Join engineers, technicians, and production leads scaling component-level motor rewinding and MOSFET repairs.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "battery",
    title: "Battery & Cell Engineering",
    desc: "Solve the next generation of battery pack longevity, active cell balancing, and spot-welding thermal insulation.",
    img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&auto=format&fit=crop&q=80",
  },
];

const HIRING_STEPS = [
  {
    step: "01",
    title: "Online Application",
    desc: "Submit your profile and GitHub / portfolio link through our streamlined career portal in under 2 minutes.",
    icon: Send,
  },
  {
    step: "02",
    title: "Technical Screening",
    desc: "A 30-minute introductory conversation with our engineering leads to discuss your experience and aspirations.",
    icon: UserCheck,
  },
  {
    step: "03",
    title: "Hands-On Lab Audit",
    desc: "A practical diagnostic exercise on live EV hardware, battery packs, or telematics code streams.",
    icon: Wrench,
  },
  {
    step: "04",
    title: "Offer & Onboarding",
    desc: "Competitive compensation package, equity grants, and Day 1 welcome kit to kickstart your journey.",
    icon: Award,
  },
];

const LIFE_BENEFITS = [
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    desc: "Annual ₹75,000 stipend for technical certifications, EV engineering workshops, and global conferences.",
  },
  {
    icon: Zap,
    title: "EV Ownership Pass",
    desc: "Subsidized electric 2W/3W purchases, unlimited free charging across our 4,000+ hub network & home charger setup.",
  },
  {
    icon: Heart,
    title: "Full Health Coverage",
    desc: "Zero-deductible medical insurance for you, your spouse, and dependents including wellness checkups.",
  },
  {
    icon: TrendingUp,
    title: "Equity & Performance Grants",
    desc: "Competitive ESOP stock options and quarterly performance bonuses aligned with company milestones.",
  },
  {
    icon: Cpu,
    title: "Cutting-Edge Lab Tools",
    desc: "Work with high-grade digital oscilloscope benches, laser spot-welding units & AI diagnostic scanners.",
  },
  {
    icon: Users,
    title: "Fast-Track Career Growth",
    desc: "Transparent bi-annual performance reviews with accelerated promotion tracks for top engineering talent.",
  },
];

function CareersPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Roles");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [activeDomainIdx, setActiveDomainIdx] = useState(0);

  const [siteTheme, setSiteTheme] = useState<"dark" | "light">(() => {
    if (
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("theme-light")
    ) {
      return "light";
    }
    return "dark";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;

    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains("theme-light");
      setSiteTheme(isLight ? "light" : "dark");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Application Form State
  const [applyForm, setApplyForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "Mumbai",
    experience: "1-3 Years",
    notes: "",
  });

  const filteredJobs = useMemo(() => {
    return JOB_POSITIONS.filter((job) => {
      const matchesCategory =
        selectedCategory === "All Roles" || job.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.requirements.some((req) => req.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleApplyClick = (job: JobPosition) => {
    setSelectedJob(job);
    setApplyModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.fullName || !applyForm.mobile) {
      toast.error("Please fill in your Full Name and Mobile Number.");
      return;
    }
    toast.success(
      `Application Received! Our HR team will contact you shortly regarding the ${
        selectedJob ? selectedJob.title : "role"
      }.`
    );
    setApplyModalOpen(false);
    setApplyForm({
      fullName: "",
      mobile: "",
      email: "",
      city: "Mumbai",
      experience: "1-3 Years",
      notes: "",
    });
  };

  const isLight = siteTheme === "light";

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 ${
        isLight
          ? "bg-[#f8faf9] text-[#1a2320] selection:bg-[#00D084] selection:text-black"
          : "bg-[#030604] text-white selection:bg-[#00D084] selection:text-black"
      }`}
    >
      {/* Shared Global Header Navbar */}
      <Nav
        onOpenBooking={() => {
          setSelectedJob(JOB_POSITIONS[0]);
          setApplyModalOpen(true);
        }}
      />

      {/* =========================================================================
          1ST SECTION: WHOLE SCREEN VIDEO HERO
         ========================================================================= */}
      <section className="relative w-full h-screen min-h-[680px] overflow-hidden text-white flex items-center justify-center -mt-20">
        {/* Background Video Stream (with fallbacks) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105"
          poster="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&auto=format&fit=crop&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-working-in-a-factory-42867-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Vignette Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020403]/80 via-[#020403]/50 to-[#020403] pointer-events-none" />

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center relative z-10 px-6 pt-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/40 bg-[#00D084]/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00D084] mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Build The Future Of Electric Mobility
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.05] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            Join Our Engineering Revolution.
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-[#d0e0d6] font-normal max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Help us build cell balancing systems, IoT telematics, and autonomous EV care platforms.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#jobs-section"
              className="px-9 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_30px_rgba(0,208,132,0.4)] hover:scale-105 cursor-pointer"
            >
              EXPLORE OPEN POSITIONS
            </a>
            <a
              href="#mission-overview"
              className="px-9 py-4 rounded-full border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              OUR MISSION
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2ND SECTION: TESLA-STYLE OVERVIEW & SEARCH (Screenshot 1)
         ========================================================================= */}
      <section
        id="mission-overview"
        className={`py-24 px-6 border-b transition-colors duration-500 ${
          isLight ? "bg-white border-[#e0eae3]" : "bg-[#030604] border-white/10"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Impact Stats Grid (Screenshot 1 style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto border-y py-12 border-slate-200/10">
            <div className="text-center md:border-r border-slate-200/10">
              <div
                className={`text-5xl md:text-6xl font-black font-mono tracking-tight ${
                  isLight ? "text-[#1a2320]" : "text-white"
                }`}
              >
                40<span className="text-[#00D084]">+</span>
              </div>
              <div className="text-xs uppercase font-mono tracking-widest text-[#00D084] font-bold mt-2">
                Service Hubs
              </div>
            </div>

            <div className="text-center md:border-r border-slate-200/10">
              <div
                className={`text-5xl md:text-6xl font-black font-mono tracking-tight ${
                  isLight ? "text-[#1a2320]" : "text-white"
                }`}
              >
                500<span className="text-[#00D084]">+</span>
              </div>
              <div className="text-xs uppercase font-mono tracking-widest text-[#00D084] font-bold mt-2">
                Engineers & Specialists
              </div>
            </div>

            <div className="text-center">
              <div
                className={`text-5xl md:text-6xl font-black font-mono tracking-tight ${
                  isLight ? "text-[#1a2320]" : "text-white"
                }`}
              >
                1
              </div>
              <div className="text-xs uppercase font-mono tracking-widest text-[#00D084] font-bold mt-2">
                Zero Down-Time Mission
              </div>
            </div>
          </div>

          {/* "Become Part of Our Mission" Content */}
          <div className="max-w-4xl mx-auto text-left">
            <h2
              className={`text-4xl sm:text-5xl font-black tracking-tight mb-4 ${
                isLight ? "text-[#1a2320]" : "text-white"
              }`}
            >
              Become Part of Our Mission
            </h2>
            <p className="text-lg md:text-xl text-[#00D084] font-bold mb-6">
              Our mission is to accelerate the world's transition to zero-downtime electric mobility.
            </p>
            <p
              className={`text-base font-normal leading-relaxed ${
                isLight ? "text-[#4a5851]" : "text-white/70"
              }`}
            >
              Our technicians and software developers drive that mission forward through their work in sustainable transport, high-voltage battery cell balancing, IoT telematics, and automated hub logistics. Join us in solving complex EV diagnostic challenges that unlock the future of clean mobility across 40+ Indian cities.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3RD SECTION: WORK ON INNOVATIVE PRODUCTS (Screenshot 2)
         ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
            Engineering & Product
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-black tracking-tight mt-2 ${
              isLight ? "text-[#1a2320]" : "text-white"
            }`}
          >
            Work on Innovative Products
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INNOVATIVE_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className={`rounded-[28px] overflow-hidden flex flex-col justify-between transition-all duration-300 group cursor-pointer border ${
                isLight
                  ? "bg-white border-[#d6e3da] shadow-sm hover:shadow-xl"
                  : "bg-[#090f0c] border-white/10 shadow-xl hover:border-[#00D084]/40"
              }`}
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={prod.img}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase text-[#00D084] border border-[#00D084]/30">
                  {prod.tag}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className={`text-xl font-black mb-2 transition-colors ${
                      isLight ? "text-[#1a2320] group-hover:text-[#00D084]" : "text-white group-hover:text-[#00D084]"
                    }`}
                  >
                    {prod.title}
                  </h3>
                  <p
                    className={`text-xs font-normal leading-relaxed ${
                      isLight ? "text-[#52645a]" : "text-white/60"
                    }`}
                  >
                    {prod.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center text-xs font-bold text-[#00D084] gap-1 group-hover:translate-x-1 transition-transform">
                  Learn Engineering Scope <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4TH SECTION: MANUFACTURING & DOMAINS SHOWCASE (Screenshot 3)
         ========================================================================= */}
      <section
        className={`py-24 px-6 border-y ${
          isLight ? "bg-[#eef5f0] border-[#d6e3da]" : "bg-[#060b08] border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Main Showcase Image */}
          <div className="relative h-[420px] md:h-[500px] w-full rounded-[32px] overflow-hidden mb-10 shadow-2xl bg-slate-900 border border-white/10">
            <img
              src={MANUFACTURING_DOMAINS[activeDomainIdx].img}
              alt={MANUFACTURING_DOMAINS[activeDomainIdx].title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] mb-2 block">
                CORE DOMAIN • 0{activeDomainIdx + 1}
              </span>
              <h3 className="text-3xl sm:text-4xl font-black mb-2">
                {MANUFACTURING_DOMAINS[activeDomainIdx].title}
              </h3>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl font-light">
                {MANUFACTURING_DOMAINS[activeDomainIdx].desc}
              </p>
            </div>
          </div>

          {/* Domain Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MANUFACTURING_DOMAINS.map((domain, index) => (
              <button
                key={domain.id}
                onClick={() => setActiveDomainIdx(index)}
                className={`p-6 rounded-[24px] text-left transition-all cursor-pointer border ${
                  activeDomainIdx === index
                    ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-md scale-[1.02]"
                    : isLight
                    ? "bg-white border-[#d6e3da] text-[#1a2320] hover:bg-[#e2ebe4]"
                    : "bg-[#090f0c] border-white/10 text-white hover:bg-white/10"
                }`}
              >
                <div className="text-xs font-mono font-bold uppercase tracking-wider mb-2 opacity-80">
                  0{index + 1}. {domain.title}
                </div>
                <div className="text-sm font-black underline">Learn More</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5TH SECTION: ACCELERATE YOUR CAREER — INTERNSHIPS (Screenshot 4)
         ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-black tracking-tight mb-3 ${
              isLight ? "text-[#1a2320]" : "text-white"
            }`}
          >
            Accelerate Your Career
          </h2>
          <p
            className={`text-base font-normal ${
              isLight ? "text-[#52645a]" : "text-white/70"
            }`}
          >
            Gain hands-on experience with our internship and graduate career programs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <h3
              className={`text-3xl sm:text-4xl font-black mb-4 ${
                isLight ? "text-[#1a2320]" : "text-white"
              }`}
            >
              Internships & Apprenticeships
            </h3>
            <p
              className={`text-sm md:text-base font-normal leading-relaxed mb-8 ${
                isLight ? "text-[#4a5851]" : "text-white/70"
              }`}
            >
              Work on high-impact EV projects and expand your technical skills. MY EV SERVICE interns are expected to perform to the same standard of excellence as our full-time engineers—which is why we often hire them back.
            </p>

            <button
              onClick={() => {
                setSelectedCategory("Technicians & Engineers");
                window.scrollTo({ top: 2200, behavior: "smooth" });
              }}
              className="px-8 py-3.5 rounded-full bg-[#101412] text-white hover:bg-black text-xs font-black uppercase tracking-widest transition-all shadow-md cursor-pointer border border-white/10"
            >
              LEARN MORE
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="relative h-[380px] sm:h-[440px] w-full rounded-[32px] overflow-hidden shadow-2xl bg-slate-900 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
                alt="MY EV SERVICE Internships & Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6TH SECTION: HOW WE HIRE (Step-by-Step Selection Process)
         ========================================================================= */}
      <section
        className={`py-24 px-6 border-y ${
          isLight ? "bg-[#eef5f0] border-[#d6e3da]" : "bg-[#060b08] border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Transparent Hiring
            </span>
            <h2
              className={`text-4xl sm:text-5xl font-black tracking-tight mt-2 mb-3 ${
                isLight ? "text-[#1a2320]" : "text-white"
              }`}
            >
              How We Hire
            </h2>
            <p
              className={`text-base font-normal ${
                isLight ? "text-[#52645a]" : "text-white/70"
              }`}
            >
              A straightforward 4-step selection journey designed for engineering talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIRING_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className={`rounded-[28px] p-6 flex flex-col justify-between border transition-all duration-300 ${
                    isLight
                      ? "bg-white border-[#d6e3da] shadow-sm hover:shadow-xl"
                      : "bg-[#090f0c] border-white/10 shadow-xl hover:border-[#00D084]/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-black font-mono text-[#00D084]">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/20 flex items-center justify-center text-[#00D084]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3
                      className={`text-xl font-black mb-2 ${
                        isLight ? "text-[#1a2320]" : "text-white"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-xs font-normal leading-relaxed ${
                        isLight ? "text-[#52645a]" : "text-white/60"
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7TH SECTION: LIFE AT MY EV SERVICE (Culture & Perks)
         ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
            Culture & Benefits
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-black tracking-tight mt-2 mb-3 ${
              isLight ? "text-[#1a2320]" : "text-white"
            }`}
          >
            Life at MY EV SERVICE
          </h2>
          <p
            className={`text-base font-normal ${
              isLight ? "text-[#52645a]" : "text-white/70"
            }`}
          >
            We empower our engineers with competitive equity, cutting-edge diagnostic gear, and continuous growth opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LIFE_BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={i}
                className={`rounded-[28px] p-6 border transition-all duration-300 ${
                  isLight
                    ? "bg-white border-[#d6e3da] shadow-sm hover:shadow-xl"
                    : "bg-[#090f0c] border-white/10 shadow-xl hover:border-[#00D084]/40"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/20 flex items-center justify-center text-[#00D084] mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  className={`text-xl font-black mb-2 ${
                    isLight ? "text-[#1a2320]" : "text-white"
                  }`}
                >
                  {benefit.title}
                </h3>
                <p
                  className={`text-xs font-normal leading-relaxed ${
                    isLight ? "text-[#52645a]" : "text-white/60"
                  }`}
                >
                  {benefit.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          8TH SECTION: OPEN POSITIONS FILTERABLE LISTINGS
         ========================================================================= */}
      <section id="jobs-section" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Current Openings
            </span>
            <h2
              className={`text-4xl font-black tracking-tight mt-1 mb-2 ${
                isLight ? "text-[#1a2320]" : "text-white"
              }`}
            >
              Explore All Engineering & Ops Roles
            </h2>
            <p
              className={`text-sm font-normal ${
                isLight ? "text-[#52645a]" : "text-white/70"
              }`}
            >
              Filter by team department or search for your specific role.
            </p>
          </div>

          {/* Search Bar inside Explore All Engineering & Ops Roles Section */}
          <div className="w-full md:w-80 shrink-0">
            <div
              className={`relative flex items-center rounded-full px-4 py-2.5 border shadow-sm ${
                isLight
                  ? "bg-white border-[#c5d6ca] text-[#1a2320]"
                  : "bg-[#090f0c] border-white/15 text-white"
              }`}
            >
              <Search className="w-4 h-4 text-[#00D084] mr-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Role or Department..."
                className="w-full bg-transparent text-xs focus:outline-none placeholder-slate-400 font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {JOB_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00D084] text-[#020403] shadow-md scale-105"
                    : isLight
                    ? "bg-[#e2ebe4] text-[#334139] hover:bg-[#d5e2d8] hover:text-[#1a2320]"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`rounded-[28px] p-6 flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1 ${
                isLight
                  ? "bg-white border-[#d6e3da] shadow-sm hover:shadow-xl"
                  : "bg-[#090f0c] border-white/10 shadow-xl hover:border-[#00D084]/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/20 px-3 py-1 rounded-full">
                    {job.category}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      isLight ? "text-[#607267]" : "text-white/50"
                    }`}
                  >
                    {job.type}
                  </span>
                </div>

                <h3
                  className={`text-2xl font-black mb-2 ${
                    isLight ? "text-[#1a2320]" : "text-white"
                  }`}
                >
                  {job.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono mb-4 opacity-75">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00D084]" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00D084]" /> {job.experience}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-[#00D084]">
                    <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                  </span>
                </div>

                <p
                  className={`text-xs font-normal leading-relaxed mb-6 ${
                    isLight ? "text-[#52645a]" : "text-white/60"
                  }`}
                >
                  {job.description}
                </p>

                <div className="space-y-2 mb-6">
                  {job.requirements.map((req, ri) => (
                    <div key={ri} className="flex items-start gap-2 text-xs opacity-85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/10 flex items-center justify-between">
                <span className="text-xs font-mono opacity-50">Ref: {job.id}</span>
                <button
                  onClick={() => handleApplyClick(job)}
                  className="px-6 py-2.5 rounded-full bg-[#00D084] hover:bg-[#00e08f] text-[#020403] text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          9TH SECTION: JOIN US FULL-BLEED CALL-TO-ACTION (Screenshot 5)
         ========================================================================= */}
      <section className="relative w-full h-[520px] overflow-hidden text-white flex items-center justify-center">
        {/* Full-bleed background image with team hands together */}
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&fit=crop&q=80"
          alt="Join Us Teamwork"
          className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/70 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10 px-6">
          <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-lg">
            Join Us
          </h2>
          <p className="text-base sm:text-xl text-[#d0e0d6] font-light max-w-xl mx-auto mb-8 drop-shadow-md">
            Help us build a world of zero-downtime sustainable mobility.
          </p>

          <button
            onClick={() => {
              setSelectedCategory("All Roles");
              window.scrollTo({ top: 2200, behavior: "smooth" });
            }}
            className="px-10 py-4 rounded-full bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-black uppercase tracking-widest transition-all shadow-2xl hover:scale-105 cursor-pointer"
          >
            EXPLORE JOBS
          </button>
        </div>
      </section>

      {/* Global Shared Footer */}
      <Footer />

      {/* Application Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`border rounded-[32px] max-w-lg w-full p-6 md:p-8 relative overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 ${
              isLight
                ? "bg-white border-[#d6e3da] text-[#1a2320]"
                : "bg-[#090f0c] border-white/15 text-white"
            }`}
          >
            <button
              onClick={() => setApplyModalOpen(false)}
              className={`absolute top-5 right-5 p-2 rounded-full transition-colors cursor-pointer ${
                isLight ? "text-slate-400 hover:text-slate-900 bg-slate-100" : "text-white/40 hover:text-white bg-white/10"
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D084]">
                Job Application Portal
              </span>
              <h3 className="text-2xl font-black mt-1">
                {selectedJob ? selectedJob.title : "Direct Application"}
              </h3>
              <p className="text-xs opacity-75 mt-1">
                {selectedJob ? `${selectedJob.category} • ${selectedJob.location}` : "Join the MY EV SERVICE team"}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={applyForm.fullName}
                  onChange={(e) => setApplyForm({ ...applyForm, fullName: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#00D084] ${
                    isLight
                      ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320]"
                      : "bg-[#030604] border-white/15 text-white"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={applyForm.mobile}
                    onChange={(e) => setApplyForm({ ...applyForm, mobile: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#00D084] ${
                      isLight
                        ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320]"
                        : "bg-[#030604] border-white/15 text-white"
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={applyForm.email}
                    onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                    className={`w-full border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#00D084] ${
                      isLight
                        ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320]"
                        : "bg-[#030604] border-white/15 text-white"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  GitHub / Portfolio / LinkedIn Link
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/yourusername"
                  value={applyForm.notes}
                  onChange={(e) => setApplyForm({ ...applyForm, notes: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#00D084] ${
                    isLight
                      ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320]"
                      : "bg-[#030604] border-white/15 text-white"
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-md cursor-pointer mt-2"
              >
                SUBMIT APPLICATION
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
