"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  className,
  iconLeft,
  iconRight,
  error,
  label,
  id,
  ...props
}) => {
  const reactId = useId();
  const inputId = id || reactId;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500">
            {iconLeft}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors",
            iconLeft && "pl-10",
            iconRight && "pr-10",
            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500">
            {iconRight}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
