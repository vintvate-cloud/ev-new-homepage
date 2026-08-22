import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { Link, useNavigate } from "@tanstack/react-router";
import { X, MapPin, CalendarCheck, CheckCircle2, Zap, ShieldCheck, Lock } from "lucide-react";
import { toast } from "sonner";

export interface PreBookingSlot {
  id: string;
  area: string;
  pincode: string;
  status: "available" | "booked";
}

export interface CityPreBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  cityName: string;
  initialSlots?: PreBookingSlot[];
}

// Preset PIN code & slot data for major cities
export const DEFAULT_CITY_SLOTS: Record<string, PreBookingSlot[]> = {
  pune: [
    { id: "pn-1", area: "Aundh", pincode: "411007", status: "available" },
    { id: "pn-2", area: "Baner", pincode: "411045", status: "available" },
    { id: "pn-3", area: "Bhavdhan", pincode: "411021", status: "booked" },
    { id: "pn-4", area: "Camp Pune Railway", pincode: "411001", status: "available" },
    { id: "pn-5", area: "Hadapsar", pincode: "411028", status: "available" },
    { id: "pn-6", area: "Kalyani Nagar", pincode: "411006", status: "available" },
    { id: "pn-7", area: "Katraj", pincode: "411046", status: "booked" },
    { id: "pn-8", area: "Kharadi", pincode: "411014", status: "available" },
  ],
  mumbai: [
    { id: "mb-1", area: "Andheri West", pincode: "400053", status: "available" },
    { id: "mb-2", area: "Bandra West", pincode: "400050", status: "booked" },
    { id: "mb-3", area: "Powai", pincode: "400076", status: "available" },
    { id: "mb-4", area: "Thane West", pincode: "400601", status: "available" },
    { id: "mb-5", area: "Navi Mumbai (Vashi)", pincode: "400703", status: "booked" },
  ],
  bangalore: [
    { id: "bl-1", area: "Indiranagar", pincode: "560038", status: "available" },
    { id: "bl-2", area: "Koramangala", pincode: "560095", status: "booked" },
    { id: "bl-3", area: "Whitefield", pincode: "560066", status: "available" },
    { id: "bl-4", area: "HSR Layout", pincode: "560102", status: "available" },
    { id: "bl-5", area: "Electronic City", pincode: "560100", status: "booked" },
  ],
  "delhi-ncr": [
    { id: "dl-1", area: "Noida Sector 62", pincode: "201309", status: "available" },
    { id: "dl-2", area: "Gurugram Cyber City", pincode: "122002", status: "booked" },
    { id: "dl-3", area: "Dwarka Sector 10", pincode: "110075", status: "available" },
    { id: "dl-4", area: "Okhla Phase 3", pincode: "110020", status: "available" },
  ],
  hyderabad: [
    { id: "hyd-1", area: "Gachibowli", pincode: "500032", status: "available" },
    { id: "hyd-2", area: "HITECH City", pincode: "500081", status: "booked" },
    { id: "hyd-3", area: "Banjara Hills", pincode: "500034", status: "available" },
    { id: "hyd-4", area: "Kukatpally", pincode: "500072", status: "available" },
  ],
  ahmedabad: [
    { id: "ahm-1", area: "SG Highway", pincode: "380054", status: "available" },
    { id: "ahm-2", area: "Navrangpura", pincode: "380009", status: "booked" },
    { id: "ahm-3", area: "Satellite", pincode: "380015", status: "available" },
  ],
};

export function CityPreBookingModal({
  isOpen,
  onClose,
  cityName,
  initialSlots,
}: CityPreBookingModalProps) {
  const cityKey = cityName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  
  // Default fallback slots if specific city slots aren't passed
  const defaultSlots: PreBookingSlot[] = initialSlots || DEFAULT_CITY_SLOTS[cityKey] || [
    { id: `${cityKey}-1`, area: `Central ${cityName}`, pincode: "400001", status: "available" },
    { id: `${cityKey}-2`, area: `North ${cityName}`, pincode: "400002", status: "booked" },
    { id: `${cityKey}-3`, area: `South ${cityName}`, pincode: "400003", status: "available" },
    { id: `${cityKey}-4`, area: `East ${cityName}`, pincode: "400004", status: "available" },
  ];

  const [slots, setSlots] = useState<PreBookingSlot[]>(defaultSlots);
  const [userPhone, setUserPhone] = useState("");
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState<PreBookingSlot | null>(null);

  const modalBodyRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Lenis Smooth Scroll Setup for modal container without scrollbars
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
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBookSlot = (slot: PreBookingSlot) => {
    setSelectedSlotForBooking(slot);
  };

  const handleConfirmPreBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlotForBooking) return;

    // Mark slot as booked in state
    setSlots((prev) =>
      prev.map((s) => (s.id === selectedSlotForBooking.id ? { ...s, status: "booked" } : s))
    );

    toast.success(
      `Pre-booking confirmed for ${selectedSlotForBooking.area} (${selectedSlotForBooking.pincode})!`
    );
    setSelectedSlotForBooking(null);
    setUserPhone("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md font-sans animate-in fade-in duration-200">
      <div className="bg-[#090f0c] border border-white/15 text-white w-full max-w-6xl rounded-[44px] p-8 sm:p-12 relative shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center text-[#00D084]">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#00D084]">
                LIVE CITY SLOTS • {cityName.toUpperCase()}
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                {cityName} Pre-Booking Directory & Slots
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Main Body (Lenis Smooth Scroll - No Scrollbar Visuals) */}
        <div
          ref={modalBodyRef}
          data-lenis-prevent
          className="overflow-y-auto max-h-[66vh] pr-1 space-y-6 overscroll-contain font-sans border-t border-b border-white/5 py-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div ref={modalContentRef} className="space-y-6">
          {selectedSlotForBooking ? (
            <div className="bg-[#040806] border border-[#00D084]/40 rounded-3xl p-6 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#00D084] font-bold uppercase">
                    Confirm Slot Reservation
                  </span>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    {selectedSlotForBooking.area} ({selectedSlotForBooking.pincode})
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedSlotForBooking(null)}
                  className="text-xs font-mono text-white/50 hover:text-white underline"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleConfirmPreBooking} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1">
                    Enter Mobile Number for Slot Token *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full bg-[#020403] border border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#00D084] text-black font-bold uppercase text-xs tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg"
                >
                  CONFIRM PRE-BOOKING SLOT
                </button>
              </form>
            </div>
          ) : null}

          {/* Table Container */}
          <div className="rounded-3xl border border-white/10 overflow-hidden bg-[#040806] relative">
            <table className="w-full text-left text-sm font-sans border-collapse">
              <thead className="sticky top-0 bg-[#070e0a] z-20 border-b border-white/10 shadow-lg">
                <tr className="text-white/60 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-4 px-6 sm:px-8">Area</th>
                  <th className="py-4 px-6 sm:px-8">Pin Code</th>
                  <th className="py-4 px-6 sm:px-8">Status</th>
                  <th className="py-4 px-6 sm:px-8 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {slots.map((s) => {
                  const isAvailable = s.status === "available";
                  return (
                    <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 sm:px-8 font-bold text-white text-base">
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-4 h-4 text-[#00D084]" />
                          <span>{s.area}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 sm:px-8 font-mono text-white/70 text-xs">
                        {s.pincode}
                      </td>
                      <td className="py-4 px-6 sm:px-8">
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                            AVAILABLE
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-white/10 text-white/40 border border-white/10">
                            <Lock className="w-3.5 h-3.5" />
                            BOOKED
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 sm:px-8 text-right">
                        {isAvailable ? (
                          <Link
                            to="/franchise-apply"
                            search={{
                              city: cityName,
                              area: s.area,
                              pincode: s.pincode,
                            }}
                            onClick={() => {
                              toast.success(`Opening Franchise Application for ${s.area} (${s.pincode})`);
                              onClose();
                            }}
                            className="inline-block px-5 py-2 rounded-full bg-[#00D084] hover:bg-[#00e08f] text-black font-bold uppercase text-[11px] tracking-wider transition-all cursor-pointer shadow-md hover:scale-105"
                          >
                            BOOK NOW
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/30 font-bold uppercase text-[11px] tracking-wider cursor-not-allowed opacity-50 select-none"
                          >
                            BOOKED
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Footer Note */}
      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-white/50 shrink-0">
        <span>* Pre-booking guarantees priority doorstep & diagnostic slots.</span>
        <span className="text-[#00D084] font-bold">100% Refundable Guarantee</span>
      </div>
    </div>
  </div>
);
}
