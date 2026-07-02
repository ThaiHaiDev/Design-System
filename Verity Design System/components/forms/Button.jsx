import React from "react";

const sizeStyles = {
  sm: { height: 32, padding: "0 var(--space-3)", fontSize: "var(--text-sm)" },
  md: { height: 36, padding: "0 var(--space-4)", fontSize: "var(--text-sm)" },
  lg: { height: 44, padding: "0 var(--space-5)", fontSize: "var(--text-base)" },
};

const variantStyles = {
  primary: {
    background: "var(--accent-primary)",
    color: "var(--text-inverse)",
    border: "1px solid transparent",
  },
  secondary: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid var(--border-default)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid transparent",
  },
  destructive: {
    background: "var(--status-error)",
    color: "var(--text-inverse)",
    border: "1px solid transparent",
  },
};

const hoverBg = {
  primary: "var(--accent-primary-hover)",
  secondary: "var(--gray-100)",
  ghost: "var(--gray-100)",
  destructive: "var(--red-700)",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  style,
}) {
  const [hover, setHover] = React.useState(false);
  const base = variantStyles[variant] || variantStyles.primary;
  const dims = sizeStyles[size] || sizeStyles.md;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        fontFamily: "var(--font-body)",
        fontWeight: "var(--weight-medium)",
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background var(--duration-fast) var(--easing-default)",
        whiteSpace: "nowrap",
        ...dims,
        ...base,
        background: !disabled && hover ? hoverBg[variant] : base.background,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
