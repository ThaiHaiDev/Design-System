/* @ds-bundle: {"format":3,"namespace":"VerityDesignSystem_e79fdf","components":[{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Modal","sourcePath":"components/surfaces/Modal.jsx"}],"sourceHashes":{"components/feedback/Badge.jsx":"4f7240a3fbeb","components/feedback/Toast.jsx":"d2afe76090e9","components/feedback/Tooltip.jsx":"801bdef8704b","components/forms/Button.jsx":"b8fc250c87ba","components/forms/Checkbox.jsx":"dca7a8011f5c","components/forms/Input.jsx":"f77d613feb09","components/forms/Switch.jsx":"de970bd99d52","components/navigation/Sidebar.jsx":"69810f743bfa","components/navigation/Tabs.jsx":"ca4c0cdcb278","components/surfaces/Card.jsx":"6ac913f22be5","components/surfaces/Modal.jsx":"c12c3c995d96","ui_kits/dashboard/App.jsx":"02980388bea7","ui_kits/dashboard/DashboardHome.jsx":"fd8a545b6871","ui_kits/dashboard/LoginScreen.jsx":"8a4f1ff9ec5c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VerityDesignSystem_e79fdf = window.VerityDesignSystem_e79fdf || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/feedback/Badge.jsx
try { (() => {
const variants = {
  neutral: {
    bg: "var(--gray-100)",
    color: "var(--gray-700)"
  },
  accent: {
    bg: "var(--accent-primary-subtle)",
    color: "var(--accent-primary)"
  },
  success: {
    bg: "var(--status-success-subtle)",
    color: "var(--status-success)"
  },
  error: {
    bg: "var(--status-error-subtle)",
    color: "var(--status-error)"
  },
  warning: {
    bg: "var(--status-warning-subtle)",
    color: "var(--status-warning)"
  }
};
function Badge({
  children,
  variant = "neutral",
  size = "md"
}) {
  const v = variants[variant] || variants.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
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
      whiteSpace: "nowrap"
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const iconByVariant = {
  success: "✓",
  error: "✕",
  warning: "!",
  info: "i"
};
const colorByVariant = {
  success: "var(--status-success)",
  error: "var(--status-error)",
  warning: "var(--status-warning)",
  info: "var(--accent-primary)"
};
function Toast({
  title,
  description,
  variant = "info",
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      width: 360,
      maxWidth: "100%",
      padding: "var(--space-4)",
      background: "var(--bg-secondary)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xl)",
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: colorByVariant[variant],
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      flexShrink: 0
    }
  }, iconByVariant[variant]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, description)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--text-tertiary)",
      fontSize: 14,
      padding: 0
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  children,
  label,
  side = "top"
}) {
  const [visible, setVisible] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 6px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 6px)",
      left: "50%",
      transform: "translateX(-50%)"
    }
  }[side] || {};
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onMouseEnter: () => setVisible(true),
    onMouseLeave: () => setVisible(false)
  }, children, visible && /*#__PURE__*/React.createElement("span", {
    style: {
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
      pointerEvents: "none"
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
const sizeStyles = {
  sm: {
    height: 32,
    padding: "0 var(--space-3)",
    fontSize: "var(--text-sm)"
  },
  md: {
    height: 36,
    padding: "0 var(--space-4)",
    fontSize: "var(--text-sm)"
  },
  lg: {
    height: 44,
    padding: "0 var(--space-5)",
    fontSize: "var(--text-base)"
  }
};
const variantStyles = {
  primary: {
    background: "var(--accent-primary)",
    color: "var(--text-inverse)",
    border: "1px solid transparent"
  },
  secondary: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid var(--border-default)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid transparent"
  },
  destructive: {
    background: "var(--status-error)",
    color: "var(--text-inverse)",
    border: "1px solid transparent"
  }
};
const hoverBg = {
  primary: "var(--accent-primary-hover)",
  secondary: "var(--gray-100)",
  ghost: "var(--gray-100)",
  destructive: "var(--red-700)"
};
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  style
}) {
  const [hover, setHover] = React.useState(false);
  const base = variantStyles[variant] || variantStyles.primary;
  const dims = sizeStyles[size] || sizeStyles.md;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2)",
      fontFamily: "var(--font-body)",
      fontWeight: "var(--weight-medium)",
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--duration-fast) var(--easing-default)",
      whiteSpace: "nowrap",
      ...dims,
      ...base,
      background: !disabled && hover ? hoverBg[variant] : base.background,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--text-primary)",
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "var(--radius-sm)",
      border: `1px solid ${checked ? "var(--accent-primary)" : "var(--border-strong)"}`,
      background: checked ? "var(--accent-primary)" : "var(--bg-secondary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--duration-fast) var(--easing-default), border-color var(--duration-fast) var(--easing-default)",
      flexShrink: 0
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "white",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      display: "none"
    }
  }), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  value,
  onChange,
  size = "md",
  error,
  disabled = false,
  type = "text",
  helperText
}) {
  const [focused, setFocused] = React.useState(false);
  const height = size === "lg" ? 44 : 36;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1-5)",
      fontFamily: "var(--font-body)"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      height,
      padding: "0 var(--space-3)",
      fontSize: "var(--text-sm)",
      fontFamily: "var(--font-body)",
      color: disabled ? "var(--text-tertiary)" : "var(--text-primary)",
      background: disabled ? "var(--gray-100)" : "var(--bg-secondary)",
      border: `1px solid ${error ? "var(--status-error)" : focused ? "var(--border-focus)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-md)",
      outline: "none",
      boxShadow: focused && !error ? "0 0 0 2px var(--accent-primary-subtle)" : "none",
      transition: "border-color var(--duration-fast) var(--easing-default), box-shadow var(--duration-fast) var(--easing-default)"
    }
  }), (helperText || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: error ? "var(--status-error)" : "var(--text-secondary)"
    }
  }, error || helperText));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  disabled = false,
  label
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--text-primary)",
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 20,
      borderRadius: "var(--radius-full)",
      background: checked ? "var(--accent-primary)" : "var(--gray-300)",
      position: "relative",
      transition: "background var(--duration-fast) var(--easing-default)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: checked ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-xs)",
      transition: "left var(--duration-fast) var(--easing-default)"
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      display: "none"
    }
  }), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
function Sidebar({
  items,
  activeId,
  onSelect,
  collapsed = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: collapsed ? 64 : 240,
      background: "var(--bg-secondary)",
      borderRight: "1px solid var(--border-default)",
      display: "flex",
      flexDirection: "column",
      padding: "var(--space-3)",
      gap: "var(--space-1)",
      fontFamily: "var(--font-body)",
      transition: "width var(--duration-normal) var(--easing-default)",
      boxSizing: "border-box"
    }
  }, items.map(item => {
    const active = item.id === activeId;
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      onClick: () => onSelect && onSelect(item.id),
      style: {
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
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        flexShrink: 0
      }
    }, item.icon), !collapsed && /*#__PURE__*/React.createElement("span", null, item.label));
  }));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs,
  activeId,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-6)",
      borderBottom: "1px solid var(--border-default)",
      fontFamily: "var(--font-body)"
    }
  }, tabs.map(tab => {
    const active = tab.id === activeId;
    return /*#__PURE__*/React.createElement("div", {
      key: tab.id,
      onClick: () => onSelect && onSelect(tab.id),
      style: {
        padding: "var(--space-2) 0",
        fontSize: "var(--text-sm)",
        fontWeight: active ? "var(--weight-semibold)" : "var(--weight-regular)",
        color: active ? "var(--accent-primary)" : "var(--text-secondary)",
        borderBottom: active ? "2px solid var(--accent-primary)" : "2px solid transparent",
        marginBottom: -1,
        cursor: "pointer",
        transition: "color var(--duration-fast) var(--easing-default)"
      }
    }, tab.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function Card({
  children,
  padding = "6",
  hoverable = false,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => hoverable && setHover(true),
    onMouseLeave: () => hoverable && setHover(false),
    style: {
      background: "var(--bg-secondary)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: `var(--space-${padding})`,
      boxShadow: hoverable && hover ? "var(--shadow-md)" : "var(--shadow-xs)",
      transform: hoverable && hover ? "translateY(-1px)" : "translateY(0)",
      transition: "box-shadow var(--duration-fast) var(--easing-default), transform var(--duration-fast) var(--easing-default)",
      fontFamily: "var(--font-body)",
      cursor: hoverable ? "pointer" : "default",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Modal.jsx
try { (() => {
const maxWidths = {
  sm: 400,
  md: 560,
  lg: 720
};
function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md"
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "var(--z-modal)"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--bg-secondary)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-lg)",
      width: "100%",
      maxWidth: maxWidths[size] || maxWidths.md,
      margin: "var(--space-4)",
      fontFamily: "var(--font-body)"
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      borderBottom: "1px solid var(--border-default)",
      fontSize: "var(--text-xl)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      color: "var(--text-primary)",
      fontSize: "var(--text-sm)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      display: "flex",
      justifyContent: "flex-end",
      gap: "var(--space-3)",
      borderTop: "1px solid var(--border-default)"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Modal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/App.jsx
try { (() => {
function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return loggedIn ? /*#__PURE__*/React.createElement(window.DashboardHome, {
    onLogout: () => setLoggedIn(false)
  }) : /*#__PURE__*/React.createElement(window.LoginScreen, {
    onLogin: () => setLoggedIn(true)
  });
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/DashboardHome.jsx
try { (() => {
function DashboardHome({
  onLogout
}) {
  const {
    Sidebar,
    Tabs,
    Card,
    Badge,
    Button
  } = window.VerityDesignSystem_e79fdf;
  const [tab, setTab] = React.useState("overview");
  const stats = [{
    label: "Active users",
    value: "8,412",
    delta: "+4.2%",
    good: true
  }, {
    label: "Revenue",
    value: "$42,900",
    delta: "+1.8%",
    good: true
  }, {
    label: "Churn",
    value: "1.3%",
    delta: "-0.2%",
    good: true
  }, {
    label: "Open tickets",
    value: "27",
    delta: "+6",
    good: false
  }];
  const rows = [{
    name: "Ada Lin",
    email: "ada@company.com",
    status: "Active"
  }, {
    name: "Marco Reyes",
    email: "marco@company.com",
    status: "Pending"
  }, {
    name: "Priya Shah",
    email: "priya@company.com",
    status: "Active"
  }];
  const statusVariant = {
    Active: "success",
    Pending: "warning",
    Failed: "error"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    items: [{
      id: "home",
      label: "Home",
      icon: "⌂"
    }, {
      id: "users",
      label: "Users",
      icon: "◎"
    }, {
      id: "billing",
      label: "Billing",
      icon: "$"
    }, {
      id: "settings",
      label: "Settings",
      icon: "⚙"
    }],
    activeId: "home"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      borderBottom: "1px solid var(--border-default)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 var(--space-6)",
      background: "var(--bg-secondary)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, "Overview"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: onLogout
  }, "Sign out")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      id: "overview",
      label: "Overview"
    }, {
      id: "activity",
      label: "Activity"
    }, {
      id: "settings",
      label: "Settings"
    }],
    activeId: tab,
    onSelect: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "var(--space-4)",
      marginTop: "var(--space-6)"
    }
  }, stats.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.label
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)"
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--weight-bold)",
      color: "var(--text-primary)",
      marginTop: 4
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: s.good ? "var(--status-success)" : "var(--status-error)",
      marginTop: 4
    }
  }, s.delta)))), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginTop: "var(--space-6)"
    },
    padding: "0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4) var(--space-6)",
      borderBottom: "1px solid var(--border-default)",
      fontWeight: "var(--weight-semibold)",
      fontSize: "var(--text-sm)"
    }
  }, "Team members"), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--gray-100)"
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left",
      padding: "var(--space-3) var(--space-6)",
      fontSize: "var(--text-xs)",
      textTransform: "uppercase",
      color: "var(--text-secondary)",
      fontWeight: 600
    }
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left",
      padding: "var(--space-3) var(--space-6)",
      fontSize: "var(--text-xs)",
      textTransform: "uppercase",
      color: "var(--text-secondary)",
      fontWeight: 600
    }
  }, "Email"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left",
      padding: "var(--space-3) var(--space-6)",
      fontSize: "var(--text-xs)",
      textTransform: "uppercase",
      color: "var(--text-secondary)",
      fontWeight: 600
    }
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.email,
    style: {
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--space-3) var(--space-6)",
      color: "var(--text-primary)"
    }
  }, r.name), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--space-3) var(--space-6)",
      color: "var(--text-secondary)"
    }
  }, r.email), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "var(--space-3) var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: statusVariant[r.status]
  }, r.status))))))))));
}
window.DashboardHome = DashboardHome;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/DashboardHome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/LoginScreen.jsx
try { (() => {
function LoginScreen({
  onLogin
}) {
  const {
    Button,
    Input,
    Checkbox
  } = window.VerityDesignSystem_e79fdf;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-body)",
      background: "var(--bg-primary)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360,
      background: "var(--bg-secondary)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-sm)",
      padding: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--weight-bold)",
      color: "var(--text-primary)",
      marginBottom: 4
    }
  }, "Verity"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)",
      marginBottom: "var(--space-6)"
    }
  }, "Sign in to your account"), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onLogin();
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    value: email,
    onChange: e => setEmail(e.target.value),
    size: "lg"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: password,
    onChange: e => setPassword(e.target.value),
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Remember me",
    checked: remember,
    onChange: e => setRemember(e.target.checked)
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--accent-primary)",
      textDecoration: "none"
    }
  }, "Forgot password?")), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    size: "lg",
    style: {
      width: "100%"
    }
  }, "Sign in"))));
}
window.LoginScreen = LoginScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/LoginScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Modal = __ds_scope.Modal;

})();
