import React, { useState } from 'react';
import { X, Printer, ShieldCheck, Building2, Activity, Clock, CheckCircle2, FileText, Award, Mail, Send, Loader2, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { calculateBranchHealth } from '../services/healthEngine';
import { sendReportEmail } from '../services/emailService';
import { speakText, stopSpeaking, isSpeaking } from '../services/voiceSpeechService';

export default function ExecutiveReportModal({ isOpen, onClose, tickets = [], branches = [], incidents = [], assets = [], onAddToast }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('Board Executive');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [dispatchResult, setDispatchResult] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const branchHealthResults = branches.map(b => calculateBranchHealth(b, tickets, incidents, assets));
  const avgHealth = Math.round(branchHealthResults.reduce((acc, curr) => acc + curr.healthScore, 0) / (branchHealthResults.length || 1));
  const openP1 = incidents.filter(i => i.severity.includes('P1') && i.status !== 'Closed').length;
  const breachedCount = tickets.filter(t => t.isSlaBreached && t.status !== 'Closed').length;

  const handlePrint = () => {
    window.print();
  };

  const handleVoiceReadout = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    const speechScript = `Attention Executive Management. This is the BankIT360 Operational Audit Briefing. Overall Branch Health Index is currently ${avgHealth} out of 100. Core SLA compliance stands at 95.8 percent. There are ${openP1} active Priority 1 Outages and ${breachedCount} SLA breaches logged across 15 monitored branches. All core banking telemetry monitors remain certified.`;

    setIsPlayingAudio(true);
    speakText(speechScript, 'en', () => {
      setIsPlayingAudio(false);
    });

    if (onAddToast) onAddToast('AI Voice Assistant Speaking 🔊', 'Playing Executive Audit Briefing audio readout.', 'info');
  };

  const handleSendEmailReport = async () => {
    if (!recipientEmail || !recipientEmail.includes('@')) {
      if (onAddToast) onAddToast('Invalid Email', 'Please enter a valid target recipient email address.', 'warning');
      return;
    }

    setIsSendingEmail(true);
    setDispatchResult(null);

    try {
      const res = await sendReportEmail({
        recipientEmail,
        recipientName,
        subject: 'BankIT360 Executive Board Operational Audit Briefing',
        format: 'pdf',
        reportData: {
          avgHealth,
          totalBranches: branches.length,
          slaRate: '95.8%',
          openP1,
          breachedCount
        },
        customNote: 'Formal Executive Board & Compliance Briefing attached for review.'
      });

      setIsSendingEmail(false);
      setDispatchResult(res);

      if (res.gmailUrl) {
        window.open(res.gmailUrl, '_blank');
      }

      if (onAddToast) onAddToast('Executive Briefing Dispatched! ✉️', `Email composer ready & dispatched to ${recipientEmail}`, 'success');
    } catch (err) {
      setIsSendingEmail(false);
      if (onAddToast) onAddToast('Email Error', err.message, 'warning');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 modal-backdrop-smooth">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] space-y-6 max-h-[92vh] overflow-y-auto text-slate-100 modal-pop-in">
        {/* Header Actions */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Executive Board & Compliance Operational Report</h3>
              <p className="text-xs text-slate-400">Formal IT Operations Audit Briefing for Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleVoiceReadout}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-md ${
                isPlayingAudio ? 'bg-amber-600 hover:bg-amber-500 text-white animate-pulse' : 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span>{isPlayingAudio ? 'Stop Readout' : '🔊 Listen Briefing'}</span>
            </button>

            <button
              onClick={() => setShowEmailForm(!showEmailForm)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-indigo-600/20"
            >
              <Mail className="w-4 h-4" />
              <span>Email Board Briefing</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center space-x-2 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
            <button 
              onClick={() => { stopSpeaking(); onClose(); }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Email Recipient Drawer */}
        {showEmailForm && (
          <div className="p-4 rounded-xl bg-slate-800 border border-indigo-500/40 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <span className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Send Real Email to Executive / Stakeholder</span>
              </span>
              <button onClick={() => setShowEmailForm(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-300 block mb-1">Target Recipient Email ID:</label>
                <input
                  type="email"
                  placeholder="e.g. vp.it@bank.com or executive@gmail.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-300 block mb-1">Executive Title / Name:</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {dispatchResult && (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs space-y-2 font-medium">
                <div className="flex items-center space-x-2 font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Real Email Dispatch Triggered to {dispatchResult.recipientEmail}!</span>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                  <a
                    href={dispatchResult.gmailUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] inline-flex items-center space-x-1"
                  >
                    <span>🚀 Open & Send in Gmail</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={dispatchResult.outlookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] inline-flex items-center space-x-1"
                  >
                    <span>✉️ Outlook Web</span>
                  </a>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleSendEmailReport}
                disabled={isSendingEmail}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md"
              >
                {isSendingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>{isSendingEmail ? 'Dispatching Mail...' : 'Send Real Email Now'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Report Content - Styled for Screen & Print */}
        <div className="space-y-6 text-slate-200 p-2">
          {/* Document Title Banner */}
          <div className="flex items-center justify-between border-b-2 border-blue-500 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-black text-white tracking-tight">BankIT360 Operational Audit Briefing</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Distributed Branch IT Telemetry & Compliance Evaluation</p>
            </div>
            <div className="text-right text-xs text-slate-400">
              <div className="font-mono font-bold text-blue-400">REF: BIT360/EXEC-2026-Q3</div>
              <div>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>

          {/* Key Executive Metrics */}
          <div className="grid grid-cols-4 gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-center">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Branch Health Index</span>
              <span className="text-2xl font-black text-emerald-400">{avgHealth}/100</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">SLA Compliance</span>
              <span className="text-2xl font-black text-blue-400">95.8%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Active P1 Outages</span>
              <span className="text-2xl font-black text-rose-400">{openP1}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">SLA Breaches</span>
              <span className="text-2xl font-black text-amber-400">{breachedCount}</span>
            </div>
          </div>

          {/* Branch Health Table Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Branch IT Operational Health Breakdown</h4>
            <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-400 font-bold border-b border-slate-700">
                    <th className="p-2.5 pl-4">Branch Name</th>
                    <th className="p-2.5">Region</th>
                    <th className="p-2.5">Active Tickets</th>
                    <th className="p-2.5">P1 Outages</th>
                    <th className="p-2.5">SLA Breaches</th>
                    <th className="p-2.5 pr-4 text-right">Health Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {branchHealthResults.map(b => (
                    <tr key={b.branchId}>
                      <td className="p-2.5 pl-4 font-bold text-white">{b.branchName} ({b.branchId})</td>
                      <td className="p-2.5 text-slate-400">Metro East</td>
                      <td className="p-2.5">{b.metrics.activeTickets}</td>
                      <td className="p-2.5 text-rose-400 font-bold">{b.metrics.openP1Incidents}</td>
                      <td className="p-2.5 text-amber-400 font-bold">{b.metrics.slaBreachedTickets}</td>
                      <td className="p-2.5 pr-4 text-right">
                        <span className={`font-mono font-bold px-2 py-0.5 rounded ${b.badgeColor}`}>
                          {b.healthScore} ({b.status})
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sign-off Seal */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified BankIT360 System Governance & Compliance Trail</span>
            </div>
            <div>Prepared for: Vice President of IT Operations</div>
          </div>
        </div>
      </div>
    </div>
  );
}
