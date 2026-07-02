import React from "react";

export function Switch({ checked, onChange, disabled = false, label }) {
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
          width: 36,
          height: 20,
          borderRadius: "var(--radius-full)",
          background: checked ? "var(--accent-primary)" : "var(--gray-300)",
          position: "relative",
          transition: "background var(--duration-fast) var(--easing-default)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: checked ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "var(--shadow-xs)",
            transition: "left var(--duration-fast) var(--easing-default)",
          }}
        />
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} style={{ display: "none" }} />
      {label}
    </label>
  );
}
