import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Wrench,
  TrendingUp,
  Search,
  X,
  UserCheck,
  Award,
  Send,
  Zap,
  Heart,
  Users,
  DollarSign,
  ChevronRight,
  FilterX,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
});

interface JobPosition {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
}

const DEPARTMENTS = [
  "All Departments",
  "Technology",
  "Operations",
  "Franchise",
  "Customer Support",
];

const JOB_POSITIONS: JobPosition[] = [
  {
    id: "tech-01",
    title: "Senior EV IoT Telematics Engineer",
    department: "Technology",
    type: "Full-Time",
    location: "Pune (Hinjawadi Tech Park)",
    experience: "4-7 Years",
    salary: "₹18,0,000 - ₹26,0,000 PA",
    description: "Lead design of our next-gen telemetry & battery health monitoring agent. Build real-time IoT firmware protocols for electric two-wheeler BMS interfaces.",
    requirements: [
      "Expertise in ESP32, STM32 microcontrollers, FreeRTOS, and Embedded C++ development.",
      "Experience interfacing with CAN bus, OBD-II, and cellular telemetry APIs.",
      "Deep understanding of BMS telemetry parsing, SoC / SoH battery state tracking models."
    ]
  },
  {
    id: "tech-02",
    title: "Full Stack Engineer (GSAP, React, Vite)",
    department: "Technology",
    type: "Full-Time",
    location: "Pune / Remote",
    experience: "2-5 Years",
    salary: "₹10,0,000 - ₹16,0,000 PA",
    description: "Develop the digital hub experience. Work on user interfaces, interactive bento grids, and high-performance booking flows with GSAP, React Router, and TailwindCSS.",
    requirements: [
      "Strong React/TypeScript foundations with extensive experience in React Router.",
      "Proficient in GSAP, ScrollTrigger, Framer Motion, and high-performance web animations.",
      "Experience optimizing Vite projects for production rendering and load performance."
    ]
  },
  {
    id: "ops-01",
    title: "Master EV Diagnostic Specialist",
    department: "Operations",
    type: "Full-Time",
    location: "Pune (Bhavdhan Hub)",
    experience: "3-6 Years",
    salary: "₹6,0,000 - ₹9,0,000 PA",
    description: "Perform advanced cell balancing, battery pack repair, and high-voltage circuit diagnostics at our premium service hub. Train junior roadside specialists.",
    requirements: [
      "Autobot Master Academy Certification or equivalent advanced EV diploma.",
      "Expertise in digital oscilloscope diagnostics, thermal cameras, and cell spot welding tools.",
      "Strong adherence to high-voltage workshop safety guidelines."
    ]
  },
  {
    id: "ops-02",
    title: "Field Service Lead (Doorstep Delivery)",
    department: "Operations",
    type: "Full-Time",
    location: "Mumbai Hub",
    experience: "2-4 Years",
    salary: "₹4,50,000 - ₹6,50,000 PA",
    description: "Manage a fleet of 24/7 mobile roadside assistance vans (RSA). Direct tech dispatches, digital job cards, and ensure high doorstep customer satisfaction.",
    requirements: [
      "Prior experience in automobile service fleet management or roadside assistance ops.",
      "Familiarity with digital job cards and Google Maps route optimization tools.",
      "Excellent customer-facing communication and task leadership."
    ]
  },
  {
    id: "fran-01",
    title: "Franchise Expansion Manager",
    department: "Franchise",
    type: "Full-Time",
    location: "Pan-India Travel",
    experience: "3-5 Years",
    salary: "₹8,0,000 - ₹12,0,000 PA + Incentives",
    description: "Drive partnership conversions for My EV Service hubs. Audit candidate locations, align layout specifications, and onboard new franchise owners.",
    requirements: [
      "Familiarity with automotive franchise or retail dealership dealer development models.",
      "Ability to travel extensively to evaluate candidate properties and city hub potential.",
      "Excellent commercial negotiations and legal document overview."
    ]
  },
  {
    id: "support-01",
    title: "Customer Support Team Lead",
    department: "Customer Support",
    type: "Full-Time",
    location: "Pune (Bhavdhan Hub)",
    experience: "3-5 Years",
    salary: "₹5,00,000 - ₹7,50,000 PA",
    description: "Oversee the customer helpline and booking desk. Handle escalations, optimize response SLAs, and coordinate with workshop leads for delivery updates.",
    requirements: [
      "Proven team leadership experience in a customer service center, preferably automobile.",
      "Strong command of Hindi, English, and Marathi (verbal & written).",
      "Comfortable with ticketing systems, WhatsApp Business API portals, and CRM database inputs."
    ]
  }
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

const WHY_WORK_WITH_US = [
  {
    icon: TrendingUp,
    title: "Growth Path",
    desc: "Clear career progression with structured learning opportunities and leadership tracks.",
  },
  {
    icon: ShieldCheck,
    title: "Health Cover",
    desc: "Comprehensive medical health insurance for you, your spouse, and family dependents.",
  },
  {
    icon: DollarSign,
    title: "Performance Bonus",
    desc: "Quarterly financial incentives and performance bonuses based on achievements.",
  },
  {
    icon: Users,
    title: "Great Culture",
    desc: "Work alongside passionate EV engineers and automotive professionals pushing clean mobility forward.",
  },
];

function CareersPage() {
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const contentUpRef = useRef<HTMLDivElement>(null);

  // Lenis Smooth Scroll for Career Drawer
  const drawerWrapperRef = useRef<HTMLDivElement>(null);
  const drawerContentRef = useRef<HTMLDivElement>(null);

  const [applyForm, setApplyForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "Pune",
    notes: "",
  });

  const filteredJobs = useMemo(() => {
    return JOB_POSITIONS.filter((job) => {
      const matchesDept =
        selectedDept === "All Departments" || job.department === selectedDept;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query);

      return matchesDept && matchesSearch;
    });
  }, [selectedDept, searchQuery]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lenis Smooth Scroll Setup for drawer (hides scrollbars & implements smooth scroll)
  useEffect(() => {
    if (!applyModalOpen || !drawerWrapperRef.current || !drawerContentRef.current) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawerLenis = new Lenis({
      wrapper: drawerWrapperRef.current,
      content: drawerContentRef.current,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    let rafId: number;
    function update(time: number) {
      drawerLenis.raf(time);
      rafId = requestAnimationFrame(update);
    }
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      drawerLenis.destroy();
      document.body.style.overflow = originalOverflow;
    };
  }, [applyModalOpen]);

  // GSAP ScrollTrigger Animations (Matching Media Page Hero)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (heroTextRef.current && contentOverlayRef.current) {
        gsap.to(heroTextRef.current, {
          opacity: 0,
          scale: 0.9,
          y: -50,
          ease: "power1.out",
          scrollTrigger: {
            trigger: contentOverlayRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 0.6,
          },
        });
      }

      if (contentUpRef.current) {
        gsap.fromTo(
          contentUpRef.current,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentUpRef.current,
              start: "top 90%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Why Work With Us cards staggered 3D perspective slide-in
      gsap.fromTo(
        ".why-work-card",
        { opacity: 0, y: 70, rotateX: 18, transformPerspective: 900 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-work-cards-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 4. Hiring Steps staggered springy zoom
      gsap.fromTo(
        ".hiring-step-card",
        { opacity: 0, scale: 0.88, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.75,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".hiring-steps-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 5. General Application Banner slide-up with subtle scale
      gsap.fromTo(
        ".general-apply-banner",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".general-apply-banner",
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    ScrollTrigger.refresh();
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      ctx.revert();
      clearTimeout(t);
    };
  }, []);

  // Refresh GSAP ScrollTrigger dynamically when jobs list filters change, without page reload
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [filteredJobs]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.fullName || !applyForm.mobile) {
      toast.error("Please fill in your Full Name and Mobile Number.");
      return;
    }
    toast.success(
      `Application Received! Our HR team will contact you shortly regarding the ${
        selectedJob ? selectedJob.title : "general application"
      }.`
    );
    setApplyModalOpen(false);
    setApplyForm({
      fullName: "",
      mobile: "",
      email: "",
      city: "Pune",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#070908] text-white selection:bg-[#00D084] selection:text-black font-sans relative overflow-x-hidden">
      {/* Navigation */}
      <Nav />

      {/* Main Container */}
      <div className="relative min-h-screen">

        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background Poster Image */}
          <img
            src="/ev-workshop-careers.png"
            alt="EV Workshop Careers"
            className="w-full h-full object-cover object-center opacity-85 pointer-events-none"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-black/40 to-black/60 pointer-events-none" />

          {/* Hero Text Content Container */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center items-center px-6 max-w-4xl mx-auto space-y-6 z-10 transition-all pointer-events-none text-center"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Build the Future of <br />
              <span className="text-[#00D084] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">EV Mobility in India</span>
            </h1>

            <p className="text-base sm:text-lg text-white font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] bg-black/50 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-white/15">
              Join India's fastest-growing EV service platform. Work on cutting-edge technology, serve a green mission, and grow your career with us.
            </p>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto pt-6 border-t border-white/20 mt-6 w-full pointer-events-auto">
              <div className="bg-[#0b0f0c]/90 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shadow-2xl">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono drop-shadow-md">150+</div>
                <div className="text-[11px] text-white/80 font-bold uppercase tracking-wider mt-0.5">Team Members</div>
              </div>
              <div className="bg-[#0b0f0c]/90 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shadow-2xl">
                <div className="text-2xl sm:text-3xl font-black text-[#00D084] font-mono drop-shadow-md">40+</div>
                <div className="text-[11px] text-white/80 font-bold uppercase tracking-wider mt-0.5">Cities</div>
              </div>
              <div className="bg-[#0b0f0c]/90 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shadow-2xl">
                <div className="text-2xl sm:text-3xl font-black text-[#00D084] font-mono drop-shadow-md">
                  {JOB_POSITIONS.length}
                </div>
                <div className="text-[11px] text-white/80 font-bold uppercase tracking-wider mt-0.5">Open Positions</div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. CONTENT OVERLAY LAYER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={contentOverlayRef}
          className="relative z-10 bg-[#070908] min-h-screen mt-[calc(100vh-80px)] pt-12 rounded-t-[40px] border-t border-white/10 shadow-2xl"
        >
          <div ref={contentUpRef}>

      {/* =========================================================================
          2. WHY WORK WITH US SECTION
         ========================================================================= */}
      <section className="py-24 px-6 bg-[#020403] font-serif">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] block mb-2">
            Perks & Culture
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mb-16 tracking-tight">
            Why Work With Us
          </h2>

          <div className="why-work-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_WORK_WITH_US.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="why-work-card bg-[#050907] border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-6 text-left space-y-3 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] group-hover:scale-105 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#00D084] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 font-serif leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. HOW WE HIRE SECTION (Kept as requested)
         ========================================================================= */}
      <section className="py-24 px-6 bg-[#020403] font-serif">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Transparent Hiring
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight">
              How We Hire
            </h2>
            <p className="text-white/70 text-base font-serif font-light">
              A straightforward 4-step selection journey designed for engineering talent.
            </p>
          </div>

          <div className="hiring-steps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIRING_STEPS.map((step) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.step}
                  className="hiring-step-card bg-[#020503] border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-6 text-left space-y-4 transition-all relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-black text-[#00D084] opacity-80">
                      {step.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/5 text-white/60">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#00D084] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-white/60 font-serif leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. OPEN POSITIONS SECTION WITH TABS
         ========================================================================= */}
      <section id="open-positions" className="py-24 px-6 bg-[#020403] font-serif">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Join The Team
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight">
              Open Positions
            </h2>
            <p className="text-white/70 text-base font-serif font-light">
              Find your perfect role at My EV Services India
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-5 py-2.5 rounded-full text-xs font-serif font-bold transition-all cursor-pointer border ${
                  selectedDept === dept
                    ? "bg-[#00D084] text-[#020403] border-[#00D084]"
                    : "bg-[#020503] text-white/70 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Roles List / Empty State */}
          {filteredJobs.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false, margin: "-60px" }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: "easeOut",
                      delay: (idx % 2) * 0.08
                    }}
                    key={job.id}
                    className="bg-[#020503] border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group"
                  >
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[#00D084] font-bold">
                          {job.department}
                        </span>
                        <span className="text-white/50">{job.type} • {job.location}</span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#00D084] transition-colors">
                        {job.title}
                      </h3>

                      <p className="text-xs text-white/60 font-serif leading-relaxed">
                        {job.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-white/50 pt-2 border-t border-white/10">
                        <span>Experience: {job.experience}</span>
                        <span>Salary: {job.salary}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setApplyModalOpen(true);
                      }}
                      className="w-full py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-serif font-extrabold uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty State for Department with zero active roles (e.g. Technology) */
            <div className="bg-[#020503] border border-white/10 rounded-3xl p-12 text-center space-y-4 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-white/40">
                <FilterX className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                No openings in this department currently. Check back soon!
              </h3>
              <p className="text-xs text-white/50 font-serif">
                You can also submit a general application below, and our HR team will keep your resume on file.
              </p>
              <button
                onClick={() => setSelectedDept("All Departments")}
                className="px-6 py-2.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer"
              >
                View All Roles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          5. DON'T SEE YOUR ROLE? GENERAL APPLICATION
         ========================================================================= */}
      <section className="py-20 px-6 bg-[#020403] font-serif">
        <div className="max-w-7xl mx-auto">
          <div className="general-apply-banner bg-[#020503] border-2 border-[#00D084]/40 rounded-3xl p-8 md:p-12 text-center space-y-4 relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-white">
              Don't See Your Role?
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-serif font-light max-w-xl mx-auto">
              We're always looking for talented people. Send us your resume and we'll keep you in mind.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedJob(null);
                  setApplyModalOpen(true);
                }}
                className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg"
              >
                Submit General Application
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FOOTER CALLOUT BANNER
         ========================================================================= */}
      <section className="py-24 px-6 bg-[#020403] font-serif text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#00D084]">
            India's #1 EV Service Network
          </span>

          <h2 className="text-4xl sm:text-6xl font-serif font-black text-white tracking-tight leading-tight">
            Your EV Deserves <span className="text-[#00D084]">Expert Care</span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-serif font-light max-w-2xl mx-auto">
            Certified technicians. Doorstep service. Genuine parts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => toast.success("Booking system opened!")}
              className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer"
            >
              Book a Service
            </button>
            <Link
              to="/store"
              className="px-8 py-4 rounded-full border border-white/20 text-white text-xs font-serif font-bold uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
            >
              Explore Parts
            </Link>
            <Link
              to="/find-services"
              className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-xs font-serif font-bold uppercase tracking-widest hover:bg-white/20 transition-all cursor-pointer"
            >
              Find Centers Near You
            </Link>
          </div>
        </div>
      </section>

          </div>
        </div>
      </div>

      {/* Interactive Application Sidebar Drawer */}
      <AnimatePresence>
        {applyModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setApplyModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
            {/* Sidebar drawer (Floating curved card with scrollbars hidden) */}
            <motion.div
              initial={{ x: "110%" }}
              animate={{ x: 0 }}
              exit={{ x: "110%" }}
              transition={{ type: "spring", damping: 32, stiffness: 220 }}
              className="fixed right-4 sm:right-6 top-4 sm:top-6 bottom-4 sm:bottom-6 z-50 w-full max-w-3xl bg-[#060c09] border border-white/10 rounded-[32px] md:rounded-[40px] shadow-2xl flex flex-col font-serif text-white overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setApplyModalOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white bg-[#060c09]/80 backdrop-blur-md hover:bg-white/5 border border-white/10 p-2.5 rounded-full transition-colors cursor-pointer z-20 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Lenis Wrapper (No Visible Scrollbar) */}
              <div
                ref={drawerWrapperRef}
                data-lenis-prevent="true"
                className="flex-1 overflow-y-auto p-6 md:p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                <div ref={drawerContentRef} className="space-y-8 pb-4">
                  {/* 1. Header / Badge */}
                  <div>
                    <span className="text-[10px] font-serif font-bold text-[#00D084] uppercase tracking-widest bg-[#00D084]/15 px-3 py-1 rounded-full border border-[#00D084]/30 inline-block mb-3">
                      {selectedJob ? selectedJob.department : "General Application"}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1 leading-tight">
                      {selectedJob ? selectedJob.title : "Join our Talent Network"}
                    </h3>
                    {selectedJob && (
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-white/50 font-mono">
                        <span>📍 {selectedJob.location}</span>
                        <span>•</span>
                        <span>💼 {selectedJob.type}</span>
                        <span>•</span>
                        <span>⏳ {selectedJob.experience}</span>
                        <span>•</span>
                        <span>💰 {selectedJob.salary}</span>
                      </div>
                    )}
                  </div>

                  {/* 2. Job details (Description & Requirements) */}
                  {selectedJob ? (
                    <div className="space-y-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-[#00D084] uppercase tracking-wider">Role Overview</h4>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                          {selectedJob.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-[#00D084] uppercase tracking-wider">Requirements & Qualifications</h4>
                        <div className="space-y-2">
                          {selectedJob.requirements.map((req, ri) => (
                            <div key={ri} className="flex items-start gap-3 text-xs sm:text-sm text-white/80 font-light">
                              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
                      <h4 className="text-sm font-bold text-[#00D084] uppercase tracking-wider">General Application</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                        Don't see a vacancy that matches your skillset? Apply here to join our talent pool. Our recruiting team regularly reviews general profiles for upcoming hub expansions and technology roles.
                      </p>
                    </div>
                  )}

                  {/* 3. Form */}
                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Submit your details</h4>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="text-[11px] text-white/60 block mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={applyForm.fullName}
                          onChange={(e) => setApplyForm({ ...applyForm, fullName: e.target.value })}
                          className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-serif focus:outline-none focus:border-[#00D084]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-white/60 block mb-1">Mobile Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="10-digit number"
                            value={applyForm.mobile}
                            onChange={(e) => setApplyForm({ ...applyForm, mobile: e.target.value })}
                            className="w-full bg-[#020403] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white font-serif focus:outline-none focus:border-[#00D084]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-white/60 block mb-1">Email (optional)</label>
                          <input
                            type="email"
                            placeholder="you@example.com"
                            value={applyForm.email}
                            onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                            className="w-full bg-[#020403] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white font-serif focus:outline-none focus:border-[#00D084]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-white/60 block mb-1">City / Location</label>
                        <input
                          type="text"
                          placeholder="e.g. Pune, Bangalore"
                          value={applyForm.city}
                          onChange={(e) => setApplyForm({ ...applyForm, city: e.target.value })}
                          className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-serif focus:outline-none focus:border-[#00D084]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4 shadow-lg hover:shadow-[0_0_20px_rgba(0,208,132,0.3)]"
                      >
                        Submit Application <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
