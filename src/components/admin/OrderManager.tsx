"use client";

import * as React from "react";
import { Package, Search, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";

export interface AdminOrder {
  id: string;
  dealerEmail: string;
  projectName: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  paymentStatus: "paid" | "pending" | "failed";
  total: number;
  itemCount: number;
  createdAt: number;
  items?: Array<{
    productName: string;
    color: string;
    quantity: number;
    price: number;
  }>;
  shipping?: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  stripeSessionId?: string;
}

interface OrderManagerProps {
  orders: AdminOrder[];
  onUpdateStatus: (orderId: string, status: AdminOrder["status"]) => void;
  onUpdatePaymentStatus: (orderId: string, status: AdminOrder["paymentStatus"]) => void;
}

export function OrderManager({ orders, onUpdateStatus, onUpdatePaymentStatus }: OrderManagerProps) {
  const [search, setSearch] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<"all" | AdminOrder["status"]>("all");
  const [filterPayment, setFilterPayment] = React.useState<"all" | AdminOrder["paymentStatus"]>("all");
  const [selectedOrder, setSelectedOrder] = React.useState<AdminOrder | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.dealerEmail.toLowerCase().includes(search.toLowerCase()) ||
      order.projectName.toLowerCase().includes(search.toLowerCase()) ||
      order.id.includes(search);
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const matchesPayment = filterPayment === "all" || order.paymentStatus === filterPayment;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    completed: orders.filter((o) => o.status === "completed").length,
    revenue: orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.total, 0),
  };

  const statusConfig = {
    pending: { label: "Pending", color: "yellow", icon: Clock },
    processing: { label: "Processing", color: "blue", icon: Package },
    completed: { label: "Completed", color: "emerald", icon: CheckCircle },
    cancelled: { label: "Cancelled", color: "red", icon: XCircle },
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="glass-dark rounded-xl p-4">
          <p className="text-caption text-muted-foreground mb-1">Total Orders</p>
          <p className="heading-2 text-gradient-hero">{stats.total}</p>
        </div>
        <div className="glass-dark rounded-xl p-4">
          <p className="text-caption text-muted-foreground mb-1">Pending</p>
          <p className="heading-2 text-yellow-400">{stats.pending}</p>
        </div>
        <div className="glass-dark rounded-xl p-4">
          <p className="text-caption text-muted-foreground mb-1">Processing</p>
          <p className="heading-2 text-blue-400">{stats.processing}</p>
        </div>
        <div className="glass-dark rounded-xl p-4">
          <p className="text-caption text-muted-foreground mb-1">Total Revenue</p>
          <p className="heading-2 text-emerald-400">${stats.revenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-dark rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders, dealers, projects..."
              className="field-input w-full pl-11"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | AdminOrder["status"])}
            className="field-input min-w-[150px]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Payment Filter */}
          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value as "all" | AdminOrder["paymentStatus"])}
            className="field-input min-w-[150px]"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* Export Button */}
          <button className="glass-surface rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 hover-lift">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-dark rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Order</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Dealer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Payment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => {
                const config = statusConfig[order.status];

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    {/* Order Info */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">
                          {order.projectName || `#${order.id.slice(0, 8)}`}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.itemCount} items</p>
                      </div>
                    </td>

                    {/* Dealer */}
                    <td className="px-6 py-4">
                      <p className="text-sm">{order.dealerEmail}</p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <p className="text-sm">
                        {format(new Date(order.createdAt), "MMM d, yyyy")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(order.createdAt), "h:mm a")}
                      </p>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4">
                      <p className="font-bold">${order.total.toFixed(2)}</p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          onUpdateStatus(order.id, e.target.value as AdminOrder["status"]);
                        }}
                        className={`field-input py-1 text-sm bg-${config.color}-500/10 border-${config.color}-500/30 text-${config.color}-400`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-4">
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => {
                          e.stopPropagation();
                          onUpdatePaymentStatus(order.id, e.target.value as AdminOrder["paymentStatus"]);
                        }}
                        className={`field-input py-1 text-sm ${
                          order.paymentStatus === "paid"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : order.paymentStatus === "failed"
                            ? "bg-red-500/10 border-red-500/30 text-red-400"
                            : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                        }`}
                      >
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        className="text-[var(--brand-primary)] hover:text-[var(--brand-accent)] text-sm font-semibold"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-body-lg text-muted-foreground">
              {search ? "No orders found matching your filters" : "No orders yet"}
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="glass-dark rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="heading-2 mb-1">{selectedOrder.projectName}</h2>
                <p className="text-caption text-muted-foreground">
                  Order #{selectedOrder.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="glass-surface rounded-lg p-2 hover:bg-red-500/10"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Order Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="heading-3 mb-3">Order Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dealer:</span>
                    <span className="font-semibold">{selectedOrder.dealerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{format(new Date(selectedOrder.createdAt), "PPp")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items:</span>
                    <span>{selectedOrder.itemCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-bold text-lg">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.shipping && (
                <div>
                  <h3 className="heading-3 mb-3">Shipping Address</h3>
                  <div className="text-sm space-y-1">
                    <p>{selectedOrder.shipping.address}</p>
                    <p>
                      {selectedOrder.shipping.city}, {selectedOrder.shipping.state}{" "}
                      {selectedOrder.shipping.zip}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Order Items */}
            {selectedOrder.items && selectedOrder.items.length > 0 && (
              <div className="mb-6">
                <h3 className="heading-3 mb-3">Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="glass-surface rounded-lg p-3 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{item.productName}</p>
                        <p className="text-caption text-muted-foreground">
                          {item.color} • {item.quantity} sq ft
                        </p>
                      </div>
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Updates */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 glass-surface rounded-lg px-4 py-3 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

