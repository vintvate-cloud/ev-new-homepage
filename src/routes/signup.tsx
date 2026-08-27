import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const [isDark, setIsDark] = useState(true); // Default Dark Mode
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Account created successfully! Welcome to MY EV SERVICE.");
      window.location.href = "/track";
    }, 1000);
  };

  return (
    <div
      className={`min-h-screen w-full flex font-sans transition-colors duration-300 overflow-hidden ${
        isDark ? "bg-[#070908] text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* =========================================================================
          LEFT PANEL: ARTISTIC BRAND SHOWCASE (STAYS CINEMATIC & BOLD)
         ========================================================================= */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#040605] p-12 flex-col justify-between overflow-hidden select-none border-r border-white/10">
        
        {/* Abstract Geometry & Neon Accents */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#00D084]/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none" />
        
        {/* Artistic Halftone Pattern */}
        <div className="absolute top-0 right-0 w-full h-full opacity-25 pointer-events-none bg-[radial-gradient(#00D084_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="My EV Service Logo"
            className="h-10 w-auto rounded-xl object-contain border border-white/10"
          />
          <span className="text-xl font-black tracking-[0.15em] uppercase text-white">
            MY EV SERVICE
          </span>
        </div>

        {/* Center Headline */}
        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-xs font-mono font-bold text-[#00D084]">
            <Zap className="w-3.5 h-3.5 fill-[#00D084]" />
            <span>Join 50,000+ EV Owners Nationwide</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
            Smart EV <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00D084]">
              Ownership.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
            Create your account to unlock real-time BMS diagnostic tracking, doorstep mechanic booking, digital job-card history, and 24/7 roadside assistance.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <span className="w-3 h-3 rounded-full bg-[#00D084]" />
            <span className="w-3 h-3 rounded-full bg-[#00D084]" />
            <span className="w-3 h-3 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Bottom Security Footer */}
        <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between text-xs font-mono text-white/40">
          <span>© 2026 MY EV SERVICE. Bank-Grade Security.</span>
          <span className="text-[#00D084]">ISO 9001 Certified</span>
        </div>
      </div>

      {/* =========================================================================
          RIGHT PANEL: AUTHENTICATION FORM WITH DARK & LIGHT THEME TOGGLE
         ========================================================================= */}
      <div
        className={`w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative transition-colors duration-300 ${
          isDark ? "bg-[#070908] text-white" : "bg-white text-slate-900"
        }`}
      >
        {/* Top Navigation Row: Back Button + Theme Switcher */}
        <div className="flex items-center justify-between">
          <a
            href="/"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-colors ${
              isDark
                ? "border-white/15 text-white/80 hover:bg-white/5"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </a>

          {/* Dark / Light Theme Switcher (Icon-only matching navbar) */}
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? "border-white/15 bg-white/5 text-[#00D084] hover:bg-white/10"
                : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto space-y-6 my-auto py-4">
          
          {/* Header */}
          <div className="space-y-1.5">
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              Create an Account
            </h2>
            <p className={`text-xs sm:text-sm font-normal ${isDark ? "text-white/60" : "text-slate-500"}`}>
              Register to manage your EV service bookings &amp; diagnostic logs
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className={`text-xs font-semibold block ${isDark ? "text-white/80" : "text-slate-700"}`}>
                Full Name *
              </label>
              <div className="relative">
                <User className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-slate-400"}`} />
                <input
                  type="text"
                  required
                  placeholder="Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full rounded-full pl-11 pr-4 py-3 text-xs transition-all focus:outline-none focus:border-[#00D084] ${
                    isDark
                      ? "bg-[#0f1411] border border-white/15 text-white placeholder:text-white/40 focus:bg-[#141b17]"
                      : "bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white"
                  }`}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className={`text-xs font-semibold block ${isDark ? "text-white/80" : "text-slate-700"}`}>
                Email Address *
              </label>
              <div className="relative">
                <Mail className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-slate-400"}`} />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-full pl-11 pr-4 py-3 text-xs transition-all focus:outline-none focus:border-[#00D084] ${
                    isDark
                      ? "bg-[#0f1411] border border-white/15 text-white placeholder:text-white/40 focus:bg-[#141b17]"
                      : "bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white"
                  }`}
                />
              </div>
            </div>

            {/* Mobile Phone Number */}
            <div className="space-y-1">
              <label className={`text-xs font-semibold block ${isDark ? "text-white/80" : "text-slate-700"}`}>
                Mobile Phone Number *
              </label>
              <div className="relative">
                <Phone className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-slate-400"}`} />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full rounded-full pl-11 pr-4 py-3 text-xs transition-all focus:outline-none focus:border-[#00D084] ${
                    isDark
                      ? "bg-[#0f1411] border border-white/15 text-white placeholder:text-white/40 focus:bg-[#141b17]"
                      : "bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className={`text-xs font-semibold block ${isDark ? "text-white/80" : "text-slate-700"}`}>
                Create Password *
              </label>
              <div className="relative">
                <Lock className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-slate-400"}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-full pl-11 pr-11 py-3 text-xs transition-all focus:outline-none focus:border-[#00D084] ${
                    isDark
                      ? "bg-[#0f1411] border border-white/15 text-white placeholder:text-white/40 focus:bg-[#141b17]"
                      : "bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                    isDark ? "text-white/40 hover:text-white/80" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#00D084] hover:bg-[#00e08f] text-[#020403] font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <span>Creating Account...</span>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Toggle to Login */}
          <div className={`text-center text-xs pt-2 ${isDark ? "text-white/60" : "text-slate-500"}`}>
            <span>Already have an account? </span>
            <a
              href="/login"
              className="font-bold text-[#00D084] hover:underline"
            >
              Sign In
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className={`text-center text-[11px] ${isDark ? "text-white/40" : "text-slate-400"}`}>
          Protected by reCAPTCHA &amp; MY EV Privacy Policy.
        </div>
      </div>

    </div>
  );
}
