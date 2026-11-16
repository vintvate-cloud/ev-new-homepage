import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check,
  ChevronRight,
  ArrowRight,
  X,
  Compass,
  ChevronLeft,
  Play,
  Pause,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// =========================================================================
// PREMIUM PURE WHITE VECTOR SVGS
// Minimalist, high-end, clean strokes with 0 color clutter
// =========================================================================

export function StepOneDepotSVG() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7 sm:w-8 sm:h-8 text-white"
    >
      {/* Precision EV Torque Wrench */}
      <path d="M23.5 8.5a4.5 4.5 0 0 1-5.8 4.2L9.2 21.2a2.5 2.5 0 1 1-3.5-3.5l8.5-8.5a4.5 4.5 0 0 1 4.2-5.8c.8 0 1.5.3 2.1.8l-3.2 3.2 2.8 2.8 3.2-3.2c.5.6.8 1.3.8 2.1z" />
      {/* Caliper / Hub Setting Indicator */}
      <circle cx="23.5" cy="23.5" r="4.5" />
      <path d="M23.5 21.5v4M21.5 23.5h4" strokeWidth="1.5" />
    </svg>
  );
}

export function StepTwoBatterySVG() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7 sm:w-8 sm:h-8 text-white"
    >
      {/* Battery Cell Chamber */}
      <rect x="5" y="9" width="20" height="14" rx="3" />
      <path d="M27 13.5v5" strokeWidth="2" />
      {/* High-Voltage CAN-Bus Waveform */}
      <path d="M8 16h3.5l2-4.5 3 9 2.5-6.5 2 2H22" strokeWidth="1.8" />
    </svg>
  );
}

export function StepThreeRescueSVG() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7 sm:w-8 sm:h-8 text-white"
    >
      {/* Rapid Response Van Body */}
      <path d="M4 11h14v10H4zM18 14h5l3 4v3h-8v-7z" />
      <circle cx="9.5" cy="22.5" r="2.5" />
      <circle cx="21.5" cy="22.5" r="2.5" />
      {/* Lightning Rescue Signal */}
      <path d="M12 5.5l2.5-3h-3.5l1.5-2" strokeWidth="1.5" />
      <path d="M9 14.5v3M7.5 16h3" strokeWidth="1.5" />
    </svg>
  );
}

export function StepFourCircularitySVG() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7 sm:w-8 sm:h-8 text-white"
    >
      {/* Closed-Loop Circularity / Möbius Flow */}
      <path d="M10.5 11C7.5 11 5 13.2 5 16s2.5 5 5.5 5c3.2 0 5-3.5 5.5-5-.5-1.5-2.3-5-5.5-5zM21.5 11c3 0 5.5 2.2 5.5 5s-2.5 5-5.5 5c-3.2 0-5-3.5-5.5-5 .5-1.5 2.3-5 5.5-5z" />
      {/* Flow Arrows */}
      <path d="M23 10l2 2-2 2" strokeWidth="1.5" />
      <path d="M9 22l-2-2 2-2" strokeWidth="1.5" />
    </svg>
  );
}

// =========================================================================
// 4-STEP SEQUENTIAL JOURNEY DATA (Preserving all 8 Capabilities Verbatim)
// =========================================================================

export interface FleetCapabilityItem {
  id: string;
  step: string;
  badge: string;
  title: string;
  desc: string;
  sla: string;
  inclusions: string[];
  metrics: { label: string; value: string }[];
}

export interface FleetJourneyStep {
  stepNumber: string;
  stepLabel: string;
  cardTitle: string;
  actionHeadline: string;
  actionDesc: string;
  pillBadge: string;
  icon: () => React.JSX.Element;
  capabilities: [FleetCapabilityItem, FleetCapabilityItem];
}

export const FOUR_STEP_FLEET_JOURNEY: FleetJourneyStep[] = [
  // STEP 01
  {
    stepNumber: "01",
    stepLabel: "Pre-Shift Depot & PM",
    cardTitle: "Pre-Shift Depot & Uptime Assurance",
    actionHeadline: "Zero Morning Breakdowns",
    actionDesc:
      "Before your fleet rolls out, dedicated mobile technician teams execute multi-point safety audits, firmware sync, and preventive servicing directly at your rider hub or dark store.",
    pillBadge: "Fixed-price monthly AMC or pay-per-shift hub coverage",
    icon: StepOneDepotSVG,
    capabilities: [
      {
        id: "cap-01",
        step: "01",
        badge: "SCHEDULED AMC",
        title: "Preventive maintenance AMC",
        desc: "Scheduled servicing to a fixed EV checklist: brakes, tyres, suspension, connectors, firmware.",
        sla: "32-Point Protocol",
        inclusions: [
          "Rigid 32-point high-voltage & mechanical safety audit",
          "Torque calibration on steering, swingarms, and axle pinch bolts",
          "Connector corrosion treatment & dielectric silicone seal refresh",
          "BMS, MCU, and instrument cluster firmware OTA synchronization",
        ],
        metrics: [
          { label: "Checklist Depth", value: "32 Points" },
          { label: "Cycle Frequency", value: "Monthly / Bi-Weekly" },
          { label: "Shift Downtime", value: "0 Mins (Inter-Shift)" },
        ],
      },
      {
        id: "cap-04",
        step: "04",
        badge: "INTER-SHIFT CARE",
        title: "Depot and doorstep service",
        desc: "Technician teams at your depot or rider hubs, so vehicles are serviced between shifts.",
        sla: "<35 Min Turnaround",
        inclusions: [
          "Mobile fully-equipped workshop vans dispatched to your rider hubs",
          "Overnight and inter-shift servicing windows tailored to your dispatch schedules",
          "Direct sign-off on Autobot OS tablet with high-res photo audit logs",
          "Zero vehicle deadhead miles to off-site third-party garages",
        ],
        metrics: [
          { label: "Avg Service Window", value: "< 35 Mins" },
          { label: "Deadhead Miles", value: "0 km" },
          { label: "Verification", value: "Photo Proof App" },
        ],
      },
    ],
  },

  // STEP 02
  {
    stepNumber: "02",
    stepLabel: "Battery Health & Telematics",
    cardTitle: "Predictive Battery & Driver Range Optimization",
    actionHeadline: "Protect Your Highest-Value Asset",
    actionDesc:
      "While on active delivery routes, live cloud CAN-bus telemetry screens cell impedance and thermal trends, while trained riders maximize daily battery range and prevent avoidable faults.",
    pillBadge: "Real-time BMS Diagnostics & Range Optimization",
    icon: StepTwoBatterySVG,
    capabilities: [
      {
        id: "cap-02",
        step: "02",
        badge: "CELL INTELLIGENCE",
        title: "Predictive battery health",
        desc: "Monthly cell-level scans, balancing and SoH trends that flag weak packs before they fail.",
        sla: "99.4% Warning SLA",
        inclusions: [
          "Individual cell impedance delta and thermal runaway screening",
          "Active cell balancing restoring up to 12% lost daily delivery range",
          "Predictive degradation trend curves benchmarked across 14,000+ packs",
          "Instant quarantine dispatch for high-risk thermal anomalies",
        ],
        metrics: [
          { label: "Prediction Accuracy", value: "99.4%" },
          { label: "Range Restored", value: "+8% to +12%" },
          { label: "Telemetry", value: "CAN-Bus Live" },
        ],
      },
      {
        id: "cap-08",
        step: "08",
        badge: "DRIVER MASTERY",
        title: "Rider care training",
        desc: "Short practical coaching for riders on charging habits and daily checks that cut avoidable faults.",
        sla: "-28% Fault Reduction",
        inclusions: [
          "Practical coaching on regenerative braking optimization for extended range",
          "Thermal safety routines: pre-charge cooldown and hot-plug avoidance",
          "5-minute daily pre-ride safety inspection checklist for delivery riders",
          "Digital gamified completion badge and safety leaderboard in rider app",
        ],
        metrics: [
          { label: "Fault Reduction", value: "-28% Incidents" },
          { label: "Range Extension", value: "+10% km/kWh" },
          { label: "Module Format", value: "15-Min Micro" },
        ],
      },
    ],
  },

  // STEP 03
  {
    stepNumber: "03",
    stepLabel: "Rapid Rescue & Powertrain",
    cardTitle: "Rapid Emergency Rescue & Powertrain Bench Lab",
    actionHeadline: "Sub-45 Min Emergency Rescue",
    actionDesc:
      "When unexpected road hazards or electrical faults occur, dedicated recovery units arrive under 45 mins, backed by an in-house lab that rebuilds motors and controllers at 60% lower cost.",
    pillBadge: "Dedicated Fleet Rescue Vans on 24/7 Standby",
    icon: StepThreeRescueSVG,
    capabilities: [
      {
        id: "cap-03",
        step: "03",
        badge: "PRIORITY RSA",
        title: "Breakdown & roadside response",
        desc: "Priority dispatch for fleet vehicles, with towing to the nearest hub when needed.",
        sla: "<45 Min Rescue SLA",
        inclusions: [
          "Geofenced dedicated emergency response units in every metro cluster",
          "On-spot puncture repair, throttle swap, fuse, and 12V auxiliary recovery",
          "Express flatbed towing directly into dedicated master repair bays",
          "Rider onward transit assistance to protect active shift deliveries",
        ],
        metrics: [
          { label: "Urban SLA", value: "< 45 Mins" },
          { label: "Dispatch Pipeline", value: "Dedicated Priority" },
          { label: "Flatbed Network", value: "Citywide Metro" },
        ],
      },
      {
        id: "cap-05",
        step: "05",
        badge: "POWERTRAIN BENCH",
        title: "Motor, controller & charger repair",
        desc: "EV-grade diagnostics and repair for powertrain and charging faults, across brands.",
        sla: "Component Bench Lab",
        inclusions: [
          "Component-level oscilloscope testing of MCU MOSFETs and gate drivers",
          "Stator rewinding, neodymium magnet inspection, and bearing replacement",
          "Fast DC onboard charger PCB refurbishment and potting resealing",
          "60% cost reduction versus complete module replacement",
        ],
        metrics: [
          { label: "Savings vs Replace", value: "Up to 60%" },
          { label: "Bench Turnaround", value: "24 - 48 Hours" },
          { label: "Warranty", value: "6 Months Lab" },
        ],
      },
    ],
  },

  // STEP 04
  {
    stepNumber: "04",
    stepLabel: "Parts Supply & Circularity",
    cardTitle: "Wholesale Parts Supply & Second-Life Circularity",
    actionHeadline: "End-to-End Asset Protection",
    actionDesc:
      "Eliminate inventory bottlenecks with 2-hour intra-city consignment dispatch for 12,500+ OEM SKUs, completed by certified second-life battery repurposing and green disposal.",
    pillBadge: "Certified Zero-Landfill & Circular Battery Compliance",
    icon: StepFourCircularitySVG,
    capabilities: [
      {
        id: "cap-06",
        step: "06",
        badge: "WHOLESALE BUFFER",
        title: "Parts at contract rates",
        desc: "Batteries, chargers, controllers, tyres and brake parts supplied through EV Spare Hub.",
        sla: "2-Hour Dispatch SLA",
        inclusions: [
          "Guaranteed wholesale volume pricing on high-wear components",
          "RFID serial-number tracking eliminating depot spare shrinkage",
          "Strategic 2-hour intra-city consignment dispatch from central warehouses",
          "100% authentic OEM-sourced components with factory warranty",
        ],
        metrics: [
          { label: "Depot Dispatch", value: "Under 2 Hours" },
          { label: "Catalogue Reach", value: "12,500+ SKUs" },
          { label: "Shrinkage Control", value: "RFID Tracked" },
        ],
      },
      {
        id: "cap-07",
        step: "07",
        badge: "CIRCULAR BATTERY",
        title: "Battery lifecycle management",
        desc: "Repair, refurbishment and replacement planning, with certified end-of-life handling.",
        sla: "100% Eco-Certified",
        inclusions: [
          "Module-level harvesting and certified cell regrouping for second-life BESS",
          "Comprehensive end-of-life battery recycling compliant with CPCB norms",
          "Predictive CapEx depreciation planning for fleet pack changeouts",
          "Official green recycling certificates for ESG sustainability audits",
        ],
        metrics: [
          { label: "Second-Life Conversion", value: "Up to 75%" },
          { label: "Environmental Audit", value: "CPCB Compliant" },
          { label: "ESG Certification", value: "Green Certified" },
        ],
      },
    ],
  },
];

// =========================================================================
// SVG BÉZIER CURVE GENERATOR
// Smooth outward cubic bezier curve centered at Y
// =========================================================================

function generateBezierPath(
  y: number,
  h: number,
  baseX = 24,
  apexX = 76,
  radius = 55
): string {
  const yTop = Math.max(0, y - radius);
  const yBottom = Math.min(h, y + radius);
  const cp = radius * 0.45;

  return `M ${baseX} 0 L ${baseX} ${yTop.toFixed(1)} C ${baseX} ${(
    yTop + cp
  ).toFixed(1)}, ${apexX} ${(y - cp).toFixed(1)}, ${apexX} ${y.toFixed(
    1
  )} C ${apexX} ${(y + cp).toFixed(1)}, ${baseX} ${(yBottom - cp).toFixed(
    1
  )}, ${baseX} ${yBottom.toFixed(1)} L ${baseX} ${h.toFixed(1)}`;
}

// Fixed heights for the 4 steps in the 380px left column track
const STEP_Y_POSITIONS = [40, 135, 230, 325];

// =========================================================================
// MAIN COMPONENT: FleetVisualShowcase
// FULL-SCREEN EDGE-TO-EDGE IMMERSIVE CANVAS (NO INNER BOX)
// FIXED POSITION ON SCREEN + INSIDE ANIMATION SYNCS WITH SCROLL
// =========================================================================

export function FleetVisualShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const apexGroupRef = useRef<SVGGElement>(null);
  const apexBadgeRef = useRef<HTMLDivElement>(null);

  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const activeStepIdxRef = useRef<number>(0);
  const [selectedCapability, setSelectedCapability] = useState<FleetCapabilityItem | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const containerHeight = 380;
  const baseX = 25;
  const apexX = 85;

  // Auto-tour player
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      const next = (activeStepIdxRef.current + 1) % 4;
      handleJumpToStep(next);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Setup GSAP ScrollTrigger Pinning on the WHOLE Section (Full Width, Zero Extra Blank Space)
  useEffect(() => {
    if (typeof window === "undefined" || !stageRef.current) return;

    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const pinTrigger = ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top top",
        end: "+=1600",
        pin: true,
        pinSpacing: true,
        scrub: 0.4,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = Math.min(1, Math.max(0, self.progress));

          // Fluid Bézier curve movement directly on DOM (120 FPS GPU)
          const yStart = STEP_Y_POSITIONS[0];
          const yEnd = STEP_Y_POSITIONS[3];
          const curY = yStart + p * (yEnd - yStart);

          if (pathRef.current) {
            pathRef.current.setAttribute(
              "d",
              generateBezierPath(curY, containerHeight, baseX, apexX, 45)
            );
          }

          if (apexGroupRef.current) {
            apexGroupRef.current.setAttribute(
              "transform",
              `translate(0, ${curY})`
            );
          }

          if (apexBadgeRef.current) {
            apexBadgeRef.current.style.top = `${curY}px`;
          }

          // Determine active step index based on scroll depth
          let step = 0;
          if (p < 0.25) step = 0;
          else if (p < 0.50) step = 1;
          else if (p < 0.75) step = 2;
          else step = 3;

          if (step !== activeStepIdxRef.current) {
            activeStepIdxRef.current = step;
            setActiveStepIdx(step);
          }
        },
      });

      return () => {
        pinTrigger.kill();
      };
    }, stageRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Click jump to step
  const handleJumpToStep = (index: number) => {
    activeStepIdxRef.current = index;
    setActiveStepIdx(index);
    const targetY = STEP_Y_POSITIONS[index];

    if (pathRef.current) {
      pathRef.current.setAttribute(
        "d",
        generateBezierPath(targetY, containerHeight, baseX, apexX, 45)
      );
    }
    if (apexGroupRef.current) {
      apexGroupRef.current.setAttribute("transform", `translate(0, ${targetY})`);
    }
    if (apexBadgeRef.current) {
      apexBadgeRef.current.style.top = `${targetY}px`;
    }

    if (typeof window !== "undefined") {
      const triggers = ScrollTrigger.getAll();
      const myTrigger = triggers.find((t) => t.trigger === stageRef.current);
      if (myTrigger && myTrigger.start != null && myTrigger.end != null) {
        const targetScroll =
          myTrigger.start + (index / 3) * (myTrigger.end - myTrigger.start);
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }
    }
  };

  const currentStep = FOUR_STEP_FLEET_JOURNEY[activeStepIdx];
  const initialPathD = generateBezierPath(
    STEP_Y_POSITIONS[0],
    containerHeight,
    baseX,
    apexX,
    45
  );

  return (
    <section
      id="services"
      ref={stageRef}
      className="fleet-services-trigger relative z-20 w-full min-h-screen lg:h-screen flex flex-col justify-between pt-20 sm:pt-24 pb-4 px-6 sm:px-10 lg:px-16 xl:px-24 border-t border-white/10 bg-[#020403] overflow-x-clip"
    >
      {/* Subtle Ambient Radial Glows Spanning Full Viewport */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#00D084]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-[#00D084]/07 rounded-full blur-[150px] pointer-events-none" />

      {/* Tech Grid Texture across Full Screen */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="w-full flex flex-col justify-center relative z-10 my-auto">
        {/* Section Header (Fixed and pinned, safely below top navbar) */}
        <div className="fleet-services-header text-center max-w-3xl mx-auto mb-3 lg:mb-4 shrink-0">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#00D084] uppercase tracking-wider mb-1">
            Fleet Solutions Suite
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Everything an EV fleet needs, from one EV specialist
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-1 font-light max-w-xl mx-auto">
            Pick the services you need, or bundle them into one annual maintenance contract.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MOBILE / TABLET INTERACTIVE TABS (< 1024px)
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:hidden relative z-10 mb-6 space-y-3 max-w-xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00D084] uppercase">
              Phase [{currentStep.stepNumber}/04]
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleJumpToStep((activeStepIdx - 1 + 4) % 4)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                aria-label="Previous Step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleJumpToStep((activeStepIdx + 1) % 4)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                aria-label="Next Step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {FOUR_STEP_FLEET_JOURNEY.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.stepNumber}
                  onClick={() => handleJumpToStep(idx)}
                  className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? "bg-white/[0.14] border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-102"
                      : "bg-white/[0.03] border-white/10 text-white/40"
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <StepIcon />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase">
                    {step.stepNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SPLIT 2-COLUMN + CENTER BEZIER TRACKING LINE (FULL WIDTH, NO BOX)
            Strict, fixed 380px height stage: NO UP/DOWN SHIFTING WHATSOEVER
           ───────────────────────────────────────────────────────────── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_120px_1.25fr] items-center gap-6 lg:gap-10 min-h-[380px] w-full">
          {/* ── LEFT COLUMN: 4 Vertically Aligned Steps with Pure White SVGs ── */}
          <div className="hidden lg:flex flex-col justify-between h-[380px] py-1 shrink-0">
            {FOUR_STEP_FLEET_JOURNEY.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              const StepIcon = step.icon;

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => handleJumpToStep(idx)}
                  className={`group flex items-center justify-end gap-5 cursor-pointer transition-all duration-300 h-16 ${
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-75"
                  }`}
                >
                  {/* Text on Left */}
                  <div className="text-right">
                    <span
                      className={`block text-sm sm:text-base font-semibold tracking-tight transition-colors ${
                        isActive ? "text-white font-bold" : "text-white/60"
                      }`}
                    >
                      {step.stepLabel}
                    </span>
                    <span className="block text-[11px] font-mono text-white/40 tracking-wider">
                      PHASE {step.stepNumber}
                    </span>
                  </div>

                  {/* Frosted Circular Node with Pure White SVG */}
                  <div
                    className={`w-13 h-13 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive
                        ? "bg-white/[0.15] border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                        : "bg-white/[0.04] border border-white/15 group-hover:border-white/30"
                    }`}
                  >
                    <StepIcon />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── CENTER COLUMN: Dynamic Bezier Tracking Line & Step Badge ── */}
          <div className="hidden lg:block relative w-[120px] h-[380px] overflow-visible shrink-0 mx-auto">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 120 ${containerHeight}`}
              fill="none"
            >
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
                </linearGradient>
                <filter
                  id="apexGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="5"
                    floodColor="#00D084"
                    floodOpacity="0.75"
                  />
                </filter>
              </defs>

              {/* Dynamic Cubic Bézier Path (GPU updated via ref on scroll) */}
              <path
                ref={pathRef}
                d={initialPathD}
                stroke="url(#curveGradient)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />

              {/* Glowing Indicator Beacon (translated via ref on scroll) */}
              <g ref={apexGroupRef} transform={`translate(0, ${STEP_Y_POSITIONS[0]})`}>
                <circle
                  cx={apexX}
                  cy={0}
                  r={12}
                  fill="none"
                  stroke="#00D084"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
                <circle
                  cx={apexX}
                  cy={0}
                  r={5}
                  fill="#FFFFFF"
                  filter="url(#apexGlow)"
                />
              </g>
            </svg>

            {/* Step Badge right at the apex of the curve */}
            <div
              ref={apexBadgeRef}
              className="absolute left-[92px] -translate-y-1/2 whitespace-nowrap pointer-events-none transition-transform duration-75"
              style={{ top: `${STEP_Y_POSITIONS[0]}px` }}
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/90 border border-white/20 text-[11px] font-mono font-bold text-white tracking-widest uppercase shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                Step {currentStep.stepNumber}
              </span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Absolute Stacked Cards (100% Fixed Position, Floating Glass) ── */}
          <div className="relative w-full h-[380px] flex items-center max-w-2xl">
            {FOUR_STEP_FLEET_JOURNEY.map((step, idx) => {
              const isVisible = activeStepIdx === idx;

              return (
                <div
                  key={step.stepNumber}
                  className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ease-out ${
                    isVisible
                      ? "opacity-100 pointer-events-auto z-10"
                      : "opacity-0 pointer-events-none z-0"
                  }`}
                >
                  {/* Floating Frosted Glassmorphic Card (Matches Reference UI) */}
                  <div className="rounded-2xl bg-[#09120b]/90 border border-white/15 backdrop-blur-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-[#00D084]/08 rounded-full blur-3xl pointer-events-none" />

                    {/* Card Title */}
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {step.cardTitle}
                      </h4>
                      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/15 text-[11px] font-mono text-[#00D084] font-semibold">
                        PHASE [{step.stepNumber}/04]
                      </span>
                    </div>

                    {/* Capabilities (All 8 Modular Items Mapped 2 Per Step) */}
                    <div className="space-y-2">
                      {step.capabilities.map((cap) => (
                        <div
                          key={cap.id}
                          onClick={() => setSelectedCapability(cap)}
                          className="group/item flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/08 hover:border-[#00D084]/40 hover:bg-white/[0.06] transition-all cursor-pointer"
                        >
                          <div className="w-4 h-4 rounded-full bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                            <Check className="w-2.5 h-2.5 text-[#00D084]" />
                          </div>

                          <div className="flex-grow">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs sm:text-sm font-bold text-white group-hover/item:text-[#00FF9D] transition-colors">
                                {cap.title}
                              </span>
                              <span className="text-[10px] font-mono text-white/40 tracking-wider">
                                [{cap.step}]
                              </span>
                            </div>
                            <p className="text-[11px] sm:text-xs text-white/70 font-light mt-0.5 leading-relaxed line-clamp-1 sm:line-clamp-2">
                              {cap.desc}
                            </p>
                          </div>

                          <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover/item:text-[#00D084] group-hover/item:translate-x-0.5 transition-all self-center shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Below Card: Action Plan Headline, Description & Pill */}
                  <div className="space-y-1.5 pt-1.5">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {step.actionHeadline}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-2xl line-clamp-2">
                      {step.actionDesc}
                    </p>

                    <div className="pt-0.5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-[11px] font-medium text-white/90 shadow-md backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                        <span>{step.pillBadge}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── BOTTOM HUD: TOUR CONTROLS & STEP INDICATORS (EXACT DESIGN MATCH) ── */}
        <div className="hidden lg:flex relative z-10 mt-3 pt-2.5 items-center justify-between text-xs font-mono border-t border-white/10 w-full">
          <div className="flex items-center gap-2.5 text-white/50">
            <button
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              className="flex items-center gap-1.5 text-white/80 hover:text-[#00D084] transition-colors cursor-pointer group"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#00D084]" />
                  <span className="text-[#00D084] font-medium">Pause Tour</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-white/70 group-hover:text-[#00D084] transition-colors" />
                  <span>Play Auto-Tour</span>
                </>
              )}
            </button>
            <span className="text-white/20">|</span>
            <span className="text-white/40">Click any step or use arrows to navigate</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleJumpToStep((activeStepIdx - 1 + 4) % 4)}
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous Step"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleJumpToStep((activeStepIdx + 1) % 4)}
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Next Step"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex gap-1.5 items-center">
              {[0, 1, 2, 3].map((dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => handleJumpToStep(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeStepIdx === dotIdx
                      ? "bg-[#00D084] w-6 shadow-[0_0_10px_rgba(0,208,132,0.6)]"
                      : "bg-white/20 w-2 hover:bg-white/40"
                  }`}
                  aria-label={`Jump to Phase ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE SPECIFICATION MODAL (When clicking capability details)
         ========================================================================= */}
      <AnimatePresence>
        {selectedCapability && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedCapability(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-3xl bg-[#09120b] border border-white/20 text-white p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D084]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Modal Header */}
              <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-[11px] font-mono text-[#00D084] font-bold uppercase tracking-wider block">
                    [{selectedCapability.step}] · {selectedCapability.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                    {selectedCapability.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedCapability(null)}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="relative z-10 text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-5">
                {selectedCapability.desc}
              </p>

              {/* Key SLA Metrics */}
              <div className="relative z-10 grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 mb-5">
                {selectedCapability.metrics.map((m, i) => (
                  <div key={i} className="text-left">
                    <span className="text-[9px] font-mono uppercase text-white/50 block">
                      {m.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#00D084]">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Guaranteed Inclusions */}
              <div className="relative z-10 space-y-2.5 mb-6">
                <span className="text-xs font-mono font-bold tracking-wider text-white/60 uppercase block">
                  Guaranteed Operational Inclusions:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {selectedCapability.inclusions.map((inc, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-white/90"
                    >
                      <Check className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-white/50">
                  Target SLA:{" "}
                  <strong className="text-[#00D084]">
                    {selectedCapability.sla}
                  </strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCapability(null)}
                    className="px-4 py-2 rounded-full border border-white/20 text-xs font-semibold text-white/80 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="#fleet-audit"
                    onClick={() => setSelectedCapability(null)}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#00D084] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#00FF9D] transition-all cursor-pointer"
                  >
                    <span>Bundle into AMC</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
