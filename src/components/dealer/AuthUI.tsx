"use client";

import * as React from "react";
import { Lock, Mail, User, LogIn, UserPlus } from "lucide-react";

interface AuthUIProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string) => void;
  error: string | null;
}

export function AuthUI({ onLogin, onSignup, error }: AuthUIProps) {
  const [mode, setMode] = React.useState<"login" | "signup">("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      onLogin(email, password);
    } else {
      onSignup(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-4 shadow-neon-blue">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="heading-1 text-gradient-hero mb-2">Dealer Portal</h1>
          <p className="text-body text-muted-foreground">
            Access your dashboard, manage orders, and more
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass-dark rounded-2xl p-8 shadow-layered">
          {/* Mode Tabs */}
          <div className="flex gap-2 mb-6 p-1 glass-surface rounded-lg">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
                mode === "login"
                  ? "bg-gradient-primary text-white shadow-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LogIn className="w-4 h-4 inline mr-2" />
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
                mode === "signup"
                  ? "bg-gradient-primary text-white shadow-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-2">
              <div className="mt-0.5">⚠️</div>
              <div>{error}</div>
            </div>
          )}

          {/* Demo Credentials */}
          {mode === "login" && (
            <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p className="text-xs">Email: dealer@gmail.com</p>
              <p className="text-xs">Password: password123</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="text-caption block mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dealer@example.com"
                  required
                  className="field-input w-full pl-11"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-caption block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="field-input w-full pl-11"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-neon glass-dark rounded-lg px-6 py-3 w-full text-base font-bold hover-lift transition-all"
            >
              {mode === "login" ? (
                <>
                  <LogIn className="w-5 h-5 inline mr-2" />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 inline mr-2" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-caption text-muted-foreground">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-[var(--brand-primary)] hover:underline font-semibold"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-[var(--brand-primary)] hover:underline font-semibold"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center text-caption text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Secure authentication powered by enterprise-grade encryption
          </p>
        </div>
      </div>
    </div>
  );
}

