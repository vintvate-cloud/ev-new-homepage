import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
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

const JOB_POSITIONS: JobPosition[] = [];

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

  const [applyForm, setApplyForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "Pune",
    notes: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-serif overflow-x-hidden">
      {/* Navigation */}
      <Nav />

      {/* =========================================================================
          1. HERO HEADER SECTION
         ========================================================================= */}
      <section className="relative pt-36 pb-20 px-6 border-b border-white/10 bg-gradient-to-b from-[#080e0b] to-[#020403] overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#00D084]/10 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/40 bg-[#00D084]/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00D084]">
            <Sparkles className="w-3.5 h-3.5" />
            We're Hiring
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white leading-[1.08]">
            Build the Future of <br />
            <span className="text-[#00D084]">EV Mobility in India</span>
          </h1>

          <p className="text-base sm:text-lg text-white/70 font-serif font-normal leading-relaxed max-w-2xl mx-auto">
            Join India's fastest-growing EV service platform. Work on cutting-edge technology, serve a green mission, and grow your career with us.
          </p>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto pt-8 border-t border-white/10 mt-8">
            <div className="bg-[#050907] border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">150+</div>
              <div className="text-[11px] font-serif text-white/50 uppercase mt-0.5">Team Members</div>
            </div>
            <div className="bg-[#050907] border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#00D084] font-mono">40+</div>
              <div className="text-[11px] font-serif text-white/50 uppercase mt-0.5">Cities</div>
            </div>
            <div className="bg-[#050907] border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">0</div>
              <div className="text-[11px] font-serif text-white/50 uppercase mt-0.5">Open Positions</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WHY WORK WITH US SECTION
         ========================================================================= */}
      <section className="py-24 px-6 border-b border-white/10 bg-[#020403] font-serif">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] block mb-2">
            Perks & Culture
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mb-16 tracking-tight">
            Why Work With Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_WORK_WITH_US.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#050907] border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-6 text-left space-y-3 transition-all group"
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
      <section className="py-24 px-6 border-b border-white/10 bg-[#040806] font-serif">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIRING_STEPS.map((step) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-[#020503] border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-6 text-left space-y-4 transition-all relative overflow-hidden group"
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
      <section id="open-positions" className="py-24 px-6 max-w-7xl mx-auto font-serif border-b border-white/10">
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
                  : "bg-[#050907] text-white/70 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Roles List / Empty State */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#050907] border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group"
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
              </div>
            ))}
          </div>
        ) : (
          /* Empty State for Department with zero active roles (e.g. Technology) */
          <div className="bg-[#050907] border border-white/10 rounded-3xl p-12 text-center space-y-4 max-w-2xl mx-auto">
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
      </section>

      {/* =========================================================================
          5. DON'T SEE YOUR ROLE? GENERAL APPLICATION
         ========================================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto font-serif">
        <div className="bg-[#050907] border-2 border-[#00D084]/40 rounded-3xl p-8 md:p-12 text-center space-y-4 relative overflow-hidden">
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
      </section>

      {/* =========================================================================
          6. FOOTER CALLOUT BANNER
         ========================================================================= */}
      <section className="py-24 px-6 border-t border-white/10 bg-gradient-to-b from-[#080d0a] to-[#020403] font-serif text-center">
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

      {/* Interactive Application Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-serif">
          <div className="bg-[#060c09] border border-white/10 rounded-3xl max-w-lg w-full p-6 md:p-8 relative overflow-hidden shadow-2xl">
            <button
              onClick={() => setApplyModalOpen(false)}
              className="absolute top-5 right-5 text-white/40 hover:text-white bg-white/5 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-serif font-bold text-[#00D084] uppercase tracking-widest">
                Career Application
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">
                {selectedJob ? selectedJob.title : "General Application"}
              </h3>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-serif text-white/60 block mb-1">Full Name *</label>
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
                  <label className="text-[11px] font-serif text-white/60 block mb-1">Mobile Number *</label>
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
                  <label className="text-[11px] font-serif text-white/60 block mb-1">Email (optional)</label>
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
                <label className="text-[11px] font-serif text-white/60 block mb-1">City / Location</label>
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
                className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                Submit Application <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
