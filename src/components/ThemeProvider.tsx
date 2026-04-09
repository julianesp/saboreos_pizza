"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";
type SweepDir = "down" | "up" | null;

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "light", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("light");
  const [sweepDir, setSweepDir] = useState<SweepDir>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Carga inicial sin animación
  useEffect(() => {
    const saved = localStorage.getItem("saboreos-theme") as Theme | null;
    if (saved) {
      applyTheme(saved);
      setTheme(saved);
    } else {
      const hour = new Date().getHours();
      if (hour >= 19 || hour < 4) {
        applyTheme("dark");
        setTheme("dark");
      }
    }
  }, []);

  function applyTheme(t: Theme) {
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    const dir: SweepDir = next === "dark" ? "down" : "up";

    setSweepDir(dir);

    // Al llegar al centro de la pantalla aplicamos el tema
    const halfDuration = 350;
    setTimeout(() => {
      applyTheme(next);
      setTheme(next);
      localStorage.setItem("saboreos-theme", next);
    }, halfDuration);

    // Al terminar la animación limpiamos el overlay
    setTimeout(() => {
      setSweepDir(null);
    }, halfDuration * 2 + 100);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}

      {/* Overlay de barrido */}
      {sweepDir && (
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 99998,
            pointerEvents: "none",
            background: sweepDir === "down" ? "#111827" : "#f0fdf4",
            ...(sweepDir === "down"
              ? { animation: "sweepDown 0.7s ease-in-out forwards" }
              : { animation: "sweepUp 0.7s ease-in-out forwards" }),
          }}
        />
      )}

      <style>{`
        @keyframes sweepDown {
          0%   { transform: translateY(-100%); }
          50%  { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
        @keyframes sweepUp {
          0%   { transform: translateY(100%); }
          50%  { transform: translateY(0%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </ThemeContext.Provider>
  );
}
