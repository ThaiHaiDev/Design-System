import React from "react";

export function Card({ children, padding = "6", hoverable = false, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => hoverable && setHover(true)}
      onMouseLeave={() => hoverable && setHover(false)}
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        padding: `var(--space-${padding})`,
        boxShadow: hoverable && hover ? "var(--shadow-md)" : "var(--shadow-xs)",
        transform: hoverable && hover ? "translateY(-1px)" : "translateY(0)",
        transition: "box-shadow var(--duration-fast) var(--easing-default), transform var(--duration-fast) var(--easing-default)",
        fontFamily: "var(--font-body)",
        cursor: hoverable ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
