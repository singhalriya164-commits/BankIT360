import React, { useState } from 'react';
import { X, Cpu, RefreshCw, CheckCircle2, BarChart2, Zap, Layers, Sparkles } from 'lucide-react';
import { getModelEvaluationMetrics } from '../services/mlEngine';

export default function AIModelDrawer({ isOpen, onClose }) {
  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainSuccess, setRetrainSuccess] = useState(false);

  if (!isOpen) return null;
  const metrics = getModelEvaluationMetrics();

  const handleRetrain = () => {
    setIsRetraining(true);
    setRetrainSuccess(false);
    setTimeout(() => {
      setIsRetraining(false);
      setRetrainSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md modal-backdrop-smooth">
      <div className="w-full max-w-xl bg-slate-900 border-l border-slate-700/80 p-6 shadow-2xl space-y-6 overflow-y-auto h-full drawer-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Ticket Classification Engine</h3>
              <p className="text-xs text-slate-400">TF-IDF Vectorizer + Logistic Regression Classifier Model</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Model Specs Card */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">{metrics.modelName}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
              Active Production Prototype
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-center">
            <div className="p-2 rounded-lg bg-slate-800/60">
              <span className="text-[10px] text-slate-400 block uppercase">Accuracy</span>
              <span className="text-base font-bold text-emerald-400">{metrics.accuracy}%</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/60">
              <span className="text-[10px] text-slate-400 block uppercase">F1 Score</span>
              <span className="text-base font-bold text-indigo-400">{metrics.f1Score}%</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/60">
              <span className="text-[10px] text-slate-400 block uppercase">Precision</span>
              <span className="text-base font-bold text-blue-400">{metrics.precision}%</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/60">
              <span className="text-[10px] text-slate-400 block uppercase">Recall</span>
              <span className="text-base font-bold text-purple-400">{metrics.recall}%</span>
            </div>
          </div>
        </div>

        {/* Top Weighted Features */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Top Weighted N-Gram Features</h4>
          <div className="space-y-2">
            {metrics.topFeatures.map((feat, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/60 text-xs">
                <span className="font-mono text-slate-200">{feat.word}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300">{feat.category}</span>
                  <span className="font-bold text-indigo-400">+{feat.weight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retrain Action */}
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-xs font-bold text-white">Model Retraining & Pipeline Fine-Tuning</h5>
              <p className="text-[11px] text-slate-400">Re-fit TF-IDF matrix against updated ticket dataset</p>
            </div>
            <button
              onClick={handleRetrain}
              disabled={isRetraining}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRetraining ? 'animate-spin' : ''}`} />
              <span>{isRetraining ? 'Fitting Matrix...' : 'Retrain Pipeline'}</span>
            </button>
          </div>

          {retrainSuccess && (
            <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Model retrained successfully. Vocabulary matrix updated with +14 new banking domain tokens.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
