import React, { useState, useEffect } from 'react';
import { 
  Search, Ticket, AlertOctagon, Activity, HardDrive, Key, BarChart3, Clock, 
  Sparkles, X, ArrowRight, CornerDownLeft, Headphones, HeartPulse, Database, 
  Leaf, Trophy, MessageSquareHeart, ShieldAlert, Cpu, Wrench, DollarSign, MessageCircle
} from 'lucide-react';

export default function CommandPaletteModal({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onOpenCreateTicket, 
  onOpenTicketModal,
  onOpenCopilot, 
  onOpenExecutiveReport,
  onOpenAiDrawer,
  onOpenPredictiveMaintenance,
  onOpenSlaPenalty,
  onOpenTroubleshooter,
  onOpenWhatsapp,
  onOpenUserManagement,
  onOpenBranchManagement,
  onOpenRecurringModal
}) {
  const [query, setQuery] = useState('');

  const handleOpenTicket = onOpenCreateTicket || onOpenTicketModal;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    // Navigation
    { id: 'nav-dash', title: 'Go to Executive Dashboard', category: 'Navigation', icon: Activity, action: () => { onNavigate('dashboard'); onClose(); } },
    { id: 'nav-tix', title: 'Go to IT Helpdesk Tickets', category: 'Navigation', icon: Ticket, action: () => { onNavigate('tickets'); onClose(); } },
    { id: 'nav-inc', title: 'Go to Major Incidents Board', category: 'Navigation', icon: AlertOctagon, action: () => { onNavigate('incidents'); onClose(); } },
    { id: 'nav-health', title: 'Go to Branch Health Score & Memory', category: 'Navigation', icon: Activity, action: () => { onNavigate('branch-health'); onClose(); } },
    { id: 'nav-mls', title: 'Go to Multi-Level IT Support (L1/L2/L3)', category: 'Navigation', icon: Headphones, action: () => { onNavigate('multi-level-support'); onClose(); } },
    { id: 'nav-sh', title: 'Go to Auto Self-Healing Engine', category: 'Navigation', icon: HeartPulse, action: () => { onNavigate('self-healing'); onClose(); } },
    { id: 'nav-dbl', title: 'Go to DB Cluster Latency Monitor', category: 'Navigation', icon: Database, action: () => { onNavigate('database-latency'); onClose(); } },
    { id: 'nav-energy', title: 'Go to Green Energy & Power Saver', category: 'Navigation', icon: Leaf, action: () => { onNavigate('energy-saver'); onClose(); } },
    { id: 'nav-lead', title: 'Go to Gamified IT Leaderboard', category: 'Navigation', icon: Trophy, action: () => { onNavigate('leaderboard'); onClose(); } },
    { id: 'nav-fb', title: 'Go to Branch CSAT & Feedback Hub', category: 'Navigation', icon: MessageSquareHeart, action: () => { onNavigate('customer-feedback'); onClose(); } },
    { id: 'nav-topo', title: 'Go to ATM Network Topology Map', category: 'Navigation', icon: Activity, action: () => { onNavigate('topology'); onClose(); } },
    { id: 'nav-assets', title: 'Go to Hardware & Software Assets', category: 'Navigation', icon: HardDrive, action: () => { onNavigate('assets'); onClose(); } },
    { id: 'nav-sec', title: 'Go to Cybersecurity & Zero Trust Hub', category: 'Navigation', icon: ShieldAlert, action: () => { onNavigate('security'); onClose(); } },
    { id: 'nav-access', title: 'Go to RBAC Access Governance', category: 'Navigation', icon: Key, action: () => { onNavigate('access'); onClose(); } },
    { id: 'nav-analytics', title: 'Go to Operational Analytics & BI', category: 'Navigation', icon: BarChart3, action: () => { onNavigate('analytics'); onClose(); } },
    { id: 'nav-sla', title: 'Go to Regulatory SLA & Penalties', category: 'Navigation', icon: Clock, action: () => { onNavigate('sla'); onClose(); } },
    
    // Management & AI Actions
    { id: 'act-users', title: 'Open User & Staff Directory (CRUD Management)', category: 'Administration', icon: Key, action: () => { onOpenUserManagement?.(); onClose(); } },
    { id: 'act-branches', title: 'Open Branch Network Commissioning (CRUD)', category: 'Administration', icon: Activity, action: () => { onOpenBranchManagement?.(); onClose(); } },
    { id: 'act-recurring', title: 'Open AI Recurring Problem & Outage Detector', category: 'Intelligence', icon: Cpu, action: () => { onOpenRecurringModal?.(); onClose(); } },
    { id: 'act-ticket', title: 'Raise New IT Ticket (AI-Assisted)', category: 'Quick Actions', icon: Ticket, action: () => { handleOpenTicket?.(); onClose(); } },
    { id: 'act-copilot', title: 'Open BankIT360 AI Co-Pilot Assistant', category: 'Quick Actions', icon: Sparkles, action: () => { onOpenCopilot?.(); onClose(); } },
    { id: 'act-ai-drawer', title: 'View AI Neural Model Telemetry Drawer', category: 'Quick Actions', icon: Cpu, action: () => { onOpenAiDrawer?.(); onClose(); } },
    { id: 'act-pred', title: 'Launch Predictive Maintenance Drawer', category: 'Quick Actions', icon: Activity, action: () => { onOpenPredictiveMaintenance?.(); onClose(); } },
    { id: 'act-troubleshoot', title: 'Open Step-by-Step Interactive Troubleshooter', category: 'Quick Actions', icon: Wrench, action: () => { onOpenTroubleshooter?.(); onClose(); } },
    { id: 'act-sla-calc', title: 'Open Regulatory SLA Penalty Calculator', category: 'Quick Actions', icon: DollarSign, action: () => { onOpenSlaPenalty?.(); onClose(); } },
    { id: 'act-whatsapp', title: 'Send WhatsApp Outage Broadcast Alert', category: 'Quick Actions', icon: MessageCircle, action: () => { onOpenWhatsapp?.(); onClose(); } },
    { id: 'act-report', title: 'Generate Executive PDF Board Report', category: 'Quick Actions', icon: BarChart3, action: () => { onOpenExecutiveReport?.(); onClose(); } },
  ];

  const filteredCommands = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/80 backdrop-blur-xl p-4 modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-xl bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/25 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden space-y-0 text-white modal-pop-in">
        {/* Search Header */}
        <div className="flex items-center px-5 py-4 border-b border-white/10 space-x-3">
          <Search className="w-5 h-5 text-[#ff2d78] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, page name, or quick action (Press Esc to close)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-white placeholder-white/40 text-sm focus:outline-none"
          />
          <kbd className="px-2.5 py-0.5 rounded-lg bg-white/10 text-white/60 border border-white/15 text-[10px] font-mono shrink-0">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-xs text-white/40 italic">No commands found matching "{query}"</div>
          ) : (
            filteredCommands.map(cmd => {
              const Icon = cmd.icon;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  className="p-3.5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-[#00f5ff]/30 cursor-pointer flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-[#ff2d78] text-white/70 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-[#00f5ff]">{cmd.title}</div>
                      <div className="text-[10px] text-white/50 font-medium">{cmd.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-[10px] text-white/40 group-hover:text-[#00f5ff] font-mono font-bold">
                    <span>Execute</span>
                    <CornerDownLeft className="w-3 h-3" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-3.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-white/50 font-medium">
          <span>Tip: Press <kbd className="px-2 py-0.5 rounded-lg bg-white/10 border border-white/15 text-[10px] text-white shadow-xs">Ctrl + K</kbd> anytime to open Command Palette</span>
          <span className="text-[#00f5ff] font-bold">BankIT360 AI Search</span>
        </div>
      </div>
    </div>
  );
}
