import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Wrench,
  Cpu,
  Layers,
  ShieldCheck,
  Building2,
  Zap,
} from "lucide-react";
import { DetailedFranchiseModel } from "../data/franchiseData";

interface FranchiseSetupDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  model: DetailedFranchiseModel | null;
  onApply: (model: DetailedFranchiseModel) => void;
}

export function FranchiseSetupDrawer({
  isOpen,
  onClose,
  model,
  onApply,
}: FranchiseSetupDrawerProps) {
  if (!model) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end font-serif">
          {/* Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-pointer"
          />

          {/* Right Slide-Over Glass Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-xl bg-[#040806] border-l border-[#00D084]/30 shadow-[0_0_60px_rgba(0,208,132,0.2)] backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10 min-h-full"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#00D084] uppercase tracking-widest block">
                      {model.name}
                    </span>
                    {model.badge && (
                      <span className="bg-[#00D084] text-[#020403] text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                        {model.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Included Setup & Breakdown
                  </h3>
                  <p className="text-xs text-white/60 mt-1">{model.subtitle}</p>
                </div>

                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-[#00D084]/50 transition-all cursor-pointer shrink-0"
                  aria-label="Close setup drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Investment Banner */}
              <div className="bg-gradient-to-r from-[#00D084]/15 via-white/[0.04] to-transparent border border-[#00D084]/30 rounded-2xl p-5 mb-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-white/50 uppercase tracking-wider block">
                      Total Investment
                    </span>
                    <span className="text-3xl font-extrabold text-white">
                      {model.investment}
                    </span>
                  </div>
                  {model.originalInvestment && (
                    <div className="text-right">
                      <span className="text-xs text-white/40 line-through block">
                        Standard: {model.originalInvestment}
                      </span>
                      {model.foundingOffer && (
                        <span className="text-xs font-bold text-[#00D084] block mt-0.5">
                          {model.foundingOffer}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Infrastructure HUD */}
              <div className="grid grid-cols-3 gap-3 mb-8 text-center">
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">
                    Required Area
                  </span>
                  <span className="text-sm font-bold text-white block">{model.area}</span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">
                    Service Bays
                  </span>
                  <span className="text-sm font-bold text-white block">{model.bays}</span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">
                    Vehicle Focus
                  </span>
                  <span className="text-sm font-bold text-white block">{model.vehicles}</span>
                </div>
              </div>

              {/* Full Equipment & Setup Checklist */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00D084] flex items-center gap-2 mb-4">
                    <Wrench className="w-4 h-4 text-[#00D084]" />
                    Complete Package Equipment Checklist
                  </h4>

                  <div className="space-y-3">
                    {model.includes.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="flex items-start gap-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#00D084]/40 rounded-xl p-3.5 transition-all group"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block group-hover:text-[#00D084] transition-colors">
                            {item}
                          </span>
                          <span className="text-xs text-white/50 block mt-0.5">
                            Fully turn-key provided, configured & tested by Autobot EV Engineering Team.
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Automation & OS Savings Box */}
                <div className="bg-[#00D084]/10 border border-[#00D084]/30 rounded-2xl p-5 text-left space-y-2">
                  <div className="flex items-center gap-2 text-[#00D084] font-bold text-xs uppercase tracking-wider">
                    <Zap className="w-4 h-4 fill-[#00D084]" />
                    Autobot OS Advantage
                  </div>
                  <p className="text-sm font-bold text-white">{model.osSavings}</p>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Includes 2 Years Free Autobot OS License (Zero Software Fees), automated billing, parts inventory AI tracking, and customer booking app integration.
                  </p>
                </div>

                {/* Best For Tag */}
                <div className="border border-white/10 bg-white/[0.02] rounded-xl p-4 text-xs text-white/70">
                  <span className="text-white/40 uppercase tracking-wider block mb-1">
                    Ideal Partner Profile
                  </span>
                  <p className="text-white font-light italic leading-relaxed">
                    {model.bestFor}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="border-t border-white/10 pt-6 mt-8">
              <button
                onClick={() => {
                  onClose();
                  onApply(model);
                }}
                className="w-full py-4 px-6 rounded-full bg-[#00D084] text-[#020403] text-sm sm:text-base font-bold shadow-[0_0_30px_rgba(0,208,132,0.4)] hover:bg-[#00e08f] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply For {model.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
