import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ONBOARDING_STEPS_90_DAYS } from "../data/franchiseData";
import {
  Calendar,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Sparkles,
  Gauge,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FranchiseJourneyRoadmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [hudPercent, setHudPercent] = useState<number>(1);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    // Create GSAP ScrollTrigger pin & scrub instance
    const ctx = gsap.context(() => {
      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=70",
        end: "+=1600",
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          const percent = Math.min(100, Math.max(1, Math.round(progress * 100)));
          setHudPercent(percent);

          // Update Vehicle X Position & Trail Line (12% to 89%)
          const leftPos = 12 + progress * (89 - 12);
          if (vehicleRef.current) {
            vehicleRef.current.style.left = `${leftPos}%`;
            
            // Rotate logo image based on scroll progress
            const logoImg = vehicleRef.current.querySelector(".roadmap-logo-img") as HTMLImageElement;
            if (logoImg) {
              logoImg.style.transform = `scale(1.25) rotate(${progress * 720}deg)`;
            }
          }
          if (trailRef.current) {
            trailRef.current.style.width = `${leftPos}%`;
          }

          // Update Active Phase Step
          if (progress < 0.28) {
            setActiveStepIdx(0);
          } else if (progress < 0.55) {
            setActiveStepIdx(1);
          } else if (progress < 0.82) {
            setActiveStepIdx(2);
          } else {
            setActiveStepIdx(3);
          }
        },
      });

      return () => {
        pinTrigger.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeStep = ONBOARDING_STEPS_90_DAYS[activeStepIdx];

  return (
    <div
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 font-serif relative z-20"
    >
      <div className="w-full bg-[#020403] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        {/* Ambient Radial Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D084]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 mb-8 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00D084]" /> GSAP ScrollTrigger Pinned Journey
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-white mt-1">
              Your <span className="text-[#00D084]">90-Day</span> Onboarding Highway
            </h3>
          </div>
        </div>

        {/* HIGHWAY TRACK WITH GSAP PINNED EV VEHICLE */}
        <div className="relative z-10 mb-10 pt-6 pb-4">
          <div className="relative h-16 bg-[#020503] border border-white/15 rounded-3xl overflow-hidden flex items-center px-4 shadow-2xl">


            {/* Active Energized Trail Line behind EV Vehicle */}
            <div
              ref={trailRef}
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#00D084]/5 via-[#00D084]/20 to-[#00D084]/40 border-r-2 border-[#00D084] shadow-[0_0_20px_#00D084] transition-all duration-75"
              style={{ width: "12%" }}
            />


            {/* GSAP PINNED MOVING EV VEHICLE INDICATOR */}
            <div
              ref={vehicleRef}
              className="absolute z-30 -translate-x-1/2 flex items-center transition-all duration-75"
              style={{ left: "12%" }}
            >
              {/* Headlight Forward Beam Light Glow */}
              <div className="absolute left-10 w-28 h-16 bg-gradient-to-r from-[#00D084]/40 to-transparent blur-md rounded-r-full pointer-events-none" />

              {/* EV Vehicle Logo Indicator */}
              <div className="relative w-16 h-16 rounded-xl bg-black border-2 border-[#00D084] flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/logo.jpeg"
                  alt="EV Logo"
                  className="roadmap-logo-img w-full h-full object-cover scale-125 relative z-10"
                />
              </div>
            </div>
          </div>

          {/* Milestone Node Buttons Below Highway */}
          <div className="grid grid-cols-4 gap-2 mt-4 text-center">
            {ONBOARDING_STEPS_90_DAYS.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-3 rounded-2xl transition-all cursor-pointer border font-serif text-left sm:text-center ${isActive
                      ? "bg-[#050c08] border-[#00D084] scale-105 shadow-[0_0_15px_rgba(0,208,132,0.25)]"
                      : "bg-[#020503] border-white/10 hover:border-white/20 opacity-70 hover:opacity-100"
                    }`}
                >
                  <div className="text-[10px] font-serif font-extrabold text-[#00D084] uppercase tracking-wider">
                    {step.day}
                  </div>
                  <div className="text-xs font-serif font-bold text-white truncate mt-0.5">
                    Phase 0{idx + 1}
                  </div>
                  <div className="text-[10px] font-serif text-white/50 truncate hidden sm:block">
                    {step.title.split("&")[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE PHASE DETAILED CARD DISPLAY */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStepIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-[#040806] border-2 border-[#00D084]/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden font-serif shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-xs font-serif font-bold text-[#00D084]">
                  <Sparkles className="w-3.5 h-3.5" /> MILESTONE STOP 0{activeStepIdx + 1} • {activeStep.day}
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  {activeStep.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/75 font-serif font-light leading-relaxed">
                  {activeStep.desc}
                </p>
              </div>

              {/* Right Checklist Box */}
              <div className="bg-[#020503] border border-white/15 rounded-2xl p-5 shrink-0 w-full lg:w-80 space-y-2.5 font-serif shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-serif font-extrabold text-[#00D084] uppercase tracking-wider">
                    MILESTONE CHECKLIST:
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#00D084]" />
                </div>

                {activeStep.checklist.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-2.5 text-xs text-white/90 font-serif font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
