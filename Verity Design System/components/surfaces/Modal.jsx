import React from "react";

const maxWidths = { sm: 400, md: 560, lg: 720 };

export function Modal({ open, onClose, title, children, footer, size = "md" }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "var(--z-modal)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-secondary)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-lg)",
          width: "100%",
          maxWidth: maxWidths[size] || maxWidths.md,
          margin: "var(--space-4)",
          fontFamily: "var(--font-body)",
        }}
      >
        {title && (
          <div
            style={{
              padding: "var(--space-6)",
              borderBottom: "1px solid var(--border-default)",
              fontSize: "var(--text-xl)",
              fontWeight: "var(--weight-semibold)",
              color: "var(--text-primary)",
            }}
          >
            {title}
          </div>
        )}
        <div style={{ padding: "var(--space-6)", color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>{children}</div>
        {footer && (
          <div
            style={{
              padding: "var(--space-6)",
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--space-3)",
              borderTop: "1px solid var(--border-default)",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
