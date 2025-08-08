export interface RepoMetrics {
  commitFreq?: number;
  issueResTime?: number;
  prReviewDuration?: number;
  contributorCount?: number;
  testFolderExists?: boolean;
  badgeCount?: number;
  developerChurn?: number;
  busFactor?: number;
  vulnerabilityCount?: number;
  overallScore?: number;
  inverted?: boolean;
}

export interface RepoData {
  owner: string;
  repo: string;
  metrics: RepoMetrics;
  // Additional fields that might come from GitHub API
  name?: string;
  full_name?: string;
  avatar?: string;
  stars?: number;
  stargazers_count?: number;
  forks?: number;
  forks_count?: number;
  lastCommit?: string;
  description?: string;
}

export interface DashboardRepo {
  name: string;
  stars: number;
  score: number;
  lastAnalyzed: string;
  owner: string;
  repo: string;
}
