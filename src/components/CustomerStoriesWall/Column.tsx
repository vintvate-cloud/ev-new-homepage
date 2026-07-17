import React from "react";
import { Review } from "./types";
import { ReviewCard } from "./ReviewCard";
import { useInfiniteColumns } from "./hooks/useInfiniteColumns";

interface ColumnProps {
  reviews: Review[];
  direction: "up" | "down";
  duration: number;
  isHovered: boolean;
  gap?: number;
  className?: string;
}

/**
 * Renders a single vertical marquee column of review cards.
 * Duplicates content internally and registers infinite translation with GSAP.
 */
export const Column: React.FC<ColumnProps> = ({
  reviews,
  direction,
  duration,
  isHovered,
  gap = 24,
  className = "",
}) => {
  // Duplicate the reviews array to ensure there's enough height to loop seamlessly
  const duplicatedReviews = [...reviews, ...reviews];

  // Apply custom GSAP infinite loop hook
  const containerRef = useInfiniteColumns({
    direction,
    duration,
    isHovered,
  });

  return (
    <div className={`overflow-hidden h-full relative ${className}`}>
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="flex flex-col w-full will-change-transform"
        style={{ gap: `${gap}px` }}
      >
        {duplicatedReviews.map((review, idx) => (
          <ReviewCard
            key={`${review.id}-${idx}`}
            review={review}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
};
