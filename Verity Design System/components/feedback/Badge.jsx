import React from "react";

const variants = {
  neutral: { bg: "var(--gray-100)", color: "var(--gray-700)" },
  accent:  { bg: "var(--accent-primary-subtle)", color: "var(--accent-primary)" },
  success: { bg: "var(--status-success-subtle)", color: "var(--status-success)" },
  error:   { bg: "var(--status-error-subtle)", color: "var(--status-error)" },
  warning: { bg: "var(--status-warning-subtle)", color: "var(--status-warning)" },
};

export function Badge({ children, variant = "neutral", size = "md" }) {
  const v = variants[variant] || variants.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: size === "sm" ? 20 : 24,
        padding: "0 var(--space-2)",
        borderRadius: "var(--radius-full)",
        background: v.bg,
        color: v.color,
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--weight-medium)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
