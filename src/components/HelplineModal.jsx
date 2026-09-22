import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, Mail, Clock, CheckCircle2, X, Phone, UserCheck, Headset } from 'lucide-react';

export default function HelplineModal({ isOpen, onClose, onAddToast }) {
  const [requestedCallback, setRequestedCallback] = useState(false);
  const [callingNumber, setCallingNumber] = useState(null);

  if (!isOpen) return null;

  const helplines = [
    { title: 'Tier 1 Branch IT Service Desk Hotline', phone: '1-800-BANK-IT-360 (+1 800-226-5483)', desc: '24/7 Immediate assistance for hardware, thermal printer jams & teller terminal issues.', badge: '24/7 Live Support', color: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
    { title: 'P1 Major Incident Outage Bridge Line', phone: '1-888-P1-OUTAGE (+1 888-716-8824)', desc: 'Direct emergency bridge to L2/L3 Network Engineers for core banking outages.', badge: 'Emergency Outage', color: 'bg-rose-500/20 text-rose-300 border border-rose-500/30' },
    { title: 'SWIFT Alliance & Cybersecurity SOC Desk', phone: '1-800-SOC-SAFE (+1 800-762-7233)', desc: 'Immediate incident escalation for SWIFT gateway access & security anomalies.', badge: 'Cybersecurity SOC', color: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
    { title: 'BankIT360 Enterprise Email Support', phone: 'support@bankit360.internal', desc: 'Standard ticket inquiries, SLA contract reviews & non-urgent IT asset requests.', badge: 'Email Desk', color: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
  ];

  const handleSimulateCall = (phoneNum) => {
    setCallingNumber(phoneNum);
    setTimeout(() => {
      setCallingNumber(null);
      if (onAddToast) onAddToast('Emergency Phone Dialed', `Initiated call simulation to ${phoneNum}`, 'info');
    }, 2000);
  };

  const handleRequestCallback = (e) => {
    e.preventDefault();
    setRequestedCallback(true);
    if (onAddToast) onAddToast('Callback Requested', 'IT Lead Engineer assigned to call your branch in < 5 mins.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-xl bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-6 max-h-[90vh] overflow-y-auto text-white modal-pop-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-[#ff2d78]/20 text-[#ff2d78] border border-[#ff2d78]/30 shadow-glow">
              <Headset className="w-6 h-6 text-[#ff2d78]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">24/7 IT Emergency Helpline &amp; Support Directory</h3>
              <p className="text-xs text-white/50">Toll-free emergency contacts &amp; instant engineer callback dispatch</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Helpline Phone Cards */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-white/70 uppercase tracking-wider">Emergency Contact Channels</h4>

          {helplines.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="font-extrabold text-white text-xs">{item.title}</h5>
                  <p className="text-white/50 text-[11px] mt-0.5">{item.desc}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] ${item.color}`}>
                  {item.badge}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="font-mono font-bold text-[#00f5ff] text-xs">{item.phone}</span>
                <button
                  onClick={() => handleSimulateCall(item.phone)}
                  disabled={callingNumber === item.phone}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs flex items-center space-x-1.5 shadow-glow transition-all cursor-pointer disabled:opacity-50"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{callingNumber === item.phone ? 'Dialing...' : 'Simulate Call'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Request Immediate Callback Form */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3 text-xs">
          <div className="flex items-center space-x-2 text-[#00f5ff] font-extrabold">
            <Phone className="w-4 h-4 text-[#00f5ff]" />
            <span>Request Immediate L2 Engineer Callback</span>
          </div>

          {requestedCallback ? (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Callback Request Dispatched! L2 Lead Engineer will dial your branch within 5 minutes.</span>
            </div>
          ) : (
            <form onSubmit={handleRequestCallback} className="flex items-center space-x-2">
              <input
                type="text"
                required
                placeholder="Enter Branch Ext / Phone Number..."
                className="flex-1 px-3.5 py-2 rounded-2xl bg-black/60 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#00f5ff]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs shadow-glow shrink-0 cursor-pointer"
              >
                Request Callback
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
