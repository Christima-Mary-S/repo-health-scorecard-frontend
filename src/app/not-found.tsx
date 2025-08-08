// app/not-found.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-slate-200">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
