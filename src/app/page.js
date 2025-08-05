import React from "react";
import RepoSearchForm from "./components/RepoSearchForm";

export default function LandingPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Instant GitHub Health Check</h1>
        <p className="max-w-xl mx-auto text-gray-600 mb-6">
          Enter any public repository to receive a composite health score,
          combining metrics for activity, community, quality, trust, and
          security —all powered by live GitHub data.
        </p>
        <div className="max-w-md mx-auto">
          <RepoSearchForm />
        </div>
      </section>

      {/* Feature Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Automated Scores</h3>
          <p className="text-gray-600">
            Quickly gauge repository health via a single composite metric
            derived from ten literature-backed indicators.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Security Insights</h3>
          <p className="text-gray-600">
            Detect open vulnerabilities through Dependabot alerts and OpenSSF
            checks, keeping your dependencies secure and up to date.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Actionable Metrics</h3>
          <p className="text-gray-600">
            View detailed breakdowns—commit frequency, PR review times, test
            presence, and more—to make data-driven decisions.
          </p>
        </div>
      </section>
    </div>
  );
}
