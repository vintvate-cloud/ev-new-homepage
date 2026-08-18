import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/refund")({
  component: RefundPage,
});

function RefundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans">
      <Nav />

      <main className="pt-32 pb-16 px-6 max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <span className="text-xs font-mono font-bold text-[#00D084] uppercase tracking-widest block mb-2">Service Guarantee</span>
          <h1 className="text-4xl font-extrabold text-white">Refund & Cancellation Policy</h1>
          <p className="text-xs text-white/50 font-mono mt-2">Last Updated: January 2026 • MY EV SERVICE India</p>
        </div>

        <div className="space-y-6 text-sm text-white/80 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Service Cancellation Window</h2>
            <p>Customers may cancel or reschedule any doorstep or workshop booking up to 2 hours before the scheduled technician dispatch window for a 100% full refund.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Parts Return & Refund</h2>
            <p>Unopened OEM spare parts ordered through our store may be returned within 7 days of delivery for a complete replacement or refund, provided seals remain intact.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Processing Timelines</h2>
            <p>Approved refunds are credited to the original payment source (UPI, Credit Card, Bank Transfer) within 3 to 5 business days.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
