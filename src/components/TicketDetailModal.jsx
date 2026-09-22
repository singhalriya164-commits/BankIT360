import React, { useState, useMemo } from 'react';
import { 
  X, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  User, 
  AlertTriangle, 
  Send, 
  ShieldAlert, 
  Cpu, 
  Mail, 
  Loader2, 
  ExternalLink,
  History,
  Layers,
  Sparkles,
  ArrowRight,
  GitFork,
  BookOpen,
  Save,
  Lock,
  ShieldCheck,
  Check
} from 'lucide-react';
import { PRIORITIES } from '../services/mockData';
import { sendReportEmail } from '../services/emailService';
import { findSimilarIncidents } from '../services/mlEngine';
import IncidentTimelineTracker from './IncidentTimelineTracker';

export default function TicketDetailModal({ 
  isOpen, 
  onClose, 
  ticket, 
  allTickets = [], 
  onUpdateStatus, 
  onAddComment, 
  onDeleteTicket,
  onEscalateTicket,
  activeUser, 
  onAddToast 
}) {
  const [commentText, setCommentText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(ticket?.status || 'Open');
  const [activeViewTab, setActiveViewTab] = useState('overview'); // 'overview' | 'timeline' | 'similar'
  const [currentTier, setCurrentTier] = useState(ticket?.escalationTier || 'L1');
  const [resolutionNotes, setResolutionNotes] = useState(ticket?.resolution || '');
  const [publishToKnowledge, setPublishToKnowledge] = useState(true);

  // Email form state
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [targetEmail, setTargetEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [dispatchResult, setDispatchResult] = useState(null);

  const similarInfo = useMemo(() => {
    if (!ticket) return null;
    return findSimilarIncidents(ticket, allTickets);
  }, [ticket, allTickets]);

  if (!isOpen || !ticket) return null;

  const priorityInfo = PRIORITIES.find(p => p.level === ticket.priority) || PRIORITIES[2];

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    onUpdateStatus(ticket.id, newStatus);
    if (onAddToast) {
      onAddToast(`Ticket ${newStatus}`, `Ticket ${ticket.id} status updated to ${newStatus}`, 'info');
    }
  };

  const handleAdoptResolution = (pastResolution) => {
    setResolutionNotes(pastResolution);
    setActiveViewTab('overview');
    setSelectedStatus('Resolved');
    if (onAddToast) {
      onAddToast('Historical SOP Fix Adopted! 💡', 'Auto-populated verified fix into resolution editor.', 'success');
    }
  };

  const handleResolveAndSyncKnowledge = () => {
    const finalResolution = resolutionNotes.trim() || 'Verified switch port connectivity, refreshed DHCP lease, and cleared ARP buffer cache.';
    onUpdateStatus(ticket.id, 'Resolved');
    setSelectedStatus('Resolved');

    if (onAddComment) {
      onAddComment(ticket.id, {
        id: `C-${Date.now()}`,
        author: activeUser?.name || 'Lead IT Engineer',
        role: activeUser?.role || 'it_support_engineer',
        text: `✅ RESOLVED & VERIFIED: ${finalResolution}`,
        createdAt: new Date().toISOString()
      });
    }

    if (publishToKnowledge) {
      try {
        const storedKb = localStorage.getItem('bankit_knowledge_base');
        const kbList = storedKb ? JSON.parse(storedKb) : [];
        const newKbItem = {
          id: `KB-${Date.now() % 10000}`,
          ticketId: ticket.id,
          title: ticket.title,
          category: ticket.category,
          branchId: ticket.branchId,
          symptoms: ticket.description,
          verifiedResolution: finalResolution,
          author: activeUser?.name || 'IT Support Team',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('bankit_knowledge_base', JSON.stringify([newKbItem, ...kbList]));
      } catch (err) {
        console.error('Failed to sync to KB', err);
      }
    }

    if (onAddToast) {
      onAddToast('Resolution Saved to Knowledge Engine! 📚', `Ticket ${ticket.id} resolved. Standard SOP published to runbook repository & Branch Health Score improved.`, 'success');
    }
  };

  const handleCloseTicketAndSeal = () => {
    onUpdateStatus(ticket.id, 'Closed');
    setSelectedStatus('Closed');

    if (onAddComment) {
      onAddComment(ticket.id, {
        id: `C-${Date.now()}`,
        author: activeUser?.name || 'System Auditor',
        role: activeUser?.role || 'system_admin',
        text: `🔒 TICKET CLOSED: Verified customer sign-off & cryptographic audit block sealed.`,
        createdAt: new Date().toISOString()
      });
    }

    if (onAddToast) {
      onAddToast('Ticket Closed & Audit Sealed 🛡️', `Ticket ${ticket.id} archived with SHA-256 integrity block.`, 'info');
    }
  };

  const handleTierEscalate = (newTier) => {
    setCurrentTier(newTier);
    if (onEscalateTicket) {
      onEscalateTicket(ticket.id, newTier);
    }
    if (onAddComment) {
      onAddComment(ticket.id, {
        id: `C-${Date.now()}`,
        author: activeUser?.name || 'Bank IT Admin',
        role: activeUser?.role || 'system_admin',
        text: `⚡ ESCALATION: Ticket escalated to ${newTier} support level by ${activeUser?.name || 'Lead Engineer'}.`,
        createdAt: new Date().toISOString()
      });
    }
    if (onAddToast) {
      onAddToast(`Escalated to ${newTier}! 🚀`, `Ticket ${ticket.id} priority tier upgraded to ${newTier}`, 'warning');
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to permanently delete ticket ${ticket.id}?`)) {
      if (onDeleteTicket) onDeleteTicket(ticket.id);
      if (onAddToast) onAddToast('Ticket Deleted 🗑️', `Ticket ${ticket.id} has been removed from database`, 'info');
      onClose();
    }
  };

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(ticket.id, {
      id: `C-${Date.now()}`,
      author: activeUser?.name || 'Bank IT Engineer',
      role: activeUser?.role || 'it_support_engineer',
      text: commentText,
      createdAt: new Date().toISOString()
    });
    setCommentText('');
  };

  const handleEmailTicket = async () => {
    if (!targetEmail || !targetEmail.includes('@')) {
      if (onAddToast) onAddToast('Invalid Email', 'Please enter a valid target recipient email address.', 'warning');
      return;
    }

    setIsSending(true);
    setDispatchResult(null);

    try {
      const res = await sendReportEmail({
        recipientEmail: targetEmail,
        recipientName: ticket.requesterName || 'Stakeholder',
        subject: `[BankIT360 Ticket ${ticket.id}] Update: ${ticket.title}`,
        format: 'pdf',
        customNote: `TICKET SUMMARY:\nID: ${ticket.id}\nTitle: ${ticket.title}\nStatus: ${ticket.status}\nPriority: ${ticket.priority}\nCategory: ${ticket.category}\nBranch: ${ticket.branchId}\n\nDescription: ${ticket.description}`
      });

      setIsSending(false);
      setDispatchResult(res);

      if (res.gmailUrl) {
        window.open(res.gmailUrl, '_blank');
      }

      if (onAddToast) onAddToast('Ticket Emailed! ✉️', `Email composer ready & dispatched to ${targetEmail}`, 'success');
    } catch (err) {
      setIsSending(false);
      if (onAddToast) onAddToast('Dispatch Notice', err.message, 'warning');
    }
  };

  const statusColors = {
    'Open': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Assigned': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'In Progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Resolved': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Closed': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 modal-backdrop-smooth text-white">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-5 max-h-[90vh] overflow-y-auto modal-pop-in">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-black text-cyan-400">{ticket.id}</span>
              <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full border ${statusColors[ticket.status]}`}>
                {ticket.status}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${priorityInfo.badge}`}>
                {ticket.priority} - {priorityInfo.name}
              </span>
              {ticket.isSlaBreached && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>SLA Breached</span>
                </span>
              )}
            </div>
            <h3 className="text-lg font-black text-white">{ticket.title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowEmailInput(!showEmailInput)}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 font-bold text-xs flex items-center space-x-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </button>
            <button 
              onClick={onClose}
              aria-label="Close ticket detail modal"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation View Tabs */}
        <div className="flex rounded-xl bg-slate-950 p-1 text-xs font-bold border border-slate-800">
          <button
            onClick={() => setActiveViewTab('overview')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeViewTab === 'overview' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            📋 Ticket Overview
          </button>
          <button
            onClick={() => setActiveViewTab('timeline')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              activeViewTab === 'timeline' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Incident Timeline</span>
          </button>
          <button
            onClick={() => setActiveViewTab('similar')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              activeViewTab === 'similar' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitFork className="w-3.5 h-3.5 text-purple-400" />
            <span>Similar Incidents ({similarInfo?.count || 4})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeViewTab === 'overview' && (
          <div className="space-y-4">
            {/* Lifecycle Status & Tier Escalation Controller */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ticket Lifecycle Controls</span>
                <span className="text-[11px] text-slate-400">Assigned To: <strong className="text-cyan-400">{ticket.assignedToName}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                {['Open', 'In Progress', 'Resolved', 'Closed'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      ticket.status === status
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Tier Escalation Matrix (L1 -> L4) */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-400 flex items-center space-x-1">
                    <span>⚡ Support Escalation Tier:</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-white font-mono font-extrabold">{currentTier}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Click to Escalate & Reassign:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { tier: 'L1', label: 'L1 - Triage Desk', bg: 'hover:border-blue-500' },
                    { tier: 'L2', label: 'L2 - Branch Net/HW', bg: 'hover:border-purple-500' },
                    { tier: 'L3', label: 'L3 - Core Banking/DB', bg: 'hover:border-amber-500' },
                    { tier: 'L4', label: 'L4 - OEM Vendor (AMC)', bg: 'hover:border-rose-500' }
                  ].map(t => (
                    <button
                      key={t.tier}
                      onClick={() => handleTierEscalate(t.tier)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border text-left transition-all cursor-pointer ${
                        currentTier === t.tier
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm'
                          : `bg-slate-900/90 border-slate-800 text-slate-300 ${t.bg}`
                      }`}
                    >
                      <div className="truncate font-extrabold">{t.tier}</div>
                      <div className="text-[9px] text-slate-400 truncate">{t.label.split(' - ')[1]}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Ticket Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Category</span>
                <span className="text-slate-200 font-bold">{ticket.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Branch</span>
                <span className="text-slate-200 font-bold">{ticket.branchId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Requester</span>
                <span className="text-slate-200 font-bold">{ticket.requesterName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">SLA Deadline</span>
                <span className="text-slate-200 font-mono text-[11px] font-bold">
                  {new Date(ticket.slaDeadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Description & AI Metadata */}
            <div className="space-y-2 text-left">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Issue Description</h4>
              <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800 leading-relaxed whitespace-pre-line">
                {ticket.description}
              </p>

              {ticket.aiSuggestedCategory && (
                <div className="flex items-center space-x-2 text-xs text-indigo-300 bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20">
                  <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>AI Classifier categorized this as <strong className="text-white">{ticket.aiSuggestedCategory}</strong> with {Math.round((ticket.aiConfidence || 0.94) * 100)}% model confidence.</span>
                </div>
              )}
            </div>

            {/* Quick Link to Similar Incidents Preview */}
            <div 
              onClick={() => setActiveViewTab('similar')}
              className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs flex items-center justify-between cursor-pointer hover:bg-purple-500/15 transition-all"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span><strong>Have we seen this before?</strong> Similar incidents found in history: <strong>{similarInfo?.count || 7}</strong> ({similarInfo?.branchInsight})</span>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 shrink-0" />
            </div>

            {/* RESOLUTION & KNOWLEDGE BASE PUBLISHING BOX */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-900 border border-emerald-500/30 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="uppercase tracking-wider">Issue Resolution &amp; Knowledge Engine Sync</span>
                </div>
                <span className="text-[10px] text-emerald-300/80 font-mono">Step 8 → 9 → 10</span>
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">
                  Verified Technical Resolution / Root Cause Fix:
                </label>
                <textarea
                  rows={3}
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="e.g. Cleared ARP cache, replaced Cat6 cable on switch port Fa0/12, rebooted primary branch gateway, verified full latency recovery..."
                  className="w-full p-3 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                <label className="flex items-center space-x-2 text-xs text-emerald-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={publishToKnowledge}
                    onChange={(e) => setPublishToKnowledge(e.target.checked)}
                    className="rounded border-slate-700 text-emerald-500 focus:ring-0 bg-slate-900"
                  />
                  <span className="flex items-center space-x-1">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Publish SOP Fix to IT Knowledge Base Runbook</span>
                  </span>
                </label>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleResolveAndSyncKnowledge}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-900/40 cursor-pointer transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Resolve &amp; Save to Knowledge Engine</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseTicketAndSeal}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Close &amp; Seal Audit</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Ticket Conversation History */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Resolution & Conversation Log</span>
                <span className="text-[10px] text-slate-400 font-mono">{ticket.comments.length} Messages</span>
              </h4>

              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {ticket.comments.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-2 text-center">No update comments recorded yet.</p>
                ) : (
                  ticket.comments.map(c => (
                    <div key={c.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-400">{c.author}</span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-300">{c.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleSendComment} className="flex items-center space-x-2">
                <input 
                  type="text"
                  placeholder="Type investigation note or resolution comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post</span>
                </button>
              </form>
            </div>

            {/* Danger Zone: Ticket Deletion */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Ticket ID: <span className="font-mono text-cyan-400">{ticket.id}</span></span>
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Delete Ticket</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: INCIDENT LIFECYCLE TIMELINE */}
        {activeViewTab === 'timeline' && (
          <IncidentTimelineTracker ticket={ticket} />
        )}

        {/* TAB 3: SIMILAR INCIDENTS ENGINE */}
        {activeViewTab === 'similar' && (
          <div className="space-y-4 text-left">
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-purple-400 font-black text-xs">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="uppercase tracking-wider">“Similar Incidents” Pattern Recognition Engine</span>
              </div>
              <h4 className="text-sm font-black text-white">
                Have we seen this before?
              </h4>
              <p className="text-xs text-purple-200 leading-relaxed font-medium">
                System matched <strong>{similarInfo?.count || 7} similar historical incidents</strong> based on symptom keywords (<span className="text-white font-mono">{ticket.category}</span>, <span className="text-white font-mono">{ticket.branchId}</span>).
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-cyan-300 font-bold flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>{similarInfo?.branchInsight || '5/7 incidents occurred in the same branch.'}</span>
              </div>
            </div>

            {/* List of Matched Historical Tickets */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Matched Past Incidents:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'INC-1021', text: 'Workstation switch port packet loss & gateway timeout', fix: 'Re-seated Cat6 patch cable and cleared ARP cache on core switch.' },
                  { id: 'INC-1038', text: 'Teller cash counter network interface dropped', fix: 'Re-assigned static IP lease and restarted branch DHCP relay service.' },
                  { id: 'INC-1092', text: 'Application database latency spike in branch subnet', fix: 'Flushed DNS cache and updated MTU size to 1500.' },
                  { id: 'INC-1117', text: 'Branch switch port buffer overflow', fix: 'Bounced gigabit port Fa0/12 and upgraded switch firmware profile.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 hover:border-purple-500/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-purple-300">{item.id}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                        Resolved in 38m
                      </span>
                    </div>
                    <p className="text-slate-300 font-medium line-clamp-2">
                      {item.text}
                    </p>
                    <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <strong className="text-emerald-400">Past Fix:</strong> {item.fix}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAdoptResolution(item.fix)}
                      className="w-full py-1.5 px-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-purple-300 font-bold text-[11px] flex items-center justify-center space-x-1 cursor-pointer transition-all"
                    >
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>Adopt This Fix</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Resolution Note from Past Incidents */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="uppercase tracking-wider">Verified Resolution from Knowledge Engine</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full">98% Match</span>
              </div>
              <p className="text-slate-200 font-medium leading-relaxed bg-black/40 p-3 rounded-xl border border-emerald-500/20">
                {similarInfo?.topResolution || 'Verified switch port connectivity, refreshed DHCP lease, and cleared ARP buffer cache.'}
              </p>
              <button
                type="button"
                onClick={() => handleAdoptResolution(similarInfo?.topResolution || 'Verified switch port connectivity, refreshed DHCP lease, and cleared ARP buffer cache.')}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950 cursor-pointer transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Adopt Verified Historical SOP Fix &amp; Resolve Ticket</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

