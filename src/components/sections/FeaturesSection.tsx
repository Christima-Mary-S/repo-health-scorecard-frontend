"use client";

import React from "react";
import { BarChart3, ShieldAlert, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: BarChart3,
    title: "Automated Scores",
    description:
      "Our algorithm analyzes commit frequency, code quality, documentation, and community engagement to provide comprehensive health scores across multiple dimensions.",
    color: "text-primary-600",
    bgColor: "bg-primary-100 dark:bg-primary-900/20",
  },
  {
    icon: ShieldAlert,
    title: "Security Insights",
    description:
      "Real-time vulnerability detection, dependency analysis, and security best practices assessment to keep your repositories safe and compliant.",
    color: "text-accent-600",
    bgColor: "bg-accent-100 dark:bg-accent-900/20",
  },
  {
    icon: TrendingUp,
    title: "Actionable Metrics",
    description:
      "Get specific recommendations and improvement suggestions based on industry standards and best practices for open source projects.",
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} hover className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 ${feature.bgColor} rounded-lg`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
