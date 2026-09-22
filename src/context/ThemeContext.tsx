import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  siteTheme: ThemeMode;
  setSiteTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  siteTheme: "dark",
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
    return "dark"; // Default site theme is dark
  });

  // Client-side mount sync to ensure React state, DOM class and localStorage match on hydration
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme-preference");
    if (saved === "dark") {
      setSiteThemeState("dark");
      document.documentElement.classList.remove("theme-light");
    } else if (saved === "light") {
      setSiteThemeState("light");
      document.documentElement.classList.add("theme-light");
    } else {
      const isDocLight = document.documentElement.classList.contains("theme-light");
      const currentTheme = isDocLight ? "light" : "dark";
      setSiteThemeState(currentTheme);
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

  return (
    <ThemeContext.Provider value={{ siteTheme, setSiteTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

