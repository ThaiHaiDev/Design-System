import React from "react";

const iconByVariant = {
  success: "✓",
  error: "✕",
  warning: "!",
  info: "i",
};

const colorByVariant = {
  success: "var(--status-success)",
  error: "var(--status-error)",
  warning: "var(--status-warning)",
  info: "var(--accent-primary)",
};

export function Toast({ title, description, variant = "info", onClose }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-3)",
        width: 360,
        maxWidth: "100%",
        padding: "var(--space-4)",
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-xl)",
        fontFamily: "var(--font-body)",
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: colorByVariant[variant],
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          flexShrink: 0,
        }}
      >
        {iconByVariant[variant]}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", color: "var(--text-primary)" }}>{title}</div>
        {description && (
          <div style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: 2 }}>{description}</div>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", fontSize: 14, padding: 0 }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
