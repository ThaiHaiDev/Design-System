export interface ToastProps {
  title: string;
  description?: string;
  variant?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
}
