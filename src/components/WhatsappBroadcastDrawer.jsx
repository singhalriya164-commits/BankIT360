import React, { useState } from 'react';
import { X, Send, MessageSquare, CheckCheck, Radio, Sparkles, Bell, Megaphone, Phone, ExternalLink } from 'lucide-react';
import { sendWhatsAppMessage } from '../services/whatsappTelegramService';

export default function WhatsappBroadcastDrawer({ isOpen, onClose, onAddToast }) {
  const [broadcastMessages, setBroadcastMessages] = useState([
    { id: 1, sender: 'BankIT360 Broadcast HQ', text: '📢 ALERT: Core Banking System (CBS) Patch v1.2 has been deployed cleanly across all 15 branches. Latency reduced by 34%.', time: '10:14 AM', status: 'delivered' },
    { id: 2, sender: 'L2 Field Network Team', text: '⚡ UPDATE: Utility power restored at Metro Central Branch. Catalyst switch stack online and operational.', time: '11:30 AM', status: 'delivered' },
    { id: 3, sender: 'Cybersecurity SOC', text: '🔒 NOTICE: Mandatory 2FA verification active for all SWIFT payment gateway operators.', time: '01:45 PM', status: 'delivered' },
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [dispatchResult, setDispatchResult] = useState(null);

  if (!isOpen) return null;

  const handlePostBroadcast = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newBroadcast = {
      id: Date.now(),
      sender: 'Active IT Operator (Broadcast HQ)',
      text: `📢 ANNOUNCEMENT: ${inputMsg}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };

    setBroadcastMessages([...broadcastMessages, newBroadcast]);

    if (phone && phone.length >= 8) {
      try {
        const res = await sendWhatsAppMessage({ phone, message: `[BankIT360 Alert] ${inputMsg}` });
        setDispatchResult(res);
        if (res.waWebUrl) {
          window.open(res.waWebUrl, '_blank');
        }
      } catch (err) {
        console.warn('WhatsApp error:', err);
      }
    }

    setInputMsg('');
    if (onAddToast) onAddToast('WhatsApp Broadcast Sent 📱', 'Announcement broadcasted to branch IT teams.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200 text-white font-sans text-left">
      <div className="w-full max-w-lg bg-[#060608]/95 border-l border-white/10 shadow-2xl flex flex-col h-full text-white">
        {/* WhatsApp Green Top Header */}
        <div className="bg-[#0b141a] border-b border-white/10 text-white p-5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-glow">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold flex items-center space-x-1.5">
                <span>BankIT360 WhatsApp Broadcast</span>
                <span className="text-[9px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold">Official Channel</span>
              </h3>
              <p className="text-[11px] text-white/50">15 Branches Subscribed • Live Telemetry Broadcasts</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Recipient Phone Number Input */}
        <div className="p-3.5 bg-black/40 border-b border-white/10 flex items-center space-x-2 text-xs">
          <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
          <input
            type="text"
            placeholder="Target WhatsApp Phone # (e.g. +91 9876543210)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white font-semibold text-xs focus:outline-none focus:border-emerald-400 placeholder-white/40"
          />
        </div>

        {/* WhatsApp Chat Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {broadcastMessages.map(msg => (
            <div key={msg.id} className="bg-black/50 p-4 rounded-3xl shadow-md border border-white/10 max-w-[92%] space-y-1.5 relative text-xs">
              <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold border-b border-white/10 pb-1">
                <span>{msg.sender}</span>
                <span className="text-white/40 font-mono">{msg.time}</span>
              </div>
              <p className="text-white/90 text-xs font-medium leading-relaxed">{msg.text}</p>
              <div className="flex items-center justify-end text-[10px] text-white/40 space-x-1 pt-0.5">
                <span>Broadcasted</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#00f5ff]" />
              </div>
            </div>
          ))}

          {dispatchResult && dispatchResult.waWebUrl && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs space-y-1.5">
              <div className="font-bold text-emerald-300">Direct WhatsApp Dispatch Ready!</div>
              <a
                href={dispatchResult.waWebUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs inline-flex items-center space-x-1.5 shadow-md cursor-pointer transition-all"
              >
                <span>🚀 Send via WhatsApp Web</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Send Broadcast Message Form */}
        <form onSubmit={handlePostBroadcast} className="p-3.5 bg-black/40 border-t border-white/10 flex items-center space-x-2 shrink-0">
          <input
            type="text"
            placeholder="Type WhatsApp broadcast update..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-full bg-black/60 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-glow shrink-0 transition-transform active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
