"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from "lucide-react";

interface Stat {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface AdminStatsProps {
  stats: {
    totalRevenue: number;
    totalOrders: number;
    totalUsers: number;
    totalProducts: number;
    revenueChange?: number;
    ordersChange?: number;
    usersChange?: number;
  };
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statCards: Stat[] = [
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      change: stats.revenueChange,
      trend: (stats.revenueChange || 0) >= 0 ? "up" : "down",
      icon: DollarSign,
      color: "emerald",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      change: stats.ordersChange,
      trend: (stats.ordersChange || 0) >= 0 ? "up" : "down",
      icon: ShoppingCart,
      color: "blue",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      change: stats.usersChange,
      trend: (stats.usersChange || 0) >= 0 ? "up" : "down",
      icon: Users,
      color: "purple",
    },
    {
      label: "Active Products",
      value: stats.totalProducts,
      icon: Package,
      color: "orange",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        const colorMap: Record<string, string> = {
          emerald: "text-emerald-400",
          blue: "text-blue-400",
          purple: "text-purple-400",
          orange: "text-orange-400",
        };

        return (
          <div
            key={stat.label}
            className="glass-dark rounded-xl p-6 hover-lift transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-caption text-muted-foreground mb-1">{stat.label}</p>
                <p className="heading-1 text-gradient-hero mb-2">{stat.value}</p>
                {stat.change !== undefined && (
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    <TrendIcon className="w-4 h-4" />
                    <span>{Math.abs(stat.change)}%</span>
                    <span className="text-muted-foreground text-xs">vs last month</span>
                  </div>
                )}
              </div>
              <div
                className={`glass-surface rounded-xl p-3 ${colorMap[stat.color]}`}
              >
                <Icon className="w-8 h-8" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface RecentActivity {
  type: "order" | "user" | "product";
  message: string;
  timestamp: number;
  user?: string;
}

interface RecentActivityProps {
  activities: RecentActivity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const iconMap = {
    order: ShoppingCart,
    user: Users,
    product: Package,
  };

  const colorMap = {
    order: "text-blue-400",
    user: "text-emerald-400",
    product: "text-orange-400",
  };

  return (
    <div className="glass-dark rounded-xl p-6">
      <h2 className="heading-2 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, idx) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={idx}
              className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div
                className={`glass-surface rounded-lg p-2 ${colorMap[activity.type]}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm mb-1">{activity.message}</p>
                {activity.user && (
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}

        {activities.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No recent activity</p>
        )}
      </div>
    </div>
  );
}

