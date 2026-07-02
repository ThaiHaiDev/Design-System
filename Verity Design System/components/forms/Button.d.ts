export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style */
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  /** Height preset */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}
