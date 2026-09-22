import React from 'react';
import { AlertOctagon, RefreshCw, Trash2, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BankIT360 Error Boundary caught exception:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetState = () => {
    if (window.confirm('Reset local application state cache to factory defaults?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#060608] text-white flex items-center justify-center p-6 font-sans">
          <div className="w-full max-w-xl p-8 rounded-3xl glass-card border border-rose-500/30 text-center space-y-5 relative overflow-hidden shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mx-auto animate-float-slow">
              <AlertOctagon className="w-8 h-8 text-rose-400" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300">
                System Runtime Exception Intercepted
              </span>
              <h2 className="text-xl font-black text-white">BankIT360 Safe Mode Active</h2>
              <p className="text-xs text-white/60 leading-relaxed font-medium">
                An unexpected component rendering error was trapped by the application resilience layer. You can reload the page or reset the local cache.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 text-left font-mono text-[11px] text-rose-300 overflow-x-auto max-h-32 custom-scrollbar">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] text-white font-extrabold text-xs shadow-glow transition-all cursor-pointer flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Application</span>
              </button>
              <button
                onClick={this.handleResetState}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/70 hover:text-white font-bold text-xs transition-all cursor-pointer flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>Clear Storage &amp; Reset</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
