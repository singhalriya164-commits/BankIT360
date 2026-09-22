import React, { useState } from 'react';
import { 
  Star, 
  Building2, 
  Ticket, 
  Activity, 
  AlertOctagon, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Search, 
  Plus, 
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ScanText,
  Bot,
  FileText,
  PhoneCall
} from 'lucide-react';

export default function FavoritesPage({ 
  branches = [], 
  tickets = [], 
  onSelectTicket = () => {},
  onNavigate = () => {},
  onAddToast = () => {} 
}) {
  const [activeSubTab, setActiveSubTab] = useState('all');

  // Starred Branches list
  const [favoriteBranches, setFavoriteBranches] = useState([
    { id: 'BR-101', name: 'Airport Executive Branch', city: 'Metro Zone 1', health: 98, status: 'Optimal', tellers: '6/6 Online', atmStatus: '92% Cash' },
    { id: 'BR-102', name: 'Metro Central Branch', city: 'Financial District', health: 42, status: 'Surge Alert', tellers: '2/8 Online', atmStatus: 'Cassette Fault' },
    { id: 'BR-103', name: 'Downtown Financial Hub', city: 'City Center', health: 95, status: 'Optimal', tellers: '5/5 Online', atmStatus: '78% Cash' },
  ]);

  // Starred Quick Tool Shortcuts
  const quickTools = [
    { id: 'ocr', title: 'AI OCR Error Scanner', desc: 'Scan ATM & teller screenshots', icon: ScanText, color: 'from-pink-500 to-rose-600', tab: 'tickets' },
    { id: 'copilot', title: 'AI IT Copilot Chat', desc: 'Ask natural language IT diagnostics', icon: Bot, color: 'from-blue-500 to-cyan-500', tab: 'dashboard' },
    { id: 'exporter', title: 'Executive Report Exporter', desc: 'Generate high-res PDF / Word reports', icon: FileText, color: 'from-emerald-500 to-teal-600', tab: 'analytics' },
    { id: 'helpline', title: '24/7 IT Emergency Helpline', desc: 'Direct dial to tier 3 network engineers', icon: PhoneCall, color: 'from-amber-500 to-orange-600', tab: 'dashboard' },
  ];

  const handleRemoveBranch = (id) => {
    setFavoriteBranches(prev => prev.filter(b => b.id !== id));
    onAddToast('Removed from Watchlist', 'Branch unpinned from Favorites.', 'info');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#1c1335] via-[#101935] to-[#0a2540] p-6 sm:p-8 border border-white/15 overflow-hidden shadow-2xl">
        <div className="absolute -right-12 -top-12 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                PINNED OPERATIONS & WATCHLIST
              </span>
              <span className="text-xs text-white/50 font-medium">Customized for your role</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              My Starred Favorites
            </h1>
            <p className="text-sm text-white/70 max-w-2xl leading-relaxed">
              Quickly monitor high-priority banking branches, watch active mission-critical tickets, and access your favorite automated IT tools from a single place.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0 flex items-center gap-4">
            <div className="text-center px-2">
              <div className="text-xl font-black text-amber-400 font-mono">{favoriteBranches.length}</div>
              <div className="text-[10px] text-white/50 uppercase font-bold">Pinned Branches</div>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="text-center px-2">
              <div className="text-xl font-black text-cyan-400 font-mono">4</div>
              <div className="text-[10px] text-white/50 uppercase font-bold">Quick Tools</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Starred Branches Live Status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Pinned Branches Watchlist</h3>
          </div>
          <button 
            onClick={() => onNavigate('branch-map')}
            className="text-xs text-cyan-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            Explore Map to Pin More <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favoriteBranches.map(branch => (
            <div 
              key={branch.id}
              className="bg-[#0e0e14]/90 rounded-3xl p-5 border border-white/10 hover:border-white/20 transition-all shadow-lg flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-white/50 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                    {branch.id}
                  </span>
                  <button 
                    onClick={() => handleRemoveBranch(branch.id)}
                    title="Unpin from Favorites"
                    className="text-amber-400 hover:text-white/40 transition-colors cursor-pointer"
                  >
                    <Star className="w-4 h-4 fill-amber-400" />
                  </button>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {branch.name}
                  </h4>
                  <div className="text-xs text-white/50">{branch.city}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                  <div className="bg-black/40 p-2 rounded-xl">
                    <span className="text-[10px] text-white/40 block">Teller Workstations</span>
                    <span className="font-bold text-white">{branch.tellers}</span>
                  </div>
                  <div className="bg-black/40 p-2 rounded-xl">
                    <span className="text-[10px] text-white/40 block">ATM Cash Status</span>
                    <span className={`font-bold ${branch.atmStatus.includes('Fault') ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {branch.atmStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${branch.health > 80 ? 'bg-emerald-400' : 'bg-rose-400 animate-ping'}`}></span>
                  <span className="text-xs font-mono font-bold text-white">{branch.health}/100 Health</span>
                </div>

                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Open Telemetry →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Pinned Quick Action IT Tools */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">Favorite Quick Tools & AI Accelerators</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickTools.map(tool => {
            const Icon = tool.icon;
            return (
              <div 
                key={tool.id}
                onClick={() => onNavigate(tool.tab)}
                className="bg-[#0e0e14]/90 rounded-3xl p-5 border border-white/10 hover:border-white/20 transition-all shadow-lg cursor-pointer group hover:scale-[1.02]"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-3 shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tool.title}
                </h4>
                <p className="text-xs text-white/50 mt-1">
                  {tool.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
