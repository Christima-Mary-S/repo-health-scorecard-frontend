import { ApiResponse } from "@/types/api";
import { API_BASE_URL, SAMPLE_REPOS } from "./constants";
import { DashboardRepo, RepoData } from "@/types/repo";
export class ApiService {
  static async fetchRepoData(
    owner: string,
    repo: string
  ): Promise<ApiResponse<RepoData>> {
    try {
      const response = await fetch(`${API_BASE_URL}/score/${owner}/${repo}`);

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

  static async fetchDashboardRepos(): Promise<ApiResponse<DashboardRepo[]>> {
    try {
      const repoPromises = SAMPLE_REPOS.map(async ({ owner, name }) => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/score/${owner}/${name}`
          );
          if (response.ok) {
            const data = await response.json();
            return {
              name: `${owner}/${name}`,
              stars: data.stars || data.stargazers_count || 0,
              score: Math.round(data.metrics?.overallScore || 0),
              lastAnalyzed: new Date().toLocaleString(),
              owner,
              repo: name,
            };
          }
          return null;
        } catch (error) {
          console.error(`Error fetching ${owner}/${name}:`, error);
          return null;
        }
      });

      const results = await Promise.all(repoPromises);
      const data = results.filter(
        (repo): repo is DashboardRepo => repo !== null
      );
      return { data };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
        },
      };
    }
  }
}
