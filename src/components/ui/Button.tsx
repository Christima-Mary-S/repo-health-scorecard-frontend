"use client";

import React from "react";
import { ButtonVariant, ButtonSize } from "@/types/common";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  iconLeft,
  iconRight,
  isLoading,
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 focus:ring-gray-500",
    secondary:
      "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 dark:border-slate-600 focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        iconLeft
      )}
      {children}
      {iconRight && !isLoading && iconRight}
    </button>
  );
};
