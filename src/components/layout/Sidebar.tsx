"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();

  const menuItems = [
    {
      href: "/dashboard",
      icon: BarChart3,
      label: "My Repos",
      active: pathname === "/dashboard",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
      active: pathname === "/settings",
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700"
        )}
      >
        <div className="p-6">
          {/* User Profile */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://github.com/octocat.png"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-semibold">octocat</div>
              <div className="text-sm text-gray-500 dark:text-slate-400">
                Free Plan
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
                    item.active
                      ? "bg-primary-50 dark:bg-slate-700 text-primary-700 dark:text-slate-200"
                      : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                  )}
                  onClick={onClose}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 px-3 py-2 rounded-lg w-full transition-colors text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
