import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  MessageSquare,
  Star,
  Send,
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
      toast.success("Thank you for your feedback! Your rating helps us maintain high quality standards.");
    } else {
      toast.success("Issue Reported! Escalation ticket created (TKT-EV-88219). Our Quality Team will contact you within 2 hours.");
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
    <div className="min-h-screen bg-[#070908] text-white selection:bg-[#00D084] selection:text-black font-sans flex flex-col justify-between overflow-x-hidden">
      {/* Navigation Header */}
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Main 1-Screen Content Area */}
      <main className="flex-1 pt-20 w-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)] w-full items-stretch">
          
          {/* =========================================================================
              LEFT COLUMN: FULL HEIGHT PANEL WITH CURVED RIGHT BORDER
             ========================================================================= */}
          <div className="lg:col-span-5 bg-[#0b0f0c] border-r border-white/15 rounded-r-[40px] p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Feedback &amp; <br />
              <span className="text-[#00D084]">Report an Issue</span>
            </h1>

            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-md">
              We value your voice! Share your service experience or report any operational concern directly to our Quality Audit Council.
            </p>

            {/* Flat Tab Switcher Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => setActiveTab("feedback")}
                className={`px-5 py-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === "feedback"
                    ? "bg-[#00D084] text-[#020403] border-[#00D084]"
                    : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
                }`}
              >
                <ThumbsUp className="w-4 h-4" /> Share Feedback
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("issue")}
                className={`px-5 py-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === "issue"
                    ? "bg-rose-500 text-white border-rose-500"
                    : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
                }`}
              >
                <ShieldAlert className="w-4 h-4" /> Report an Issue
              </button>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: FLAT 1-SCREEN FORM CONTAINER (NO SHADOWS)
             ========================================================================= */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
            <div className="max-w-2xl w-full mx-auto space-y-4">
              <div className="border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono text-[#00D084] uppercase font-bold tracking-widest block">
                  {activeTab === "feedback" ? "STAR RATING & REVIEW" : "INCIDENT ESCALATION"}
                </span>
                <h2 className="text-xl font-bold text-white">
                  {activeTab === "feedback" ? "Rate Your EV Service Experience" : "File a Quality Escalation Ticket"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Star Rating for Feedback */}
                {activeTab === "feedback" && (
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0b0f0c] border border-white/10">
                    <span className="text-xs font-mono text-white/70">Overall Satisfaction Score</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 cursor-pointer hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating ? "text-amber-400 fill-amber-400" : "text-white/20"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[10px] font-mono text-white/50 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#0b0f0c] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-white/50 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#0b0f0c] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[10px] font-mono text-white/50 block mb-1">Booking / Job Card ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. JOB-EV-9821"
                      value={form.jobCardId}
                      onChange={(e) => setForm({ ...form, jobCardId: e.target.value })}
                      className="w-full bg-[#0b0f0c] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-white/50 block mb-1">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-[#0b0f0c] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084] cursor-pointer"
                    >
                      <option value="Service Quality">Service &amp; Repair Quality</option>
                      <option value="Technician Conduct">Technician Conduct</option>
                      <option value="Billing & Pricing">Billing &amp; Invoice</option>
                      <option value="Spare Parts">Spare Parts &amp; Battery</option>
                      <option value="App & Platform">Mobile App / Platform</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/50 block mb-1">Description / Comments *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder={
                      activeTab === "feedback"
                        ? "Tell us what you loved or how we can improve..."
                        : "Please describe the issue faced in detail..."
                    }
                    value={form.comments}
                    onChange={(e) => setForm({ ...form, comments: e.target.value })}
                    className="w-full bg-[#0b0f0c] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 transition-colors ${
                    activeTab === "feedback"
                      ? "bg-[#00D084] text-[#020403] hover:bg-[#00e08f]"
                      : "bg-rose-500 text-white hover:bg-rose-600"
                  }`}
                >
                  <span>{activeTab === "feedback" ? "Submit Feedback" : "Submit Escalation"}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
