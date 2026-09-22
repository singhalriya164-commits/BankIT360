import React, { useState } from 'react';
import { MapPin, Building2, Phone, User, Activity, AlertTriangle, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { calculateBranchHealth } from '../services/healthEngine';

export default function BranchMapPage({ branches, tickets, incidents, assets, onNavigate }) {
  const [selectedCity, setSelectedCity] = useState('ALL');

  const branchHealthResults = branches.map(b => calculateBranchHealth(b, tickets, incidents, assets));

  const cities = ['ALL', 'New York', 'Chicago', 'San Francisco', 'Dallas', 'Boston', 'Miami', 'San Jose'];

  const filteredHealth = branchHealthResults.filter(b => {
    const branchObj = branches.find(item => item.id === b.branchId);
    return selectedCity === 'ALL' || (branchObj && branchObj.city === selectedCity);
  });

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-[#00f5ff]" />
            <span>Geographic Branch GIS Map & Telemetry Visualizer</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Real-time regional operational status, branch health score pins, and emergency IT contact directory
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCity === city
                  ? 'bg-gradient-to-r from-[#ff2d78] to-[#ec4899] text-white shadow-glow border border-white/20'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Map Visualizer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHealth.map(item => {
          const branchObj = branches.find(b => b.id === item.branchId) || {};
          const isCritical = item.healthScore < 65;
          const isModerate = item.healthScore < 85 && !isCritical;

          return (
            <div 
              key={item.branchId}
              className="p-5 rounded-2xl glass-card glass-card-hover border border-white/10 space-y-4 shadow-xl text-white"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs font-bold ${
                    isCritical ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : isModerate ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]/40'
                  }`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-white/40">{item.branchId} • {branchObj.region}</span>
                    <h3 className="text-sm font-extrabold text-white">{item.branchName}</h3>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${
                  isCritical ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : isModerate ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {item.healthScore}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-black/50 p-3 rounded-xl border border-white/10">
                <div>
                  <span className="text-white/40 text-[10px] uppercase block font-bold">City Location</span>
                  <span className="text-white font-bold">{branchObj.city || 'New York'}</span>
                </div>
                <div>
                  <span className="text-white/40 text-[10px] uppercase block font-bold">Branch Manager</span>
                  <span className="text-white font-bold">{branchObj.manager || 'Sarah Jenkins'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                <span className="text-white/50 font-mono text-[11px]">{branchObj.phone || '+1 212-555-0101'}</span>
                <button
                  onClick={() => onNavigate && onNavigate('branch-health')}
                  className="text-[#00f5ff] hover:text-white font-extrabold text-xs flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <span>Branch Telemetry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
