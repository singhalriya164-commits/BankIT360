import React, { useState } from 'react';
import { Zap, Sun, Leaf, Moon, CheckCircle2, ShieldCheck, Power, Activity } from 'lucide-react';

export default function EnergySaverPage({ onAddToast }) {
  const [ecoModeActive, setEcoModeActive] = useState(false);

  const energyStats = [
    { branch: 'Downtown Main Branch', totalKwh: '142 kWh/day', solarPercent: '45%', carbonOffset: '38 kg CO2', status: 'Optimal Eco' },
    { branch: 'Metro Central Branch', totalKwh: '198 kWh/day', solarPercent: '30%', carbonOffset: '24 kg CO2', status: 'Moderate' },
    { branch: 'Airport Plaza Branch', totalKwh: '165 kWh/day', solarPercent: '52%', carbonOffset: '42 kg CO2', status: 'Optimal Eco' },
    { branch: 'Westside Commerce Branch', totalKwh: '120 kWh/day', solarPercent: '60%', carbonOffset: '51 kg CO2', status: 'Super Green' },
  ];

  const handleToggleEcoMode = () => {
    setEcoModeActive(!ecoModeActive);
    if (onAddToast) {
      if (!ecoModeActive) {
        onAddToast('Eco Sleep Mode Activated 🌱', 'Sent sleep signal to 145 branch teller monitors & idle servers.', 'success');
      } else {
        onAddToast('Eco Mode Standby', 'Restored standard power management settings.', 'info');
      }
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-[#060608] to-cyan-950/80 border border-emerald-500/30 text-white shadow-2xl space-y-3 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <Leaf className="w-6 h-6 text-emerald-400 animate-pulse" />
              <h2 className="text-2xl font-black tracking-tight text-white">Real-Time Branch Energy &amp; Carbon Saver</h2>
            </div>
            <p className="text-xs text-emerald-300/70 mt-1 font-medium">
              Monitor branch kWh electricity consumption, solar green energy reserves &amp; automated after-hours screen power off
            </p>
          </div>

          <button
            onClick={handleToggleEcoMode}
            className={`px-5 py-2.5 rounded-2xl font-extrabold text-xs transition-all shadow-glow flex items-center space-x-2 shrink-0 cursor-pointer ${
              ecoModeActive ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] text-white hover:opacity-90'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>{ecoModeActive ? '🌱 Eco Sleep Mode ACTIVE' : '🌙 Activate Eco Sleep Mode'}</span>
          </button>
        </div>
      </div>

      {/* Energy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-2 text-white shadow-xl">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Total Power Consumption</span>
          <div className="text-3xl font-black font-mono text-white">625 kWh</div>
          <p className="text-[11px] text-emerald-400 font-bold border-t border-white/10 pt-1">↓ 14% Saved this week</p>
        </div>

        <div className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-2 text-white shadow-xl">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Solar Green Energy Share</span>
          <div className="text-3xl font-black font-mono text-emerald-400">46.8%</div>
          <p className="text-[11px] text-white/50 font-medium border-t border-white/10 pt-1">Rooftop Solar Active</p>
        </div>

        <div className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-2 text-white shadow-xl">
          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Monthly CO2 Carbon Offset</span>
          <div className="text-3xl font-black font-mono text-[#00f5ff]">1.55 Tons</div>
          <p className="text-[11px] text-emerald-400 font-bold border-t border-white/10 pt-1">Green Banking Certified</p>
        </div>
      </div>

      {/* Branch Power Table */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 text-white shadow-xl">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Branch-by-Branch Power &amp; Carbon Offsets</h3>

        <div className="space-y-3">
          {energyStats.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-white">{item.branch}</h4>
                <span className="text-[11px] text-white/50">Rooftop Solar Grid Array #0{idx + 1}</span>
              </div>

              <div className="flex items-center space-x-6 flex-wrap gap-y-2">
                <div className="text-right">
                  <span className="text-white/40 text-[10px] uppercase font-bold block">Electricity</span>
                  <span className="font-mono font-bold text-white">{item.totalKwh}</span>
                </div>
                <div className="text-right">
                  <span className="text-white/40 text-[10px] uppercase font-bold block">Solar Energy</span>
                  <span className="font-mono font-bold text-emerald-400">{item.solarPercent}</span>
                </div>
                <div className="text-right">
                  <span className="text-white/40 text-[10px] uppercase font-bold block">CO2 Saved</span>
                  <span className="font-mono font-bold text-[#00f5ff]">{item.carbonOffset}</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold text-[11px]">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
