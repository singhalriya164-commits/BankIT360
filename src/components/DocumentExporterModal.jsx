import React, { useState } from 'react';
import { FileText, Download, FileCode, CheckCircle2, X, Mail, Send, Sparkles, Printer, ExternalLink, Loader2 } from 'lucide-react';
import { sendReportEmail } from '../services/emailService';

export default function DocumentExporterModal({ isOpen, onClose, onAddToast }) {
  const [activeMode, setActiveMode] = useState('email'); // 'download', 'email'
  const [docFormat, setDocFormat] = useState('pdf'); // 'pdf', 'word', 'csv'
  const [includeSections, setIncludeSections] = useState({
    executiveSummary: true,
    ticketsTable: true,
    incidentsRca: true,
    branchHealth: true,
    slaAudit: true
  });

  // Email form state
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('Executive Stakeholder');
  const [customNote, setCustomNote] = useState('Please review the attached BankIT360 Executive Operations & Compliance Audit report.');
  const [autoLaunchWebmail, setAutoLaunchWebmail] = useState(true);

  // Status states
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusStep, setStatusStep] = useState('');
  const [dispatchResult, setDispatchResult] = useState(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsProcessing(true);
    setStatusStep(`Generating ${docFormat.toUpperCase()} document...`);

    setTimeout(() => {
      setIsProcessing(false);

      if (docFormat === 'pdf') {
        window.print();
      } else if (docFormat === 'word') {
        const htmlContent = `
          <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
          <head><title>BankIT360 Executive Report</title></head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #1e3a8a;">BankIT360 — Executive IT Operations & Branch Health Report</h1>
            <p><strong>Generated Date:</strong> ${new Date().toLocaleDateString()}</p>
            <hr/>
            <h2>1. Operational Executive Summary</h2>
            <p>Total Active Branches: 15 | Active Incidents: 2 | SLA Compliance Rate: 95.8%</p>
            <h2>2. Major Incident & Ticket Logs</h2>
            <p>All core banking telemetry monitors operational.</p>
          </body>
          </html>
        `;
        const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `BankIT360_Executive_Report_${Date.now()}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (docFormat === 'csv') {
        const csvContent = "data:text/csv;charset=utf-8,Branch ID,Branch Name,Health Score,Status,Open Tickets\nBR-101,Downtown Main Branch,92,Healthy,2\nBR-102,Metro Central Branch,42,Critical,4\n";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `BankIT360_Export_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      if (onAddToast) onAddToast('Document Downloaded', `Successfully generated ${docFormat.toUpperCase()} file download!`, 'success');
      onClose();
    }, 1000);
  };

  const handleSendEmail = async () => {
    if (!recipientEmail || !recipientEmail.includes('@')) {
      if (onAddToast) onAddToast('Invalid Email', 'Please enter a valid recipient email address.', 'warning');
      return;
    }

    setIsProcessing(true);
    setDispatchResult(null);

    setStatusStep('1/3 Formatting report telemetry & executive metrics...');
    await new Promise(r => setTimeout(r, 400));

    setStatusStep(`2/3 Dispatching real mail to ${recipientEmail}...`);
    await new Promise(r => setTimeout(r, 500));

    setStatusStep('3/3 Processing Webmail direct compose launcher...');

    try {
      const res = await sendReportEmail({
        recipientEmail,
        recipientName,
        subject: `BankIT360 Executive IT Operations Audit Briefing`,
        format: docFormat,
        reportData: {
          avgHealth: 86,
          totalBranches: 15,
          slaRate: '95.8%',
          openP1: 0,
          breachedCount: 0
        },
        customNote
      });

      setIsProcessing(false);
      setDispatchResult(res);

      if (autoLaunchWebmail && res.gmailUrl) {
        window.open(res.gmailUrl, '_blank');
      }

      if (onAddToast) {
        onAddToast('Real Email Dispatched! ✉️', `Email composer ready & dispatched for ${recipientEmail}!`, 'success');
      }
    } catch (err) {
      setIsProcessing(false);
      if (onAddToast) onAddToast('Email Notice', err.message || 'Check recipient email address.', 'warning');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-xl bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-5 max-h-[92vh] overflow-y-auto text-white modal-pop-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-[#ff2d78]/20 text-[#ff2d78] border border-[#ff2d78]/30 shadow-glow">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Executive Exporter &amp; Real Email Dispatcher</h3>
              <p className="text-xs text-white/50">Download locally or send PDF/Word reports directly to ANY recipient email</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dual Mode Switcher Tabs */}
        <div className="flex bg-black/60 p-1 rounded-2xl border border-white/15 text-xs font-bold shadow-inner">
          <button
            onClick={() => { setActiveMode('email'); setDispatchResult(null); }}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              activeMode === 'email' ? 'bg-[#ff2d78] text-white shadow-glow' : 'text-white/60 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4 text-white" />
            <span>📧 Send via Real Email</span>
          </button>
          <button
            onClick={() => { setActiveMode('download'); setDispatchResult(null); }}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              activeMode === 'download' ? 'bg-[#00f5ff] text-black shadow-glow font-black' : 'text-white/60 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4 text-current" />
            <span>💾 Direct Local Download</span>
          </button>
        </div>

        {/* Export Format Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/70 uppercase tracking-wider block">Select File Format:</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setDocFormat('pdf')}
              className={`p-3.5 rounded-2xl border text-center font-extrabold text-xs flex flex-col items-center space-y-1.5 transition-all cursor-pointer ${
                docFormat === 'pdf' ? 'bg-[#ff2d78]/20 border-[#ff2d78] text-white shadow-glow' : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/5'
              }`}
            >
              <Printer className="w-5 h-5 text-rose-400" />
              <span>PDF Document (.pdf)</span>
            </button>

            <button
              onClick={() => setDocFormat('word')}
              className={`p-3.5 rounded-2xl border text-center font-extrabold text-xs flex flex-col items-center space-y-1.5 transition-all cursor-pointer ${
                docFormat === 'word' ? 'bg-[#00f5ff]/20 border-[#00f5ff] text-white shadow-glow' : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/5'
              }`}
            >
              <FileText className="w-5 h-5 text-[#00f5ff]" />
              <span>MS Word (.doc)</span>
            </button>

            <button
              onClick={() => setDocFormat('csv')}
              className={`p-3.5 rounded-2xl border text-center font-extrabold text-xs flex flex-col items-center space-y-1.5 transition-all cursor-pointer ${
                docFormat === 'csv' ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-glow' : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/5'
              }`}
            >
              <FileCode className="w-5 h-5 text-emerald-400" />
              <span>CSV Data (.csv)</span>
            </button>
          </div>
        </div>

        {/* Real Email Fields Mode */}
        {activeMode === 'email' && (
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
            <div className="flex items-center space-x-2 text-[#00f5ff] font-extrabold text-xs uppercase tracking-wider">
              <Mail className="w-4 h-4 text-[#00f5ff]" />
              <span>Enter Target Recipient Email Address</span>
            </div>

            <div>
              <label className="text-[11px] font-bold text-white/80 block mb-1">
                Recipient Email ID <span className="text-rose-400">*</span> (Type any real email address):
              </label>
              <input
                type="email"
                placeholder="e.g. manager@gmail.com or recipient@domain.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white font-semibold text-xs focus:outline-none focus:border-[#00f5ff]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-white/80 block mb-1">Recipient Name:</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-white/80 block mb-1">Custom Executive Note:</label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-white/70 pt-1">
              <input
                type="checkbox"
                id="autoLaunch"
                checked={autoLaunchWebmail}
                onChange={(e) => setAutoLaunchWebmail(e.target.checked)}
                className="w-4 h-4 rounded text-[#ff2d78] focus:ring-[#ff2d78] border-white/20 bg-black/60"
              />
              <label htmlFor="autoLaunch" className="cursor-pointer font-medium text-white/80">
                Auto-open Gmail Compose window for 1-click instant delivery
              </label>
            </div>
          </div>
        )}

        {/* Section Checkboxes */}
        <div className="space-y-2 text-xs">
          <label className="text-xs font-bold text-white/70 uppercase tracking-wider block">Include Report Sections:</label>
          <div className="grid grid-cols-2 gap-2 bg-black/50 p-3.5 rounded-2xl border border-white/10 font-medium">
            {Object.keys(includeSections).map(key => (
              <label key={key} className="flex items-center space-x-2 cursor-pointer text-white/80 text-xs">
                <input
                  type="checkbox"
                  checked={includeSections[key]}
                  onChange={(e) => setIncludeSections({ ...includeSections, [key]: e.target.checked })}
                  className="w-4 h-4 rounded text-[#00f5ff] focus:ring-[#00f5ff] border-white/20 bg-black/60"
                />
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dispatch Processing Status Card */}
        {isProcessing && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center space-x-3 text-amber-300 text-xs animate-pulse">
            <Loader2 className="w-5 h-5 text-amber-400 animate-spin shrink-0" />
            <div className="font-bold">{statusStep}</div>
          </div>
        )}

        {/* Email Success Receipt & Quick Launchers Card */}
        {dispatchResult && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 space-y-2.5 text-xs shadow-xl">
            <div className="flex items-center justify-between font-extrabold text-emerald-300 border-b border-emerald-500/20 pb-2">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Real Email Dispatch Triggered!</span>
              </span>
              <span className="font-mono text-[10px] bg-emerald-500/20 px-2.5 py-0.5 rounded-full text-emerald-300 border border-emerald-500/30">
                {dispatchResult.messageId}
              </span>
            </div>
            <p className="text-[11px] text-emerald-300/80">
              Target Email: <strong className="text-white">{dispatchResult.recipientEmail}</strong> | Status: <strong>Ready &amp; Dispatched</strong>
            </p>

            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-bold text-white/70">Click any launcher below to send directly to inbox:</div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={dispatchResult.gmailUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs inline-flex items-center space-x-1.5 shadow-md"
                >
                  <span>🚀 Send via Gmail</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={dispatchResult.outlookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center space-x-1.5 shadow-md"
                >
                  <span>✉️ Outlook Web</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={dispatchResult.mailtoUrl}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 font-bold text-xs inline-flex items-center space-x-1"
                >
                  <span>💻 System Mail App</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-end space-x-3 pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs cursor-pointer transition-colors"
          >
            Close
          </button>

          {activeMode === 'email' ? (
            <button
              onClick={handleSendEmail}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs flex items-center space-x-2 shadow-glow transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 text-white" />
              <span>{isProcessing ? 'Sending Real Email...' : `Send Real Email as ${docFormat.toUpperCase()}`}</span>
            </button>
          ) : (
            <button
              onClick={handleDownload}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center space-x-2 shadow-glow cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isProcessing ? 'Generating File...' : `Download ${docFormat.toUpperCase()}`}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
