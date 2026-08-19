import React, { useState, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import {
  X,
  Search,
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  Clock,
  Home,
  Store,
  CreditCard,
  Banknote,
  Navigation,
  Edit3,
  HelpCircle,
  Zap,
  Star,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import {
  EV_BRANDS_POPULAR,
  EV_CATALOG,
  getBrandLogoUrl,
  DIRECT_FRANCHISE_SERVICE,
  BOOKING_SERVICES_LIST,
  EvModelCatalogItem,
} from "../data/evCatalog";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: {
    id?: string;
    title: string;
    price: string;
    basePrice?: number;
    duration?: string;
    desc?: string;
  } | null;
}

type BookingStep =
  | "brand"
  | "model"
  | "service_selection"
  | "location_contact"
  | "mode_slot"
  | "payment_confirm"
  | "success";

export function BookingModal({ isOpen, onClose, service: initialService }: BookingModalProps) {
  // Current Step
  const [step, setStep] = useState<BookingStep>("brand");

  // Selection States
  const [brandCategoryFilter, setBrandCategoryFilter] = useState<"ALL" | "2W" | "3W">("ALL");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedService, setSelectedService] = useState<{
    id?: string;
    title: string;
    price: string;
    basePrice?: number;
    duration?: string;
    desc?: string;
  } | null>(initialService ?? null);

  // Location & Contact
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Service Mode & Schedule
  const [serviceMode, setServiceMode] = useState<"doorstep" | "franchise">("doorstep");
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSlotLabel, setSelectedSlotLabel] = useState<string>("");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<"advance" | "on_door">("on_door");
  const [bookingId, setBookingId] = useState<string>("");

  // Refs for Lenis Smooth Scroll
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Lenis Smooth Scroll for modal content without visible scrollbars
  useEffect(() => {
    if (!isOpen || !modalBodyRef.current || !modalContentRef.current) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const modalLenis = new Lenis({
      wrapper: modalBodyRef.current,
      content: modalContentRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    let rafId: number;
    function update(time: number) {
      modalLenis.raf(time);
      rafId = requestAnimationFrame(update);
    }
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      modalLenis.destroy();
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, step]);

  // Initialize or reset modal when opened
  useEffect(() => {
    if (!isOpen) return;

    if (initialService) {
      setSelectedService(initialService);
    }

    if (initialService && selectedModel) {
      setStep("location_contact");
    } else {
      setStep("brand");
    }
  }, [isOpen, initialService]);

  // Available brands (filtered by category & search)
  const filteredBrands = useMemo(() => {
    let brands = EV_BRANDS_POPULAR;
    if (brandCategoryFilter !== "ALL") {
      brands = brands.filter((b) => b.category === brandCategoryFilter);
    }
    if (brandSearch.trim()) {
      const q = brandSearch.toLowerCase();
      brands = brands.filter(
        (b) => b.name.toLowerCase().includes(q) || b.displayName.toLowerCase().includes(q)
      );
    }
    return brands;
  }, [brandCategoryFilter, brandSearch]);

  // Helper to extract clean brand key (e.g. 'Ola Electric EV' -> 'ola')
  const getBrandKey = (brand: string) => {
    const b = brand.toLowerCase();
    if (b.includes("ola")) return "ola";
    if (b.includes("ather")) return "ather";
    if (b.includes("tvs")) return "tvs";
    if (b.includes("bajaj") || b.includes("chetak")) return "bajaj";
    if (b.includes("hero")) return "hero";
    if (b.includes("revolt")) return "revolt";
    if (b.includes("ampere")) return "ampere";
    if (b.includes("simple")) return "simple";
    if (b.includes("tork")) return "tork";
    if (b.includes("okinawa")) return "okinawa";
    if (b.includes("mahindra")) return "mahindra";
    if (b.includes("piaggio") || b.includes("ape")) return "piaggio";
    if (b.includes("kinetic")) return "kinetic";
    return b;
  };

  // Helper to resolve model image or brand logo fallback
  const getModelDisplayInfo = (brand: string, modelName: string) => {
    const key = getBrandKey(brand);
    const matched = EV_CATALOG.find(
      (item) =>
        item.make.toLowerCase().includes(key) &&
        item.model.toLowerCase() === modelName.toLowerCase()
    );
    const imageUrl = matched?.modelImageUrl || matched?.logoUrl || getBrandLogoUrl(brand);
    return {
      modelName,
      imageUrl,
      battery: matched?.batteryKwh ? `${matched.batteryKwh} kWh` : undefined,
    };
  };

  // Available models for selected brand
  const availableModels = useMemo(() => {
    if (!selectedBrand) return [];
    const key = getBrandKey(selectedBrand);
    const set = new Set(
      EV_CATALOG.filter((m) => m.make.toLowerCase().includes(key)).map((m) => m.model)
    );
    const result = Array.from(set);
    return result.length > 0
      ? result
      : ["Standard Edition EV", "Pro Edition EV", "Extended Range EV"];
  }, [selectedBrand]);

  // 7-Day Calendar Horizon
  const upcomingDays = useMemo(() => {
    const list = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      const dayLabel = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short" });
      const dateNum = d.getDate();
      const monthLabel = d.toLocaleDateString("en-IN", { month: "short" });
      list.push({ dateStr, dayLabel, dateNum, monthLabel });
    }
    return list;
  }, []);

  const handleSelectBrand = (brandName: string) => {
    setSelectedBrand(brandName);
    setSelectedModel("");
    setStep("model");
  };

  const handleSelectModel = (modelName: string) => {
    setSelectedModel(modelName);
    if (initialService || selectedService) {
      setStep("location_contact");
    } else {
      setStep("service_selection");
    }
  };

  const handleAutoDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingLocation(false);
        setAddress(`Near current GPS Location (Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)})`);
        setIsEditingAddress(false);
        toast.success("Location Detected!");
      },
      () => {
        setIsDetectingLocation(false);
        toast.error("Location permission denied. Please enter manually.");
        setIsEditingAddress(true);
      },
      { timeout: 10000 }
    );
  };

  const handleConfirmBooking = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newBookingId = `EV-ORD-${randomNum}`;
    setBookingId(newBookingId);
    setStep("success");
    toast.success("Service Request Created!");
  };

  const handleResetAndClose = () => {
    setStep("brand");
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedTime("");
    setCustomerName("");
    setCustomerPhone("");
    setAddress("");
    setPaymentMethod("on_door");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="bg-[#090f0c] border border-white/15 text-white w-full max-w-xl rounded-[32px] p-6 md:p-8 relative overflow-hidden shadow-2xl max-h-[85vh] flex flex-col justify-between">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center text-[#00D084]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight text-white">Book EV Service</h3>
              <p className="text-[11px] text-white/50">Multi-step Diagnostic Booking Flow</p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Step Body (Lenis Smooth Scroll - No Visible Scrollbar) */}
        <div
          ref={modalBodyRef}
          data-lenis-prevent
          className="overflow-y-auto max-h-[68vh] pr-1 flex-1 space-y-4 text-left [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div ref={modalContentRef} className="space-y-4">
          {/* STEP 1: BRAND SELECTION */}
          {step === "brand" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-[#00D084]">Step 1 of 5</span>
                  <h4 className="text-lg font-bold text-white">Select EV Manufacturer</h4>
                </div>
                <span className="text-xs font-mono font-bold text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {filteredBrands.length} Brands
                </span>
              </div>

              {/* Category Segment Tabs */}
              <div className="flex items-center gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setBrandCategoryFilter("ALL")}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    brandCategoryFilter === "ALL"
                      ? "bg-[#00D084] text-black shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  All (2W & 3W)
                </button>
                <button
                  type="button"
                  onClick={() => setBrandCategoryFilter("2W")}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    brandCategoryFilter === "2W"
                      ? "bg-[#00D084] text-black shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  🛵 2-Wheelers
                </button>
                <button
                  type="button"
                  onClick={() => setBrandCategoryFilter("3W")}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    brandCategoryFilter === "3W"
                      ? "bg-[#00D084] text-black shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  🛺 3-Wheelers
                </button>
              </div>

              {/* Brand Search Input */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D084]" />
                <input
                  type="text"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Search brand (Ola, Ather, TVS, Bajaj, Mahindra...)"
                  className="w-full bg-[#030604] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00D084]"
                />
              </div>

              {/* Brands Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pr-1">
                {filteredBrands.map((b) => (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => handleSelectBrand(b.name)}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer ${
                      selectedBrand === b.name
                        ? "border-[#00D084] bg-[#00D084]/15"
                        : "border-white/10 hover:border-[#00D084]/50 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center p-2 bg-black/40 group-hover:scale-105 transition-all overflow-hidden shrink-0">
                      {b.logoUrl ? (
                        <img src={b.logoUrl} alt={b.displayName} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-xl">{b.icon}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight truncate">{b.displayName}</p>
                      <p className="text-[10px] text-[#00D084] font-medium mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Select →</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: MODEL SELECTION */}
          {step === "model" && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setStep("brand")}
                className="flex items-center gap-1 text-xs font-bold text-[#00D084] hover:underline"
              >
                <ChevronLeft className="w-4 h-4" /> Change Manufacturer ({selectedBrand})
              </button>

              <div>
                <span className="text-[10px] uppercase tracking-widest font-black text-[#00D084]">Step 2 of 5</span>
                <h4 className="text-lg font-bold text-white">Select {selectedBrand} Model</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pr-1">
                {availableModels.map((m) => {
                  const info = getModelDisplayInfo(selectedBrand, m);
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleSelectModel(m)}
                      className={`p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer group ${
                        selectedModel === m
                          ? "border-[#00D084] bg-[#00D084]/15"
                          : "border-white/10 hover:border-[#00D084]/50 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl border border-white/15 flex items-center justify-center bg-black/50 overflow-hidden shrink-0 p-1 group-hover:scale-105 transition-all">
                        {info.imageUrl ? (
                          <img
                            src={info.imageUrl}
                            alt={m}
                            className="w-full h-full object-contain rounded-xl"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const fallbackLogo = getBrandLogoUrl(selectedBrand);
                              if (fallbackLogo && target.src !== fallbackLogo) {
                                target.src = fallbackLogo;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-extrabold text-[#00D084] text-xs">
                            EV
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate group-hover:text-[#00D084] transition-colors">
                          {m}
                        </p>
                        <p className="text-[10px] text-white/50 mt-0.5">
                          {selectedBrand} Electric {info.battery ? `• ${info.battery}` : ""}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#00D084] transition-colors shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: SERVICE SELECTION */}
          {step === "service_selection" && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setStep("model")}
                className="flex items-center gap-1 text-xs font-bold text-[#00D084] hover:underline"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Vehicle ({selectedBrand} {selectedModel})
              </button>

              <div>
                <span className="text-[10px] uppercase tracking-widest font-black text-[#00D084]">Step 3 of 5</span>
                <h4 className="text-lg font-bold text-white">Select EV Service Package</h4>
              </div>

              {/* Direct Franchise Center Visit Option */}
              <button
                type="button"
                onClick={() => {
                  setSelectedService(DIRECT_FRANCHISE_SERVICE);
                  setStep("location_contact");
                }}
                className="w-full p-4 rounded-2xl border-2 border-[#00D084]/40 bg-[#00D084]/10 hover:bg-[#00D084]/20 transition-all text-left flex items-start gap-3 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00D084] text-black flex items-center justify-center shrink-0 font-bold">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#00D084]">Direct Visit Option</span>
                    <span className="text-sm font-black font-mono text-white">₹199</span>
                  </div>
                  <h5 className="text-xs font-bold text-white mt-0.5">Don't Know What's Wrong? General Inspection</h5>
                  <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                    Book a direct visit or general inspection at your nearest authorized franchise center.
                  </p>
                </div>
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-white/50">
                  <span className="bg-[#090f0c] px-2 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#00D084]" />
                    Services for {selectedBrand} {selectedModel}
                  </span>
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-2.5 pr-1">
                {BOOKING_SERVICES_LIST.filter(s => s.id !== 'direct-franchise-visit').map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => {
                      setSelectedService(svc);
                      setStep("location_contact");
                    }}
                    className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer ${
                      selectedService?.id === svc.id
                        ? "border-[#00D084] bg-[#00D084]/15"
                        : "border-white/10 hover:border-[#00D084]/50 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white">{svc.title}</p>
                      <p className="text-[11px] text-white/60 line-clamp-1 mt-0.5">{svc.description}</p>
                      <p className="text-[10px] text-[#00D084] font-medium mt-1">Duration: {svc.duration}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-black font-mono text-white">{svc.price}</p>
                      <span className="text-[10px] text-[#00D084] font-bold">Select →</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: LOCATION & CONTACT */}
          {step === "location_contact" && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setStep(initialService ? "model" : "service_selection")}
                className="flex items-center gap-1 text-xs font-bold text-[#00D084] hover:underline"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              <div>
                <span className="text-[10px] uppercase tracking-widest font-black text-[#00D084]">Step 4 of 5</span>
                <h4 className="text-lg font-bold text-white">Contact & Service Address</h4>
              </div>

              {/* Selected Vehicle & Service Badge */}
              <div className="p-3 rounded-2xl border border-[#00D084]/30 bg-[#00D084]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00D084] text-black font-extrabold flex items-center justify-center text-xs">
                    EV
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{selectedBrand} {selectedModel}</p>
                    {selectedService && (
                      <p className="text-[11px] font-semibold text-[#00D084]">{selectedService.title}</p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("brand")}
                  className="text-[11px] font-bold text-[#00D084] hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/70 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#030604] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/70 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="10-digit number"
                    className="w-full bg-[#030604] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-white/70">Service Address *</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAutoDetectLocation}
                      disabled={isDetectingLocation}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00D084] hover:underline cursor-pointer"
                    >
                      <Navigation className="w-3 h-3" />
                      {isDetectingLocation ? "Detecting..." : "Auto GPS"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(!isEditingAddress)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-white/60 hover:text-white cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      {isEditingAddress ? "Done" : "Edit Address"}
                    </button>
                  </div>
                </div>

                {isEditingAddress ? (
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter detailed street address, area, city, pincode..."
                    rows={2}
                    className="w-full bg-[#030604] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00D084] resize-none"
                  />
                ) : (
                  <div className="p-3 rounded-2xl border border-white/15 bg-white/5 flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                    <p className="text-xs text-white font-medium">{address || "Click Auto GPS or Edit Address to set location."}</p>
                  </div>
                )}

                {/* Serviceability Badge */}
                <div className="p-3 rounded-2xl border border-[#00D084]/40 bg-[#00D084]/10 flex items-center justify-between text-xs font-medium text-[#00D084]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Service Available • Assigned Hub: <strong className="font-bold">Authorized Center</strong></span>
                  </div>
                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-black/40 border border-[#00D084]/40">
                    Verified
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={!customerName.trim() || !customerPhone.trim() || !address.trim()}
                onClick={() => setStep("mode_slot")}
                className="w-full py-3.5 rounded-xl bg-[#00D084] hover:bg-[#00e08f] text-black font-black uppercase text-xs tracking-wider transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                Schedule Service <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 5: MODE & SCHEDULE */}
          {step === "mode_slot" && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setStep("location_contact")}
                className="flex items-center gap-1 text-xs font-bold text-[#00D084] hover:underline"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Location
              </button>

              <div>
                <span className="text-[10px] uppercase tracking-widest font-black text-[#00D084]">Step 5 of 5</span>
                <h4 className="text-lg font-bold text-white">Service Mode & Schedule</h4>
              </div>

              {/* Service Mode */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-white/70">1. Select Service Mode</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setServiceMode("doorstep")}
                    className={`p-3.5 rounded-2xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                      serviceMode === "doorstep"
                        ? "border-[#00D084] bg-[#00D084]/15"
                        : "border-white/10 hover:border-[#00D084]/40 bg-white/5"
                    }`}
                  >
                    <Home className="w-5 h-5 text-[#00D084] shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Doorstep Service</p>
                      <p className="text-[10px] text-white/50">Van & Certified Tech</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceMode("franchise")}
                    className={`p-3.5 rounded-2xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                      serviceMode === "franchise"
                        ? "border-[#00D084] bg-[#00D084]/15"
                        : "border-white/10 hover:border-[#00D084]/40 bg-white/5"
                    }`}
                  >
                    <Store className="w-5 h-5 text-[#00D084] shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Franchise Visit</p>
                      <p className="text-[10px] text-white/50">Direct Service Center</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-white/70">2. Select Service Date</label>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {upcomingDays.map((day) => {
                    const isSelected = selectedDate === day.dateStr;
                    return (
                      <button
                        key={day.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(day.dateStr)}
                        className={`min-w-[64px] py-2 px-1.5 rounded-2xl border transition-all flex flex-col items-center justify-center text-center cursor-pointer shrink-0 ${
                          isSelected
                            ? "border-[#00D084] bg-[#00D084] text-black font-bold"
                            : "border-white/15 bg-white/5 hover:bg-white/10 text-white"
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold tracking-wider">{day.dayLabel}</span>
                        <span className="text-base font-black my-0.5">{day.dateNum}</span>
                        <span className="text-[9px] uppercase opacity-70">{day.monthLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-white/70">3. Select Time Window</label>
                
                {/* Instant ASAP */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTime("slot-asap");
                    setSelectedSlotLabel("Instant Priority Dispatch (ASAP)");
                  }}
                  className={`w-full p-2.5 rounded-2xl border transition-all flex items-center justify-between text-left cursor-pointer ${
                    selectedTime === "slot-asap"
                      ? "border-[#00D084] bg-[#00D084]/15"
                      : "border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">⚡</span>
                    <div>
                      <p className="text-xs font-bold text-white">Instant Priority Dispatch (ASAP)</p>
                      <p className="text-[10px] text-white/60">Technician dispatched within ~30–45 mins</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#00D084]">Select</span>
                </button>

                {/* Standard Slots */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: "slot-m1", label: "09:30 AM – 11:00 AM" },
                    { id: "slot-m2", label: "11:00 AM – 12:30 PM" },
                    { id: "slot-a1", label: "01:00 PM – 02:30 PM" },
                    { id: "slot-a2", label: "02:30 PM – 04:00 PM" },
                    { id: "slot-e1", label: "04:30 PM – 06:00 PM" },
                    { id: "slot-e2", label: "06:00 PM – 07:30 PM" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSelectedTime(s.id);
                        setSelectedSlotLabel(s.label);
                      }}
                      className={`p-2.5 rounded-2xl border transition-all text-xs font-bold text-left cursor-pointer ${
                        selectedTime === s.id
                          ? "border-[#00D084] bg-[#00D084]/20 text-[#00D084]"
                          : "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={!selectedTime}
                onClick={() => setStep("payment_confirm")}
                className="w-full py-3.5 rounded-xl bg-[#00D084] hover:bg-[#00e08f] text-black font-black uppercase text-xs tracking-wider transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                Review & Confirm <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 6: PAYMENT & REVIEW */}
          {step === "payment_confirm" && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setStep("mode_slot")}
                className="flex items-center gap-1 text-xs font-bold text-[#00D084] hover:underline"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Schedule
              </button>

              <div>
                <span className="text-[10px] uppercase tracking-widest font-black text-[#00D084]">Final Review</span>
                <h4 className="text-lg font-bold text-white">Review & Confirm Order</h4>
              </div>

              {/* Summary Card */}
              <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60 font-medium">Vehicle:</span>
                  <span className="font-bold text-white">{selectedBrand} {selectedModel}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60 font-medium">Service:</span>
                  <span className="font-bold text-white">{selectedService?.title}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60 font-medium">Service Mode:</span>
                  <span className="font-bold text-white capitalize">{serviceMode === "doorstep" ? "Doorstep Service" : "Franchise Center Visit"}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60 font-medium">Scheduled Time:</span>
                  <span className="font-bold text-[#00D084]">{selectedSlotLabel}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-white/60 font-medium">Address:</span>
                  <span className="font-medium text-white truncate max-w-[200px]">{address}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-white/70">Payment Method</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("advance")}
                    className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2 cursor-pointer ${
                      paymentMethod === "advance"
                        ? "border-[#00D084] bg-[#00D084]/15"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#00D084] shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Pay Online</p>
                      <p className="text-[10px] text-white/50">UPI / Card</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("on_door")}
                    className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2 cursor-pointer ${
                      paymentMethod === "on_door"
                        ? "border-[#00D084] bg-[#00D084]/15"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-[#00D084] shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Pay at Franchise</p>
                      <p className="text-[10px] text-white/50">Pay on Completion</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Total Price Box */}
              <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60">Total Payable Amount</p>
                  <p className="text-xs font-bold text-[#00D084]">
                    {paymentMethod === "on_door" ? "Pay upon completion" : "Instant Online Payment"}
                  </p>
                </div>
                <p className="text-2xl font-black font-mono text-[#00D084]">
                  {selectedService?.price ?? "₹499"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleConfirmBooking}
                className="w-full py-4 rounded-xl bg-[#00D084] hover:bg-[#00e08f] text-black font-black uppercase text-xs tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                Confirm & Book Service <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 7: SUCCESS SCREEN */}
          {step === "success" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#00D084]/20 border-2 border-[#00D084] flex items-center justify-center mx-auto text-[#00D084]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white">Booking Confirmed!</h4>
                <p className="text-xs text-white/60 mt-1">Your EV service order circuit has been successfully initialized.</p>
                <p className="text-sm font-mono font-bold text-[#00D084] mt-2">Order ID: {bookingId}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left max-w-sm mx-auto space-y-1">
                <p className="text-[10px] uppercase font-bold text-[#00D084]">Assigned Franchise Center</p>
                <p className="text-xs font-bold text-white">Authorized MY EV Service Hub</p>
                <p className="text-[11px] text-white/60">24/7 Technician Dispatch Center • 30-min SLA</p>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3.5 rounded-xl bg-[#00D084] hover:bg-[#00e08f] text-black font-black uppercase text-xs tracking-wider transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
