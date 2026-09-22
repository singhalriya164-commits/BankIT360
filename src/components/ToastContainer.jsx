import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    error: <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-400 shrink-0" />,
  };

  const borderColors = {
    success: 'border-emerald-500/40 bg-emerald-950/80 text-emerald-200',
    error: 'border-rose-500/40 bg-rose-950/80 text-rose-200',
    warning: 'border-amber-500/40 bg-amber-950/80 text-amber-200',
    info: 'border-blue-500/40 bg-slate-900/90 text-blue-200',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex items-center justify-between space-x-3 text-xs drawer-slide-in-right transition-all duration-300 hover:scale-[1.02] ${borderColors[toast.type || 'info']}`}
        >
          <div className="flex items-center space-x-3">
            {icons[toast.type || 'info']}
            <div>
              <div className="font-extrabold text-white text-xs">{toast.title}</div>
              {toast.message && <div className="text-[11px] text-slate-300 mt-0.5 font-medium">{toast.message}</div>}
            </div>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1.5 rounded-xl hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
