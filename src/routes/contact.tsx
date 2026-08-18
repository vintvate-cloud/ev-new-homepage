import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [activeTab, setActiveTab] = useState<"general" | "franchise" | "b2b">("general");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please provide your Name and Contact Phone.");
      return;
    }
    toast.success("Enquiry Sent! Our customer relations team will contact you within 2 business hours.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans">
      
      {/* Unified Landing Navbar */}
      <Nav />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#060c09] to-[#020403]">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00D084]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00D084] mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            24/7 Multi-Channel Support Hub
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Contact <span className="text-[#00D084]">MY EV SERVICE</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Have questions about doorstep service, franchise opportunities, or B2B fleet agreements? We're here to assist.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Panel: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00D084]/10 border border-[#00D084]/20 flex items-center justify-center text-[#00D084] shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">National Headquarters</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed mt-1">
                    MY EV SERVICE India, Autobot Engineers Tower, Plot 42, Sector 18, Electronic City, Gurgaon, HR 122008
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00D084]/10 border border-[#00D084]/20 flex items-center justify-center text-[#00D084] shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Toll-Free Customer Hotline</h4>
                  <p className="text-xs text-white/60 font-light mt-1">
                    <a href="tel:18001234567" className="text-[#00D084] font-bold font-mono">1800 123 4567</a> (Toll-Free)
                  </p>
                  <p className="text-xs text-white/60 font-light">
                    Direct: <a href="tel:+919876543210" className="text-white font-mono">+91 98765 43210</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00D084]/10 border border-[#00D084]/20 flex items-center justify-center text-[#00D084] shrink-0 mt-1">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Email Enquiries</h4>
                  <p className="text-xs text-white/60 font-light mt-1">
                    Support: <a href="mailto:support@myevservice.in" className="text-white hover:text-[#00D084]">support@myevservice.in</a>
                  </p>
                  <p className="text-xs text-white/60 font-light">
                    Franchise: <a href="mailto:partner@myevservice.in" className="text-white hover:text-[#00D084]">partner@myevservice.in</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00D084]/10 border border-[#00D084]/20 flex items-center justify-center text-[#00D084] shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Working Hours</h4>
                  <p className="text-xs text-white/60 font-light mt-1">
                    Mon - Sat: 08:00 AM - 08:00 PM IST
                  </p>
                  <p className="text-xs text-[#00D084] font-semibold mt-0.5">
                    24/7 Mobile RSA Dispatch Always Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Enquiry Form */}
          <div className="lg:col-span-7 bg-[#050907] border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send an Enquiry</h3>

            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "general"
                    ? "bg-[#00D084] text-[#020403]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Customer Support
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("franchise")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "franchise"
                    ? "bg-[#00D084] text-[#020403]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Franchise Partner
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("b2b")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "b2b"
                    ? "bg-[#00D084] text-[#020403]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                B2B Fleet Contract
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#020403] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#020403] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@domain.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#020403] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Battery service query / Franchise location check..."
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-[#020403] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">
                  Message / Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us how we can assist you..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#020403] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-extrabold uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_20px_rgba(0,208,132,0.3)] cursor-pointer flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Unified Landing Footer */}
      <Footer />

    </div>
  );
}
