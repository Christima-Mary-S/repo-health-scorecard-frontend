"use client";

import React, { createContext, useState, useEffect } from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isHydrated: boolean;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    // Check if dark class was already applied by the initialization script
    const hasExistingDarkClass = document.documentElement.classList.contains("dark");
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    // Use existing DOM state if it exists, otherwise use computed state
    const finalDarkMode = hasExistingDarkClass || shouldUseDark;
    setIsDarkMode(finalDarkMode);
    setIsHydrated(true);
    
    // Sync DOM with final state
    if (finalDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDarkMode, isHydrated]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    console.log('Theme toggle:', { from: isDarkMode, to: newTheme });
    setIsDarkMode(newTheme);
    setRenderKey(prev => prev + 1); // Force re-render
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    
    // Force DOM update
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    console.log('DOM classes after toggle:', document.documentElement.className);
  };

  const value = { isDarkMode, toggleTheme, isHydrated };

  return (
    <ThemeContext.Provider value={value}>
      <div key={`theme-${renderKey}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
