import React, { memo } from "react";
import { motion } from "framer-motion";
import { Review } from "./types";

interface ReviewCardProps {
  review: Review;
  index: number;
}

/**
 * Renders a single review card based on one of 4 premium templates.
 * Assigns template dynamically based on review data properties.
 */
export const ReviewCard: React.FC<ReviewCardProps> = memo(({ review }) => {
  // Determine template type
  // Template D: Has story properties (before, after, metric)
  // Template B: Has large project image
  // Template A: Has avatar, rating/review
  // Template C: Text only, huge quote
  let templateType: "A" | "B" | "C" | "D" = "C";

  if (review.story) {
    templateType = "D";
  } else if (review.image) {
    templateType = "B";
  } else if (review.avatar) {
    templateType = "A";
  }

  // Pre-define some random/semi-random min-height layouts based on ID or index
  const heightClass = (() => {
    const sum = review.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const mod = sum % 4;
    if (mod === 0) return "min-h-[340px]";
    if (mod === 1) return "min-h-[420px]";
    if (mod === 2) return "min-h-[480px]";
    return "min-h-[540px]";
  })();

  const cardBaseClass = `
    flex flex-col justify-between p-8 rounded-[28px] 
    story-card-wrapper
    w-full ${heightClass} relative overflow-hidden group
  `;

  // Render template layouts
  const renderTemplateContent = () => {
    switch (templateType) {
      case "A":
        return (
          <>
            {/* Top: Large Quote */}
            <div className="flex-1">
              <span className="absolute top-2 left-6 text-9xl font-serif story-card-quote-mark select-none pointer-events-none">
                “
              </span>
              <p className="relative z-10 text-lg leading-relaxed story-card-quote font-light tracking-wide italic">
                "{review.review}"
              </p>
            </div>

            {/* Bottom: Profile & Logo */}
            <div className="mt-8 flex items-center justify-between border-t story-card-border-line pt-6">
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-semibold story-card-name">{review.name}</h4>
                  <p className="text-[11px] story-card-subtext font-light mt-0.5">{review.role}</p>
                </div>
              </div>
              {review.companyLogo && (
                <img
                  src={review.companyLogo}
                  alt={review.company}
                  className="h-5 w-auto object-contain opacity-30 group-hover:opacity-75 transition-opacity duration-500 grayscale dark:invert"
                  loading="lazy"
                />
              )}
            </div>
          </>
        );

      case "B":
        return (
          <>
            {/* Top: Large Project Image */}
            <div className="w-full overflow-hidden rounded-[20px] mb-6">
              <img
                src={review.image}
                alt="Project Showcase"
                className="w-full h-[220px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>

            {/* Bottom: Review details */}
            <div className="flex-1 flex flex-col justify-between">
              <p className="text-sm story-card-quote font-light leading-relaxed mb-6">
                "{review.review}"
              </p>
              <div className="flex items-center justify-between text-[11px] story-card-subtext border-t story-card-border-line pt-4">
                <span>{review.industry}</span>
                <span>{review.date}</span>
              </div>
            </div>
          </>
        );

      case "D":
        return (
          <>
            {/* Story Card: Before, After, Metrics */}
            <div className="flex-1 flex flex-col justify-between h-full">
              {/* Metrics Header */}
              <div className="mb-6">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#00D084] font-bold mb-1">
                  {review.metrics || "Metrics"}
                </div>
                <div className="text-6xl lg:text-[72px] font-sans font-bold tracking-tighter story-card-title leading-none mt-2">
                  {review.story?.metric}
                </div>
                <div className="text-xs uppercase tracking-wider story-card-subtext mt-1">
                  {review.story?.metricLabel}
                </div>
              </div>

              {/* Before/After list */}
              <div className="space-y-4 my-6">
                <div className="border-l border-red-500/20 pl-4 py-0.5">
                  <div className="text-[10px] uppercase tracking-wider text-red-500/70 font-semibold">Before</div>
                  <p className="text-xs story-card-subtext mt-1 font-light leading-relaxed">
                    {review.story?.before}
                  </p>
                </div>
                <div className="border-l border-[#00D084]/30 pl-4 py-0.5">
                  <div className="text-[10px] uppercase tracking-wider text-[#00D084] font-semibold">After</div>
                  <p className="text-xs story-card-subtext mt-1 font-light leading-relaxed">
                    {review.story?.after}
                  </p>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="flex items-center gap-1.5 text-xs text-[#00D084] font-medium pt-4 border-t story-card-border-line mt-auto">
                Case Study <span className="transition-transform group-hover:translate-x-1 duration-300">→</span>
              </div>
            </div>
          </>
        );

      case "C":
      default:
        return (
          <>
            {/* Huge Quote typography only */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-5xl font-serif text-[#00D084] block mb-2 opacity-80 select-none pointer-events-none">
                  “
                </span>
                <h3 className="font-serif text-2xl lg:text-[28px] font-medium tracking-tight story-card-quote leading-snug">
                  {review.review}
                </h3>
              </div>

              <div className="mt-8 border-t story-card-border-line pt-6">
                <div className="w-12 h-[2px] bg-[#00D084] mb-4" />
                <h4 className="text-xs uppercase tracking-wider story-card-name font-semibold">
                  {review.name}
                </h4>
                <p className="text-[11px] story-card-subtext font-light mt-0.5">
                  {review.role}, {review.company}
                </p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }
      }}
      className={cardBaseClass}
    >
      {renderTemplateContent()}
    </motion.div>
  );
});

ReviewCard.displayName = "ReviewCard";
