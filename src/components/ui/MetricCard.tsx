// components/ui/MetricCard.tsx
"use client";

import React from "react";
import { Card } from "./Card";
import { getScoreColor } from "@/utils/formatters";

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  maxValue?: number;
  description: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  maxValue = 10,
  description,
  className,
}) => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  const percentage = (numericValue / maxValue) * 100;
  const color = getScoreColor(numericValue);

  return (
    <Card hover className={`w-full lg:w-72 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold" style={{ color }}>
              {numericValue}
            </span>
            <span className="text-gray-500 dark:text-slate-400">
              / {maxValue}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-700 mb-2">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%`, backgroundColor: color }}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};
