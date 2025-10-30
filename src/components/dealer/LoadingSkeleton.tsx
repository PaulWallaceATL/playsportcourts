"use client";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 anim-fade-in">
      {/* Metrics Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-dark rounded-xl p-6">
            <div className="skeleton h-4 w-24 mb-4" />
            <div className="skeleton h-10 w-32 mb-2" />
            <div className="skeleton h-4 w-28" />
          </div>
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <div className="glass-dark rounded-xl p-6">
        <div className="skeleton h-8 w-40 mb-4" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-surface rounded-xl p-6">
              <div className="skeleton h-10 w-10 rounded-lg mb-3" />
              <div className="skeleton h-6 w-32 mb-2" />
              <div className="skeleton h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CatalogSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 anim-fade-in">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="glass-dark rounded-xl overflow-hidden">
          <div className="skeleton aspect-video" />
          <div className="p-5 space-y-4">
            <div className="skeleton h-6 w-3/4" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-8 w-24" />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <div key={j} className="skeleton aspect-square w-8 rounded-lg" />
              ))}
            </div>
            <div className="skeleton h-10 w-full rounded-lg" />
            <div className="skeleton h-12 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="glass-dark rounded-xl p-6 anim-fade-in">
      <div className="skeleton h-8 w-40 mb-6" />
      <div className="space-y-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-surface rounded-lg p-4 flex gap-4">
            <div className="skeleton w-20 h-20 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-6 w-40" />
              <div className="skeleton h-4 w-32" />
              <div className="skeleton h-8 w-24" />
            </div>
            <div className="text-right space-y-2">
              <div className="skeleton h-6 w-20" />
              <div className="skeleton h-8 w-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-6">
        <div className="skeleton h-8 w-full mb-4" />
        <div className="skeleton h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function OrdersSkeleton() {
  return (
    <div className="glass-dark rounded-xl overflow-hidden anim-fade-in">
      <div className="p-6 border-b border-border">
        <div className="skeleton h-8 w-40" />
      </div>
      <div className="divide-y divide-border">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6">
            <div className="flex items-start gap-4">
              <div className="skeleton w-14 h-14 rounded-xl shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="skeleton h-6 w-48" />
                    <div className="skeleton h-4 w-32" />
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="skeleton h-6 w-24" />
                    <div className="skeleton h-4 w-16" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="skeleton h-6 w-20 rounded-full" />
                  <div className="skeleton h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

