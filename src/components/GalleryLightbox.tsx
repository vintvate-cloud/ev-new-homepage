import React, { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  ShieldCheck,
  ImageOff,
} from "lucide-react";

export interface LightboxItem {
  image: string;
  title: string;
  description?: string;
  category?: string;
}

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: LightboxItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export function GalleryLightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onIndexChange,
}: GalleryLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const currentItem = items[currentIndex] || items[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = useCallback(() => {
    if (items.length === 0) return;
    setIsZoomed(false);
    setHasError(false);
    onIndexChange((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    if (items.length === 0) return;
    setIsZoomed(false);
    setHasError(false);
    onIndexChange((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onIndexChange]);

  // Reset states when currentIndex or isOpen changes
  useEffect(() => {
    if (isOpen) {
      setHasError(false);
      setIsZoomed(false);
    }
  }, [isOpen, currentIndex]);

  // Lock body scroll & listen for keyboard keys
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && items.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[999999] flex flex-col justify-between bg-[#020403]/95 backdrop-blur-2xl text-white select-none overflow-hidden font-sans"
          onClick={onClose}
        >
          {/* Top Header Bar */}
          <div
            className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-black via-black/80 to-transparent shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#00D084] animate-pulse shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold font-mono tracking-wider text-[#00D084] uppercase truncate max-w-[150px] sm:max-w-xs">
                  {currentItem?.category || "EV GALLERY SHOWCASE"}
                </span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-xs text-white/50 font-mono border-l border-white/10 pl-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00D084]" />
                <span>OEM Certified Inspection</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Index Counter */}
              <div className="px-2.5 sm:px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] sm:text-xs font-mono text-white/80">
                <span className="text-[#00D084] font-bold">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-white/30 mx-1">/</span>
                <span>{String(items.length).padStart(2, "0")}</span>
              </div>

              {/* Zoom Toggle */}
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 hover:text-white transition-all cursor-pointer"
                title={isZoomed ? "Zoom out" : "Zoom in"}
              >
                {isZoomed ? (
                  <Minimize2 className="w-4 h-4 text-[#00D084]" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-2 sm:p-2.5 rounded-full bg-[#00D084] hover:bg-[#00e08f] text-black transition-all cursor-pointer shadow-[0_0_20px_rgba(0,208,132,0.5)] hover:scale-105 font-bold"
                title="Close gallery (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div
            className="relative flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden min-h-0 my-auto"
            onClick={onClose}
          >
            {/* Left Navigation Arrow */}
            {items.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-6 z-50 p-3 sm:p-4 rounded-full bg-black/80 hover:bg-[#00D084] border border-white/20 hover:border-[#00D084] text-white hover:text-black transition-all duration-300 backdrop-blur-md shadow-2xl hover:scale-110 cursor-pointer active:scale-95"
                title="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}

            {/* Central Image Wrapper */}
            <div
              className="relative z-30 flex flex-col items-center justify-center w-full max-w-4xl px-2 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ambient Emerald Backdrop Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D084]/30 via-emerald-500/20 to-[#00D084]/30 rounded-3xl blur-3xl pointer-events-none scale-110" />

              <div
                className={`relative flex flex-col items-center justify-center w-full ${
                  isZoomed ? "scale-125 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                } transition-transform duration-300`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
              >
                {/* Image Frame */}
                <div
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] bg-[#050806] flex items-center justify-center min-h-[200px] sm:min-h-[320px] max-h-[60vh] sm:max-h-[68vh] w-full max-w-full p-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Image Error Fallback */}
                  {hasError ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center space-y-2 z-20">
                      <ImageOff className="w-10 h-10 text-red-400" />
                      <span className="text-sm font-bold text-white">Image Unable to Load</span>
                      <span className="text-xs text-white/50">{currentItem?.image}</span>
                    </div>
                  ) : (
                    <img
                      ref={imgRef}
                      key={currentItem?.image}
                      src={currentItem?.image}
                      alt={currentItem?.title || "Gallery image"}
                      onError={() => setHasError(true)}
                      onClick={(e) => e.stopPropagation()}
                      className="max-h-[58vh] sm:max-h-[66vh] max-w-full w-auto h-auto object-contain select-none rounded-xl sm:rounded-2xl block shadow-2xl"
                      draggable={false}
                    />
                  )}
                </div>

                {/* Title & Description Overlay */}
                {currentItem?.title && (
                  <div className="mt-3 sm:mt-4 text-center max-w-xl px-2">
                    <h3 className="text-base sm:text-2xl font-bold font-serif text-white tracking-tight leading-snug drop-shadow-md">
                      {currentItem.title}
                    </h3>
                    {currentItem.description && (
                      <p className="mt-1 text-xs sm:text-sm text-white/80 font-serif leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {currentItem.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Navigation Arrow */}
            {items.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-6 z-50 p-3 sm:p-4 rounded-full bg-black/80 hover:bg-[#00D084] border border-white/20 hover:border-[#00D084] text-white hover:text-black transition-all duration-300 backdrop-blur-md shadow-2xl hover:scale-110 cursor-pointer active:scale-95"
                title="Next image"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          {items.length > 1 && (
            <div
              className="relative z-50 px-3 sm:px-4 py-3 bg-gradient-to-t from-black via-black/95 to-transparent border-t border-white/10 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-1 scrollbar-none">
                {items.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsZoomed(false);
                        onIndexChange(idx);
                      }}
                      className={`relative shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "border-[#00D084] ring-2 ring-[#00D084]/60 scale-105 shadow-[0_0_15px_rgba(0,208,132,0.5)]"
                          : "border-white/20 opacity-50 hover:opacity-100 hover:border-white/50"
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

