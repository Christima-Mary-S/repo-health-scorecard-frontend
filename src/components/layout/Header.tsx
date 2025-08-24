// components/layout/Header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Search, Github, Menu, X, Moon, Sun, Activity, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTheme } from "@/hooks/useTheme";
import { parseRepoUrl } from "@/lib/utils";

interface HeaderProps {
  showSearch?: boolean;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
  onAuthClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  showSearch = false,
  onMobileMenuToggle,
  isMobileMenuOpen = false,
  onAuthClick,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isDarkMode, toggleTheme, isHydrated } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const parsed = parseRepoUrl(searchQuery);
      if (parsed) {
        router.push(`/repo/${parsed.owner}/${parsed.repo}`);
        setSearchQuery("");
      }
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
    setShowUserMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 h-18 px-6 py-4 border-b bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">RepoHealth</span>
          </Link>

          {showSearch && (
            <form onSubmit={handleSearch} className="hidden md:block">
              <Input
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                iconLeft={<Search className="w-4 h-4" />}
                className="w-80"
              />
            </form>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-slate-700"
            aria-label="Toggle theme"
          >
            {!isHydrated ? (
              <Moon className="w-5 h-5" />
            ) : isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {session?.user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <img
                  src={session.user.image || ""}
                  alt={session.user.name || "User"}
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:block font-medium">{session.user.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700">
                    <p className="font-medium">{session.user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">{session.user.email}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push("/dashboard");
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </button>
                  
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 text-red-600 dark:text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="ghost"
              onClick={onAuthClick}
              iconLeft={<Github className="w-4 h-4" />}
            >
              Sign In
            </Button>
          )}

          {onMobileMenuToggle && (
            <button
              onClick={onMobileMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
