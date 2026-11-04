import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Cpu, Zap, Activity, ShieldCheck, Clock } from "lucide-react";
import { PIPELINE_STEPS } from "./ecosystem-data";

export function EcosystemPipeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = PIPELINE_STEPS[activeStepIndex];

  return (
    <div className="w-full rounded-3xl bg-[#060e08] border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[10px] font-mono font-bold text-[#00D084] uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            Autonomous Operations Lifecycle
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The Autobot OS Telemetry-to-Bay Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-white/60 font-light mt-1 max-w-xl">
            See how a vehicle fault is detected on the road, diagnosed, parts pre-dispatched, and resolved autonomously.
          </p>
        </div>

        {/* Total Cycle SLA badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/80">
          <Clock className="w-4 h-4 text-[#00D084]" />
          <span>END-TO-END SLA: <strong>&lt; 3.2 HOURS</strong></span>
        </div>
      </div>

      {/* Pipeline Step Progress Rail */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-8">
        {PIPELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStepIndex === idx;
          const isPassed = activeStepIndex > idx;

          return (
            <button
              key={step.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                isActive
                  ? "bg-[#0b1c11] border-[#00D084] shadow-[0_0_25px_rgba(0,208,132,0.25)]"
                  : isPassed
                  ? "bg-white/[0.04] border-[#00D084]/40 hover:bg-white/[0.06]"
                  : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05]"
              }`}
            >
              {/* Step indicator top */}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                  isActive ? "text-[#00D084]" : "text-white/40"
                }`}>
                  Phase {step.step}
                </span>
                <span className={`w-2 h-2 rounded-full ${
                  isActive ? "bg-[#00D084] animate-ping" : isPassed ? "bg-[#00D084]" : "bg-white/20"
                }`} />
              </div>

              <div className="flex items-center gap-2.5 mb-1.5">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive ? "bg-[#00D084] text-black" : "bg-white/10 text-white"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h5 className="text-xs font-bold text-white tracking-tight truncate">
                  {step.title}
                </h5>
              </div>

              <span className="text-[10px] font-mono text-white/50 block truncate">
                {step.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Phase Details Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#07130a] via-[#09180e] to-[#07130a] border border-[#00D084]/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00D084] uppercase tracking-wider">
              <span>Phase {activeStep.step}</span>
              <span>//</span>
              <span>{activeStep.subtitle}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {activeStep.title}
            </h4>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              {activeStep.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : PIPELINE_STEPS.length - 1))}
              className="px-4 py-2.5 rounded-xl border border-white/20 text-xs font-mono text-white hover:bg-white/10 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStepIndex((prev) => (prev < PIPELINE_STEPS.length - 1 ? prev + 1 : 0))}
              className="px-5 py-2.5 rounded-xl bg-[#00D084] text-black text-xs font-mono font-bold hover:bg-[#00e08f] transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,208,132,0.3)] cursor-pointer"
            >
              <span>{activeStepIndex === PIPELINE_STEPS.length - 1 ? "Loop to Start" : "Next Phase"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

