"use client";

import { TrendingUp, Package, DollarSign, Clock } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
}

function MetricCard({ title, value, change, trend = "neutral", icon }: MetricCardProps) {
  const trendColors = {
    up: "text-emerald-400",
    down: "text-red-400",
    neutral: "text-blue-400",
  };

  return (
    <div className="glass-dark rounded-xl p-6 hover-lift transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-caption text-muted-foreground mb-1">{title}</p>
          <p className="heading-2 text-gradient-hero mb-2">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 text-sm ${trendColors[trend]}`}>
              <TrendingUp className="w-4 h-4" />
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="glass-surface rounded-lg p-3 group-hover:scale-110 transition-transform">
          <div className="text-[var(--brand-primary)]">{icon}</div>
        </div>
      </div>
    </div>
  );
}

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Orders"
        value="24"
        change="+12% this month"
        trend="up"
        icon={<Package className="w-6 h-6" />}
      />
      <MetricCard
        title="Revenue"
        value="$48,392"
        change="+23% this month"
        trend="up"
        icon={<DollarSign className="w-6 h-6" />}
      />
      <MetricCard
        title="Avg. Order Value"
        value="$2,016"
        change="+8% this month"
        trend="up"
        icon={<TrendingUp className="w-6 h-6" />}
      />
      <MetricCard
        title="Pending Orders"
        value="3"
        change="2 processing"
        trend="neutral"
        icon={<Clock className="w-6 h-6" />}
      />
    </div>
  );
}

