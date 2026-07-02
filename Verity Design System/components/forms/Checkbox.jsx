import React from "react";

export function Checkbox({ label, checked, onChange, disabled = false }) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)",
        color: "var(--text-primary)",
        userSelect: "none",
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "var(--radius-sm)",
          border: `1px solid ${checked ? "var(--accent-primary)" : "var(--border-strong)"}`,
          background: checked ? "var(--accent-primary)" : "var(--bg-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background var(--duration-fast) var(--easing-default), border-color var(--duration-fast) var(--easing-default)",
          flexShrink: 0,
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} style={{ display: "none" }} />
      {label}
    </label>
  );
}
