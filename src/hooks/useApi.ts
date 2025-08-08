"use client";

import { useState } from "react";
import { ApiService } from "@/lib/api";
import { DashboardRepo, RepoData } from "@/types/repo";

export const useRepoData = () => {
  const [data, setData] = useState<RepoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepo = async (owner: string, repo: string) => {
    setIsLoading(true);
    setError(null);

    const response = await ApiService.fetchRepoData(owner, repo);

    if (response.error) {
      setError(response.error.message);
      setData(null);
    } else {
      setData(response.data || null);
    }

    setIsLoading(false);
  };

  return { data, isLoading, error, fetchRepo };
};

export const useDashboardRepos = () => {
  const [data, setData] = useState<DashboardRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = async () => {
    setIsLoading(true);
    setError(null);

    const response = await ApiService.fetchDashboardRepos();

    if (response.error) {
      setError(response.error.message);
    } else {
      setData(response.data || []);
    }

    setIsLoading(false);
  };

  return { data, isLoading, error, fetchRepos };
};
