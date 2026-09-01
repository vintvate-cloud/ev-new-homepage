import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";
import { PARTNER_VIDEO_INTERVIEWS, PartnerVideoInterview } from "../data/franchiseData";

interface FranchiseVideoCurvedFanProps {
  onSelectVideo: (video: PartnerVideoInterview) => void;
}

export function FranchiseVideoCurvedFan({ onSelectVideo }: FranchiseVideoCurvedFanProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PARTNER_VIDEO_INTERVIEWS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PARTNER_VIDEO_INTERVIEWS.length) % PARTNER_VIDEO_INTERVIEWS.length);
  };

  // Automatic slide rotation every 3.8s (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PARTNER_VIDEO_INTERVIEWS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentVideo = PARTNER_VIDEO_INTERVIEWS[activeIndex];

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="py-16 px-4 bg-[#020403] relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
        {/* 3D Curved Fan Arc Wheel */}
        <div className="relative h-[360px] sm:h-[420px] md:h-[460px] flex items-center justify-center pt-2">
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            {PARTNER_VIDEO_INTERVIEWS.map((item, index) => {
              const count = PARTNER_VIDEO_INTERVIEWS.length;
              let offset = (index - activeIndex) % count;
              if (offset > count / 2) offset -= count;
              if (offset < -count / 2) offset += count;

              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);
              const visible = absOffset <= 2; // Show up to 5 cards (-2, -1, 0, 1, 2)

              if (!visible) return null;

              // Responsive offsets
              const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
              const spacing = isMobile ? 100 : 190;

              // Arc math for curved fan effect (as seen in uploaded reference)
              const xPos = offset * spacing;
              const yPos = Math.pow(absOffset, 1.85) * (isMobile ? 12 : 18);
              const rotation = offset * (isMobile ? 10 : 13);
              const scale = isCenter ? 1.08 : 1 - absOffset * 0.15;
              const zIndex = 50 - absOffset * 10;
              const opacity = isCenter ? 1 : 1 - absOffset * 0.28;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    if (isCenter) {
                      onSelectVideo(item);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  initial={false}
                  animate={{
                    x: xPos,
                    y: yPos,
                    rotate: rotation,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    willChange: "transform, opacity",
                    transform: "translateZ(0)",
                  }}
                  className={`absolute w-56 sm:w-64 md:w-72 h-72 sm:h-80 md:h-96 rounded-[36px] overflow-hidden cursor-pointer transition-colors duration-200 border-2 ${
                    isCenter
                      ? "border-white border-2"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  {/* Card Thumbnail Image */}
                  <img
                    src={item.thumbnail}
                    alt={item.videoTitle}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />

                  {/* Dark Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-[#020503]/50 to-black/30 pointer-events-none" />

                  {/* Top Glass Badges */}
                  <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-mono font-extrabold text-white bg-black/75 px-3 py-1 rounded-full border border-white/20">
                      {item.city}
                    </span>
                    <span className="text-[10px] font-mono font-extrabold text-white bg-black/75 px-2.5 py-1 rounded-full border border-white/20">
                      {item.duration}
                    </span>
                  </div>

                  {/* Center Play Icon */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center -mt-10 pointer-events-none">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all ${
                        isCenter
                          ? "bg-white text-black scale-110 border-2 border-white"
                          : "bg-black/75 text-white border border-white/25"
                      }`}
                    >
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 z-10 text-left bg-gradient-to-t from-black via-black/85 to-transparent space-y-1 pointer-events-none">
                    <p className="text-xs font-black text-white truncate">{item.partnerName}</p>
                    <p className="text-[10px] text-white/70 font-extrabold truncate">{item.statBadge}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Title, Details & Eyewear-Style Pill CTA below the Curved Fan */}
        <div className="max-w-2xl mx-auto space-y-5 pt-2 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-white leading-tight">
                {currentVideo.videoTitle}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-serif">
                {currentVideo.partnerName} • <span className="text-white/90 font-bold">{currentVideo.role}</span> ({currentVideo.city})
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls & Pill CTA Button matching uploaded reference */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => onSelectVideo(currentVideo)}
              className="px-7 py-3 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-white/90 transition-all cursor-pointer flex items-center gap-3 group"
            >
              <span>Watch Case Study</span>
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
