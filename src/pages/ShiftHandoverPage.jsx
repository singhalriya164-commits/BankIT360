import React, { useState } from 'react';
import { ClipboardList, UserCheck, Clock, CheckCircle2, Plus, MessageSquare } from 'lucide-react';

export default function ShiftHandoverPage() {
  const [handovers, setHandovers] = useState([
    { id: 'HO-101', date: '2026-08-15', shift: 'Morning ➔ Afternoon', outgoingTech: 'Alex Morgan', incomingTech: 'James Wilson', branch: 'Downtown Main Branch', pendingIssues: 'TICK-8022 passbook printer baud rate config pending.', managerSignoff: 'Approved (Sarah Jenkins)' },
    { id: 'HO-102', date: '2026-08-14', shift: 'Afternoon ➔ Night', outgoingTech: 'James Wilson', incomingTech: 'Michael Chang', branch: 'Metro Central Branch', pendingIssues: 'Drive-thru ATM #1 card reader motor replacement scheduled.', managerSignoff: 'Approved (David Vance)' },
  ]);

  const [newNotes, setNewNotes] = useState('');

  const handleAddShiftLog = (e) => {
    e.preventDefault();
    if (!newNotes.trim()) return;

    const newEntry = {
      id: `HO-${103 + handovers.length}`,
      date: new Date().toISOString().split('T')[0],
      shift: 'Evening Handover',
      outgoingTech: 'Active User',
      incomingTech: 'Night Operations Shift',
      branch: 'Downtown Main Branch',
      pendingIssues: newNotes,
      managerSignoff: 'Pending Manager Sign-off'
    };

    setHandovers([newEntry, ...handovers]);
    setNewNotes('');
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <ClipboardList className="w-6 h-6 text-[#00f5ff]" />
            <span>Branch IT Technician Shift Handover &amp; Logbook</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Digital morning/night technician shift handovers, pending task logs, and branch manager sign-off sign-sheets
          </p>
        </div>
      </div>

      {/* New Handover Log Form */}
      <form onSubmit={handleAddShiftLog} className="p-5 rounded-3xl glass-card border border-white/10 space-y-3 shadow-xl text-white">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Add Shift Handover Log Notes</h3>
        <textarea
          rows={2}
          required
          placeholder="Enter pending tickets, open outages, or technician handover notes..."
          value={newNotes}
          onChange={(e) => setNewNotes(e.target.value)}
          className="w-full p-3 rounded-2xl bg-black/60 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#00f5ff] font-medium"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs shadow-glow transition-all cursor-pointer"
          >
            Submit Shift Handover Log
          </button>
        </div>
      </form>

      {/* Handover Log Entries List */}
      <div className="space-y-3">
        {handovers.map(ho => (
          <div key={ho.id} className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-3 shadow-xl text-xs text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-[#00f5ff]">{ho.id}</span>
                <span className="font-bold text-white">{ho.shift} ({ho.date})</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-extrabold text-[10px]">
                {ho.managerSignoff}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] bg-black/50 p-2.5 rounded-2xl border border-white/10">
              <div>
                <span className="text-white/40 block font-bold">Outgoing Tech</span>
                <span className="text-white font-bold">{ho.outgoingTech}</span>
              </div>
              <div>
                <span className="text-white/40 block font-bold">Incoming Tech</span>
                <span className="text-white font-bold">{ho.incomingTech}</span>
              </div>
            </div>

            <p className="text-white/80 font-medium leading-relaxed">{ho.pendingIssues}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
