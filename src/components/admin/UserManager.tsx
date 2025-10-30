"use client";

import * as React from "react";
import { Users, Edit2, Trash2, Mail, Shield, User, Search } from "lucide-react";
import { UserRole } from "@/lib/mock-auth";

export interface AppUser {
  email: string;
  role: UserRole;
  createdAt: number;
  lastLogin?: number;
  orders?: number;
  totalSpent?: number;
  status: "active" | "suspended";
}

interface UserManagerProps {
  users: AppUser[];
  onUpdateUser: (email: string, updates: Partial<AppUser>) => void;
  onDeleteUser: (email: string) => void;
}

export function UserManager({ users, onUpdateUser, onDeleteUser }: UserManagerProps) {
  const [search, setSearch] = React.useState("");
  const [filterRole, setFilterRole] = React.useState<"all" | UserRole>("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (email: string, role: UserRole) => {
    onUpdateUser(email, { role });
  };

  const handleStatusChange = (email: string, status: "active" | "suspended") => {
    onUpdateUser(email, { status });
  };

  const handleDelete = (email: string) => {
    if (confirm(`Are you sure you want to delete user: ${email}?`)) {
      onDeleteUser(email);
    }
  };

  const dealerCount = users.filter((u) => u.role === "dealer").length;
  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass-dark rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-caption text-muted-foreground mb-1">Total Users</p>
              <p className="heading-2 text-gradient-hero">{users.length}</p>
            </div>
            <Users className="w-10 h-10 text-[var(--brand-primary)]" />
          </div>
        </div>

        <div className="glass-dark rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-caption text-muted-foreground mb-1">Dealers</p>
              <p className="heading-2 text-gradient-hero">{dealerCount}</p>
            </div>
            <Shield className="w-10 h-10 text-[var(--brand-secondary)]" />
          </div>
        </div>

        <div className="glass-dark rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-caption text-muted-foreground mb-1">Admins</p>
              <p className="heading-2 text-gradient-hero">{adminCount}</p>
            </div>
            <Shield className="w-10 h-10 text-[var(--brand-accent)]" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-dark rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by email..."
              className="field-input w-full pl-11"
            />
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as any)}
            className="field-input min-w-[150px]"
          >
            <option value="all">All Roles</option>
            <option value="dealer">Dealers</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="glass-dark rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Orders</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Total Spent</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr
                  key={user.email}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  {/* User Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.email, e.target.value as UserRole)
                      }
                      className="field-input py-1 text-sm"
                    >
                      <option value="dealer">Dealer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  {/* Orders */}
                  <td className="px-6 py-4">
                    <span className="text-sm">{user.orders || 0}</span>
                  </td>

                  {/* Total Spent */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold">
                      ${(user.totalSpent || 0).toFixed(2)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleStatusChange(
                          user.email,
                          user.status === "active" ? "suspended" : "active"
                        )
                      }
                      className={`sport-badge border ${
                        user.status === "active"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-red-500/10 border-red-500/30 text-red-400"
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(user.email)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-body-lg text-muted-foreground">
              {search ? "No users found matching your search" : "No users yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

