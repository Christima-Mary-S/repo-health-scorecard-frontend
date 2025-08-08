"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Github, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGitHubAuth = () => {
    // In a real app, this would redirect to GitHub OAuth
    onClose();
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md rounded-lg shadow-xl bg-white dark:bg-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <Github className="w-8 h-8 text-gray-600 dark:text-slate-400" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Welcome to RepoHealth</h2>
          <p className="text-gray-600 dark:text-slate-400 mb-8">
            Sign in with GitHub to analyze your repositories and track their
            health over time.
          </p>

          <Button
            className="w-full mb-4"
            size="lg"
            iconLeft={<Github className="w-5 h-5" />}
            onClick={handleGitHubAuth}
          >
            Continue with GitHub
          </Button>

          <p className="text-xs text-gray-500 dark:text-slate-500">
            We only request repository metadata. No code is stored or accessed.
          </p>
        </div>
      </div>
    </div>
  );
};
