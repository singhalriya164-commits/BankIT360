import React, { useState } from 'react';
import { AlertOctagon, Plus, ShieldAlert, CheckCircle2, User, Building2, Wrench, Clock, FileText, X, Sparkles } from 'lucide-react';
import EmptyState from '../components/EmptyState';

export default function IncidentsPage({ 
  incidents, 
  branches, 
  onCreateIncident, 
  onUpdateIncidentStatus,
  onDeleteIncident,
  onGenerateRca,
  onAddToast
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState('P1 - Critical');
  const [branchId, setBranchId] = useState('BR-102');
  const [leadEngineer, setLeadEngineer] = useState('James Wilson');
  const [rootCause, setRootCause] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inc.incidentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inc.branchName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || inc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const branch = branches.find(b => b.id === branchId);

    const newInc = {
      id: `INC-2026-0${Date.now() % 1000}`,
      incidentCode: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      severity,
      status: 'Investigating',
      branchId,
      branchName: branch ? branch.name : 'Metro Central Branch',
      reportedBy: 'IT Monitoring System',
      leadEngineer,
      affectedServices: ['Branch Network', 'Teller Operations'],
      rootCause: rootCause || 'Under investigation by L2 IT Incident Team.',
      createdAt: new Date().toISOString(),
      targetResolution: new Date(Date.now() + 4 * 3600 * 1000).toISOString()
    };

    onCreateIncident(newInc);
    if (onAddToast) onAddToast('Major Incident Logged! 🚨', `Incident ${newInc.incidentCode} broadcasted to all command desks.`, 'warning');
    setShowCreateModal(false);
    setTitle('');
    setRootCause('');
  };

  const handleStatusChange = (incId, newStatus) => {
    if (onUpdateIncidentStatus) {
      onUpdateIncidentStatus(incId, newStatus);
    }
    if (onAddToast) onAddToast(`Incident ${newStatus}`, `Incident ${incId} marked as ${newStatus}`, 'info');
  };

  const handleDelete = (incId, code) => {
    if (window.confirm(`Permanently archive & remove incident ${code}?`)) {
      if (onDeleteIncident) onDeleteIncident(incId);
      if (onAddToast) onAddToast('Incident Removed 🗑️', `Incident ${code} deleted from records.`, 'info');
    }
  };

  const handleIsolateBranch = (branchName) => {
    if (onAddToast) {
      onAddToast('Containment Protocol Engaged! 🛡️', `Branch ${branchName} isolated to Backup SD-WAN tunnel.`, 'warning');
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <AlertOctagon className="w-6 h-6 text-rose-400" />
            <span>Major Operational IT Incident Management</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Log major outages, lead engineer assignments, affected banking services, containment workflows, and Root Cause Analysis (RCA)
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-[#ff2d78] hover:opacity-95 text-white font-extrabold text-xs flex items-center space-x-2 transition-all shadow-glow shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log Major Incident</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-3xl glass-card border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Search major incidents by code, title, branch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3.5 py-2 rounded-2xl bg-black/60 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-rose-500"
        />
        <div className="flex items-center space-x-2 overflow-x-auto">
          {['ALL', 'Investigating', 'Mitigated', 'Resolved'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                statusFilter === st
                  ? 'bg-rose-600 text-white border-rose-400 shadow-sm'
                  : 'bg-black/60 text-white/60 border-white/10 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Active Incident Grid */}
      {filteredIncidents.length === 0 ? (
        <EmptyState
          icon={AlertOctagon}
          title="No Active IT Outages"
          description={searchTerm || statusFilter !== 'ALL'
            ? "No operational incidents match your search or status criteria."
            : "All core banking subsystems, branch networks, and ATM networks are operating normally without active incidents."}
          actionLabel="Log Major Incident"
          onAction={() => setShowCreateModal(true)}
          secondaryActionLabel="Reset Filter"
          onSecondaryAction={() => { setSearchTerm(''); setStatusFilter('ALL'); }}
          badge="100% Infrastructure Uptime"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredIncidents.map(inc => (
            <div key={inc.id} className="p-5 rounded-3xl glass-card glass-card-hover border border-rose-500/30 space-y-4 shadow-xl text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span className="font-mono text-xs font-bold text-rose-400">{inc.incidentCode}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-[10px] border border-rose-500/30">
                      {inc.severity}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                      inc.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                      inc.status === 'Mitigated' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' :
                      'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {inc.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1.5">{inc.title}</h3>
                </div>
                <button
                  onClick={() => handleDelete(inc.id, inc.incidentCode)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-white/40 hover:text-rose-400 border border-white/10 transition-colors cursor-pointer"
                  title="Delete incident"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-black/50 p-3 rounded-2xl border border-white/10">
                <div>
                  <span className="text-white/40 text-[10px] uppercase block font-bold">Branch</span>
                  <span className="text-white font-bold">{inc.branchName}</span>
                </div>
                <div>
                  <span className="text-white/40 text-[10px] uppercase block font-bold">Lead Engineer</span>
                  <span className="text-[#00f5ff] font-bold">{inc.leadEngineer}</span>
                </div>
              </div>

              {/* Lifecycle Controller & Containment */}
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider block">Incident Lifecycle State:</span>
                <div className="flex items-center space-x-1.5">
                  {['Investigating', 'Mitigated', 'Resolved'].map(st => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(inc.id, st)}
                      className={`flex-1 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                        inc.status === st
                          ? 'bg-rose-600 text-white border-rose-400 shadow-sm'
                          : 'bg-black/60 text-white/50 border-white/10 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 font-bold text-[11px] uppercase">Root Cause Analysis (RCA):</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleIsolateBranch(inc.branchName)}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      <ShieldAlert className="w-3 h-3" />
                      <span>Contain</span>
                    </button>
                    {onGenerateRca && (
                      <button
                        onClick={() => onGenerateRca(inc)}
                        className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-[#ff2d78]" />
                        <span>AI RCA Report</span>
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-white/80 bg-black/40 p-3 rounded-2xl border border-white/10 text-[11px] leading-relaxed">
                  {inc.rootCause}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0a0b10] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative text-white">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-white">Log Major IT Incident</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs text-white/80 font-bold mb-1">Incident Title *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Core Switch Redundancy Power Supply Outage"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/80 font-bold mb-1">Severity Level</label>
                  <select 
                    value={severity} 
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    <option value="P1 - Critical">P1 - Critical (Branch Down)</option>
                    <option value="P2 - High">P2 - High (Degraded Service)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/80 font-bold mb-1">Affected Branch</label>
                  <select 
                    value={branchId} 
                    onChange={(e) => setBranchId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/80 font-bold mb-1">Initial RCA / Diagnostic Details</label>
                <textarea
                  rows={3}
                  placeholder="Describe initial diagnostics..."
                  value={rootCause}
                  onChange={(e) => setRootCause(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-glow transition-all cursor-pointer"
                >
                  Log Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
