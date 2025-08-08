// components/sections/HeroSection.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Gauge } from "@/components/ui/Gauge";
import { parseRepoUrl } from "@/lib/utils";
import { validateRepoInput } from "@/utils/validators";

export const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!searchQuery.trim()) {
      setError("Please enter a repository");
      return;
    }

    if (!validateRepoInput(searchQuery)) {
      setError("Please enter repository in format: owner/repository");
      return;
    }

    const parsed = parseRepoUrl(searchQuery);
    if (parsed) {
      setIsLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        router.push(`/repo/${parsed.owner}/${parsed.repo}`);
      }, 500);
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Instant GitHub
              <span className="text-primary-600"> Health Check</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-slate-400 mb-8 leading-relaxed">
              Get comprehensive insights into your repository's health,
              security, and community engagement with our automated scoring
              system.
            </p>

            <form onSubmit={handleSearch} className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="owner/repository"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    error={error}
                  />
                </div>
                <Button type="submit" size="lg" isLoading={isLoading}>
                  {isLoading ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
            </form>

            <p className="text-sm text-gray-500 dark:text-slate-500">
              Try: facebook/react, microsoft/vscode, or any public repository
            </p>
          </div>

          <div className="relative">
            <Card className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Gauge value={87} size={160} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-accent-600 mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-semibold">Activity</span>
                  </div>
                  <div className="text-2xl font-bold">9.2</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
                    <Shield className="w-4 h-4" />
                    <span className="font-semibold">Security</span>
                  </div>
                  <div className="text-2xl font-bold">8.5</div>
                </div>
              </div>
            </Card>

            <div className="absolute -top-4 -right-4 text-yellow-400">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
