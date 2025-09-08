import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="brand">URL Shortener</Link>
        <Link to="/stats">Statistics</Link>
      </nav>
      <main className="container">
        <Outlet />
      </main>
      <footer className="footer">
        Runs on http://localhost:3000 • Vanilla CSS
      </footer>
    </>
  );
}
