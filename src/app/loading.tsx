import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-900 dark:text-slate-200">Loading...</p>
      </div>
    </div>
  );
}
