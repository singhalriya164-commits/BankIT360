import React, { useState, memo } from 'react';
import BankLogo from './BankLogo';
import { 
  Building2, 
  Bell, 
  Search, 
  Sparkles, 
  Layers, 
  Cpu,
  ChevronDown,
  Mic,
  Activity,
  ShieldCheck,
  Zap,
  Command,
  Calculator,
  Wrench,
  Download,
  Share2,
  PhoneCall,
  Globe,
  Megaphone,
  ScanText,
  Award,
  Menu,
  X
} from 'lucide-react';
import { fontTranslations } from '../services/i18n';
import { requestNotificationPermission, sendDesktopNotification } from '../services/notificationService';

function NavbarComponent({ 
  activeUser, 
  onOpenRoleSwitcher, 
  notifications = [], 
  onOpenAiDrawer, 
  onOpenCopilot, 
  onOpenExecutiveReport, 
  onOpenCommandPalette, 
  onOpenVoiceAssistant, 
  onOpenPredictiveMaintenance, 
  onOpenSlaPenaltyCalculator, 
  onOpenTroubleshooter,
  onOpenExporter,
  onOpenShare,
  onOpenHelpline,
  onOpenWhatsappBroadcast,
  onOpenOcrScanner,
  onOpenShowcase,
  onNavigateToHome,
  onAddToast,
  currentLang,
  onChangeLang,
  onToggleMobileMenu,
  isMobileMenuOpen
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const t = fontTranslations[currentLang] || fontTranslations.en;

  const roleBadges = {
    bank_employee: 'badge-blue',
    it_support_engineer: 'badge-emerald',
    it_administrator: 'badge-purple',
    it_manager: 'badge-amber',
  };

  const roleLabels = {
    bank_employee: 'Bank Employee',
    it_support_engineer: 'IT Engineer',
    it_administrator: 'IT Administrator',
    it_manager: 'IT Manager / VP',
  };

  const handleEnableDesktopAlerts = async () => {
    const res = await requestNotificationPermission();
    if (res === 'granted') {
      sendDesktopNotification('BankIT360 Real-Time Alerts Enabled 📲', {
        body: 'Windows Desktop Push Notifications active. You will receive instant OS alerts for P1 banking outages & SLA breaches.'
      });
      if (onAddToast) onAddToast('Desktop Push Enabled 📲', 'Real Windows OS native notifications activated!', 'success');
    } else {
      if (onAddToast) onAddToast('Notification Notice', 'Desktop notification permission was denied or restricted by browser settings.', 'warning');
    }
  };

  return (
    <header role="banner" className="h-16 border-b border-white/10 bg-[#060608]/90 backdrop-blur-2xl sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6 shadow-2xl transition-colors font-sans">
      {/* Left: Mobile Menu Toggle & Brand */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={onToggleMobileMenu}
          aria-label="Toggle mobile navigation menu"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 lg:hidden shrink-0 transition-colors"
          title="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-[#eb3d26]" /> : <Menu className="w-5 h-5 text-white/80" />}
        </button>

        <BankLogo size="md" />

        {/* Return to Public Home / Landing Page */}
        {onNavigateToHome && (
          <button
            onClick={onNavigateToHome}
            aria-label="Return to public animated landing home page"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white/90 hover:text-white font-bold text-xs shadow-sm transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-[#eb3d26]" />
            <span>Public Home</span>
          </button>
        )}

        {/* Why BankIT360 Unique Showcase Trigger */}
        <button
          onClick={onOpenShowcase}
          aria-label="View why BankIT360 is unique"
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 hover:from-amber-500/25 hover:to-orange-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs shadow-xs transition-all"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>⭐ Why Unique?</span>
        </button>

        {/* Global Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          aria-label="Open command search palette"
          className="hidden xl:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-all"
        >
          <Search className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium">Search...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-mono shadow-xs">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right: Global Actions Bar */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Multi-Language Selector Dropdown */}
        <div className="relative">
          <select
            value={currentLang}
            onChange={(e) => onChangeLang(e.target.value)}
            aria-label="Select application language"
            className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-[11px] sm:text-xs focus:outline-none cursor-pointer shadow-xs"
          >
            <option value="en">🇬🇧 EN</option>
            <option value="hi">🇮🇳 HI</option>
            <option value="es">🇪🇸 ES</option>
            <option value="fr">🇫🇷 FR</option>
          </select>
        </div>

        {/* Enable Real OS Desktop Push Notifications */}
        <button
          onClick={handleEnableDesktopAlerts}
          aria-label="Enable real-time OS desktop push notifications"
          title="Enable Desktop Push Notifications"
          className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 border border-white/10 transition-all relative shrink-0"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-[#eb3d26] absolute top-1 right-1 animate-ping"></span>
        </button>

        {/* Voice AI Command Trigger */}
        <button
          onClick={onOpenVoiceAssistant}
          aria-label="Activate voice AI command assistant"
          title="Voice AI Command Input"
          className="p-1.5 sm:p-2 rounded-xl bg-[#eb3d26]/15 hover:bg-[#eb3d26]/25 text-[#eb3d26] border border-[#eb3d26]/30 transition-all shrink-0"
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* AI Screenshot OCR Scanner */}
        <button
          onClick={onOpenOcrScanner}
          aria-label="Open AI screenshot OCR error scanner"
          title="AI Screenshot OCR Error Scanner"
          className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-bold shadow-xs transition-all"
        >
          <ScanText className="w-4 h-4 text-purple-400" />
          <span>OCR</span>
        </button>

        {/* AI Co-Pilot Assistant Button */}
        <button
          onClick={onOpenCopilot}
          aria-label="Open AI Co-Pilot Assistant"
          className="flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-gradient-to-r from-[#eb3d26] via-rose-600 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs shadow-glow transition-all shrink-0 border border-amber-300/30"
        >
          <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
          <span className="hidden xs:inline">{t.aiCopilot}</span>
        </button>

        {/* Custom PDF/Word Exporter */}
        <button
          onClick={onOpenExporter}
          aria-label="Export platform reports to PDF or Word"
          title="Export Reports to PDF/Word"
          className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/90 border border-white/15 text-xs font-bold shadow-sm transition-all"
        >
          <Download className="w-4 h-4 text-[#eb3d26]" />
          <span>Export</span>
        </button>

        {/* 24/7 Support Helpline */}
        <button
          onClick={onOpenHelpline}
          aria-label="Open 24/7 banking IT support helpline directory"
          title="24/7 IT Support Helpline"
          className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-bold shadow-xs transition-all"
        >
          <PhoneCall className="w-4 h-4 text-rose-400" />
          <span className="hidden md:inline">Helpline</span>
        </button>

        {/* Active Persona Switcher Pill */}
        <button
          onClick={onOpenRoleSwitcher}
          aria-label={`Switch user role persona, currently ${activeUser.name}`}
          className="flex items-center space-x-2 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-left transition-all shadow-sm group shrink-0"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#eb3d26] to-amber-500 flex items-center justify-center text-xs font-black text-white shadow-xs">
            {activeUser.name.charAt(0)}
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-bold text-white group-hover:text-[#eb3d26] flex items-center space-x-1">
              <span>{activeUser.name}</span>
              <ChevronDown className="w-3 h-3 text-white/40" />
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase bg-white/10 text-white/70">
              {roleLabels[activeUser.role] || activeUser.role}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}

export default memo(NavbarComponent);

