import React from "react";
import { fetchScore } from "@/lib/api";
import Gauge from "@/components/Gauge";
import RadarMetrics from "@/components/RadarMetrics";
import SubMetricBars from "@/components/SubMetricBars";

export default async function RepoPage({ params }) {
  const { owner, name } = params;
  let data;

  try {
    data = await fetchScore(owner, name);
  } catch (err) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-red-600">
          {`Error fetching stats for ${owner}/${name}: ${err.message}`}
        </p>
      </div>
    );
  }

  const { metrics, compositeScore } = data;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">
        {owner}/{name}
      </h1>

      {/* Score & Radar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center items-center">
          <Gauge value={compositeScore} />
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <RadarMetrics metrics={metrics} />
        </div>
      </div>

      {/* Sub-metric bars */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <SubMetricBars metrics={metrics} />
      </div>
    </div>
  );
}
