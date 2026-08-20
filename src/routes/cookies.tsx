import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  Cookie,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Copy,
  Check,
  Globe,
  SlidersHorizontal,
  FileText,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cookies")({
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("info@myevservice.in");
    setCopiedEmail(true);
    toast.success("Copied info@myevservice.in to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans overflow-x-hidden">
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-[#020403]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00D084]/12 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00D084] shadow-md backdrop-blur-md">
            <Cookie className="w-4 h-4" />
            <span>Digital Preferences Framework</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Cookie Policy <br />
            <span className="text-[#00D084] drop-shadow-[0_0_20px_rgba(0,208,132,0.4)]">
              MY EV SERVICE Platform
            </span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#00D084]">
            Last Updated: March 1st, 2026
          </p>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            Owned and operated by <strong className="text-white">Autobot Emobility Business Solutions Private Limited</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00D084]" /> Privacy First Standards
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#00D084]" /> Customizable Browser Preferences
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 max-w-5xl mx-auto space-y-8">
        
        {/* Intro */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
            This Cookie Policy explains how <strong className="text-[#00D084]">MY EV SERVICE</strong> uses cookies and similar technologies when you visit or interact with our website and digital platform.
          </p>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
            MY EV SERVICE is owned and operated by <strong className="text-white">Autobot Emobility Business Solutions Private Limited</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
          </p>
          <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#00D084] font-medium">
            By continuing to use our website or digital services, you agree to the use of cookies in accordance with this policy.
          </div>
        </div>

        {/* 1. What Are Cookies? */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">1.</span> What Are Cookies?
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Cookies are small text files that are stored on your device (computer, smartphone, or tablet) when you visit a website.
          </p>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Cookies help websites remember user preferences, improve functionality, and analyze how visitors interact with the platform.
          </p>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Cookies do not typically contain personally identifiable information, but they may be linked to information that you provide to us.
          </p>
        </div>

        {/* 2. Why MY EV SERVICE Uses Cookies */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">2.</span> Why MY EV SERVICE Uses Cookies
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-light">
            MY EV SERVICE uses cookies and related technologies to:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80 font-light">
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
              <span>Ensure the website functions properly</span>
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
              <span>Improve user experience and platform performance</span>
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
              <span>Remember user preferences and login sessions</span>
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
              <span>Analyze website traffic and usage patterns</span>
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
              <span>Enable service booking functionality</span>
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
              <span>Support marketing and advertising campaigns</span>
            </li>
          </ul>
          <p className="text-xs sm:text-sm text-white/70 font-light italic pt-2 border-t border-white/10">
            Cookies help us provide a smoother and more personalized experience for users accessing our platform.
          </p>
        </div>

        {/* 3. Types of Cookies We Use */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">3.</span> Types of Cookies We Use
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            {/* Essential */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="font-bold text-[#00D084] uppercase tracking-wider text-sm">Essential Cookies</h3>
                <Lock className="w-4 h-4 text-[#00D084]" />
              </div>
              <p className="text-white/80 font-light leading-relaxed">
                These cookies are necessary for the basic operation of the MY EV SERVICE platform. They enable functions such as:
              </p>
              <ul className="space-y-1.5 text-white/70 list-disc list-inside font-light">
                <li>User login authentication</li>
                <li>Service booking process</li>
                <li>Security and fraud prevention</li>
                <li>Session management</li>
              </ul>
              <p className="text-amber-300/80 text-[11px] font-mono pt-1">
                Without these cookies, certain platform features may not function properly.
              </p>
            </div>

            {/* Performance & Analytics */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="font-bold text-[#00D084] uppercase tracking-wider text-sm">Performance and Analytics Cookies</h3>
                <Globe className="w-4 h-4 text-[#00D084]" />
              </div>
              <p className="text-white/80 font-light leading-relaxed">
                These cookies help us understand how users interact with our website. They may collect information such as:
              </p>
              <ul className="space-y-1.5 text-white/70 list-disc list-inside font-light">
                <li>Pages visited</li>
                <li>Time spent on pages</li>
                <li>Navigation patterns</li>
                <li>Website performance metrics</li>
              </ul>
              <p className="text-white/60 text-[11px] pt-1">
                This data helps us improve platform usability and service delivery. Examples may include analytics tools such as website traffic monitoring services.
              </p>
            </div>

            {/* Functional */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="font-bold text-[#00D084] uppercase tracking-wider text-sm">Functional Cookies</h3>
                <SlidersHorizontal className="w-4 h-4 text-[#00D084]" />
              </div>
              <p className="text-white/80 font-light leading-relaxed">
                Functional cookies allow the platform to remember user preferences. These may include:
              </p>
              <ul className="space-y-1.5 text-white/70 list-disc list-inside font-light">
                <li>Language preferences</li>
                <li>Location-based settings</li>
                <li>Saved service selections</li>
                <li>Login session details</li>
              </ul>
              <p className="text-white/60 text-[11px] pt-1">
                These cookies enhance convenience and user experience.
              </p>
            </div>

            {/* Marketing & Advertising */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="font-bold text-[#00D084] uppercase tracking-wider text-sm">Marketing and Advertising Cookies</h3>
                <Cookie className="w-4 h-4 text-[#00D084]" />
              </div>
              <p className="text-white/80 font-light leading-relaxed">
                These cookies may be used to deliver relevant marketing communications or advertisements. They help us:
              </p>
              <ul className="space-y-1.5 text-white/70 list-disc list-inside font-light">
                <li>Understand customer interests</li>
                <li>Measure the effectiveness of marketing campaigns</li>
                <li>Provide personalized content and offers</li>
              </ul>
              <p className="text-white/60 text-[11px] pt-1">
                These cookies may be placed by MY EV SERVICE or trusted marketing partners.
              </p>
            </div>

          </div>
        </div>

        {/* 4. Third-Party Cookies */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">4.</span> Third-Party Cookies
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Some cookies may be placed by third-party services that appear on our platform. These may include services related to:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Payment processing</li>
            <li>Website analytics</li>
            <li>Advertising and marketing tools</li>
            <li>Customer communication tools</li>
          </ul>
          <p className="text-xs text-white/70 font-light pt-2 border-t border-white/10">
            MY EV SERVICE does not control the cookies used by third-party providers, and users are encouraged to review their respective privacy policies.
          </p>
        </div>

        {/* 5. Managing Cookie Preferences */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">5.</span> Managing Cookie Preferences
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Users have the option to control or disable cookies through their web browser settings. Most browsers allow users to:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80 font-light">
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> View stored cookies
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> Delete existing cookies
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> Block certain types of cookies
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> Receive alerts when cookies are being used
            </li>
          </ul>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-light">
            Please note that disabling certain cookies may affect the functionality of the MY EV SERVICE platform.
          </div>
        </div>

        {/* 6. Updates to This Cookie Policy */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">6.</span> Updates to This Cookie Policy
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            MY EV SERVICE may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or platform features.
          </p>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Any updates will be posted on this page with the revised effective date.
          </p>
          <p className="text-xs text-[#00D084] font-medium">
            Users are encouraged to review this policy periodically.
          </p>
        </div>

        {/* 7. Contact Information */}
        <div className="backdrop-blur-xl bg-[#00D084]/10 border border-[#00D084]/40 rounded-3xl p-6 sm:p-8 space-y-4 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center justify-center gap-2">
            <span className="text-[#00D084] font-mono">7.</span> Contact Information
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-light max-w-lg mx-auto">
            If you have any questions regarding this Cookie Policy or how cookies are used on the MY EV SERVICE platform, please contact:
          </p>
          <div className="space-y-1 text-xs text-white/90 font-medium">
            <p className="text-base font-bold text-[#00D084]">MY EV SERVICE Support Team</p>
            <p className="text-white/70">Operated by Autobot Emobility Business Solutions Private Limited</p>
            <p className="text-white/80 font-mono">Email: info@myevservice.in</p>
            <p className="text-white/80 font-mono">Website: www.myevservice.in</p>
          </div>
          <div className="pt-2">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer inline-flex items-center gap-2 shadow-[0_0_15px_rgba(0,208,132,0.3)]"
            >
              {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>Copy info@myevservice.in</span>
            </button>
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

