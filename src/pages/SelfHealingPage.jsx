import React, { useState } from 'react';
import { Bot, Cpu, RefreshCw, CheckCircle2, ShieldCheck, AlertTriangle, Play, Sparkles, Activity, Zap } from 'lucide-react';

export default function SelfHealingPage({ onAddToast }) {
  const [agents, setAgents] = useState([
    { id: 'SH-101', target: 'Metro Central Router (BR-102)', issue: 'BGP Route Flapping & Packet Loss (14%)', status: 'Fault Detected', actionNeeded: 'Flush BGP Table & Switch Backup Tunnel', confidence: 0.99, isFixed: false },
    { id: 'SH-102', target: 'Airport Plaza Core DB Connection Pool', issue: 'SQL Connection Leak (92/100 connections stuck)', status: 'Healed Automatically', actionNeeded: 'Cleared Deadpool Threads & Recycled Pool', confidence: 0.97, isFixed: true },
    { id: 'SH-103', target: 'Downtown Main ATM Cassette Motor', issue: 'Stepper Motor Counter Sensor Drift (0.4ms latency)', status: 'Optimal', actionNeeded: 'Recalibrated Optical Sensor Alignment', confidence: 0.95, isFixed: true },
  ]);

  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecuteHeal = (id, target) => {
    setIsExecuting(true);
    setTimeout(() => {
      setAgents(agents.map(ag => ag.id === id ? { ...ag, status: 'Healed Automatically', isFixed: true } : ag));
      setIsExecuting(false);
      if (onAddToast) onAddToast('AI Self-Healing Executed 🤖', `Autonomous agent successfully healed ${target}! BGP route table flushed & restored.`, 'success');
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/80 via-[#060608] to-cyan-950/80 border border-purple-500/30 text-white shadow-2xl space-y-3 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-[#00f5ff] animate-bounce" />
              <h2 className="text-2xl font-black tracking-tight text-white">Autonomous AI Self-Healing Infrastructure Agent</h2>
            </div>
            <p className="text-xs text-purple-200/70 mt-1 font-medium">
              Autonomous AI daemon monitoring branch IT topology for packet loss, memory leaks &amp; zero-downtime auto-remediation
            </p>
          </div>

          <div className="px-5 py-2.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/15 text-center shrink-0 shadow-lg">
            <span className="text-[10px] text-emerald-400 uppercase font-black tracking-wider block">AI HEAL ENGINE STATUS</span>
            <span className="text-sm font-black text-white flex items-center justify-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>AUTONOMOUS ACTIVE</span>
            </span>
          </div>
        </div>
      </div>

      {/* Autonomous Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-2 text-white shadow-xl">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Automated Self-Heals Today</span>
          <div className="text-3xl font-black font-mono text-emerald-400">18 Actions</div>
          <p className="text-[11px] text-emerald-400 font-bold border-t border-white/10 pt-1">Zero Human Downtime Impact</p>
        </div>

        <div className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-2 text-white shadow-xl">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Mean Time To Heal (MTTH)</span>
          <div className="text-3xl font-black font-mono text-[#00f5ff]">1.4 Seconds</div>
          <p className="text-[11px] text-white/50 font-medium border-t border-white/10 pt-1">vs 45 Min Manual Response</p>
        </div>

        <div className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-2 text-white shadow-xl">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">AI Detection Accuracy</span>
          <div className="text-3xl font-black font-mono text-white">99.4%</div>
          <p className="text-[11px] text-emerald-400 font-bold border-t border-white/10 pt-1">Verified by SOC Engineering</p>
        </div>
      </div>

      {/* Live Active Self-Healing Queue */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 text-white shadow-xl">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Live Infrastructure Fault &amp; Self-Healing Remediation Log</h3>

        <div className="space-y-3">
          {agents.map(ag => (
            <div key={ag.id} className="p-5 rounded-3xl bg-black/50 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-[#00f5ff]">{ag.id}</span>
                  <h4 className="font-black text-white">{ag.target}</h4>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold border ${ag.isFixed ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30'}`}>
                    {ag.status}
                  </span>
                </div>
                <p className="text-white/80 text-xs font-medium">{ag.issue}</p>
                <div className="text-[11px] text-white/50 font-mono">Recommended Action: {ag.actionNeeded} (AI Confidence: {(ag.confidence * 100).toFixed(0)}%)</div>
              </div>

              <div className="shrink-0">
                {ag.isFixed ? (
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-extrabold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Auto-Remediated</span>
                  </div>
                ) : (
                  <button
                    disabled={isExecuting}
                    onClick={() => handleExecuteHeal(ag.id, ag.target)}
                    className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] hover:opacity-95 disabled:opacity-50 text-white font-extrabold text-xs shadow-glow flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>🤖 Execute AI Self-Healing</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
