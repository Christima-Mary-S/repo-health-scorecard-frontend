"use client";

import { useState, useCallback } from "react";
import { ApiService } from "@/lib/api";
import { DashboardRepo, RepoData } from "@/types/repo";

export const useRepoData = () => {
  const [data, setData] = useState<RepoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepo = useCallback(async (owner: string, repo: string, accessToken?: string) => {
    setIsLoading(true);
    setError(null);

    const response = await ApiService.fetchRepoData(owner, repo, accessToken);

    if (response.error) {
      setError(response.error.message);
      setData(null);
    } else {
      setData(response.data || null);
    }

    setIsLoading(false);
  }, []);

  return { data, isLoading, error, fetchRepo };
};

export const useDashboardRepos = () => {
  const [data, setData] = useState<DashboardRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = useCallback(async (accessToken?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (accessToken) {
        response = await ApiService.fetchUserRepos(accessToken);
      } else {
        response = await ApiService.fetchDashboardRepos();
      }

      if (response.error) {
        setError(response.error.message);
      } else {
        setData(response.data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchRepos };
};
