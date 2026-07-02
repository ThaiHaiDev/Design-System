import React from "react";

export function Sidebar({ items, activeId, onSelect, collapsed = false }) {
  return (
    <div
      style={{
        width: collapsed ? 64 : 240,
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-default)",
        display: "flex",
        flexDirection: "column",
        padding: "var(--space-3)",
        gap: "var(--space-1)",
        fontFamily: "var(--font-body)",
        transition: "width var(--duration-normal) var(--easing-default)",
        boxSizing: "border-box",
      }}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <div
            key={item.id}
            onClick={() => onSelect && onSelect(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              height: 36,
              padding: "0 var(--space-3)",
              borderRadius: "var(--radius-md)",
              background: active ? "var(--accent-primary-subtle)" : "transparent",
              color: active ? "var(--accent-primary)" : "var(--text-primary)",
              fontWeight: active ? "var(--weight-medium)" : "var(--weight-regular)",
              fontSize: "var(--text-sm)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </div>
        );
      })}
    </div>
  );
}
