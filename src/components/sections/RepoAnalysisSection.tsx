"use client";
// components/sections/RepoAnalysisSection.tsx

import React from "react";
import Image from "next/image";
import {
  Star,
  GitFork,
  Calendar,
  ExternalLink,
  ShieldAlert,
  Activity,
  Users,
  CheckCircle,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Gauge } from "@/components/ui/Gauge";
import { RadarChart } from "@/components/ui/RadarChart";
import { MetricCard } from "@/components/ui/MetricCard";
import { RepoData } from "@/types/repo";
import { formatNumber } from "@/lib/utils";

interface RepoAnalysisSectionProps {
  data: RepoData;
}

export const RepoAnalysisSection: React.FC<RepoAnalysisSectionProps> = ({
  data,
}) => {
  const ownerName = data.owner || data.full_name?.split("/")[0] || "Unknown";
  const repoName = data.name || data.full_name?.split("/")[1] || "Unknown";
  const stars = data.stars || data.stargazers_count || 0;
  const forks = data.forks || data.forks_count || 0;
  const score = Math.round(data.overallScore || data.score || 0);
  const vulnerabilities =
    data.vulnerabilities || data.security?.vulnerabilities || 0;

  // Normalize metrics to 0-10 scale for display
  const metrics = {
    activity: data.metrics?.activity || data.activityScore || 0,
    community: data.metrics?.community || data.communityScore || 0,
    quality: data.metrics?.quality || data.qualityScore || 0,
    trust: data.metrics?.trust || data.trustScore || 0,
    security: data.metrics?.security || data.securityScore || 0,
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Repo Meta Card */}
      <Card>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={data.avatar || `https://github.com/${ownerName}.png`}
              alt={ownerName}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">
                {ownerName}/{repoName}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 dark:text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {formatNumber(stars)}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  {formatNumber(forks)}
                </span>
                {data.lastCommit && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {data.lastCommit}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button iconLeft={<ExternalLink className="w-4 h-4" />}>
            View on GitHub
          </Button>
        </div>
      </Card>

      {/* Alert Banner */}
      {vulnerabilities > 0 && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-orange-600 flex-shrink-0" />
          <span className="text-orange-800 dark:text-orange-200">
            <strong>{vulnerabilities} open vulnerabilities</strong> detected in
            dependencies
          </span>
        </div>
      )}

      {/* Score Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-xl font-semibold mb-6">Overall Health Score</h2>
          <div className="flex justify-center">
            <Gauge value={score} size={200} />
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-6">Score Breakdown</h2>
          <RadarChart data={metrics} />
        </Card>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <MetricCard
          icon={<Activity className="w-6 h-6 text-primary-600" />}
          title="Activity Score"
          value={metrics.activity}
          description="Based on commit frequency and recent updates"
        />
        <MetricCard
          icon={<Users className="w-6 h-6 text-accent-600" />}
          title="Community"
          value={metrics.community}
          description="Contributors, stars, and engagement metrics"
        />
        <MetricCard
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          title="Code Quality"
          value={metrics.quality}
          description="Documentation, tests, and code structure"
        />
        <MetricCard
          icon={<Shield className="w-6 h-6 text-primary-600" />}
          title="Trustworthiness"
          value={metrics.trust}
          description="License, maintainer activity, and stability"
        />
        <MetricCard
          icon={<ShieldAlert className="w-6 h-6 text-orange-600" />}
          title="Security"
          value={metrics.security}
          description="Vulnerability management and secure practices"
        />
      </div>
    </div>
  );
};
