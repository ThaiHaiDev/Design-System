function DashboardHome({ onLogout }) {
  const { Sidebar, Tabs, Card, Badge, Button } = window.VerityDesignSystem_e79fdf;
  const [tab, setTab] = React.useState("overview");

  const stats = [
    { label: "Active users", value: "8,412", delta: "+4.2%", good: true },
    { label: "Revenue", value: "$42,900", delta: "+1.8%", good: true },
    { label: "Churn", value: "1.3%", delta: "-0.2%", good: true },
    { label: "Open tickets", value: "27", delta: "+6", good: false },
  ];

  const rows = [
    { name: "Ada Lin", email: "ada@company.com", status: "Active" },
    { name: "Marco Reyes", email: "marco@company.com", status: "Pending" },
    { name: "Priya Shah", email: "priya@company.com", status: "Active" },
  ];

  const statusVariant = { Active: "success", Pending: "warning", Failed: "error" };

  return (
    <div style={{ height: "100%", display: "flex", fontFamily: "var(--font-body)" }}>
      <Sidebar
        items={[
          { id: "home", label: "Home", icon: "⌂" },
          { id: "users", label: "Users", icon: "◎" },
          { id: "billing", label: "Billing", icon: "$" },
          { id: "settings", label: "Settings", icon: "⚙" },
        ]}
        activeId="home"
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div
          style={{
            height: 56,
            borderBottom: "1px solid var(--border-default)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 var(--space-6)",
            background: "var(--bg-secondary)",
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: "var(--text-lg)", fontWeight: "var(--weight-semibold)", color: "var(--text-primary)" }}>Overview</div>
          <Button variant="ghost" size="sm" onClick={onLogout}>Sign out</Button>
        </div>

        <div style={{ padding: "var(--space-6)", overflow: "auto" }}>
          <Tabs
            tabs={[{ id: "overview", label: "Overview" }, { id: "activity", label: "Activity" }, { id: "settings", label: "Settings" }]}
            activeId={tab}
            onSelect={setTab}
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-4)", marginTop: "var(--space-6)" }}>
            {stats.map((s) => (
              <Card key={s.label}>
                <div style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{s.label}</div>
                <div style={{ fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)", color: "var(--text-primary)", marginTop: 4 }}>{s.value}</div>
                <div style={{ fontSize: "var(--text-xs)", color: s.good ? "var(--status-success)" : "var(--status-error)", marginTop: 4 }}>{s.delta}</div>
              </Card>
            ))}
          </div>

          <Card style={{ marginTop: "var(--space-6)" }} padding="0">
            <div style={{ padding: "var(--space-4) var(--space-6)", borderBottom: "1px solid var(--border-default)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-sm)" }}>
              Team members
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-sm)" }}>
              <thead>
                <tr style={{ background: "var(--gray-100)" }}>
                  <th style={{ textAlign: "left", padding: "var(--space-3) var(--space-6)", fontSize: "var(--text-xs)", textTransform: "uppercase", color: "var(--text-secondary)", fontWeight: 600 }}>Name</th>
                  <th style={{ textAlign: "left", padding: "var(--space-3) var(--space-6)", fontSize: "var(--text-xs)", textTransform: "uppercase", color: "var(--text-secondary)", fontWeight: 600 }}>Email</th>
                  <th style={{ textAlign: "left", padding: "var(--space-3) var(--space-6)", fontSize: "var(--text-xs)", textTransform: "uppercase", color: "var(--text-secondary)", fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.email} style={{ borderBottom: "1px solid var(--border-default)" }}>
                    <td style={{ padding: "var(--space-3) var(--space-6)", color: "var(--text-primary)" }}>{r.name}</td>
                    <td style={{ padding: "var(--space-3) var(--space-6)", color: "var(--text-secondary)" }}>{r.email}</td>
                    <td style={{ padding: "var(--space-3) var(--space-6)" }}><Badge variant={statusVariant[r.status]}>{r.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
}
window.DashboardHome = DashboardHome;
