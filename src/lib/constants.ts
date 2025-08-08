// lib/constants.ts
export const API_BASE_URL = "http://localhost:3001/api";

export const SAMPLE_REPOS = [
  { owner: "facebook", name: "react" },
  { owner: "microsoft", name: "vscode" },
  { owner: "vercel", name: "next.js" },
  { owner: "tailwindlabs", name: "tailwindcss" },
];

// Metric configurations for display
export const METRIC_CONFIGS = {
  commitFreq: {
    title: "Commit Frequency",
    description: "Average commits per day over the last month",
    icon: "Activity",
    color: "text-blue-600",
    unit: "commits/day",
    thresholds: { good: 20, fair: 10 },
  },
  issueResTime: {
    title: "Issue Resolution Time",
    description: "Average time to resolve issues in hours",
    icon: "Clock",
    color: "text-green-600",
    unit: "hours",
    thresholds: { good: 48, fair: 168 }, // Lower is better
    inverted: true,
  },
  prReviewDuration: {
    title: "PR Review Duration",
    description: "Average time for pull request reviews in hours",
    icon: "GitPullRequest",
    color: "text-purple-600",
    unit: "hours",
    thresholds: { good: 24, fair: 72 },
    inverted: true,
  },
  contributorCount: {
    title: "Contributor Count",
    description: "Number of active contributors",
    icon: "Users",
    color: "text-teal-600",
    unit: "contributors",
    thresholds: { good: 50, fair: 10 },
  },
  testFolderExists: {
    title: "Test Coverage",
    description: "Presence of test folder structure",
    icon: "CheckCircle",
    color: "text-emerald-600",
    unit: "boolean",
    thresholds: { good: true, fair: true },
  },
  badgeCount: {
    title: "Badge Count",
    description: "Number of status badges in README",
    icon: "Award",
    color: "text-yellow-600",
    unit: "badges",
    thresholds: { good: 5, fair: 2 },
  },
  developerChurn: {
    title: "Developer Churn",
    description: "Rate of developer turnover percentage",
    icon: "TrendingDown",
    color: "text-orange-600",
    unit: "%",
    thresholds: { good: 5, fair: 15 },
    inverted: true,
  },
  busFactor: {
    title: "Bus Factor",
    description: "Number of key contributors (risk distribution)",
    icon: "Shield",
    color: "text-indigo-600",
    unit: "people",
    thresholds: { good: 5, fair: 2 },
  },
  vulnerabilityCount: {
    title: "Vulnerability Count",
    description: "Number of known security vulnerabilities",
    icon: "ShieldAlert",
    color: "text-red-600",
    unit: "vulnerabilities",
    thresholds: { good: 0, fair: 2 },
    inverted: true,
  },
};
