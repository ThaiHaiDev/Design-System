import React from "react";

export function Tabs({ tabs, activeId, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "var(--space-6)", borderBottom: "1px solid var(--border-default)", fontFamily: "var(--font-body)" }}>
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <div
            key={tab.id}
            onClick={() => onSelect && onSelect(tab.id)}
            style={{
              padding: "var(--space-2) 0",
              fontSize: "var(--text-sm)",
              fontWeight: active ? "var(--weight-semibold)" : "var(--weight-regular)",
              color: active ? "var(--accent-primary)" : "var(--text-secondary)",
              borderBottom: active ? "2px solid var(--accent-primary)" : "2px solid transparent",
              marginBottom: -1,
              cursor: "pointer",
              transition: "color var(--duration-fast) var(--easing-default)",
            }}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}
