import React from 'react';
import { Sparkles, Inbox, RefreshCw } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No Data Found',
  description = 'There are no active records matching your filter criteria.',
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  badge = 'Zero State'
}) {
  return (
    <div className="w-full p-8 sm:p-12 rounded-3xl glass-card border border-white/10 text-center flex flex-col items-center justify-center space-y-4 my-6 relative overflow-hidden animate-smooth-enter">
      {/* Subtle background glow */}
      <div className="absolute w-48 h-48 rounded-full bg-[#00f5ff]/10 blur-3xl pointer-events-none -top-12 -right-12"></div>
      <div className="absolute w-48 h-48 rounded-full bg-[#ff2d78]/10 blur-3xl pointer-events-none -bottom-12 -left-12"></div>

      {/* Glowing Icon Beacon */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#ff2d78]/20 via-purple-600/20 to-[#00f5ff]/20 border border-white/15 flex items-center justify-center text-[#00f5ff] shadow-glow-cyan animate-float-slow">
          <Icon className="w-8 h-8 text-[#00f5ff]" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#ff2d78] animate-ping"></div>
      </div>

      {/* Badge */}
      {badge && (
        <span className="text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/70">
          {badge}
        </span>
      )}

      {/* Title & Description */}
      <div className="max-w-md space-y-1.5">
        <h3 className="text-base sm:text-lg font-black text-white">{title}</h3>
        <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-medium">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {actionLabel && (
            <button
              onClick={onAction}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs shadow-glow transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{actionLabel}</span>
            </button>
          )}
          {secondaryActionLabel && (
            <button
              onClick={onSecondaryAction}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 font-bold text-xs transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{secondaryActionLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
