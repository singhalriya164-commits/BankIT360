import React, { useState } from 'react';
import { X, Sparkles, AlertTriangle, ShieldCheck, Cpu, RefreshCw, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function PredictiveMaintenanceDrawer({ isOpen, onClose }) {
  const [predictions, setPredictions] = useState([
    { id: 1, assetTag: 'BNK-DAL-099', name: 'Diebold Nixdorf Drive-Thru ATM #1', branch: 'Airport Plaza Branch', riskScore: 88, probFailure: '88% (High)', recommendedAction: 'Dispatch field technician to replace card reader motor assembly within 48h.', estSavings: '$4,200 (Prevents Peak Weekend Outage)' },
    { id: 2, assetTag: 'BNK-NY-088', name: 'Epson TM-T88VI Thermal Printer', branch: 'Metro Central Branch', riskScore: 74, probFailure: '74% (Medium)', recommendedAction: 'Clean optical sensor array and update driver firmware to v2.4.', estSavings: '$850 (Prevents Teller Delay)' },
    { id: 3, assetTag: 'BNK-CHI-012', name: 'NCR SelfServ 84 Walk-Up ATM', branch: 'Financial District Plaza', riskScore: 42, probFailure: '42% (Low Risk)', recommendedAction: 'Routine quarterly PM maintenance scheduled.', estSavings: 'Standard Maintenance' }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-xl bg-[#060608]/95 backdrop-blur-2xl border-l border-white/15 p-6 shadow-2xl space-y-6 overflow-y-auto h-full text-white drawer-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-glow">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">AI Predictive Maintenance &amp; Outage Forecasting</h3>
              <p className="text-xs text-white/50">Machine learning probability model for pre-emptive hardware dispatch</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Button */}
        <div className="p-4 rounded-3xl bg-black/50 border border-white/10 flex items-center justify-between shadow-inner">
          <div>
            <h4 className="text-xs font-bold text-[#00f5ff]">Run Telemetry Outage Risk Scan</h4>
            <p className="text-[11px] text-white/60 mt-0.5">Scans 50+ assets across 15 branches for MTBF failure probability</p>
          </div>
          <button
            onClick={handleRunAiAnalysis}
            disabled={isAnalyzing}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs flex items-center space-x-2 transition-all shadow-glow cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Scanning...' : 'Run Scan'}</span>
          </button>
        </div>

        {/* Forecasted Cards */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-white/70 uppercase tracking-wider">Forecasted Hardware Failure Risks</h4>

          {predictions.map(item => (
            <div key={item.id} className="p-4 rounded-3xl bg-black/50 border border-white/10 space-y-3 shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#00f5ff]">{item.assetTag}</span>
                  <h5 className="text-xs font-extrabold text-white">{item.name}</h5>
                  <span className="text-[11px] text-white/50 font-medium">{item.branch}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-black text-xs ${
                  item.riskScore > 75 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                    : item.riskScore > 50 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  Failure Prob: {item.probFailure}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 text-xs space-y-1">
                <span className="text-[#00f5ff] font-bold text-[11px] uppercase block">AI Recommended Intervention:</span>
                <p className="text-white/80 font-medium">{item.recommendedAction}</p>
                <div className="text-[10px] text-emerald-400 font-bold pt-1">Est. Savings: {item.estSavings}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
