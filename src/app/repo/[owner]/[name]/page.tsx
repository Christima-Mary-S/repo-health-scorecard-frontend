// app/repo/[owner]/[name]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { AuthModal } from "@/components/layout/AuthModal";
import { RepoAnalysisSection } from "@/components/sections/RepoAnalysisSection";
import { Button } from "@/components/ui/Button";
import { useRepoData } from "@/hooks/useApi";

export default function RepoAnalysisPage() {
  const params = useParams();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { data, isLoading, error, fetchRepo } = useRepoData();

  const owner = params.owner as string;
  const name = params.name as string;

  useEffect(() => {
    if (owner && name) {
      fetchRepo(owner, name);
    }
  }, [owner, name, fetchRepo]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-200 transition-colors duration-300">
        <Header showSearch onAuthClick={() => setIsAuthModalOpen(true)} />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-lg">Analyzing repository...</p>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
              This may take a few seconds
            </p>
          </div>
        </div>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-200 transition-colors duration-300">
        <Header showSearch onAuthClick={() => setIsAuthModalOpen(true)} />
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Repository Not Found</h2>
            <p className="text-gray-600 dark:text-slate-400 mb-6">{error}</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-200 transition-colors duration-300">
      <Header showSearch onAuthClick={() => setIsAuthModalOpen(true)} />
      <main>{data && <RepoAnalysisSection data={data} />}</main>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

