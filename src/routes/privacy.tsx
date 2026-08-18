import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans">
      <Nav />

      <main className="pt-32 pb-16 px-6 max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <span className="text-xs font-mono font-bold text-[#00D084] uppercase tracking-widest block mb-2">Legal Policy</span>
          <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-white/50 font-mono mt-2">Last Updated: January 2026 • MY EV SERVICE India</p>
        </div>

        <div className="space-y-6 text-sm text-white/80 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
            <p>We collect personal information that you provide when registering for services, requesting doorstep dispatches, or submitting franchise applications. This includes your name, mobile number, vehicle telemetry logs, address, and payment information.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Use of Telemetry & Location Data</h2>
            <p>Vehicle telemetry diagnostic data (BMS health, cell voltage, error codes) is used exclusively to evaluate vehicle safety and generate performance certificates. Live location data is used strictly for mobile service van dispatch and RSA tracking.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Data Sharing & Security</h2>
            <p>We do not sell personal data to third parties. Data is shared only with authorized franchise hubs and certified technicians handling your service request. All transmissions are encrypted under SSL/TLS standards.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. User Rights & Data Deletion</h2>
            <p>You have the right to inspect, update, or request full deletion of your account and vehicle diagnostic records by emailing support@myevservice.in.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
