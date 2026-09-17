import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  siteTheme: ThemeMode;
  setSiteTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  siteTheme: "light",
  setSiteTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [siteTheme, setSiteThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme-preference");
      if (saved === "dark") return "dark";
      if (saved === "light") return "light";
      const isDocLight = document.documentElement.classList.contains("theme-light");
      return isDocLight ? "light" : "dark";
    }
    return "light"; // Default to white (light) theme
  });

  // Client-side mount sync to ensure DOM class and localStorage match state immediately on hydration
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme-preference");
    const isDocLight = document.documentElement.classList.contains("theme-light");

    if (saved === "dark" || (!saved && !isDocLight)) {
      setSiteThemeState("dark");
      document.documentElement.classList.remove("theme-light");
    } else if (saved === "light" || (!saved && isDocLight)) {
      setSiteThemeState("light");
      document.documentElement.classList.add("theme-light");
    }
  }, []);

  const setSiteTheme = (newTheme: ThemeMode) => {
    setSiteThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme-preference", newTheme);
      if (newTheme === "light") {
        document.documentElement.classList.add("theme-light");
      } else {
        document.documentElement.classList.remove("theme-light");
      }
    }
  };

  const toggleTheme = () => {
    const nextTheme = siteTheme === "light" ? "dark" : "light";
    setSiteTheme(nextTheme);
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (siteTheme === "light") {
      document.documentElement.classList.add("theme-light");
      localStorage.setItem("theme-preference", "light");
    } else {
      document.documentElement.classList.remove("theme-light");
      localStorage.setItem("theme-preference", "dark");
    }
  }, [siteTheme]);

  return (
    <ThemeContext.Provider value={{ siteTheme, setSiteTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
