"use client";

import React from "react";
import Link from "next/link";
import { Github, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export const Footer: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <footer className="py-12 px-6 border-t border-gray-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/docs"
            className="text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Docs
          </Link>
          <Link
            href="https://github.com"
            className="text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </Link>
          <span className="text-gray-600 dark:text-slate-400">MIT License</span>
        </div>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </footer>
  );
};
