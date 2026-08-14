import { Link } from "@tanstack/react-router";
import { LogIn, MoonStar, SunMedium } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Read persisted theme after mount (SSR-safe)
    const stored = localStorage.getItem("theme");
    const isDarkValue =
      stored === "dark"
        ? true
        : stored === "light"
          ? false
          : document.documentElement.classList.contains("dark");

    // Apply resolved theme and persist
    document.documentElement.classList.toggle("dark", isDarkValue);
    document.documentElement.style.colorScheme = isDarkValue ? "dark" : "light";
    localStorage.setItem("theme", isDarkValue ? "dark" : "light");

    setIsDark(isDarkValue);
    isInitializedRef.current = true;
  }, []);

  useEffect(() => {
    // Preserve normal updates for subsequent isDark changes
    if (!isInitializedRef.current) return;

    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <nav className="navbar">
      <div className="brand">
        <div className="mark">
          <div className="glyph"></div>
        </div>
        <Link to="/">
          <span>Skild</span>
        </Link>
      </div>

      <div className="actions">
        <button
          type="button"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => setIsDark((current) => !current)}
          className="theme-toggle"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <SunMedium size={16} /> : <MoonStar size={16} />}
        </button>
        <Link to="/sign-in/$" className="btn-primary">
          <LogIn size="16" />
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
