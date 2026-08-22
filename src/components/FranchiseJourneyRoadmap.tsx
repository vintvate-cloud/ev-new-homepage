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
      <div className="w-full bg-[#030704] border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        {/* Ambient Radial Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D084]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00D084]" /> GSAP ScrollTrigger Pinned Journey
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-white mt-1">
              Your <span className="text-[#00D084]">90-Day</span> Onboarding Highway
            </h3>
          </div>

          {/* Live HUD Telemetry Bar */}
          <div className="flex items-center gap-4 bg-[#020503] border border-white/15 px-4 py-2.5 rounded-2xl shadow-inner">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#00D084] animate-pulse" />
              <span className="text-xs font-serif text-white/60">Telemetry:</span>
            </div>
            <span className="text-xs font-serif font-black text-[#00D084]">
              {hudPercent}% Flow Complete
            </span>
            <span className="text-xs font-serif text-white/40 hidden sm:inline">•</span>
            <span className="text-xs font-serif font-bold text-white hidden sm:inline">
              Phase 0{activeStepIdx + 1} Pinned
            </span>
          </div>
        </div>

        {/* HIGHWAY TRACK WITH GSAP PINNED EV VEHICLE */}
        <div className="relative z-10 mb-10 pt-6 pb-4">
          <div className="relative h-16 bg-[#020503] border border-white/15 rounded-3xl overflow-hidden flex items-center px-4 shadow-2xl">
            {/* Animated Highway Center Lane Dashes */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-[repeating-linear-gradient(to_right,#ffffff20_0px,#ffffff20_16px,transparent_16px,transparent_32px)]" />

            {/* Active Energized Trail Line behind EV Vehicle */}
            <div
              ref={trailRef}
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#00D084]/5 via-[#00D084]/20 to-[#00D084]/40 border-r-2 border-[#00D084] shadow-[0_0_20px_#00D084] transition-all duration-75"
              style={{ width: "12%" }}
            />

            {/* Waypoint Milestone Stop Nodes (Day 15, 40, 65, 90) */}
            <div className="absolute inset-x-0 flex justify-between px-6 sm:px-12 z-20 pointer-events-none">
              {ONBOARDING_STEPS_90_DAYS.map((step, idx) => {
                const isPassed = idx <= activeStepIdx;
                const isCurrent = idx === activeStepIdx;
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${isCurrent
                          ? "bg-[#00D084] border-white scale-125 shadow-[0_0_15px_#00D084]"
                          : isPassed
                            ? "bg-[#00D084]/30 border-[#00D084]"
                            : "bg-[#040806] border-white/20"
                        }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* GSAP PINNED MOVING EV VEHICLE INDICATOR */}
            <div
              ref={vehicleRef}
              className="absolute z-30 -translate-x-1/2 flex items-center transition-all duration-75"
              style={{ left: "12%" }}
            >
              {/* Headlight Forward Beam Light Glow */}
              <div className="absolute left-8 w-24 h-12 bg-gradient-to-r from-[#00D084]/40 to-transparent blur-md rounded-r-full pointer-events-none" />

              {/* EV Vehicle Badge */}
              <div className="relative bg-[#020503] border-2 border-[#00D084] rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-[0_0_24px_rgba(0,208,132,0.8)]">
                <div className="absolute -inset-1 rounded-2xl bg-[#00D084]/30 blur-sm animate-pulse pointer-events-none" />

                <div className="relative z-10 w-7 h-7 rounded-xl bg-[#00D084] text-[#020403] flex items-center justify-center font-bold shadow-md">
                  <Zap className="w-4 h-4 fill-[#020403]" />
                </div>

                <div className="relative z-10 text-left">
                  <span className="text-[9px] font-serif font-black uppercase text-[#00D084] tracking-wider block leading-none">
                    EV DRIVING
                  </span>
                  <span className="text-[11px] font-serif font-extrabold text-white leading-none block mt-0.5">
                    Phase 0{activeStepIdx + 1}
                  </span>
                </div>
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
