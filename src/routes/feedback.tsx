import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  MessageSquare,
  Star,
  Send,
  AlertCircle,
  CheckCircle2,
  ThumbsUp,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/feedback")({
  component: FeedbackPage,
});

function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<"feedback" | "issue">("feedback");
  const [rating, setRating] = useState(5);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    jobCardId: "",
    category: "Service Quality",
    comments: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.comments) {
      toast.error("Please fill in your Name, Phone Number, and Comments.");
      return;
    }

    if (activeTab === "feedback") {
      toast.success("Thank you for your valuable feedback! Your rating helps us maintain top-tier service quality.");
    } else {
      toast.success("Issue Reported! Ticket generated (TKT-EV-88219). Quality Control lead assigned to review within 2 hours.");
    }

    setForm({
      name: "",
      phone: "",
      email: "",
      jobCardId: "",
      category: "Service Quality",
      comments: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans overflow-x-hidden">
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-[#020403]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00D084]/12 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00D084] shadow-md backdrop-blur-md">
            <MessageSquare className="w-4 h-4" />
            <span>Customer Experience &amp; Issue Reporting</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Feedback &amp; <br />
            <span className="text-[#00D084] drop-shadow-[0_0_20px_rgba(0,208,132,0.4)]">
              Report an Issue
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            We value your voice! Share your service experience or report any operational concern directly to our Quality Audit Council.
          </p>

          {/* Toggle Switcher */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveTab("feedback")}
              className={`px-6 py-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 text-xs font-extrabold ${
                activeTab === "feedback"
                  ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.3)]"
                  : "backdrop-blur-xl bg-white/[0.03] border-white/15 text-white/80 hover:border-[#00D084]/50"
              }`}
            >
              <ThumbsUp className="w-4 h-4" /> Share Feedback / Review
            </button>
            <button
              onClick={() => setActiveTab("issue")}
              className={`px-6 py-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 text-xs font-extrabold ${
                activeTab === "issue"
                  ? "bg-rose-500 text-white border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                  : "backdrop-blur-xl bg-white/[0.03] border-white/15 text-white/80 hover:border-rose-500/50"
              }`}
            >
              <ShieldAlert className="w-4 h-4" /> Report an Issue / Complaint
            </button>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12 px-6 max-w-4xl mx-auto space-y-8">
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          
          {/* Header text */}
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-mono text-[#00D084] uppercase font-bold tracking-widest block mb-1">
              {activeTab === "feedback" ? "STAR RATING & REVIEW" : "QUALITY AUDIT INCIDENT FORM"}
            </span>
            <h2 className="text-2xl font-bold text-white">
              {activeTab === "feedback" ? "Rate Your EV Service Experience" : "File an Escalation / Complaint"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Star Rating for Feedback */}
            {activeTab === "feedback" && (
              <div className="space-y-2 text-center p-6 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-xs font-mono uppercase text-white/60 block">Overall Satisfaction Score</span>
                <div className="flex items-center justify-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                            : "text-white/20"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-bold text-[#00D084] block pt-1">
                  {rating === 5 ? "Excellent (5/5)" : rating === 4 ? "Very Good (4/5)" : rating === 3 ? "Average (3/5)" : "Needs Improvement"}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono text-white/50 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-white/50 block mb-1">Mobile Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono text-white/50 block mb-1">Booking / Job Card ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. JOB-EV-9821"
                  value={form.jobCardId}
                  onChange={(e) => setForm({ ...form, jobCardId: e.target.value })}
                  className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-white/50 block mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084] cursor-pointer"
                >
                  <option value="Service Quality">Service &amp; Repair Quality</option>
                  <option value="Technician Conduct">Technician Professionalism</option>
                  <option value="Billing & Pricing">Billing &amp; Invoice Transparency</option>
                  <option value="Spare Parts">Spare Parts &amp; Battery Performance</option>
                  <option value="App & Platform">Mobile App / Platform Feature</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-white/50 block mb-1">Detailed Description / Comments *</label>
              <textarea
                rows={5}
                required
                placeholder={
                  activeTab === "feedback"
                    ? "Tell us what you loved about our service or how we can improve..."
                    : "Please describe the issue faced, date of service, and any relevant details..."
                }
                value={form.comments}
                onChange={(e) => setForm({ ...form, comments: e.target.value })}
                className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "feedback"
                  ? "bg-[#00D084] text-[#020403] hover:bg-[#00e08f] shadow-[0_0_20px_rgba(0,208,132,0.4)]"
                  : "bg-rose-500 text-white hover:bg-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.4)]"
              }`}
            >
              <span>{activeTab === "feedback" ? "Submit Feedback" : "Submit Escalation Ticket"}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
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
