"use client";

import React from "react";
import { getScoreColor } from "@/utils/formatters";

interface GaugeProps {
  value: number;
  size?: number;
  label?: string;
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  size = 120,
  label = "Score",
}) => {
  const strokeDasharray = Math.PI * (size - 20);
  const strokeDashoffset = strokeDasharray - (strokeDasharray * value) / 100;
  const color = getScoreColor(value / 10);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - 20) / 2}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200 dark:text-slate-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - 20) / 2}
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm text-gray-500 dark:text-slate-400">{label}</div>
      </div>
    </div>
  );
};
