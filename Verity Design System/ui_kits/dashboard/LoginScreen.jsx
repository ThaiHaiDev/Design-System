function LoginScreen({ onLogin }) {
  const { Button, Input, Checkbox } = window.VerityDesignSystem_e79fdf;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-body)",
        background: "var(--bg-primary)",
      }}
    >
      <div
        style={{
          width: 360,
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-sm)",
          padding: "var(--space-8)",
        }}
      >
        <div style={{ fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)", color: "var(--text-primary)", marginBottom: 4 }}>
          Verity
        </div>
        <div style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-6)" }}>
          Sign in to your account
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
          style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}
        >
          <Input label="Email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} size="lg" />
          <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} size="lg" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Checkbox label="Remember me" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <a href="#" style={{ fontSize: "var(--text-sm)", color: "var(--accent-primary)", textDecoration: "none" }}>Forgot password?</a>
          </div>
          <Button type="submit" variant="primary" size="lg" style={{ width: "100%" }}>Sign in</Button>
        </form>
      </div>
    </div>
  );
}
window.LoginScreen = LoginScreen;
