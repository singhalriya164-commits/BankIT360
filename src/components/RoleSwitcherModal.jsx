import React from 'react';
import { X, ShieldCheck, User, Wrench, Settings, LineChart, Check } from 'lucide-react';
import { USERS } from '../services/mockData';

export default function RoleSwitcherModal({ isOpen, onClose, activeUser, onSelectUser }) {
  if (!isOpen) return null;

  const roleIcons = {
    bank_employee: User,
    it_support_engineer: Wrench,
    it_manager: Settings,
    senior_management: LineChart,
  };

  const roleDescriptions = {
    bank_employee: '👩💼 Primary User: Report IT issues, raise tickets, request hardware/access & confirm resolutions.',
    it_support_engineer: '👨💻 Core User: Accept & diagnose tickets, update resolution notes, manage incidents & track SLAs.',
    it_manager: '👨💼 Management User: Monitor Branch Health (e.g. Kanpur 58/100 🔴), critical breaches & engineer workload.',
    senior_management: '🏢 Monitoring User: High-level analytics (Total Branches, SLA Compliance 94%, Open Critical Issues).',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl glass-panel bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Switch User Persona & Role</h3>
              <p className="text-xs text-slate-400">Evaluate BankIT360 features across all 4 target user roles</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {USERS.map(user => {
            const isSelected = user.id === activeUser.id;
            const Icon = roleIcons[user.role] || User;

            return (
              <div
                key={user.id}
                onClick={() => {
                  onSelectUser(user);
                  onClose();
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-blue-600/15 border-blue-500 text-white glow-blue' 
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white flex items-center space-x-1.5">
                        <span>{user.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                      </h4>
                      <p className="text-xs text-blue-400 font-medium">{user.title}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Department:</span>
                    <span className="text-slate-300 font-medium">{user.department}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1 leading-snug">
                    {roleDescriptions[user.role]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Role permissions enforce API routing, dashboard metrics, and action privileges.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
          >
            Confirm Persona Selection
          </button>
        </div>
      </div>
    </div>
  );
}
