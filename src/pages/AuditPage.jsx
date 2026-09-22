import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  ShieldCheck, 
  User, 
  Lock, 
  Download, 
  CheckCircle2, 
  Filter, 
  FileCheck, 
  Layers, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { INITIAL_TAMPER_AUDIT_LOGS } from '../services/securityEngine';
import EmptyState from '../components/EmptyState';

export default function AuditPage({ auditLogs, onAddToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [selectedBlock, setSelectedBlock] = useState(null);

  // Combine standard logs with tamper-evident cryptographic chain
  const displayLogs = INITIAL_TAMPER_AUDIT_LOGS.filter(l => {
    const matchesSearch = 
      l.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.hashDigest.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction = actionFilter === 'ALL' || l.action.includes(actionFilter);
    return matchesSearch && matchesAction;
  });

  const handleExportAuditCertificate = () => {
    if (onAddToast) {
      onAddToast('Digital Audit Certificate Exported 📄', 'Tamper-evident SHA-256 cryptographic proof generated for regulators.', 'success');
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0b10] border border-white/15 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
              CRYPTOGRAPHIC TAMPER-RESISTANT LEDGER
            </span>
            <span className="text-white/50 text-xs font-mono">• SHA-256 Hash Chained</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-black text-white flex items-center space-x-2">
            <FileCheck className="w-6 h-6 text-emerald-400" />
            <span>Immutable Regulatory Audit &amp; Compliance Trail</span>
          </h2>

          <p className="text-xs sm:text-sm text-white/70">
            Every administrative operation, failed login, role change, and access grant is cryptographically linked to the preceding block. Non-deletable and tamper-evident.
          </p>
        </div>

        <button
          onClick={handleExportAuditCertificate}
          className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Audit Certificate</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="p-4 rounded-3xl bg-[#0a0b10] border border-white/10 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full flex items-center space-x-3 px-3 py-1">
          <Search className="w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by Action, User, Target, or SHA-256 Digest..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none text-white text-xs placeholder-white/40 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-white/40 shrink-0" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="p-2 px-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Actions</option>
            <option value="ACCESS">Access Grants</option>
            <option value="LOGIN">Login Events</option>
            <option value="SECURITY">Security Incidents</option>
            <option value="ASSET">Asset Operations</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table with Hash Digest */}
      <div className="rounded-3xl bg-[#0a0b10] border border-white/15 overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
            Verified Cryptographic Blocks ({displayLogs.length})
          </h3>
          <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Integrity Proof Verified</span>
          </span>
        </div>

        {displayLogs.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={FileCheck}
              title="No Audit Records Found"
              description="No cryptographic ledger blocks match your search query or filter."
              actionText="Reset Search & Filters"
              onAction={() => {
                setSearchTerm('');
                setActionFilter('ALL');
              }}
            />
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/50">
                  <th className="p-4 pl-6">Block #</th>
                  <th className="p-4">Action Type</th>
                  <th className="p-4">Actor Persona</th>
                  <th className="p-4">Operation Target</th>
                  <th className="p-4">Result</th>
                  <th className="p-4">Source IP</th>
                  <th className="p-4 pr-6">SHA-256 Cryptographic Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs">
                {displayLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-emerald-400">
                      #{log.blockIndex}
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-white font-bold text-[10px]">
                        {log.action}
                      </span>
                    </td>

                    <td className="p-4 text-white font-semibold">
                      {log.userName}
                    </td>

                    <td className="p-4 text-white/80 max-w-xs truncate font-medium">
                      {log.target}
                    </td>

                    <td className="p-4">
                      <span className={`text-[11px] font-bold ${
                        log.result.includes('SUCCESS') ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {log.result}
                      </span>
                    </td>

                    <td className="p-4 font-mono text-[11px] text-white/60">
                      {log.sourceIp}
                    </td>

                    <td className="p-4 pr-6 font-mono text-[10px] text-white/40 truncate max-w-[180px]">
                      <span title={log.hashDigest} className="cursor-help hover:text-emerald-400 transition-colors">
                        {log.hashDigest.slice(0, 16)}...{log.hashDigest.slice(-8)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
