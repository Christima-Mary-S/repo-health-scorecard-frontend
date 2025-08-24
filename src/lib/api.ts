import { ApiResponse } from "@/types/api";
import { API_BASE_URL } from "./constants";
import { DashboardRepo, RepoData } from "@/types/repo";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  updated_at: string;
  pushed_at: string;
  private: boolean;
}

export class ApiService {
  static async fetchRepoData(
    owner: string,
    repo: string,
    accessToken?: string
  ): Promise<ApiResponse<RepoData>> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch(`${API_BASE_URL}/score/${owner}/${repo}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch repository data: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
        },
      };
    }
  }

  static async fetchUserRepos(accessToken: string): Promise<ApiResponse<DashboardRepo[]>> {
    try {
      const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=20", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user repositories: ${response.status}`);
      }

      const repos: GitHubRepo[] = await response.json();
      
      const data: DashboardRepo[] = repos.map((repo) => ({
        name: repo.full_name,
        stars: repo.stargazers_count,
        score: 0, // Not displayed on dashboard
        lastAnalyzed: new Date(repo.updated_at).toLocaleDateString(),
        owner: repo.owner.login,
        repo: repo.name,
      }));

      return { data };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
        },
      };
    }
  }

  // Keep the old method for backward compatibility but mark as deprecated
  static async fetchDashboardRepos(): Promise<ApiResponse<DashboardRepo[]>> {
    console.warn("fetchDashboardRepos is deprecated. Use fetchUserRepos with access token instead.");
    return { data: [] };
  }
}
