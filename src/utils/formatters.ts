import { METRIC_CONFIGS } from "@/lib/constants";

export const formatMetricValue = (
  key: string,
  value: number | boolean
): string => {
  const config = METRIC_CONFIGS[key as keyof typeof METRIC_CONFIGS];

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (config?.unit === "%") {
    return `${value.toFixed(1)}%`;
  }

  if (config?.unit === "hours") {
    if (value < 24) {
      return `${value.toFixed(1)}h`;
    } else {
      return `${(value / 24).toFixed(1)}d`;
    }
  }

  if (config?.unit === "commits/day") {
    return `${value.toFixed(1)}`;
  }

  return value.toString();
};

export const getMetricScore = (
  key: string,
  value: number | boolean
): number => {
  const config = METRIC_CONFIGS[key as keyof typeof METRIC_CONFIGS];
  if (!config) return 5;

  if (typeof value === "boolean") {
    return value ? 10 : 0;
  }

  const { good, fair } = config.thresholds;
  const isInverted = config.inverted || false;

  if (isInverted) {
    // Lower values are better (like response time)
    if (value <= good) return 10;
    if (value <= fair) return 6;
    return 2;
  } else {
    // Higher values are better (like contributor count)
    if (value >= good) return 10;
    if (value >= fair) return 6;
    return 2;
  }
};

export const getScoreColor = (score: number): string => {
  if (score >= 8) return "#14B8A6"; // teal
  if (score >= 6) return "#2563EB"; // blue
  if (score >= 4) return "#F59E0B"; // amber
  return "#EF4444"; // red
};

// Normalize score to 0-100 scale
export const normalizeScore = (score: number): number => {
  return Math.min(100, Math.max(0, score * 10));
};
