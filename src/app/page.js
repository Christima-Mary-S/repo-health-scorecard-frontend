"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Github,
  ShieldAlert,
  Activity,
  Users,
  CheckCircle,
  Star,
  GitFork,
  Calendar,
  Menu,
  X,
  Moon,
  Sun,
  Sparkles,
  BarChart3,
  Shield,
  TrendingUp,
  Settings,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const RepoHealthDashboard = () => {
  const [currentScreen, setCurrentScreen] = useState("landing");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repoData, setRepoData] = useState(null);
  const [dashboardRepos, setDashboardRepos] = useState([]);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:3001/api";

  // Fetch repository score data
  const fetchRepoData = async (owner, repo) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/score/${owner}/${repo}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch repository data: ${response.status}`);
      }

      const data = await response.json();
      setRepoData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching repo data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user's repositories for dashboard
  const fetchDashboardRepos = async () => {
    try {
      // This would typically be a different endpoint for user's repos
      // For now, using some popular repos as examples
      const popularRepos = [
        { owner: "facebook", name: "react" },
        { owner: "microsoft", name: "vscode" },
        { owner: "vercel", name: "next.js" },
        { owner: "tailwindlabs", name: "tailwindcss" },
      ];

      const repoPromises = popularRepos.map(async ({ owner, name }) => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/score/${owner}/${name}`
          );
          if (response.ok) {
            const data = await response.json();
            return {
              name: `${owner}/${name}`,
              stars: data.stars || 0,
              score: Math.round(data.overallScore || data.score || 0),
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
      setDashboardRepos(results.filter((repo) => repo !== null));
    } catch (err) {
      console.error("Error fetching dashboard repos:", err);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const [owner, repo] = searchQuery.trim().split("/");
      if (owner && repo) {
        fetchRepoData(owner, repo);
        setCurrentScreen("repo-analysis");
      } else {
        setError("Please enter repository in format: owner/repository");
      }
    }
  };

  // Load dashboard data when switching to dashboard
  useEffect(() => {
    if (currentScreen === "dashboard") {
      fetchDashboardRepos();
    }
  }, [currentScreen]);

  const baseClasses = isDarkMode
    ? "bg-slate-900 text-slate-200"
    : "bg-gray-50 text-gray-900";

  // Component: Button
  const Button = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    onClick,
    disabled,
    iconLeft,
  }) => {
    const variants = {
      primary: isDarkMode
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-blue-600 hover:bg-blue-700 text-white",
      ghost: isDarkMode
        ? "bg-transparent hover:bg-slate-800 text-slate-200"
        : "bg-transparent hover:bg-gray-100 text-gray-700",
      secondary: isDarkMode
        ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
        : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          ${variants[variant]} ${sizes[size]} 
          rounded-lg font-medium transition-all duration-200 
          hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center gap-2 ${className}
        `}
      >
        {iconLeft && iconLeft}
        {children}
      </button>
    );
  };

  // Component: Card
  const Card = ({ children, className = "", hover = false }) => (
    <div
      className={`
      ${
        isDarkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-gray-200"
      } 
      border rounded-lg shadow-sm p-6 
      ${
        hover
          ? "hover:-translate-y-1 hover:shadow-md transition-all duration-200"
          : ""
      }
      ${className}
    `}
    >
      {children}
    </div>
  );

  // Component: Input
  const Input = ({
    placeholder,
    value,
    onChange,
    iconLeft,
    className = "",
  }) => (
    <div className="relative">
      {iconLeft && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {iconLeft}
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 ${iconLeft ? "pl-10" : ""} 
          ${
            isDarkMode
              ? "bg-slate-800 border-slate-600 text-slate-200 focus:ring-blue-500 focus:border-blue-500"
              : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          }
          border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50
          ${className}
        `}
      />
    </div>
  );

  // Component: Gauge
  const Gauge = ({ value, size = 120 }) => {
    const strokeDasharray = Math.PI * (size - 20);
    const strokeDashoffset = strokeDasharray - (strokeDasharray * value) / 100;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - 20) / 2}
            stroke={isDarkMode ? "#374151" : "#E5E7EB"}
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - 20) / 2}
            stroke={
              value >= 80 ? "#14B8A6" : value >= 60 ? "#2563EB" : "#F97316"
            }
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute text-center">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm text-gray-500">Score</div>
        </div>
      </div>
    );
  };

  // Component: RadarChart (simplified)
  const RadarChart = ({ data }) => {
    const size = 200;
    const center = size / 2;
    const radius = 60;
    const axes = ["Activity", "Community", "Quality", "Trust", "Security"];

    return (
      <div className="flex items-center justify-center">
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid circles */}
          {[20, 40, 60].map((r, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              stroke={isDarkMode ? "#374151" : "#E5E7EB"}
              strokeWidth="1"
            />
          ))}

          {/* Axis lines and labels */}
          {axes.map((axis, i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180);
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);

            return (
              <g key={axis}>
                <line
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke={isDarkMode ? "#374151" : "#E5E7EB"}
                  strokeWidth="1"
                />
                <text
                  x={center + (radius + 15) * Math.cos(angle)}
                  y={center + (radius + 15) * Math.sin(angle)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-current"
                >
                  {axis}
                </text>
              </g>
            );
          })}

          {/* Data polygon */}
          <polygon
            points={axes
              .map((axis, i) => {
                const value = data[axis.toLowerCase()] || 0;
                const angle = (i * 72 - 90) * (Math.PI / 180);
                const r = (value / 10) * radius;
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
            const value = data[axis.toLowerCase()] || 0;
            const angle = (i * 72 - 90) * (Math.PI / 180);
            const r = (value / 10) * radius;
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

  // Component: MetricCard
  const MetricCard = ({ icon, title, value, maxValue = 10, description }) => {
    const percentage = (value / maxValue) * 100;
    const color = value >= 8 ? "#14B8A6" : value >= 6 ? "#2563EB" : "#F97316";

    return (
      <Card hover className="w-full lg:w-72">
        <div className="flex items-start gap-4">
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-slate-700" : "bg-gray-100"
            }`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold" style={{ color }}>
                {value}
              </span>
              <span className="text-gray-500">/ {maxValue}</span>
            </div>
            <div
              className={`w-full h-2 rounded-full ${
                isDarkMode ? "bg-slate-700" : "bg-gray-200"
              } mb-2`}
            >
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%`, backgroundColor: color }}
              />
            </div>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </Card>
    );
  };

  // Component: Header
  const Header = () => (
    <header
      className={`
      sticky top-0 z-50 h-18 px-6 py-4 border-b
      ${
        isDarkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-gray-200"
      }
    `}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentScreen("landing")}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">RepoHealth</span>
          </div>

          {currentScreen === "repo-analysis" && (
            <form onSubmit={handleSearch} className="hidden md:block">
              <Input
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                iconLeft={<Search className="w-4 h-4" />}
                className="w-80"
              />
            </form>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <Button
            variant="ghost"
            onClick={() => setIsAuthModalOpen(true)}
            iconLeft={<Github className="w-4 h-4" />}
          >
            Sign In
          </Button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );

  // Screen: Landing Page
  const LandingPage = () => (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Instant GitHub
                <span className="text-blue-600"> Health Check</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get comprehensive insights into your repository's health,
                security, and community engagement with our automated scoring
                system.
              </p>

              <form onSubmit={handleSearch} className="flex gap-4 mb-8">
                <Input
                  placeholder="owner/repository"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? "Analyzing..." : "Analyze"}
                </Button>
              </form>

              <p className="text-sm text-gray-500">
                Try: facebook/react, microsoft/vscode, or any public repository
              </p>
            </div>

            <div className="relative">
              <Card className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <Gauge value={87} size={160} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-teal-600 mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-semibold">Activity</span>
                    </div>
                    <div className="text-2xl font-bold">9.2</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                      <Shield className="w-4 h-4" />
                      <span className="font-semibold">Security</span>
                    </div>
                    <div className="text-2xl font-bold">8.5</div>
                  </div>
                </div>
              </Card>

              <div className="absolute -top-4 -right-4 text-yellow-400">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card hover className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Automated Scores</h3>
              <p className="text-gray-600">
                Our algorithm analyzes commit frequency, code quality,
                documentation, and community engagement to provide comprehensive
                health scores across multiple dimensions.
              </p>
            </Card>

            <Card hover className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-teal-100 rounded-lg">
                  <ShieldAlert className="w-8 h-8 text-teal-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Security Insights</h3>
              <p className="text-gray-600">
                Real-time vulnerability detection, dependency analysis, and
                security best practices assessment to keep your repositories
                safe and compliant.
              </p>
            </Card>

            <Card hover className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Actionable Metrics</h3>
              <p className="text-gray-600">
                Get specific recommendations and improvement suggestions based
                on industry standards and best practices for open source
                projects.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 px-6 border-t ${
          isDarkMode ? "border-slate-700" : "border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Docs
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <span className="text-gray-600">MIT License</span>
          </div>

          <button
            onClick={toggleDarkMode}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-slate-800" : "hover:bg-gray-100"
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </footer>
    </div>
  );

  // Screen: Repo Analysis
  const RepoAnalysisPage = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen">
          <Header />
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg">Analyzing repository...</p>
              <p className="text-sm text-gray-500 mt-2">
                This may take a few seconds
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen">
          <Header />
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <ShieldAlert className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                Repository Not Found
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button
                onClick={() => {
                  setError(null);
                  setCurrentScreen("landing");
                }}
              >
                Try Another Repository
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (!repoData) {
      return (
        <div className="min-h-screen">
          <Header />
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-gray-600">Enter a repository to analyze</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Repo Meta Card */}
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={
                    repoData.avatar ||
                    `https://github.com/${repoData.owner}.png`
                  }
                  alt={repoData.owner}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h1 className="text-2xl font-bold">
                    {repoData.owner || repoData.full_name || "Unknown"}/
                    {repoData.name || repoData.repo || "Unknown"}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {(
                        repoData.stars ||
                        repoData.stargazers_count ||
                        0
                      ).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {(
                        repoData.forks ||
                        repoData.forks_count ||
                        0
                      ).toLocaleString()}
                    </span>
                    {repoData.lastCommit && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {repoData.lastCommit}
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
          {(repoData.vulnerabilities > 0 ||
            repoData.security?.vulnerabilities > 0) && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-orange-600 flex-shrink-0" />
              <span className="text-orange-800">
                <strong>
                  {repoData.vulnerabilities ||
                    repoData.security?.vulnerabilities ||
                    0}{" "}
                  open vulnerabilities
                </strong>{" "}
                detected in dependencies
              </span>
            </div>
          )}

          {/* Score Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <h2 className="text-xl font-semibold mb-6">
                Overall Health Score
              </h2>
              <div className="flex justify-center">
                <Gauge
                  value={Math.round(
                    repoData.overallScore || repoData.score || 0
                  )}
                  size={200}
                />
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-6">Score Breakdown</h2>
              <RadarChart
                data={
                  repoData.metrics ||
                  repoData.scores || {
                    activity: (repoData.activityScore || 0) / 10,
                    community: (repoData.communityScore || 0) / 10,
                    quality: (repoData.qualityScore || 0) / 10,
                    trust: (repoData.trustScore || 0) / 10,
                    security: (repoData.securityScore || 0) / 10,
                  }
                }
              />
            </Card>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <MetricCard
              icon={<Activity className="w-6 h-6 text-blue-600" />}
              title="Activity Score"
              value={(
                ((repoData.metrics?.activity || repoData.activityScore || 0) *
                  10) /
                10
              ).toFixed(1)}
              description="Based on commit frequency and recent updates"
            />
            <MetricCard
              icon={<Users className="w-6 h-6 text-teal-600" />}
              title="Community"
              value={(
                ((repoData.metrics?.community || repoData.communityScore || 0) *
                  10) /
                10
              ).toFixed(1)}
              description="Contributors, stars, and engagement metrics"
            />
            <MetricCard
              icon={<CheckCircle className="w-6 h-6 text-green-600" />}
              title="Code Quality"
              value={(
                ((repoData.metrics?.quality || repoData.qualityScore || 0) *
                  10) /
                10
              ).toFixed(1)}
              description="Documentation, tests, and code structure"
            />
            <MetricCard
              icon={<Shield className="w-6 h-6 text-blue-600" />}
              title="Trustworthiness"
              value={(
                ((repoData.metrics?.trust || repoData.trustScore || 0) * 10) /
                10
              ).toFixed(1)}
              description="License, maintainer activity, and stability"
            />
            <MetricCard
              icon={<ShieldAlert className="w-6 h-6 text-orange-600" />}
              title="Security"
              value={(
                ((repoData.metrics?.security || repoData.securityScore || 0) *
                  10) /
                10
              ).toFixed(1)}
              description="Vulnerability management and secure practices"
            />
          </div>
        </div>
      </div>
    );
  };

  // Screen: Dashboard
  const DashboardPage = () => (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        ${
          isDarkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
        } 
        border-r
      `}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://github.com/octocat.png"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-semibold">octocat</div>
              <div className="text-sm text-gray-500">Free Plan</div>
            </div>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className={`
              flex items-center gap-3 px-3 py-2 rounded-lg font-medium
              ${
                isDarkMode
                  ? "bg-slate-700 text-slate-200"
                  : "bg-blue-50 text-blue-700"
              }
            `}
            >
              <BarChart3 className="w-5 h-5" />
              My Repos
            </a>
            <a
              href="#"
              className={`
              flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
              ${
                isDarkMode
                  ? "text-slate-300 hover:bg-slate-700"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
            >
              <Settings className="w-5 h-5" />
              Settings
            </a>
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={toggleDarkMode}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg w-full transition-colors
                ${
                  isDarkMode
                    ? "text-slate-300 hover:bg-slate-700"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <Header />

        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">My Repositories</h1>
              <Button iconLeft={<Github className="w-4 h-4" />}>
                Sync with GitHub
              </Button>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className={`border-b ${
                        isDarkMode ? "border-slate-700" : "border-gray-200"
                      }`}
                    >
                      <th className="text-left py-3 px-4 font-semibold">
                        Repository
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Stars
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Last Score
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Last Analyzed
                      </th>
                      <th className="text-right py-3 px-4 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardRepos.map((repo, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          isDarkMode ? "border-slate-700" : "border-gray-200"
                        } hover:${isDarkMode ? "bg-slate-700" : "bg-gray-50"}`}
                      >
                        <td className="py-4 px-4">
                          <div className="font-medium">{repo.name}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-gray-400" />
                            {repo.stars.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                              repo.score >= 80
                                ? "bg-green-100 text-green-800"
                                : repo.score >= 60
                                ? "bg-blue-100 text-blue-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {repo.score}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-500">
                          {repo.lastAnalyzed}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSearchQuery(`${repo.owner}/${repo.repo}`);
                              fetchRepoData(repo.owner, repo.repo);
                              setCurrentScreen("repo-analysis");
                            }}
                            iconLeft={<ChevronRight className="w-4 h-4" />}
                          >
                            Analyze
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {dashboardRepos.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Github className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No repositories found
                </h3>
                <p className="text-gray-500 mb-4">
                  Connect your GitHub account to start analyzing repositories
                </p>
                <Button
                  iconLeft={<Github className="w-4 h-4" />}
                  onClick={fetchDashboardRepos}
                >
                  Load Sample Repos
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );

  // Auth Modal Component
  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`
        w-full max-w-md rounded-lg shadow-xl
        ${isDarkMode ? "bg-slate-800" : "bg-white"}
      `}
      >
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Github className="w-8 h-8 text-gray-600" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Welcome to RepoHealth</h2>
          <p className="text-gray-600 mb-8">
            Sign in with GitHub to analyze your repositories and track their
            health over time.
          </p>

          <Button
            className="w-full mb-4"
            size="lg"
            iconLeft={<Github className="w-5 h-5" />}
            onClick={() => {
              setIsAuthModalOpen(false);
              setCurrentScreen("dashboard");
            }}
          >
            Continue with GitHub
          </Button>

          <p className="text-xs text-gray-500">
            We only request repository metadata. No code is stored or accessed.
          </p>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className={`${baseClasses} transition-colors duration-300`}>
      {currentScreen === "landing" && <LandingPage />}
      {currentScreen === "repo-analysis" && <RepoAnalysisPage />}
      {currentScreen === "dashboard" && <DashboardPage />}
      {isAuthModalOpen && <AuthModal />}
    </div>
  );
};

export default RepoHealthDashboard;
