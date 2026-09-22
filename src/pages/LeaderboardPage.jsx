import React, { useState } from 'react';
import { Trophy, Award, Zap, Shield, Flame, Star, Crown, ThumbsUp, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';

export default function LeaderboardPage({ onAddToast }) {
  const [engineers, setEngineers] = useState([
    { id: 1, name: 'James Wilson', role: 'Lead L2 Field Engineer', level: 14, xp: 4850, resolvedCount: 84, badge: '⚡ Lightning Fixer', trophy: '🏆 #1 Top Performer', avatar: 'JW', color: 'from-amber-400 to-yellow-600' },
    { id: 2, name: 'Raj Sharma', role: 'L3 Core Banking Specialist', level: 12, xp: 4120, resolvedCount: 71, badge: '🛡️ Security Guardian', trophy: '🥈 Silver Master', avatar: 'RS', color: 'from-slate-300 to-slate-500' },
    { id: 3, name: 'Alex Morgan', role: 'L1 Helpdesk Lead', level: 11, xp: 3780, resolvedCount: 65, badge: '🎯 First Contact Fixer', trophy: '🥉 Bronze Elite', avatar: 'AM', color: 'from-amber-700 to-amber-900' },
    { id: 4, name: 'Robert Chen', role: 'Network Infrastructure Lead', level: 9, xp: 2950, resolvedCount: 49, badge: '🔌 Router Master', trophy: '⭐ Rising Star', avatar: 'RC', color: 'from-blue-500 to-indigo-600' },
  ]);

  const handleRewardXp = (id, name) => {
    setEngineers(engineers.map(eng => {
      if (eng.id === id) {
        return { ...eng, xp: eng.xp + 250, level: Math.floor((eng.xp + 250) / 350) };
      }
      return eng;
    }));
    if (onAddToast) onAddToast('Bonus XP Awarded! 🌟', `Awarded +250 XP bonus to ${name} for outstanding SLA resolution!`, 'success');
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/80 via-[#060608] to-purple-950/80 border border-blue-500/30 text-white shadow-2xl space-y-3 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
              <h2 className="text-2xl font-black tracking-tight text-white">IT Engineer Gamified Leaderboard</h2>
            </div>
            <p className="text-xs text-blue-300/70 mt-1 font-medium">
              Gamified ticket resolution XP points, speed achievement badges &amp; monthly top engineer trophies
            </p>
          </div>
          <div className="px-5 py-2.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/15 text-center shadow-lg">
            <span className="text-[10px] text-amber-300 uppercase font-black tracking-wider block">SEASON 2026 CHAMPION</span>
            <span className="text-base font-black font-mono text-white">James Wilson (4,850 XP)</span>
          </div>
        </div>
      </div>

      {/* Top 3 Winner Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {engineers.slice(0, 3).map((eng, idx) => (
          <div key={eng.id} className="p-6 rounded-3xl glass-card glass-card-hover border border-white/10 text-center space-y-4 relative shadow-xl text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#ff2d78] to-[#00f5ff] text-white font-black text-xl shadow-glow mx-auto">
              {eng.avatar}
            </div>

            <div>
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider block">{eng.trophy}</span>
              <h3 className="text-lg font-black text-white mt-0.5">{eng.name}</h3>
              <p className="text-xs text-white/50 font-medium">{eng.role}</p>
            </div>

            {/* Level & XP Progress */}
            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-1.5 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-[#00f5ff] font-mono">Level {eng.level} Engineer</span>
                <span className="text-white font-mono">{eng.xp} XP</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#ff2d78] to-[#00f5ff]" style={{ width: `${Math.min(100, (eng.xp % 1000) / 10)}%` }}></div>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="inline-block px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/90">
              {eng.badge}
            </div>

            <button
              onClick={() => handleRewardXp(eng.id, eng.name)}
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] text-white font-extrabold text-xs shadow-glow transition-all cursor-pointer hover:opacity-90"
            >
              🌟 Reward +250 Bonus XP
            </button>
          </div>
        ))}
      </div>

      {/* Engineer Ranking Table */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 text-white shadow-xl">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Full IT Staff XP Leaderboard Standings</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-bold uppercase text-[10px] tracking-wider">
                <th className="p-3 pl-4">Rank</th>
                <th className="p-3">IT Engineer</th>
                <th className="p-3">Badge &amp; Title</th>
                <th className="p-3">Tickets Resolved</th>
                <th className="p-3">Level / XP</th>
                <th className="p-3 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-medium">
              {engineers.map((eng, idx) => (
                <tr key={eng.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-4 font-mono font-black text-[#00f5ff]">#{idx + 1}</td>
                  <td className="p-3.5">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff2d78] to-[#00f5ff] text-white font-bold flex items-center justify-center text-xs shadow-glow">
                        {eng.avatar}
                      </div>
                      <div>
                        <span className="font-bold text-white block">{eng.name}</span>
                        <span className="text-[11px] text-white/50">{eng.role}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-amber-400">{eng.badge}</td>
                  <td className="p-3.5 font-mono font-bold text-white">{eng.resolvedCount} Resolved</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-400">Lvl {eng.level} ({eng.xp} XP)</td>
                  <td className="p-3.5 pr-4 text-right">
                    <button
                      onClick={() => handleRewardXp(eng.id, eng.name)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#00f5ff]/15 text-[#00f5ff] hover:bg-[#00f5ff]/30 border border-[#00f5ff]/30 font-bold text-[11px] cursor-pointer transition-colors"
                    >
                      + XP Bonus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
