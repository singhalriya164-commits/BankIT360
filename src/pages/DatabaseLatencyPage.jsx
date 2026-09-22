import React, { useState } from 'react';
import { Database, Activity, RefreshCw, CheckCircle2, Zap, Clock, ShieldCheck } from 'lucide-react';

export default function DatabaseLatencyPage() {
  const [queries, setQueries] = useState([
    { id: 'SQL-1', query: 'SELECT account_balance, status FROM core_customer_accounts WHERE branch_id = $1', executionTime: '4ms', status: 'Optimal', callCount: '14,200 / min' },
    { id: 'SQL-2', query: 'SELECT * FROM swift_wire_transfers WHERE status = PENDING ORDER BY created_at DESC', executionTime: '340ms', status: 'Slow Query Warning', callCount: '850 / min' },
    { id: 'SQL-3', query: 'INSERT INTO atm_transaction_journal (atm_id, amount, card_hash) VALUES ($1, $2, $3)', executionTime: '12ms', status: 'Optimal', callCount: '3,400 / min' },
    { id: 'SQL-4', query: 'UPDATE teller_session_audit SET last_ping = NOW() WHERE session_id = $1', executionTime: '8ms', status: 'Optimal', callCount: '8,900 / min' },
  ]);

  const [optimizingId, setOptimizingId] = useState(null);

  const handleOptimizeIndex = (id) => {
    setOptimizingId(id);
    setTimeout(() => {
      setQueries(prev => prev.map(q => q.id === id ? { ...q, executionTime: '9ms', status: 'Optimal (Indexed)' } : q));
      setOptimizingId(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Database className="w-6 h-6 text-[#00f5ff]" />
            <span>Core Banking SQL Query &amp; Database Latency Monitor</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Real-time query execution benchmarks, slow query identification, and 1-click B-tree index optimization
          </p>
        </div>
      </div>

      {/* Query Benchmark Table */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 text-white shadow-xl">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Monitored SQL Queries</h3>

        <div className="space-y-3">
          {queries.map(q => {
            const isSlow = q.status.includes('Slow');

            return (
              <div key={q.id} className="p-5 rounded-3xl bg-black/50 border border-white/10 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#00f5ff]">{q.id}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-white/50 font-mono">Volume: {q.callCount}</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[11px] border ${
                      isSlow ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}>
                      {q.status}
                    </span>
                  </div>
                </div>

                <pre className="p-3.5 rounded-2xl bg-black/80 border border-white/10 text-[#00f5ff] font-mono text-[11px] overflow-x-auto shadow-inner">
                  {q.query}
                </pre>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-white/60 font-mono">Execution Time: <strong className={isSlow ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>{q.executionTime}</strong></span>
                  <button
                    onClick={() => handleOptimizeIndex(q.id)}
                    disabled={optimizingId === q.id || !isSlow}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] text-white font-extrabold text-xs disabled:opacity-40 transition-all shadow-glow cursor-pointer disabled:cursor-not-allowed"
                  >
                    {optimizingId === q.id ? 'Applying B-Tree Index...' : isSlow ? '⚡ 1-Click Optimize Index' : 'Index Optimized'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
