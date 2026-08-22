import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  Building2,
  CheckCircle2,
  MapPin,
  CalendarCheck,
  Send,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Phone,
  User,
  Mail,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

// Validate / parse search params for /franchise-apply?city=Pune&area=Aundh&pincode=411007
export const Route = createFileRoute("/franchise-apply")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      city: typeof search.city === "string" ? search.city : "Pune",
      area: typeof search.area === "string" ? search.area : "Aundh",
      pincode: typeof search.pincode === "string" ? search.pincode : "411007",
    };
  },
  component: FranchiseApplyPage,
});

function FranchiseApplyPage() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate();

  // Auto-detected parameters from URL
  const detectedCity = searchParams.city || "Pune";
  const detectedArea = searchParams.area || "Aundh";
  const detectedPincode = searchParams.pincode || "411007";

  // Form State initialized with detected details
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: detectedCity,
    area: detectedArea,
    pincode: detectedPincode,
    modelType: "Executive Hub (2W & 3W)",
    investmentBudget: "₹15 Lakhs - ₹25 Lakhs",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFormData((prev) => ({
      ...prev,
      city: detectedCity,
      area: detectedArea,
      pincode: detectedPincode,
    }));
  }, [detectedCity, detectedArea, detectedPincode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success(
      `Franchise application submitted for ${formData.area}, ${formData.city} (${formData.pincode})!`
    );
  };

  return (
    <div className="min-h-screen bg-[#020403] text-white font-sans selection:bg-[#00D084] selection:text-black pt-28 pb-20">
      <Nav />

      <div className="max-w-4xl mx-auto px-6">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            to="/find-services"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#00D084] transition-colors text-xs font-mono font-bold uppercase tracking-wider bg-white/5 px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services Directory
          </Link>
        </div>

        {/* Auto-detected Slot Card Notification Banner */}
        <div className="bg-[#050c08] border-2 border-[#00D084]/60 rounded-3xl p-6 sm:p-8 mb-10 shadow-[0_10px_30px_rgba(0,208,132,0.15)] relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#00D084]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center text-[#00D084] shrink-0">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#00D084]">
                  PRE-BOOKING SLOT AUTO-DETECTED
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {detectedArea}, {detectedCity} ({detectedPincode})
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
              SLOT RESERVED FOR APPLICATION
            </div>
          </div>
        </div>

        {submitted ? (
          /* Confirmation State */
          <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#00D084]/20 border border-[#00D084]/50 flex items-center justify-center text-[#00D084] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white">
                Application Received!
              </h2>
              <p className="text-white/70 text-sm max-w-md mx-auto">
                Thank you, <span className="text-white font-bold">{formData.fullName}</span>. Your franchise application for{" "}
                <span className="text-[#00D084] font-bold">{formData.area} ({formData.pincode})</span> in {formData.city} has been logged under Priority Token #EV-HUB-{Math.floor(1000 + Math.random() * 9000)}.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/find-services"
                className="px-6 py-3 rounded-full bg-[#00D084] text-black font-black uppercase text-xs tracking-wider hover:bg-[#00e08f] transition-all"
              >
                Back to Cities
              </Link>
              <Link
                to="/franchise"
                className="px-6 py-3 rounded-full bg-white/10 text-white font-bold uppercase text-xs tracking-wider hover:bg-white/20 transition-all border border-white/15"
              >
                View Franchise Models
              </Link>
            </div>
          </div>
        ) : (
          /* Main Application Form */
          <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div className="mb-8 pb-6 border-b border-white/10">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Franchise Slot Application
              </h2>
              <p className="text-xs text-white/60 mt-1">
                Complete the details below to lock your area slot and connect with our expansion team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-white/40 absolute left-4 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-[#020403] border border-white/15 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#00D084]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-white/40 absolute left-4 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-[#020403] border border-white/15 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#00D084]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-4 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-[#020403] border border-white/15 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#00D084]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">
                    Target City (Auto-filled)
                  </label>
                  <input
                    type="text"
                    required
                    readOnly
                    value={formData.city}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#00D084] font-bold cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">
                    Target Area (Auto-filled)
                  </label>
                  <input
                    type="text"
                    required
                    readOnly
                    value={formData.area}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#00D084] font-bold cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">
                    PIN Code (Auto-filled)
                  </label>
                  <input
                    type="text"
                    required
                    readOnly
                    value={formData.pincode}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-[#00D084] font-bold cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">
                    Preferred Hub Model
                  </label>
                  <select
                    value={formData.modelType}
                    onChange={(e) =>
                      setFormData({ ...formData, modelType: e.target.value })
                    }
                    className="w-full bg-[#020403] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00D084]"
                  >
                    <option value="Quick Diagnostic Hub">Quick Diagnostic Hub (2W Focus)</option>
                    <option value="Executive Hub (2W & 3W)">Executive Hub (2W & 3W)</option>
                    <option value="Master Regional Center">Master Regional Center (Full Stack)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">
                    Estimated Investment Budget
                  </label>
                  <select
                    value={formData.investmentBudget}
                    onChange={(e) =>
                      setFormData({ ...formData, investmentBudget: e.target.value })
                    }
                    className="w-full bg-[#020403] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00D084]"
                  >
                    <option value="₹8 Lakhs - ₹15 Lakhs">₹8 Lakhs - ₹15 Lakhs</option>
                    <option value="₹15 Lakhs - ₹25 Lakhs">₹15 Lakhs - ₹25 Lakhs</option>
                    <option value="₹25 Lakhs +">₹25 Lakhs +</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#00D084] text-black font-black uppercase text-xs tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                SUBMIT FRANCHISE APPLICATION FOR {formData.area.toUpperCase()}
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
