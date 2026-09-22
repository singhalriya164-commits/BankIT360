import React, { useState } from 'react';
import { Wrench, CheckCircle2, AlertTriangle, RefreshCw, X, Play, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function InteractiveTroubleshooterModal({ isOpen, onClose, onAddToast }) {
  const [selectedIssue, setSelectedIssue] = useState('printer');
  const [currentStep, setCurrentStep] = useState(1);
  const [isFixing, setIsFixing] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  if (!isOpen) return null;

  const issues = [
    { id: 'printer', name: 'Passbook / Thermal Printer Not Printing', category: 'Hardware', steps: ['Verify USB cable connectivity on WS-102', 'Inspect paper feed tray for thermal dust buildup', 'Run spooler restart command'] },
    { id: 'terminal', name: 'Teller Terminal Screen Frozen', category: 'Software', steps: ['Perform Ctrl+Alt+Del soft reset', 'Check active directory user session lock', 'Execute core banking client cache purge'] },
    { id: 'atm', name: 'ATM Touchscreen Unresponsive', category: 'ATM Hardware', steps: ['Inspect touch controller calibration', 'Check SNMP network gateway ping', 'Power cycle ATM peripheral bus'] },
  ];

  const activeIssueObj = issues.find(i => i.id === selectedIssue);

  const handleRunAutoFix = () => {
    setIsFixing(true);
    setTimeout(() => {
      setIsFixing(false);
      setIsResolved(true);
      if (onAddToast) onAddToast('Auto Fix Executed', `Resolved ${activeIssueObj.name} via automated script.`, 'success');
    }, 2000);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsResolved(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-xl bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-6 text-white modal-pop-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]/30 shadow-glow">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">1-Click IT Self-Service Troubleshooter</h3>
              <p className="text-xs text-white/50">Interactive visual guide &amp; 1-click automated fix simulator for branch staff</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Select Issue */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-white/70 uppercase tracking-wider block">1. Select Branch IT Issue:</label>
          <div className="grid grid-cols-1 gap-2">
            {issues.map(iss => (
              <button
                key={iss.id}
                onClick={() => { setSelectedIssue(iss.id); handleReset(); }}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  selectedIssue === iss.id 
                    ? 'bg-[#ff2d78]/20 border-[#ff2d78] text-white shadow-glow' 
                    : 'bg-black/50 border-white/10 text-white/80 hover:bg-white/5'
                }`}
              >
                <span>{iss.name}</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 font-semibold text-white/70">{iss.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Diagnostic Steps & 1-Click Fix */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-white uppercase tracking-wider">Automated Diagnostic Routine:</span>
            {isResolved && <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-extrabold text-[11px]">Issue Resolved!</span>}
          </div>

          <div className="space-y-2">
            {activeIssueObj.steps.map((step, idx) => (
              <div key={idx} className="flex items-center space-x-2.5 text-white/80 font-medium">
                <span className="w-5 h-5 rounded-full bg-white/10 text-[#00f5ff] flex items-center justify-center font-mono font-bold text-[10px] border border-white/15">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          {/* Fix Action Simulator Button */}
          <div className="pt-2">
            <button
              onClick={handleRunAutoFix}
              disabled={isFixing || isResolved}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-glow transition-all disabled:opacity-50 cursor-pointer"
            >
              {isFixing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Executing Automated Diagnostic Fix...</span>
                </>
              ) : isResolved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Fix Successfully Applied to Branch Device!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>Execute 1-Click Automated Script Fix</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs shadow-xs cursor-pointer transition-colors"
          >
            Close Troubleshooter
          </button>
        </div>
      </div>
    </div>
  );
}
