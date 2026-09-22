import React from 'react';
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  FileText, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  DollarSign,
  TrendingDown,
  Activity,
  Layers
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, Legend } from 'recharts';

export default function AnalyticsPage({ tickets, branches, incidents, onOpenExecutiveReport }) {
  // Technician workload metrics
  const technicianMetrics = [
    { name: 'James Wilson', resolved: 28, inProgress: 4, avgHours: 3.2 },
    { name: 'Michael Chang', resolved: 24, inProgress: 5, avgHours: 4.1 },
    { name: 'Elena Rostova', resolved: 18, inProgress: 2, avgHours: 2.8 },
  ];

  // Radar chart data for branch capabilities
  const radarData = [
    { category: 'Hardware', branchA: 85, branchB: 60 },
    { category: 'Network', branchA: 92, branchB: 55 },
    { category: 'Access Control', branchA: 98, branchB: 90 },
    { category: 'ATM Systems', branchA: 78, branchB: 62 },
    { category: 'Core Banking', branchA: 90, branchB: 70 },
  ];

  // Before vs After comparison data
  const beforeAfterData = [
    { metric: 'SLA Compliance (%)', before: 76, after: 94, delta: '+18%' },
    { metric: 'Recurring Issues', before: 21, after: 9, delta: '-57%' },
    { metric: 'Avg Resolution (Hrs)', before: 8.2, after: 4.7, delta: '-43%' },
    { metric: 'Critical Outages / Mo', before: 14, after: 3, delta: '-78%' },
    { metric: 'First-Contact Fix (%)', before: 42, after: 78, delta: '+85%' },
  ];

  const handleExportCSV = () => {
    const headers = ['Ticket ID', 'Title', 'Category', 'Priority', 'Status', 'Branch ID', 'Requester', 'Created At'];
    const csvRows = [
      headers.join(','),
      ...tickets.map(t => [
        t.id,
        `"${t.title.replace(/"/g, '""')}"`,
        t.category,
        t.priority,
        t.status,
        t.branchId,
        t.requesterName,
        t.createdAt
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `BankIT360_Operational_Report_${new Date().toISOString().split('T')[0]}.csv`);
    a.click();
  };

  return (
    <div className="space-y-6 pb-12 text-left font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <span>Operational Analytics & Management Reports</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Aggregated IT operational metrics, technician resolution throughput, and ROI transformation benchmarks
          </p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          {onOpenExecutiveReport && (
            <button
              onClick={onOpenExecutiveReport}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs flex items-center space-x-2 transition-all shadow-glow shrink-0 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-purple-200" />
              <span>Generate Executive Report</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs flex items-center space-x-2 transition-all shadow-lg shadow-blue-500/25 shrink-0 border border-blue-400/30 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 📈 “Before vs After” BankIT360 Transformational Analytics */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-cyan-500/30 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-black text-white">📈 “Before vs After” BankIT360 Transformation</span>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Simulated Project Evaluation Data
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Empirical ROI and efficiency gains across 15 branches before vs after deploying BankIT360
            </p>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/15 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              Est. Annual SLA Penalty Saved: $184,000+
            </span>
          </div>
        </div>

        {/* 3 Top Executive Transformation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {/* Card 1: SLA Compliance */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">SLA Compliance Rate</span>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                +18% GAIN
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[10px] text-white/40 uppercase font-bold block">Before BankIT360</span>
                <span className="text-2xl font-black font-mono text-white/40">76%</span>
              </div>
              <span className="text-[#00f5ff] font-black text-lg">➔</span>
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">After Optimization</span>
                <span className="text-3xl font-black font-mono text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">94%</span>
              </div>
            </div>
            <div className="text-[11px] text-white/50 pt-2 border-t border-white/10">
              Automated AI triage eliminates 40+ minutes of manual helpdesk routing delays.
            </div>
          </div>

          {/* Card 2: Recurring Hotspots */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Recurring IT Incidents</span>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                -57% DROP
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[10px] text-white/40 uppercase font-bold block">Before BankIT360</span>
                <span className="text-2xl font-black font-mono text-rose-400/60">21 Hotspots</span>
              </div>
              <span className="text-[#00f5ff] font-black text-lg">➔</span>
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">After Optimization</span>
                <span className="text-3xl font-black font-mono text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">9 Hotspots</span>
              </div>
            </div>
            <div className="text-[11px] text-white/50 pt-2 border-t border-white/10">
              Pattern Recognition Engine identifies faulty routers before catastrophic switch crash.
            </div>
          </div>

          {/* Card 3: Resolution Time */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Avg Resolution Time (MTTR)</span>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                -43% FASTER
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[10px] text-white/40 uppercase font-bold block">Before BankIT360</span>
                <span className="text-2xl font-black font-mono text-white/40">8.2 hrs</span>
              </div>
              <span className="text-[#00f5ff] font-black text-lg">➔</span>
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">After Optimization</span>
                <span className="text-3xl font-black font-mono text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">4.7 hrs</span>
              </div>
            </div>
            <div className="text-[11px] text-white/50 pt-2 border-t border-white/10">
              Similar Incidents Engine surfaces verified past resolutions instantly to field engineers.
            </div>
          </div>
        </div>

        {/* Before vs After Visual Bar Chart Comparison */}
        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Operational KPI Benchmark (Before vs After)</h4>
            <span className="text-[10px] font-mono text-[#00f5ff]">Standardized Normalized Scale</span>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={beforeAfterData}>
                <XAxis dataKey="metric" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0b10', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '16px', fontSize: '12px', color: '#ffffff' }} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="before" fill="#64748b" radius={[4, 4, 0, 0]} name="Before BankIT360" />
                <Bar dataKey="after" fill="#00f5ff" radius={[4, 4, 0, 0]} name="After BankIT360 Optimization" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technician Workload & Resolution Bar Chart */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 shadow-xl text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-white uppercase tracking-wider">Technician Workload &amp; Throughput</h3>
            <span className="text-[10px] text-[#00f5ff] font-mono">Current Sprint</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={technicianMetrics}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0b10', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '16px', fontSize: '12px', color: '#ffffff' }} />
                <Bar dataKey="resolved" fill="#00f5ff" radius={[6, 6, 0, 0]} name="Resolved Tickets" />
                <Bar dataKey="inProgress" fill="#ff2d78" radius={[6, 6, 0, 0]} name="In Progress" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Domain Readiness Radar Chart */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 shadow-xl text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-white uppercase tracking-wider">Branch Domain Performance Comparison</h3>
            <span className="text-[10px] text-[#00f5ff] font-mono">Downtown vs Metro Central</span>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="category" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                <Radar name="Downtown Main" dataKey="branchA" stroke="#00f5ff" fill="#00f5ff" fillOpacity={0.4} />
                <Radar name="Metro Central" dataKey="branchB" stroke="#ff2d78" fill="#ff2d78" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0b10', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '16px', fontSize: '12px', color: '#ffffff' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

