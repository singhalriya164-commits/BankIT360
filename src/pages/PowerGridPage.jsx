import React, { useState } from 'react';
import { Zap, Battery, Fuel, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function PowerGridPage({ branches }) {
  const [powerNodes, setPowerNodes] = useState([
    { id: 'PWR-101', branch: 'Downtown Main Branch', upsBattery: 98, gridVoltage: '220V (Stable)', generatorFuel: '92% (Full)', status: 'Optimal Grid Power', lastTest: '2 days ago' },
    { id: 'PWR-102', branch: 'Metro Central Branch', upsBattery: 45, gridVoltage: '198V (Low Surge Warning)', generatorFuel: '68%', status: 'UPS Battery Active', lastTest: 'Yesterday' },
    { id: 'PWR-103', branch: 'Airport Plaza Branch', upsBattery: 88, gridVoltage: '224V (Stable)', generatorFuel: '85%', status: 'Optimal Grid Power', lastTest: '5 days ago' },
    { id: 'PWR-104', branch: 'Financial District Plaza', upsBattery: 94, gridVoltage: '221V (Stable)', generatorFuel: '95%', status: 'Optimal Grid Power', lastTest: '3 days ago' },
  ]);

  const [isTesting, setIsTesting] = useState(false);

  const handleTestGenerator = (id) => {
    setIsTesting(true);
    setTimeout(() => {
      setPowerNodes(prev => prev.map(p => p.id === id ? { ...p, generatorFuel: '94%', status: 'Optimal Grid Power', upsBattery: 99 } : p));
      setIsTesting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Zap className="w-6 h-6 text-amber-400 animate-pulse" />
            <span>Branch Power Grid &amp; UPS Battery Health Telemetry</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Real-time monitoring of UPS battery reserves, utility grid AC voltage, and diesel generator fuel levels
          </p>
        </div>
      </div>

      {/* Power Node Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {powerNodes.map(node => {
          const isWarning = node.upsBattery < 50;

          return (
            <div key={node.id} className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-4 shadow-xl text-white">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-amber-400">{node.id}</span>
                  <h3 className="text-sm font-extrabold text-white">{node.branch}</h3>
                  <span className="text-[11px] text-white/50 font-medium">Last Test: {node.lastTest}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-black text-xs border ${
                  isWarning ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {node.status}
                </span>
              </div>

              {/* Progress Meters */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* UPS Battery Meter */}
                <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-white/60 flex items-center space-x-1">
                      <Battery className="w-4 h-4 text-emerald-400" />
                      <span>UPS Reserve</span>
                    </span>
                    <span className={isWarning ? 'text-amber-400 font-mono' : 'text-emerald-400 font-mono'}>{node.upsBattery}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${isWarning ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${node.upsBattery}%` }} />
                  </div>
                </div>

                {/* Generator Fuel Meter */}
                <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-white/60 flex items-center space-x-1">
                      <Fuel className="w-4 h-4 text-[#00f5ff]" />
                      <span>Generator Fuel</span>
                    </span>
                    <span className="text-[#00f5ff] font-mono">{node.generatorFuel}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-[#00f5ff] transition-all duration-500" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                <span className="text-white/60 font-mono">AC Voltage: <strong className="text-white">{node.gridVoltage}</strong></span>
                <button
                  onClick={() => handleTestGenerator(node.id)}
                  disabled={isTesting}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-extrabold transition-all shadow-xs cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isTesting ? 'Running Self-Test...' : 'Simulate Gen Test'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
