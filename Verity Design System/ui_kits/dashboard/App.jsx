function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return loggedIn
    ? <window.DashboardHome onLogout={() => setLoggedIn(false)} />
    : <window.LoginScreen onLogin={() => setLoggedIn(true)} />;
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
