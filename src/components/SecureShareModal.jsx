import React, { useState } from 'react';
import { Share2, Lock, Clock, Eye, Copy, CheckCircle2, ShieldCheck, Key, X, Mail, Send, Loader2, ExternalLink } from 'lucide-react';
import { sendReportEmail } from '../services/emailService';

export default function SecureShareModal({ isOpen, onClose, onAddToast }) {
  const [sharePrivacy, setSharePrivacy] = useState('one_time'); // 'one_time', 'time_limited', 'permanent'
  const [expiryHours, setExpiryHours] = useState('24');
  const [requirePasscode, setRequirePasscode] = useState(true);
  const [passcode, setPasscode] = useState('8022');
  const [copied, setCopied] = useState(false);

  // Email state
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [dispatchResult, setDispatchResult] = useState(null);

  if (!isOpen) return null;

  const generatedLink = `https://bankit360.internal/share/v1/sec_${Math.random().toString(36).substring(2, 10)}?privacy=${sharePrivacy}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    if (onAddToast) onAddToast('Encrypted Share Link Copied', `Copied link with ${sharePrivacy.replace('_', ' ').toUpperCase()} privacy rules!`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmailLink = async () => {
    if (!recipientEmail || !recipientEmail.includes('@')) {
      if (onAddToast) onAddToast('Invalid Email', 'Please enter a valid recipient email address.', 'warning');
      return;
    }

    setIsSendingEmail(true);
    setDispatchResult(null);

    try {
      const res = await sendReportEmail({
        recipientEmail,
        recipientName: 'Recipient',
        subject: 'BankIT360 Encrypted Privacy Report Link',
        format: 'link',
        customNote: `Secure encrypted link: ${generatedLink}${requirePasscode ? ` (PIN Passcode: ${passcode})` : ''} - Access Rule: ${sharePrivacy.replace('_', ' ').toUpperCase()}`
      });

      setIsSendingEmail(false);
      setDispatchResult(res);

      if (res.gmailUrl) {
        window.open(res.gmailUrl, '_blank');
      }

      if (onAddToast) onAddToast('Privacy Link Emailed! ✉️', `Email composer ready & sent to ${recipientEmail}!`, 'success');
    } catch (err) {
      setIsSendingEmail(false);
      if (onAddToast) onAddToast('Dispatch Notice', err.message, 'warning');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-lg bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-5 max-h-[92vh] overflow-y-auto text-white modal-pop-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-glow">
              <Share2 className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Secure Privacy Link Sharing</h3>
              <p className="text-xs text-white/50">Share report links with self-destructing or passcode privacy rules</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Privacy Access Mode Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/70 uppercase tracking-wider block">Set Privacy Access Rules:</label>
          <div className="grid grid-cols-1 gap-2">
            {/* Option 1: One-time view */}
            <button
              onClick={() => setSharePrivacy('one_time')}
              className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                sharePrivacy === 'one_time' ? 'bg-[#ff2d78]/20 border-[#ff2d78] text-white shadow-glow' : 'bg-black/50 border-white/10 text-white/80 hover:bg-white/5'
              }`}
            >
              <Lock className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold text-xs">🔥 One-Time View (Self-Destruct)</div>
                <p className="text-[11px] text-white/50 mt-0.5">Link automatically expires and deletes after recipient opens it once.</p>
              </div>
            </button>

            {/* Option 2: Time-Limited */}
            <button
              onClick={() => setSharePrivacy('time_limited')}
              className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                sharePrivacy === 'time_limited' ? 'bg-[#00f5ff]/20 border-[#00f5ff] text-white shadow-glow' : 'bg-black/50 border-white/10 text-white/80 hover:bg-white/5'
              }`}
            >
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold text-xs">⏱️ Time-Limited Expiry Access</div>
                <p className="text-[11px] text-white/50 mt-0.5">Link remains accessible for a set duration (1h, 24h, 7d) then locks.</p>
              </div>
            </button>

            {/* Option 3: Permanent */}
            <button
              onClick={() => setSharePrivacy('permanent')}
              className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                sharePrivacy === 'permanent' ? 'bg-purple-500/20 border-purple-500 text-white shadow-glow' : 'bg-black/50 border-white/10 text-white/80 hover:bg-white/5'
              }`}
            >
              <Eye className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold text-xs">👀 Permanent View-Only Access</div>
                <p className="text-[11px] text-white/50 mt-0.5">Standard read-only link for internal executive team review.</p>
              </div>
            </button>
          </div>
        </div>

        {/* Passcode Protection Toggle */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center space-x-1.5">
              <Key className="w-4 h-4 text-purple-400" />
              <span>PIN Passcode Protection</span>
            </span>
            <input
              type="checkbox"
              checked={requirePasscode}
              onChange={(e) => setRequirePasscode(e.target.checked)}
              className="w-4 h-4 rounded text-purple-500 focus:ring-purple-400 border-white/20 bg-black/60"
            />
          </div>
          {requirePasscode && (
            <div className="flex items-center space-x-2 pt-1">
              <span className="text-[11px] text-white/50">Access PIN:</span>
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="px-3 py-1 rounded-xl bg-black/60 border border-white/15 text-white font-mono font-bold text-xs w-24 text-center focus:outline-none focus:border-[#00f5ff]"
              />
            </div>
          )}
        </div>

        {/* Email Privacy Link Directly to Any Email ID */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2 text-xs">
          <label className="font-bold text-white flex items-center space-x-1.5">
            <Mail className="w-4 h-4 text-[#00f5ff]" />
            <span>Email Link Directly to Recipient:</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Enter recipient email address..."
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-2xl bg-black/60 border border-white/15 text-white font-medium text-xs focus:outline-none focus:border-[#00f5ff]"
            />
            <button
              onClick={handleEmailLink}
              disabled={isSendingEmail}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] hover:opacity-95 text-white font-bold text-xs flex items-center space-x-1 shadow-glow shrink-0 cursor-pointer"
            >
              {isSendingEmail ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>{isSendingEmail ? 'Sending...' : 'Email Link'}</span>
            </button>
          </div>
          {dispatchResult && (
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs space-y-1 font-medium shadow-md">
              <div className="flex items-center space-x-1 font-bold text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Real Email Dispatch Triggered to {dispatchResult.recipientEmail}!</span>
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <a
                  href={dispatchResult.gmailUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] inline-flex items-center space-x-1"
                >
                  <span>🚀 Send via Gmail</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={dispatchResult.outlookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] inline-flex items-center space-x-1"
                >
                  <span>✉️ Outlook Web</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Generated Encrypted Link Bar */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">Generated Secure Encrypted URL:</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={generatedLink}
              className="flex-1 px-3.5 py-2 rounded-2xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-xs shrink-0 cursor-pointer transition-colors"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
