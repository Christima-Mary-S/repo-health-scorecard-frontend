// app/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Github, Star, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { AuthModal } from "@/components/layout/AuthModal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useDashboardRepos } from "@/hooks/useApi";
import { formatNumber } from "@/lib/utils";

export default function DashboardPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: repos, isLoading, fetchRepos } = useDashboardRepos();

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-200 transition-colors duration-300 flex">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 lg:ml-0">
        <Header
          onAuthClick={() => setIsAuthModalOpen(true)}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">My Repositories</h1>
              <Button
                iconLeft={<Github className="w-4 h-4" />}
                onClick={fetchRepos}
                isLoading={isLoading}
              >
                {isLoading ? "Syncing..." : "Sync with GitHub"}
              </Button>
            </div>

            <Card>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <p>Loading repositories...</p>
                </div>
              ) : repos.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-slate-700">
                        <th className="text-left py-3 px-4 font-semibold">
                          Repository
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Stars
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Last Score
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Last Analyzed
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {repos.map((repo, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="font-medium">{repo.name}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-gray-400" />
                              {formatNumber(repo.stars)}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div
                              className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                                repo.score >= 80
                                  ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                                  : repo.score >= 60
                                  ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                                  : "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200"
                              }`}
                            >
                              {repo.score}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-500 dark:text-slate-400">
                            {repo.lastAnalyzed}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                window.open(
                                  `/repo/${repo.owner}/${repo.repo}`,
                                  "_blank"
                                )
                              }
                              iconLeft={<ChevronRight className="w-4 h-4" />}
                            >
                              Analyze
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                    <Github className="w-12 h-12 text-gray-400 dark:text-slate-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No repositories found
                  </h3>
                  <p className="text-gray-500 dark:text-slate-400 mb-4">
                    Load some sample repositories to get started
                  </p>
                  <Button
                    iconLeft={<Github className="w-4 h-4" />}
                    onClick={fetchRepos}
                  >
                    Load Sample Repos
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
