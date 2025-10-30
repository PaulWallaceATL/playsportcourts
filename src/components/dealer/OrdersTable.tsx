"use client";

import * as React from "react";
import { Package, Clock, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import { format } from "date-fns";

export interface Order {
  id: string;
  projectName: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  itemCount: number;
  createdAt: number;
  paymentStatus?: "paid" | "pending" | "failed";
}

interface OrdersTableProps {
  orders: Order[];
}

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
  },
  processing: {
    label: "Processing",
    icon: Package,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
  },
};

export function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="glass-dark rounded-xl p-12 text-center">
        <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-body-lg text-muted-foreground">No orders yet</p>
        <p className="text-caption mt-2">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div className="glass-dark rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="heading-2 flex items-center gap-3">
            <Package className="w-6 h-6" />
            Order History
          </h2>
          <span className="sport-badge">{orders.length} total</span>
        </div>
      </div>

      {/* Orders List */}
      <div className="divide-y divide-border">
        {orders.map((order) => {
          const config = statusConfig[order.status];
          const Icon = config.icon;

          return (
            <div
              key={order.id}
              className="p-6 hover:bg-white/[0.02] transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className={`${config.bg} ${config.border} border rounded-xl p-3 shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>

                {/* Order Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {order.projectName || `Order #${order.id.slice(0, 8)}`}
                      </h3>
                      <p className="text-caption text-muted-foreground">
                        {format(new Date(order.createdAt), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-gradient-hero">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-caption text-muted-foreground">
                        {order.itemCount} items
                      </p>
                    </div>
                  </div>

                  {/* Status & Payment */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`sport-badge ${config.bg} ${config.border} ${config.color} border`}>
                      {config.label}
                    </span>
                    {order.paymentStatus && (
                      <span
                        className={`sport-badge ${
                          order.paymentStatus === "paid"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : order.paymentStatus === "failed"
                            ? "bg-red-500/10 border-red-500/30 text-red-400"
                            : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                        } border`}
                      >
                        {order.paymentStatus === "paid" && "✓"} Payment{" "}
                        {order.paymentStatus}
                      </span>
                    )}
                  </div>
                </div>

                {/* View Details Arrow */}
                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

