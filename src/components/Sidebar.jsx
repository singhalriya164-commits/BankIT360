import React, { useState, memo } from 'react';
import { 
  LayoutDashboard, 
  Ticket, 
  AlertOctagon, 
  HardDrive, 
  Key, 
  Activity, 
  BarChart3, 
  Clock, 
  FileText,
  PlusCircle,
  BrainCircuit,
  Zap,
  Sparkles,
  MapPin,
  ShieldAlert,
  DollarSign,
  Truck,
  Database,
  ClipboardList,
  Mic,
  Award,
  X,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Sun,
  Moon,
  Headphones,
  HeartPulse,
  Leaf,
  Trophy,
  MessageSquareHeart
} from 'lucide-react';
import { fontTranslations } from '../services/i18n';
import { 
  SparkleIcon, 
  BookOpenIcon, 
  CompassIcon, 
  StarFilledIcon, 
  SidebarToggleIcon 
} from './TodaySidebarCard';

function SidebarComponent({ 
  activeTab = 'dashboard', 
  setActiveTab, 
  userRole = 'bank_employee', 
  onOpenTicketModal, 
  onOpenShowcase, 
  currentLang = 'en',
  isMobileOpen,
  onCloseMobileMenu
}) {
  const t = fontTranslations[currentLang] || fontTranslations.en;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpsOpen, setIsOpsOpen] = useState(true);
  
  // Theme state: 'dark' (Cyber Glass) vs 'light' (Classic Trailhead Light)
  const [cardTheme, setCardTheme] = useState('dark');

  // Today Primary Menu Items
  const todayMenuItems = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: SparkleIcon,
      badge: null,
      tooltip: 'BankIT360 Operations Dashboard'
    },
    {
      id: 'my-learning',
      label: 'Runbooks & SOPs',
      icon: BookOpenIcon,
      badge: '4 Runbooks',
      tooltip: 'Standard Operating Procedures & Outage Runbooks'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      icon: CompassIcon,
      badge: '2 New',
      tooltip: 'AI Predictive Telemetry Insights'
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: StarFilledIcon,
      badge: '3 Pinned',
      tooltip: 'Starred Branches & Watchlist'
    }
  ];

  // Secondary BankIT360 Operational Workbench
  const opsMenuItems = [
    { id: 'tickets', label: t.tickets, icon: Ticket, roles: ['bank_employee', 'it_support_engineer', 'it_administrator', 'it_manager', 'external_vendor'], badge: '3 Open' },
    { id: 'incidents', label: t.incidents, icon: AlertOctagon, roles: ['it_support_engineer', 'it_administrator', 'it_manager', 'senior_management'], badge: '1 Live' },
    { id: 'multi-level-support', label: t.multiLevelSupport || 'Multi-Level IT Support', icon: Headphones, roles: ['bank_employee', 'it_support_engineer', 'it_administrator', 'it_manager', 'external_vendor'], badge: 'L1/L2/L3' },
    { id: 'self-healing', label: t.selfHealing || 'Auto Self-Healing Engine', icon: HeartPulse, roles: ['it_support_engineer', 'it_administrator', 'it_manager'], badge: 'AI Auto' },
    { id: 'database-latency', label: t.databaseLatency || 'DB Cluster Latency Monitor', icon: Database, roles: ['it_support_engineer', 'it_administrator', 'it_manager', 'senior_management'] },
    { id: 'topology', label: t.topology, icon: Activity, roles: ['bank_employee', 'it_support_engineer', 'it_administrator', 'it_manager', 'senior_management'] },
    { id: 'power-grid', label: t.powerGrid, icon: Zap, roles: ['bank_employee', 'it_support_engineer', 'it_administrator', 'it_manager'] },
    { id: 'energy-saver', label: t.energySaver || 'Green Energy & Power Saver', icon: Leaf, roles: ['bank_employee', 'it_support_engineer', 'it_administrator', 'it_manager', 'senior_management'], badge: 'Eco' },
    { id: 'shift-handover', label: t.shiftHandover, icon: ClipboardList, roles: ['it_support_engineer', 'it_administrator', 'it_manager'] },
    { id: 'atm-cash', label: t.atmCash, icon: DollarSign, roles: ['bank_employee', 'it_support_engineer', 'it_administrator', 'it_manager'] },
    { id: 'tech-dispatch', label: t.techDispatch, icon: Truck, roles: ['it_support_engineer', 'it_administrator', 'it_manager'] },
    { id: 'branch-map', label: t.branchMap, icon: MapPin, roles: ['bank_employee', 'it_support_engineer', 'it_administrator', 'it_manager', 'senior_management'] },
    { id: 'leaderboard', label: t.leaderboard || 'Gamified IT Leaderboard', icon: Trophy, roles: ['bank_employee', 'it_support_engineer', 'it_administrator', 'it_manager', 'external_vendor', 'senior_management'], badge: 'Top 10' },
    { id: 'customer-feedback', label: t.customerFeedback || 'Branch CSAT & Feedback', icon: MessageSquareHeart, roles: ['bank_employee', 'it_support_engineer', 'it_administrator', 'it_manager', 'senior_management'] },
    { id: 'security', label: t.security, icon: ShieldAlert, roles: ['it_administrator', 'it_manager', 'senior_management'] },
    { id: 'assets', label: t.assets, icon: HardDrive, roles: ['bank_employee', 'it_support_engineer', 'it_administrator', 'it_manager', 'external_vendor'] },
    { id: 'access', label: t.access, icon: Key, roles: ['bank_employee', 'it_support_engineer', 'it_administrator', 'it_manager'] },
    { id: 'analytics', label: t.analytics, icon: BarChart3, roles: ['it_administrator', 'it_manager', 'senior_management'] },
    { id: 'sla', label: t.sla, icon: Clock, roles: ['it_administrator', 'it_manager', 'senior_management'] },
    { id: 'audit', label: t.audit, icon: FileText, roles: ['it_administrator', 'it_manager', 'senior_management'] },
  ];

  const visibleOps = opsMenuItems.filter(item => item.roles.includes(userRole));

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobileMenu}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden transition-opacity animate-in fade-in"
        />
      )}

      {/* Sidebar Navigation Drawer / Card */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between p-3.5 shadow-2xl transition-all duration-300
        lg:static lg:z-auto lg:shadow-none lg:translate-x-0 shrink-0 select-none font-sans
        ${isCollapsed ? 'w-20' : 'w-72 lg:w-68'}
        ${isMobileOpen ? 'translate-x-0 bg-[#060608]/98' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-3.5 overflow-y-auto max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-80px)] pr-1 custom-scrollbar">
          
          {/* Mobile Header with Close Button */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10 lg:hidden">
            <div className="flex items-center space-x-2">
              <span className="font-display font-black text-sm text-white">BankIT360 Navigation</span>
            </div>
            <button 
              onClick={onCloseMobileMenu}
              aria-label="Close sidebar navigation menu"
              className="p-1.5 rounded-lg bg-white/10 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Ticket Action Button */}
          <button
            onClick={() => {
              onOpenTicketModal();
              if (onCloseMobileMenu) onCloseMobileMenu();
            }}
            aria-label="Create new IT support ticket"
            className={`w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-glow transition-all transform hover:scale-[1.02] border border-white/20 cursor-pointer ${isCollapsed ? 'px-0' : ''}`}
          >
            <PlusCircle className="w-4 h-4 text-white shrink-0" />
            {!isCollapsed && <span>{t.createTicket}</span>}
          </button>

          {/* 1. SEAMLESS HARMONIOUS "TODAY" NAVIGATION CARD */}
          <div className={`rounded-3xl border transition-all duration-300 overflow-hidden font-sans shadow-xl ${
            cardTheme === 'dark' 
              ? 'bg-[#0c0e17]/95 border-white/12 backdrop-blur-2xl text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
              : 'bg-white border-slate-200/90 text-[#032d60] shadow-md shadow-slate-900/5'
          }`}>
            
            {/* Header: "Today" with Collapse Toggle and Theme Switcher */}
            <div className={`flex items-center justify-between px-4 pt-3.5 pb-2 ${isCollapsed ? 'justify-center px-1' : ''}`}>
              {!isCollapsed && (
                <div className="flex items-center gap-2">
                  <h2 className={`text-[20px] font-display font-black tracking-tight leading-none ${
                    cardTheme === 'dark' ? 'text-white' : 'text-[#032d60]'
                  }`}>
                    Today
                  </h2>
                  <button
                    onClick={() => setCardTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                    title={cardTheme === 'dark' ? 'Switch to Classic Light Theme' : 'Switch to Dark Glass Theme'}
                    className={`p-1 rounded-full text-[10px] transition-colors cursor-pointer ${
                      cardTheme === 'dark' ? 'text-amber-300 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {cardTheme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}

              <button 
                onClick={() => setIsCollapsed(prev => !prev)}
                aria-label="Toggle sidebar width"
                title="Toggle Sidebar View"
                className={`p-1 rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
                  cardTheme === 'dark' ? 'hover:bg-white/10 text-cyan-400' : 'hover:bg-slate-100 text-[#032d60]'
                }`}
              >
                <SidebarToggleIcon 
                  className="w-5 h-5" 
                  color={cardTheme === 'dark' ? '#00f5ff' : '#032d60'} 
                />
              </button>
            </div>

            {/* "Today" Menu Items List */}
            <nav aria-label="Today Primary Navigation" className="flex flex-col py-1">
              {todayMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                // Color mappings based on theme & active state
                let activeClasses = '';
                let defaultClasses = '';
                let iconColor = '';
                let textClasses = '';

                if (cardTheme === 'dark') {
                  if (isActive) {
                    activeClasses = 'bg-gradient-to-r from-cyan-500/20 via-[#0176d3]/20 to-transparent text-white border-y border-cyan-400/20';
                    iconColor = '#00f5ff';
                    textClasses = 'font-black text-white';
                  } else {
                    defaultClasses = 'text-white/70 hover:text-white hover:bg-white/5';
                    iconColor = 'rgba(255,255,255,0.65)';
                    textClasses = 'font-semibold text-white/80 group-hover:text-white';
                  }
                } else {
                  // Light Theme
                  if (isActive) {
                    activeClasses = 'bg-[#eff6ff] text-[#0176d3]';
                    iconColor = '#0176d3';
                    textClasses = 'font-bold text-[#0176d3]';
                  } else {
                    defaultClasses = 'text-[#032d60] hover:bg-slate-50';
                    iconColor = '#032d60';
                    textClasses = 'font-semibold text-[#032d60] group-hover:text-[#0176d3]';
                  }
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    title={item.tooltip}
                    className={`
                      relative flex items-center justify-between w-full px-4 py-2.5 transition-all duration-200 group cursor-pointer text-left
                      ${isCollapsed ? 'justify-center px-0 py-2.5' : ''}
                      ${isActive ? activeClasses : defaultClasses}
                    `}
                  >
                    {/* Active Glowing Indicator Strip on Left */}
                    {isActive && (
                      <div className={`absolute left-0 top-0 bottom-0 w-[4px] rounded-r-xs ${
                        cardTheme === 'dark' 
                          ? 'bg-[#00f5ff] shadow-[0_0_12px_#00f5ff]' 
                          : 'bg-[#0176d3]'
                      }`} />
                    )}

                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Icon */}
                      <div className="shrink-0 flex items-center justify-center">
                        <Icon 
                          className={`w-[22px] h-[22px] transition-transform duration-150 group-hover:scale-110 ${
                            isActive && cardTheme === 'dark' ? 'drop-shadow-[0_0_8px_rgba(0,245,255,0.7)]' : ''
                          }`}
                          color={iconColor}
                        />
                      </div>

                      {/* Label */}
                      {!isCollapsed && (
                        <span className={`text-[14.5px] tracking-tight truncate ${textClasses}`}>
                          {item.label}
                        </span>
                      )}
                    </div>

                    {/* Subtle notification badge */}
                    {!isCollapsed && item.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                        cardTheme === 'dark'
                          ? isActive 
                            ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 shadow-glow-cyan' 
                            : 'bg-white/5 text-white/50 border border-white/10 group-hover:text-cyan-300 group-hover:border-cyan-500/30'
                          : isActive 
                            ? 'bg-[#0176d3]/15 text-[#0176d3]' 
                            : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100/60 group-hover:text-[#0176d3]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 2. OPERATIONAL WORKBENCH MODULES (COLLAPSIBLE / EXTENSIBLE) */}
          <div className="bg-[#0c0e17]/95 rounded-3xl border border-white/12 p-2.5 backdrop-blur-2xl shadow-xl">
            
            {/* Header Accordion */}
            <div 
              onClick={() => setIsOpsOpen(prev => !prev)}
              className={`flex items-center justify-between px-2 py-1.5 cursor-pointer text-[10px] font-black tracking-widest text-white/60 hover:text-white uppercase ${isCollapsed ? 'justify-center' : ''}`}
            >
              {!isCollapsed ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
                  <span>OPERATIONAL WORKBENCH</span>
                </div>
              ) : (
                <span className="w-2 h-2 rounded-full bg-brand"></span>
              )}
              {!isCollapsed && (
                isOpsOpen ? <ChevronDown className="w-3.5 h-3.5 text-white/50" /> : <ChevronRight className="w-3.5 h-3.5 text-white/50" />
              )}
            </div>

            {/* List of Workbench Tabs */}
            {isOpsOpen && (
              <nav aria-label="Operational Workbench" className="mt-1 space-y-1">
                {visibleOps.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-200 group cursor-pointer
                        ${isCollapsed ? 'justify-center px-0' : ''}
                        ${isActive 
                          ? 'bg-gradient-to-r from-[#ff2d78] to-[#e11d48] text-white font-bold shadow-glow-pink border border-white/30' 
                          : 'text-white/70 hover:text-white hover:bg-white/10 font-medium'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-white scale-110' : 'text-white/60 group-hover:text-cyan-300'}`} />
                        {!isCollapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </div>

                      {!isCollapsed && item.badge && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                          isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/50 border border-white/10'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            )}
          </div>
        </div>

        {/* Domain Context & Live Heartbeat Widget at Bottom */}
        <div className={`p-3 rounded-2xl bg-black/70 border border-white/10 text-[11px] text-white/70 space-y-2 mt-3 backdrop-blur-md ${isCollapsed ? 'p-2 text-center' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-[#ff2d78] font-bold">
              <BrainCircuit className="w-4 h-4 text-[#ff2d78] shrink-0" />
              {!isCollapsed && <span className="text-[10px] uppercase tracking-wider font-extrabold">AI Telemetry Core</span>}
            </div>
            {!isCollapsed && (
              <button
                onClick={() => {
                  onOpenShowcase();
                  if (onCloseMobileMenu) onCloseMobileMenu();
                }}
                className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]/40 hover:bg-[#00f5ff]/30 transition-colors cursor-pointer"
              >
                Why Unique? ⭐
              </button>
            )}
          </div>
          {!isCollapsed && (
            <div className="flex items-center justify-between text-[10px] text-white/50 font-mono pt-1 border-t border-white/10">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span> 15/15 Online
              </span>
              <span>12ms</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default memo(SidebarComponent);
