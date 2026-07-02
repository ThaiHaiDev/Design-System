export interface CardProps {
  children: React.ReactNode;
  /** Spacing-scale step for padding, e.g. "5" or "6" */
  padding?: "4" | "5" | "6";
  /** Adds hover elevation + lift, for clickable cards */
  hoverable?: boolean;
  style?: React.CSSProperties;
}
