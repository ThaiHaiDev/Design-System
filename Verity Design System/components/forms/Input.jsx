import React from "react";

export function Input({
  label,
  placeholder,
  value,
  onChange,
  size = "md",
  error,
  disabled = false,
  type = "text",
  helperText,
  rightElement,
}) {
  const [focused, setFocused] = React.useState(false);
  const height = size === "lg" ? 44 : 36;
  const rightPad = rightElement
    ? size === "lg" ? "var(--space-10)" : "var(--space-8)"
    : "var(--space-3)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1-5)", fontFamily: "var(--font-body)" }}>
      {label && (
        <label style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--text-primary)" }}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            height,
            padding: `0 ${rightPad} 0 var(--space-3)`,
            fontSize: "var(--text-sm)",
            fontFamily: "var(--font-body)",
            color: disabled ? "var(--text-tertiary)" : "var(--text-primary)",
            background: disabled ? "var(--gray-100)" : "var(--bg-secondary)",
            border: `1px solid ${error ? "var(--status-error)" : focused ? "var(--border-focus)" : "var(--border-default)"}`,
            borderRadius: "var(--radius-md)",
            outline: "none",
            boxShadow: focused && !error ? "0 0 0 2px var(--accent-primary-subtle)" : "none",
            transition: "border-color var(--duration-fast) var(--easing-default), box-shadow var(--duration-fast) var(--easing-default)",
          }}
        />
        {rightElement && (
          <div style={{
            position: "absolute",
            right: "var(--space-3)",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
          }}>
            {rightElement}
          </div>
        )}
      </div>
      {(helperText || error) && (
        <span style={{ fontSize: "var(--text-xs)", color: error ? "var(--status-error)" : "var(--text-secondary)" }}>
          {error || helperText}
        </span>
      )}
    </div>
  );
}
