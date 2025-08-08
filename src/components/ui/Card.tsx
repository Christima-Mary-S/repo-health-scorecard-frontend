"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = "md",
  ...props
}) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "card",
        paddingClasses[padding],
        hover && "card-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
