import { Show, UserButton } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";
import { LogIn, MoonStar, SunMedium } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // On client mount, read current theme from document (set by pre-paint script)
    setIsDark(document.documentElement.classList.contains("dark"));
    isInitializedRef.current = true;
  }, []);

  useEffect(() => {
    // Skip on initial mount, only sync user-triggered theme changes
    if (!isInitializedRef.current) return;

    // Sync theme changes to document and localStorage
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
        <Show when="signed-in">
          <UserButton />
        </Show>

        <Show when="signed-out">
          <Link to="/sign-in/$" className="btn-primary">
            <LogIn size="16" />
            Sign In
          </Link>
        </Show>
      </div>
    </nav>
  );
};

export default Navbar;
