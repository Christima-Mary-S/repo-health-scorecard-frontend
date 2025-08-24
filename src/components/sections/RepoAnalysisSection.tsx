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
  GitCommit,
  Clock,
  GitPullRequest,
  Award,
  TestTube,
  Shuffle,
  UserX,
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
  const ownerName = data.owner;
  const repoName = data.repo;
  const stars = data.stars || data.stargazers_count || 0;
  const forks = data.forks || data.forks_count || 0;
  const score = Math.round(data.metrics?.overallScore || 0);
  const vulnerabilities = data.metrics?.vulnerabilityCount || 0;

  // Helper function to format metrics for display
  const formatMetric = (value: number | boolean | undefined, type: 'percentage' | 'number' | 'boolean' | 'days' = 'number'): string => {
    if (value === undefined || value === null) return 'N/A';
    
    if (type === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (type === 'days') {
      return `${Number(value).toFixed(1)} days`;
    }
    if (type === 'percentage') {
      return `${Number(value).toFixed(1)}%`;
    }
    return Number(value).toFixed(1);
  };

  // Calculate normalized scores for radar chart (0-10 scale)
  const normalizedMetrics = {
    commitFreq: Math.min((data.metrics?.commitFreq || 0) / 5, 10), // Normalize around 5 commits/month = 10/10
    issueResTime: Math.max(10 - (data.metrics?.issueResTime || 30) / 3, 0), // Invert: faster = better
    prReviewDuration: Math.max(10 - (data.metrics?.prReviewDuration || 20) / 2, 0), // Invert: faster = better
    contributorCount: Math.min((data.metrics?.contributorCount || 0) / 50, 10), // Normalize around 50 contributors = 10/10
    testFolderExists: data.metrics?.testFolderExists ? 10 : 0,
    badgeCount: Math.min((data.metrics?.badgeCount || 0) * 2.5, 10), // 4 badges = 10/10
    developerChurn: Math.max(10 - (data.metrics?.developerChurn || 10), 0), // Invert: lower churn = better
    busFactor: Math.min((data.metrics?.busFactor || 0) * 1.67, 10), // 6 = 10/10
    security: Math.max(10 - (data.metrics?.vulnerabilityCount || 0), 0), // Invert: fewer vulnerabilities = better
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
          <RadarChart data={{
            Activity: normalizedMetrics.commitFreq,
            Issues: normalizedMetrics.issueResTime,
            Reviews: normalizedMetrics.prReviewDuration,
            Community: normalizedMetrics.contributorCount,
            Testing: normalizedMetrics.testFolderExists,
            Quality: normalizedMetrics.badgeCount,
            Stability: normalizedMetrics.developerChurn,
            Resilience: normalizedMetrics.busFactor,
            Security: normalizedMetrics.security,
          }} />
        </Card>
      </div>

      {/* Comprehensive Metrics Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Detailed Metrics</h2>
        
        {/* Development Activity */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary-600">Development Activity</h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <MetricCard
              icon={<GitCommit className="w-6 h-6 text-blue-600" />}
              title="Commit Frequency"
              value={formatMetric(data.metrics?.commitFreq)}
              description="Average commits per month"
              unit="commits/month"
              hideProgress={true}
            />
            <MetricCard
              icon={<Clock className="w-6 h-6 text-green-600" />}
              title="Issue Resolution Time"
              value={formatMetric(data.metrics?.issueResTime, 'days')}
              description="Average time to resolve issues"
              hideProgress={true}
            />
            <MetricCard
              icon={<GitPullRequest className="w-6 h-6 text-purple-600" />}
              title="PR Review Duration"
              value={formatMetric(data.metrics?.prReviewDuration, 'days')}
              description="Average time for PR reviews"
              hideProgress={true}
            />
          </div>
        </div>

        {/* Community & Collaboration */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-accent-600">Community & Collaboration</h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <MetricCard
              icon={<Users className="w-6 h-6 text-blue-600" />}
              title="Contributor Count"
              value={formatMetric(data.metrics?.contributorCount)}
              description="Number of active contributors"
              unit="contributors"
              hideProgress={true}
            />
            <MetricCard
              icon={<Shuffle className="w-6 h-6 text-orange-600" />}
              title="Developer Churn"
              value={formatMetric(data.metrics?.developerChurn, 'percentage')}
              description="Rate of developer turnover"
              hideProgress={true}
            />
            <MetricCard
              icon={<UserX className="w-6 h-6 text-red-600" />}
              title="Bus Factor"
              value={formatMetric(data.metrics?.busFactor)}
              description="Number of key contributors"
              unit="people"
              hideProgress={true}
            />
          </div>
        </div>

        {/* Quality & Security */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-600">Quality & Security</h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <MetricCard
              icon={<TestTube className="w-6 h-6 text-green-600" />}
              title="Test Coverage"
              value={formatMetric(data.metrics?.testFolderExists, 'boolean')}
              description="Presence of test folder/structure"
              hideProgress={true}
            />
            <MetricCard
              icon={<Award className="w-6 h-6 text-yellow-600" />}
              title="Quality Badges"
              value={formatMetric(data.metrics?.badgeCount)}
              description="Number of quality/build badges"
              unit="badges"
              hideProgress={true}
            />
            <MetricCard
              icon={<ShieldAlert className="w-6 h-6 text-red-600" />}
              title="Security Vulnerabilities"
              value={formatMetric(data.metrics?.vulnerabilityCount)}
              description="Known security vulnerabilities"
              unit="vulnerabilities"
              hideProgress={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
