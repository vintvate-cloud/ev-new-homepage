export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  companyLogo?: string;
  image?: string;
  rating?: number;
  review?: string;
  story?: {
    before: string;
    after: string;
    metric: string;
    metricLabel: string;
  };
  industry?: string;
  metrics?: string;
  date?: string;
}

export interface CustomerStoriesWallProps {
  reviews?: Review[];
  heading?: string;
  subheading?: string;
  speedMultiplier?: number; // Configurable speed multiplier
  gap?: number; // Configurable card gap in pixels
  className?: string;
}
