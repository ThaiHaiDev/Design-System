export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "md" | "lg";
  error?: string;
  disabled?: boolean;
  type?: string;
  helperText?: string;
}
