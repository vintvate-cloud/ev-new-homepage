import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Zap,
  ShoppingCart,
  User,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";

interface NavbarProps {
  onOpenBooking?: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [siteTheme, setSiteTheme] = useState<"dark" | "light">(() => {
    if (
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("theme-light")
    ) {
      return "light";
    }
    return "dark";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (siteTheme === "light") {
      document.documentElement.classList.add("theme-light");
    } else {
      document.documentElement.classList.remove("theme-light");
    }
  }, [siteTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation Items matching exact screenshot layout
  const navItems = [
    { label: "Franchise", href: "/#warehouse", hasDropdown: true },
    { label: "Careers", href: "/careers", hasDropdown: true },
    { label: "Find Service", href: "/services#products-grid", hasDropdown: true },
    { label: "Webinars", href: "/#webinars", hasDropdown: true },
    { label: "Events", href: "/#events", hasDropdown: true },
    { label: "EV News", href: "/#news", hasDropdown: false },
    { label: "Blog", href: "/#blog", hasDropdown: false },
    { label: "Media", href: "/#media", hasDropdown: false },
    { label: "Services", href: "/services", hasDropdown: false },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 pointer-events-none">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-3 sm:px-6 md:px-8 py-2 mt-2">
          
          {/* Main Floating Pill Capsule Navbar (Exact Match to Screenshot) */}
          <div
            className={`w-full flex items-center justify-between pointer-events-auto px-5 py-2 rounded-full transition-all duration-300 ${
              scrolled
                ? "shadow-[0_12px_40px_rgba(0,0,0,0.4)] border"
                : "shadow-xl border"
            }`}
            style={{
              background:
                siteTheme === "light"
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(10, 10, 10, 0.92)",
              backdropFilter: "blur(24px)",
              borderColor:
                siteTheme === "light"
                  ? "rgba(0, 0, 0, 0.1)"
                  : "rgba(255, 255, 255, 0.12)",
            }}
          >
            {/* Left Brand Logo (Exact Screenshot Square Icon + Stacked Name) */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-8 h-8 rounded-lg bg-black border border-white/20 p-0.5 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                <img
                  src="/logo-myevservice.jpg"
                  alt="My EV Service Logo"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className={`text-[12px] font-black tracking-[0.14em] uppercase ${
                    siteTheme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  MY EV
                </span>
                <span
                  className={`text-[12px] font-black tracking-[0.14em] uppercase ${
                    siteTheme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  SERVICE
                </span>
              </div>
            </Link>

            {/* Center Nav Links (Vibrant Green #00D084 Links with Chevrons) */}
            <nav className="hidden xl:flex items-center gap-1.5 mx-auto">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? currentPath === "/"
                    : item.href.startsWith("/") && currentPath === item.href.split("#")[0];

                return (
                  <Link
                    key={item.label}
                    to={item.href as any}
                    className={`px-3 py-1.5 rounded-full text-[13px] font-semibold tracking-wide flex items-center gap-1 transition-all ${
                      isActive
                        ? "text-[#00D084] font-black bg-[#00D084]/15"
                        : "text-[#00D084] hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-3 h-3 text-[#00D084]/60" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Control Group */}
            <div className="flex items-center gap-3 shrink-0">
              
              {/* Theme Toggle Pill (DARK / LIGHT switch) */}
              <button
                onClick={() => setSiteTheme(siteTheme === "light" ? "dark" : "light")}
                className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  siteTheme === "light"
                    ? "bg-black/5 border-black/15 text-black hover:bg-black/10"
                    : "bg-white/5 border-white/15 text-white hover:bg-white/10"
                }`}
                title={siteTheme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                <div className="relative flex h-3.5 w-6 items-center rounded-full bg-white/20 p-0.5">
                  <div
                    className={`h-2.5 w-2.5 rounded-full bg-[#00D084] shadow-xs transition-transform duration-300 ${
                      siteTheme === "light" ? "translate-x-2.5" : "translate-x-0"
                    }`}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider">
                  {siteTheme === "light" ? "LIGHT" : "DARK"}
                </span>
              </button>

              {/* Cart Icon */}
              <button
                className={`p-2 rounded-full transition-colors cursor-pointer hidden sm:flex ${
                  siteTheme === "light"
                    ? "text-black hover:bg-black/5"
                    : "text-white hover:bg-white/10"
                }`}
                title="View Cart"
              >
                <ShoppingCart className="w-4 h-4 text-white" />
              </button>

              {/* Login Link */}
              <a
                href="#login"
                className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 transition-colors ${
                  siteTheme === "light"
                    ? "text-black hover:text-[#00D084]"
                    : "text-white hover:text-[#00D084]"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </a>

              {/* Book Service Green Pill CTA Button */}
              <button
                onClick={() => {
                  if (onOpenBooking) {
                    onOpenBooking();
                  } else {
                    window.location.href = "/services#products-grid";
                  }
                }}
                className="bg-[#00D084] hover:bg-[#00e08f] text-[#020403] rounded-full px-5 py-2 font-extrabold text-xs tracking-wider transition-all cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(0,208,132,0.4)] flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-[#020403]" />
                <span>Book Service</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className={`xl:hidden p-2 rounded-full transition-colors cursor-pointer ${
                  siteTheme === "light"
                    ? "text-black hover:bg-black/5"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Menu className="w-5 h-5 text-[#00D084]" />
              </button>

            </div>

          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] xl:hidden bg-black/95 backdrop-blur-2xl text-white p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black border border-white/20 p-0.5 flex items-center justify-center">
                  <img
                    src="/logo-myevservice.jpg"
                    alt="My EV Service Logo"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <span className="text-sm font-black tracking-widest text-white uppercase">
                  MY EV SERVICE<span className="text-[#00D084]">—</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 my-auto py-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href as any}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between text-2xl font-extrabold tracking-tight text-[#00D084] hover:text-white border-b border-white/5 pb-3 transition-colors"
                >
                  {item.label}
                  <ArrowUpRight className="w-5 h-5 text-[#00D084]" />
                </Link>
              ))}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  if (onOpenBooking) onOpenBooking();
                  else window.location.href = "/services#products-grid";
                }}
                className="w-full py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-[#020403]" />
                BOOK EV SERVICE NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
