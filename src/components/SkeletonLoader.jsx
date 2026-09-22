import React from 'react';

export default function SkeletonLoader({ variant = 'card', count = 3, className = '' }) {
  if (variant === 'card') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-5 rounded-3xl glass-card border border-white/10 space-y-3 relative overflow-hidden animate-shimmer">
            <div className="flex items-center justify-between">
              <div className="w-24 h-4 rounded-lg bg-white/10"></div>
              <div className="w-8 h-8 rounded-xl bg-white/10"></div>
            </div>
            <div className="w-16 h-8 rounded-xl bg-white/15"></div>
            <div className="w-32 h-3 rounded-lg bg-white/5"></div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className={`rounded-3xl glass-card border border-white/10 p-4 space-y-3 ${className}`}>
        <div className="h-10 rounded-2xl bg-white/10 animate-shimmer"></div>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-14 rounded-2xl bg-white/5 flex items-center justify-between px-4 space-x-4 animate-shimmer">
            <div className="w-20 h-4 rounded bg-white/10"></div>
            <div className="w-48 h-4 rounded bg-white/10"></div>
            <div className="w-24 h-6 rounded-full bg-white/10"></div>
            <div className="w-16 h-4 rounded bg-white/10"></div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className={`p-6 rounded-3xl glass-card border border-white/10 space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="w-40 h-5 rounded-lg bg-white/10 animate-shimmer"></div>
          <div className="w-24 h-6 rounded-full bg-white/10 animate-shimmer"></div>
        </div>
        <div className="h-64 rounded-2xl bg-white/5 flex items-end justify-between p-4 gap-3 animate-shimmer">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-white/10 rounded-t-xl"
              style={{ height: `${25 + ((i * 13) % 65)}%` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Default List Skeleton
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 rounded-2xl glass-card border border-white/10 flex items-center space-x-4 animate-shimmer">
          <div className="w-10 h-10 rounded-xl bg-white/10 shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="w-1/3 h-4 rounded bg-white/10"></div>
            <div className="w-2/3 h-3 rounded bg-white/5"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
