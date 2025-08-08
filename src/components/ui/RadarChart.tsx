"use client";

import React from "react";
import { RepoMetrics } from "@/types/repo";
import { getMetricScore } from "@/utils/formatters";

interface RadarChartProps {
  data: RepoMetrics;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, size = 200 }) => {
  const center = size / 2;
  const radius = 60;

  // Map your actual metrics to radar chart axes
  const axes = [
    { label: "Activity", key: "commitFreq", value: data.commitFreq || 0 },
    { label: "Response", key: "issueResTime", value: data.issueResTime || 0 },
    {
      label: "Reviews",
      key: "prReviewDuration",
      value: data.prReviewDuration || 0,
    },
    {
      label: "Community",
      key: "contributorCount",
      value: data.contributorCount || 0,
    },
    {
      label: "Security",
      key: "vulnerabilityCount",
      value: data.vulnerabilityCount || 0,
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {[20, 40, 60].map((r, i) => (
          <circle
            key={`grid-${i}`}
            cx={center}
            cy={center}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-200 dark:text-slate-600"
          />
        ))}

        {/* Axis lines and labels */}
        {axes.map((axis, i) => {
          const angle = (i * 72 - 90) * (Math.PI / 180);
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);

          return (
            <g key={axis.key}>
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-200 dark:text-slate-600"
              />
              <text
                x={center + (radius + 15) * Math.cos(angle)}
                y={center + (radius + 15) * Math.sin(angle)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-current text-gray-600 dark:text-slate-400"
              >
                {axis.label}
              </text>
            </g>
          );
        })}

        {/* Data polygon */}
        <polygon
          points={axes
            .map((axis, i) => {
              const score = getMetricScore(axis.key, axis.value);
              const angle = (i * 72 - 90) * (Math.PI / 180);
              const r = (score / 10) * radius;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(" ")}
          fill="rgba(37, 99, 235, 0.2)"
          stroke="#2563EB"
          strokeWidth="2"
        />

        {/* Data points */}
        {axes.map((axis, i) => {
          const score = getMetricScore(axis.key, axis.value);
          const angle = (i * 72 - 90) * (Math.PI / 180);
          const r = (score / 10) * radius;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);

          return (
            <circle key={`point-${i}`} cx={x} cy={y} r="3" fill="#2563EB" />
          );
        })}
      </svg>
    </div>
  );
};
