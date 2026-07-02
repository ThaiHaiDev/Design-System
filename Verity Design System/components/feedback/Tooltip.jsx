import React from "react";

export function Tooltip({ children, label, side = "top" }) {
  const [visible, setVisible] = React.useState(false);
  const pos = {
    top: { bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" },
  }[side] || {};

  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          style={{
            position: "absolute",
            ...pos,
            background: "var(--gray-900)",
            color: "#fff",
            fontSize: "var(--text-xs)",
            padding: "var(--space-1) var(--space-2)",
            borderRadius: "var(--radius-sm)",
            whiteSpace: "nowrap",
            boxShadow: "var(--shadow-sm)",
            zIndex: "var(--z-dropdown)",
            pointerEvents: "none",
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
