import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import Navbar from './components/Navbar';
import TrailheadHeader from './components/TrailheadHeader';
import Sidebar from './components/Sidebar';
import LiveSimulationBar from './components/LiveSimulationBar';
import BroadcastStatusStories from './components/BroadcastStatusStories';
import PinLoginModal from './components/PinLoginModal';
import ToastContainer from './components/ToastContainer';
import MobileBottomNav from './components/MobileBottomNav';
import DashboardPage from './pages/DashboardPage';
import LandingHomePage from './pages/LandingHomePage';

// Lazy Loaded Modals & Drawers
const RoleSwitcherModal = lazy(() => import('./components/RoleSwitcherModal'));
const TicketCreateModal = lazy(() => import('./components/TicketCreateModal'));
const TicketDetailModal = lazy(() => import('./components/TicketDetailModal'));
const AIModelDrawer = lazy(() => import('./components/AIModelDrawer'));
const AICopilotDrawer = lazy(() => import('./components/AICopilotDrawer'));
const ExecutiveReportModal = lazy(() => import('./components/ExecutiveReportModal'));
const CommandPaletteModal = lazy(() => import('./components/CommandPaletteModal'));
const VoiceAssistantModal = lazy(() => import('./components/VoiceAssistantModal'));
const PredictiveMaintenanceDrawer = lazy(() => import('./components/PredictiveMaintenanceDrawer'));
const SlaPenaltyModal = lazy(() => import('./components/SlaPenaltyModal'));
const RcaGeneratorModal = lazy(() => import('./components/RcaGeneratorModal'));
const InteractiveTroubleshooterModal = lazy(() => import('./components/InteractiveTroubleshooterModal'));
const DocumentExporterModal = lazy(() => import('./components/DocumentExporterModal'));
const SecureShareModal = lazy(() => import('./components/SecureShareModal'));
const HelplineModal = lazy(() => import('./components/HelplineModal'));
const VoiceTicketStudioModal = lazy(() => import('./components/VoiceTicketStudioModal'));
const OcrScannerModal = lazy(() => import('./components/OcrScannerModal'));
const PlatformShowcaseModal = lazy(() => import('./components/PlatformShowcaseModal'));
const WhatsappBroadcastDrawer = lazy(() => import('./components/WhatsappBroadcastDrawer'));
const UserManagementModal = lazy(() => import('./components/UserManagementModal'));
const BranchManagementModal = lazy(() => import('./components/BranchManagementModal'));
const RecurringProblemModal = lazy(() => import('./components/RecurringProblemModal'));

// Lazy Loaded Pages
const TicketsPage = lazy(() => import('./pages/TicketsPage'));
const IncidentsPage = lazy(() => import('./pages/IncidentsPage'));
const AssetsPage = lazy(() => import('./pages/AssetsPage'));
const AccessPage = lazy(() => import('./pages/AccessPage'));
const BranchHealthPage = lazy(() => import('./pages/BranchHealthPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const SlaPage = lazy(() => import('./pages/SlaPage'));
const AuditPage = lazy(() => import('./pages/AuditPage'));
const TopologyPage = lazy(() => import('./pages/TopologyPage'));
const BranchMapPage = lazy(() => import('./pages/BranchMapPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const AtmCashPage = lazy(() => import('./pages/AtmCashPage'));
const TechDispatchPage = lazy(() => import('./pages/TechDispatchPage'));
const PowerGridPage = lazy(() => import('./pages/PowerGridPage'));
const ShiftHandoverPage = lazy(() => import('./pages/ShiftHandoverPage'));
const MyLearningPage = lazy(() => import('./pages/MyLearningPage'));
const RecommendationsPage = lazy(() => import('./pages/RecommendationsPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const MultiLevelSupportPage = lazy(() => import('./pages/MultiLevelSupportPage'));
const CustomerFeedbackPage = lazy(() => import('./pages/CustomerFeedbackPage'));
const DatabaseLatencyPage = lazy(() => import('./pages/DatabaseLatencyPage'));
const EnergySaverPage = lazy(() => import('./pages/EnergySaverPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const SelfHealingPage = lazy(() => import('./pages/SelfHealingPage'));

import { 
  INITIAL_BRANCHES, 
  USERS, 
  INITIAL_TICKETS, 
  INITIAL_INCIDENTS, 
  INITIAL_ASSETS, 
  INITIAL_ACCESS_REQUESTS, 
  INITIAL_AUDIT_LOGS 
} from './services/mockData';

export default function App() {
  // Landing Page vs Live Console View Mode
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Multi-Language i18n State ('en', 'hi', 'es', 'fr')
  const [currentLang, setCurrentLang] = useState('en');

  // Application Persistent State with localStorage sync
  const [branches, setBranches] = useState(() => {
    try {
      const s = localStorage.getItem('bankit_branches');
      return s ? JSON.parse(s) : INITIAL_BRANCHES;
    } catch {
      return INITIAL_BRANCHES;
    }
  });

  const [usersList, setUsersList] = useState(() => {
    try {
      const s = localStorage.getItem('bankit_users');
      return s ? JSON.parse(s) : USERS;
    } catch {
      return USERS;
    }
  });

  const [tickets, setTickets] = useState(() => {
    try {
      const s = localStorage.getItem('bankit_tickets');
      return s ? JSON.parse(s) : INITIAL_TICKETS;
    } catch {
      return INITIAL_TICKETS;
    }
  });

  const [incidents, setIncidents] = useState(() => {
    try {
      const s = localStorage.getItem('bankit_incidents');
      return s ? JSON.parse(s) : INITIAL_INCIDENTS;
    } catch {
      return INITIAL_INCIDENTS;
    }
  });

  const [assets, setAssets] = useState(() => {
    try {
      const s = localStorage.getItem('bankit_assets');
      return s ? JSON.parse(s) : INITIAL_ASSETS;
    } catch {
      return INITIAL_ASSETS;
    }
  });

  const [accessRequests, setAccessRequests] = useState(() => {
    try {
      const s = localStorage.getItem('bankit_access');
      return s ? JSON.parse(s) : INITIAL_ACCESS_REQUESTS;
    } catch {
      return INITIAL_ACCESS_REQUESTS;
    }
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const s = localStorage.getItem('bankit_audit');
      return s ? JSON.parse(s) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  // Active Persona & Navigation
  const [activeUser, setActiveUser] = useState(() => usersList[0] || USERS[0]);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('bankit_branches', JSON.stringify(branches)); }, [branches]);
  useEffect(() => { localStorage.setItem('bankit_users', JSON.stringify(usersList)); }, [usersList]);
  useEffect(() => { localStorage.setItem('bankit_tickets', JSON.stringify(tickets)); }, [tickets]);
  useEffect(() => { localStorage.setItem('bankit_incidents', JSON.stringify(incidents)); }, [incidents]);
  useEffect(() => { localStorage.setItem('bankit_assets', JSON.stringify(assets)); }, [assets]);
  useEffect(() => { localStorage.setItem('bankit_access', JSON.stringify(accessRequests)); }, [accessRequests]);
  useEffect(() => { localStorage.setItem('bankit_audit', JSON.stringify(auditLogs)); }, [auditLogs]);

  // Toast System State
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((title, message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Modals & Drawers State
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [isTicketCreateOpen, setIsTicketCreateOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isExecutiveReportOpen, setIsExecutiveReportOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [isPredictiveOpen, setIsPredictiveOpen] = useState(false);
  const [isSlaPenaltyOpen, setIsSlaPenaltyOpen] = useState(false);
  const [selectedRcaIncident, setSelectedRcaIncident] = useState(null);
  const [isTroubleshooterOpen, setIsTroubleshooterOpen] = useState(false);
  const [isExporterOpen, setIsExporterOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState(false);
  const [isOcrScannerOpen, setIsOcrScannerOpen] = useState(false);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWhatsappOpen, setIsWhatsappOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [isBranchManagementOpen, setIsBranchManagementOpen] = useState(false);
  const [isRecurringOpen, setIsRecurringOpen] = useState(false);

  const handleOcrScanComplete = useCallback((scannedData) => {
    const newTicket = {
      id: `TICK-${Math.floor(8000 + Math.random() * 1000)}`,
      title: scannedData.title || 'OCR Scanned Banking Error',
      description: scannedData.description || 'Auto-extracted error details from image scan.',
      category: scannedData.category || 'Software',
      priority: scannedData.priority || 'P1',
      status: 'Open',
      branchId: activeUser?.branchId || 'BR-101',
      requesterId: activeUser?.id,
      requesterName: activeUser?.name,
      assignedToId: 'U-002',
      assignedToName: 'James Wilson',
      createdAt: new Date().toISOString(),
      slaDeadline: new Date(Date.now() + (scannedData.priority === 'P1' ? 4 : 8) * 3600 * 1000).toISOString(),
      isSlaBreached: false,
      aiSuggestedCategory: scannedData.category,
      aiConfidence: 0.95,
      comments: []
    };

    setTickets(prev => [newTicket, ...prev]);
    addToast('OCR Screenshot Scanned 📷', `Auto-created ${newTicket.id} (${newTicket.category}, ${newTicket.priority}) from error screenshot!`, 'success');
  }, [activeUser, addToast]);

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Ticket Assigned', message: 'TICK-8022 assigned to James Wilson (P1 Critical)', time: '10m ago', isRead: false },
    { id: 2, title: 'SLA Warning Alert', message: 'TICK-8018 approaching 1h SLA deadline at Airport Branch', time: '25m ago', isRead: false },
    { id: 3, title: 'Access Request Pending', message: 'Raj Sharma requested SWIFT Gateway Access Level 2', time: '1h ago', isRead: false },
  ]);

  // --- CRUD Handlers ---

  // User CRUD
  const handleCreateUser = useCallback((newUser) => {
    setUsersList(prev => [newUser, ...prev]);
    const newAudit = {
      id: `LOG-${Date.now() % 10000}`,
      userId: activeUser?.id,
      userName: activeUser?.name,
      action: 'USER_PROVISIONED',
      entityType: 'User',
      entityId: newUser.id,
      details: `Provisioned banking user ${newUser.name} with role ${newUser.role}`,
      ip: '10.240.14.33',
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newAudit, ...prev]);
    addToast('Staff Provisioned ✅', `User ${newUser.name} (${newUser.id}) added to staff directory.`, 'success');
  }, [activeUser, addToast]);

  const handleUpdateUserRole = useCallback((userId, newRole) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    addToast('Role Updated 🔐', `User ${userId} permissions updated to ${newRole}.`, 'info');
  }, [addToast]);

  const handleToggleUserStatus = useCallback((userId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        addToast('Status Changed ⚡', `User ${u.name} is now ${nextStatus}.`, nextStatus === 'Active' ? 'success' : 'warning');
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  }, [addToast]);

  const handleDeleteUser = useCallback((userId) => {
    setUsersList(prev => prev.filter(u => u.id !== userId));
    addToast('Staff Deprovisioned 🗑️', `User ${userId} removed from system.`, 'info');
  }, [addToast]);

  // Branch CRUD
  const handleCreateBranch = useCallback((newBranch) => {
    setBranches(prev => [newBranch, ...prev]);
    const newAudit = {
      id: `LOG-${Date.now() % 10000}`,
      userId: activeUser?.id,
      userName: activeUser?.name,
      action: 'BRANCH_COMMISSIONED',
      entityType: 'Branch',
      entityId: newBranch.id,
      details: `Commissioned new branch node ${newBranch.name} (${newBranch.id})`,
      ip: '10.240.14.33',
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newAudit, ...prev]);
    addToast('Branch Commissioned 🏢', `Branch ${newBranch.name} (${newBranch.id}) added to bank topology network.`, 'success');
  }, [activeUser, addToast]);

  const handleDeleteBranch = useCallback((branchId) => {
    setBranches(prev => prev.filter(b => b.id !== branchId));
    addToast('Branch Decommissioned 🛑', `Branch ${branchId} removed from network topology.`, 'warning');
  }, [addToast]);

  // Ticket CRUD
  const handleCreateTicket = useCallback((newTicket) => {
    setTickets(prev => [newTicket, ...prev]);
    const newAuditLog = {
      id: `LOG-${5005 + Date.now() % 10000}`,
      userId: activeUser?.id,
      userName: activeUser?.name,
      action: 'TICKET_CREATED',
      entityType: 'Ticket',
      entityId: newTicket.id,
      details: `Created ticket "${newTicket.title}" (${newTicket.category}, ${newTicket.priority})`,
      ip: '10.240.14.33',
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newAuditLog, ...prev]);
    addToast('Ticket Created Successfully', `Submitted ${newTicket.id} (${newTicket.category}) to IT Helpdesk`, 'success');
  }, [activeUser, addToast]);

  const handleUpdateTicketStatus = useCallback((ticketId, newStatus) => {
    let targetBranch = 'BR-101';
    setTickets(prev => {
      const match = prev.find(t => t.id === ticketId);
      if (match) targetBranch = match.branchId;
      return prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t);
    });
    setSelectedTicket(prev => prev && prev.id === ticketId ? { ...prev, status: newStatus } : prev);
    
    const actionName = newStatus === 'Resolved' ? 'TICKET_RESOLVED' : newStatus === 'Closed' ? 'TICKET_CLOSED' : 'TICKET_STATUS_UPDATED';
    const newAuditLog = {
      id: `LOG-${5005 + Date.now() % 10000}`,
      userId: activeUser?.id,
      userName: activeUser?.name,
      action: actionName,
      entityType: 'Ticket',
      entityId: ticketId,
      details: newStatus === 'Resolved' 
        ? `Resolved ticket ${ticketId} — SOP solution archived into Knowledge Engine. Branch ${targetBranch} Health Score restored.`
        : newStatus === 'Closed'
        ? `Closed ticket ${ticketId} — Audit block cryptographically verified and sealed.`
        : `Updated ticket ${ticketId} status to ${newStatus}`,
      ip: '10.240.14.33',
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newAuditLog, ...prev]);

    if (newStatus === 'Resolved') {
      addToast('Branch Health Score Recalculated 📈', `Branch ${targetBranch} recovered health score (+12 pts) following resolution of ticket ${ticketId}`, 'success');
    }
  }, [activeUser, addToast]);

  const handleEscalateTicket = useCallback((ticketId, newTier) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, escalationTier: newTier } : t));
    setSelectedTicket(prev => prev && prev.id === ticketId ? { ...prev, escalationTier: newTier } : prev);
  }, []);

  const handleDeleteTicket = useCallback((ticketId) => {
    setTickets(prev => prev.filter(t => t.id !== ticketId));
    if (selectedTicket?.id === ticketId) setSelectedTicket(null);
  }, [selectedTicket]);

  const handleAddTicketComment = useCallback((ticketId, comment) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, comments: [...t.comments, comment] };
      }
      return t;
    }));
    setSelectedTicket(prev => prev && prev.id === ticketId ? { ...prev, comments: [...prev.comments, comment] } : prev);
    addToast('Comment Posted', `Added update note to ticket ${ticketId}`, 'info');
  }, [addToast]);

  // Incident CRUD
  const handleCreateIncident = useCallback((newInc) => {
    setIncidents(prev => [newInc, ...prev]);
    const newAudit = {
      id: `LOG-${5005 + Date.now() % 10000}`,
      userId: activeUser?.id,
      userName: activeUser?.name,
      action: 'INCIDENT_LOGGED',
      entityType: 'Incident',
      entityId: newInc.id,
      details: `Logged major incident: ${newInc.title}`,
      ip: '10.240.14.33',
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newAudit, ...prev]);
    addToast('Major Incident Logged', `${newInc.incidentCode} (${newInc.severity}) registered`, 'error');
  }, [activeUser, addToast]);

  const handleUpdateIncidentStatus = useCallback((incId, newStatus) => {
    setIncidents(prev => prev.map(i => i.id === incId ? { ...i, status: newStatus } : i));
  }, []);

  const handleDeleteIncident = useCallback((incId) => {
    setIncidents(prev => prev.filter(i => i.id !== incId));
  }, []);

  // Asset CRUD
  const handleCreateAsset = useCallback((newAsset) => {
    setAssets(prev => [newAsset, ...prev]);
    addToast('Asset Registered', `Registered ${newAsset.name} (${newAsset.tag})`, 'success');
  }, [addToast]);

  const handleUpdateAssetStatus = useCallback((assetId, newStatus) => {
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, status: newStatus } : a));
    addToast('Asset Status Updated 💻', `Asset ${assetId} marked as ${newStatus}`, 'info');
  }, [addToast]);

  const handleDeleteAsset = useCallback((assetId) => {
    setAssets(prev => prev.filter(a => a.id !== assetId));
    addToast('Asset Decommissioned 🗑️', `Asset ${assetId} removed from registry.`, 'warning');
  }, [addToast]);

  // Access Request CRUD
  const handleCreateAccessRequest = useCallback((newReq) => {
    setAccessRequests(prev => [newReq, ...prev]);
    const newAudit = {
      id: `LOG-${5005 + Date.now() % 10000}`,
      userId: activeUser?.id,
      userName: activeUser?.name,
      action: 'ACCESS_REQUESTED',
      entityType: 'AccessRequest',
      entityId: newReq.id,
      details: `Requested access to ${newReq.applicationName} (${newReq.accessLevel})`,
      ip: '10.240.14.33',
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newAudit, ...prev]);
  }, [activeUser]);

  const handleApproveAccess = useCallback((reqId) => {
    setAccessRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Granted', itApproval: 'Approved', grantedAt: new Date().toISOString() } : r));
    const newAudit = {
      id: `LOG-${5005 + Date.now() % 10000}`,
      userId: activeUser?.id,
      userName: activeUser?.name,
      action: 'ACCESS_GRANTED',
      entityType: 'AccessRequest',
      entityId: reqId,
      details: `Approved application access request ${reqId}`,
      ip: '10.240.14.33',
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newAudit, ...prev]);
    addToast('Access Granted', `Approved access request ${reqId}`, 'success');
  }, [activeUser, addToast]);

  // Chaos Engineering & Simulation Triggers
  const handleSimulatePowerSpike = useCallback(() => {
    const spikeInc = {
      id: `INC-2026-SPIKE-${Date.now()}`,
      incidentCode: `INC-SPIKE-99`,
      title: 'CRITICAL: Utility Grid Surge Faulted Primary Catalyst Switch Stack',
      severity: 'P1 - Critical',
      status: 'Investigating',
      branchId: 'BR-102',
      branchName: 'Metro Central Branch',
      reportedBy: 'Automated SNMP Monitoring',
      leadEngineer: 'James Wilson',
      affectedServices: ['All Teller Workstations', 'Drive-Thru ATM', 'VoIP Gateway'],
      rootCause: 'Utility grid power surge tripped primary PSU circuit breaker.',
      createdAt: new Date().toISOString(),
      targetResolution: new Date(Date.now() + 2 * 3600 * 1000).toISOString()
    };

    setIncidents(prev => [spikeInc, ...prev]);
    setNotifications(prev => [
      { id: Date.now(), title: '⚡ CRITICAL OUTAGE DETECTED', message: 'Metro Central Switch Stack Power Failure! Health score dropped to 42.', time: 'Just now', isRead: false },
      ...prev
    ]);

    addToast('Power Spike Simulated', 'Utility surge outage injected at Metro Central Branch!', 'error');
  }, [addToast]);

  const handleSimulatePeakTraffic = useCallback(() => {
    const peakTickets = [
      {
        id: `TICK-${Math.floor(8800 + Math.random() * 100)}`,
        title: 'Peak Hour Queue Timeout on Teller Counter #4',
        description: 'High customer transaction volume causing core banking SQL query latency.',
        category: 'Core Banking App',
        priority: 'P1',
        status: 'Open',
        branchId: 'BR-101',
        requesterId: 'U-001',
        requesterName: 'Alex Morgan',
        assignedToId: 'U-002',
        assignedToName: 'James Wilson',
        createdAt: new Date().toISOString(),
        slaDeadline: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
        isSlaBreached: false,
        aiSuggestedCategory: 'Core Banking App',
        aiConfidence: 0.97,
        comments: []
      }
    ];

    setTickets(prev => [...peakTickets, ...prev]);
    addToast('Peak Traffic Injected', 'Simulated 3 high-volume teller queue tickets.', 'warning');
  }, [addToast]);

  const handleResetSimulation = useCallback(() => {
    setTickets(INITIAL_TICKETS);
    setIncidents(INITIAL_INCIDENTS);
    addToast('System Reset', 'Restored baseline IT telemetry dataset.', 'info');
  }, [addToast]);

  const handleExecuteVoiceCommand = useCallback((cmdText) => {
    addToast('Voice Command Executed', `Processing voice instruction: "${cmdText}"`, 'info');
    if (cmdText.toLowerCase().includes('printer') || cmdText.toLowerCase().includes('fix')) {
      setIsTroubleshooterOpen(true);
    } else if (cmdText.toLowerCase().includes('critical') || cmdText.toLowerCase().includes('health')) {
      setActiveTab('branch-health');
    } else if (cmdText.toLowerCase().includes('reboot') || cmdText.toLowerCase().includes('switch')) {
      setActiveTab('topology');
    }
  }, [addToast]);

  if (showLandingPage) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
        <LandingHomePage 
          onLaunchConsole={(initialRole) => {
            if (initialRole) {
              const matched = USERS.find(u => u.role === initialRole);
              if (matched) setActiveUser(matched);
            }
            setIsAuthModalOpen(true);
          }}
          onOpenAuth={(initialRole) => {
            if (initialRole) {
              const matched = USERS.find(u => u.role === initialRole);
              if (matched) setActiveUser(matched);
            }
            setIsAuthModalOpen(true);
          }}
          currentLang={currentLang}
        />

        {/* Bank-Grade Custom PIN Authentication Modal */}
        <PinLoginModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthenticateSuccess={() => {
            setIsAuthModalOpen(false);
            setShowLandingPage(false);
          }}
          onAddToast={addToast}
          onSelectUser={setActiveUser}
          activeUser={activeUser}
        />

        {/* Floating Toast Notifications */}
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col font-sans selection:bg-[#eb3d26] selection:text-white transition-colors duration-300">
      {/* Simulation Control Bar */}
      <LiveSimulationBar 
        onSimulatePowerSpike={handleSimulatePowerSpike}
        onSimulatePeakTraffic={handleSimulatePeakTraffic}
        onResetSimulation={handleResetSimulation}
      />

      {/* WhatsApp / Instagram Broadcast Status & Stories Bar */}
      <BroadcastStatusStories 
        onAddToast={addToast} 
        onOpenWhatsapp={() => setIsWhatsappOpen(true)} 
      />

      {/* Top Navbar & Sub-Nav with Dropdowns */}
      <TrailheadHeader 
        activeTab={activeTab}
        onNavigate={setActiveTab}
        activeUser={activeUser}
        onOpenRoleSwitcher={() => setIsAuthModalOpen(true)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenOcrScanner={() => setIsOcrScannerOpen(true)}
        onOpenVoiceAssistant={() => setIsVoiceStudioOpen(true)}
        onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
        onOpenHelpline={() => setIsHelplineOpen(true)}
        onOpenExporter={() => setIsExporterOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
        onOpenPredictiveMaintenance={() => setIsPredictiveOpen(true)}
        onOpenSlaPenalty={() => setIsSlaPenaltyOpen(true)}
        onOpenTroubleshooter={() => setIsTroubleshooterOpen(true)}
        onOpenWhatsapp={() => setIsWhatsappOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenExecutiveReport={() => setIsExecutiveReportOpen(true)}
        onOpenUserManagement={() => setIsUserManagementOpen(true)}
        onOpenBranchManagement={() => setIsBranchManagementOpen(true)}
        onOpenRecurringModal={() => setIsRecurringOpen(true)}
        onNavigateToHome={() => setShowLandingPage(true)}
        currentLang={currentLang}
        onChangeLang={setCurrentLang}
      />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userRole={activeUser.role}
          onOpenTicketModal={() => setIsTicketCreateOpen(true)}
          onOpenShowcase={() => setIsShowcaseOpen(true)}
          currentLang={currentLang}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        {/* Dynamic Page Content with Smooth Fluid Tab Transitions */}
        <main role="main" className="flex-1 min-w-0 max-w-full overflow-y-auto overflow-x-hidden p-3.5 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-[380px] space-y-4 animate-in fade-in duration-300">
              <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-brand/20 border-t-brand animate-spin"></div>
                <div className="w-6 h-6 rounded-full border-2 border-cyan-400/30 border-b-cyan-400 animate-spin absolute" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-brand animate-ping"></span>
                <span className="text-xs font-mono text-white/70 tracking-wider uppercase">Loading BankIT360 Module...</span>
              </div>
            </div>
          }>
            <div key={activeTab} className="page-transition w-full">
              {activeTab === 'dashboard' && (
                <DashboardPage 
                  tickets={tickets} 
                  incidents={incidents} 
                  branches={branches} 
                  assets={assets}
                  onOpenTicketModal={() => setIsTicketCreateOpen(true)}
                  onNavigate={setActiveTab}
                  currentLang={currentLang}
                  activeUser={activeUser}
                  onOpenOcrScanner={() => setIsOcrScannerOpen(true)}
                  onOpenCopilot={() => setIsCopilotOpen(true)}
                  onOpenExporter={() => setIsExporterOpen(true)}
                  onOpenHelpline={() => setIsHelplineOpen(true)}
                  onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
                  onOpenPredictiveMaintenance={() => setIsPredictiveOpen(true)}
                  onOpenSlaPenalty={() => setIsSlaPenaltyOpen(true)}
                  onOpenTroubleshooter={() => setIsTroubleshooterOpen(true)}
                  onOpenWhatsapp={() => setIsWhatsappOpen(true)}
                />
              )}

              {activeTab === 'tickets' && (
                <TicketsPage 
                  tickets={tickets}
                  onOpenCreateModal={() => setIsTicketCreateOpen(true)}
                  onSelectTicket={(t) => setSelectedTicket(t)}
                />
              )}

              {activeTab === 'power-grid' && (
                <PowerGridPage branches={branches} />
              )}

              {activeTab === 'shift-handover' && (
                <ShiftHandoverPage />
              )}

              {activeTab === 'incidents' && (
                <IncidentsPage 
                  incidents={incidents}
                  branches={branches}
                  onCreateIncident={handleCreateIncident}
                  onUpdateIncidentStatus={handleUpdateIncidentStatus}
                  onDeleteIncident={handleDeleteIncident}
                  onGenerateRca={(inc) => setSelectedRcaIncident(inc)}
                  onAddToast={addToast}
                />
              )}

              {activeTab === 'multi-level-support' && (
                <MultiLevelSupportPage 
                  tickets={tickets}
                  onSelectTicket={(t) => setSelectedTicket(t)}
                  onAddToast={addToast}
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === 'self-healing' && (
                <SelfHealingPage 
                  onAddToast={addToast}
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === 'database-latency' && (
                <DatabaseLatencyPage 
                  onAddToast={addToast}
                />
              )}

              {activeTab === 'energy-saver' && (
                <EnergySaverPage 
                  onAddToast={addToast}
                />
              )}

              {activeTab === 'leaderboard' && (
                <LeaderboardPage 
                  onAddToast={addToast}
                />
              )}

              {activeTab === 'customer-feedback' && (
                <CustomerFeedbackPage 
                  onAddToast={addToast}
                />
              )}

              {activeTab === 'topology' && (
                <TopologyPage branches={branches} />
              )}

              {activeTab === 'atm-cash' && (
                <AtmCashPage branches={branches} />
              )}

              {activeTab === 'tech-dispatch' && (
                <TechDispatchPage />
              )}

              {activeTab === 'branch-map' && (
                <BranchMapPage 
                  branches={branches}
                  tickets={tickets}
                  incidents={incidents}
                  assets={assets}
                  onNavigate={setActiveTab}
                  onSelectTicket={(t) => setSelectedTicket(t)}
                />
              )}

              {activeTab === 'branch-health' && (
                <BranchHealthPage 
                  branches={branches}
                  tickets={tickets}
                  incidents={incidents}
                  assets={assets}
                  onOpenBranchManagement={() => setIsBranchManagementOpen(true)}
                  onOpenRecurringModal={() => setIsRecurringOpen(true)}
                  onSelectBranch={(b) => {
                    setActiveTab('dashboard');
                  }}
                />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsPage 
                  tickets={tickets}
                  incidents={incidents}
                  branches={branches}
                  assets={assets}
                  onOpenExecutiveReport={() => setIsExecutiveReportOpen(true)}
                />
              )}

              {activeTab === 'sla' && (
                <SlaPage 
                  tickets={tickets}
                  onSelectTicket={(t) => setSelectedTicket(t)}
                  onOpenSlaPenaltyModal={() => setIsSlaPenaltyOpen(true)}
                />
              )}

              {activeTab === 'assets' && (
                <AssetsPage 
                  assets={assets}
                  branches={branches}
                  onCreateAsset={handleCreateAsset}
                  onUpdateAssetStatus={handleUpdateAssetStatus}
                  onDeleteAsset={handleDeleteAsset}
                  onAddToast={addToast}
                />
              )}

              {activeTab === 'access' && (
                <AccessPage 
                  accessRequests={accessRequests}
                  onApproveAccess={handleApproveAccess}
                  onCreateAccessRequest={handleCreateAccessRequest}
                  activeUser={activeUser}
                  onAddToast={addToast}
                />
              )}

              {activeTab === 'security' && (
                <SecurityPage 
                  auditLogs={auditLogs} 
                  onAddToast={addToast}
                />
              )}

              {activeTab === 'my-learning' && (
                <MyLearningPage 
                  onAddToast={addToast} 
                  onNavigate={setActiveTab} 
                />
              )}

              {activeTab === 'recommendations' && (
                <RecommendationsPage 
                  branches={INITIAL_BRANCHES}
                  tickets={tickets}
                  onAddToast={addToast}
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === 'favorites' && (
                <FavoritesPage 
                  branches={INITIAL_BRANCHES}
                  tickets={tickets}
                  onSelectTicket={(t) => setSelectedTicket(t)}
                  onNavigate={setActiveTab}
                  onAddToast={addToast}
                />
              )}

              {activeTab === 'audit' && (
                <AuditPage 
                  auditLogs={auditLogs} 
                  onAddToast={addToast}
                />
              )}
            </div>
          </Suspense>
        </main>
      </div>

      {/* Lazy Modals & Drawers */}
      <Suspense fallback={null}>
        {/* Ticket Creation Modal */}
        {isTicketCreateOpen && (
          <TicketCreateModal 
            isOpen={isTicketCreateOpen}
            onClose={() => setIsTicketCreateOpen(false)}
            onCreateTicket={handleCreateTicket}
            activeUser={activeUser}
            branches={INITIAL_BRANCHES}
            currentLang={currentLang}
            onOpenOcrScanner={() => setIsOcrScannerOpen(true)}
          />
        )}

        {/* Ticket Detail Drawer Modal */}
        {selectedTicket && (
          <TicketDetailModal 
            isOpen={!!selectedTicket}
            ticket={selectedTicket}
            allTickets={tickets}
            onClose={() => setSelectedTicket(null)}
            onUpdateStatus={handleUpdateTicketStatus}
            onAddComment={handleAddTicketComment}
            onDeleteTicket={handleDeleteTicket}
            onEscalateTicket={handleEscalateTicket}
            activeUser={activeUser}
            currentLang={currentLang}
            onAddToast={addToast}
          />
        )}

        {/* Global Security PIN / Persona Authentication Modal */}
        {isAuthModalOpen && (
          <PinLoginModal 
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onAuthenticateSuccess={() => setIsAuthModalOpen(false)}
            onAddToast={addToast}
            onSelectUser={setActiveUser}
            activeUser={activeUser}
          />
        )}

        {/* User & Staff Directory CRUD Management Modal */}
        {isUserManagementOpen && (
          <UserManagementModal 
            isOpen={isUserManagementOpen}
            onClose={() => setIsUserManagementOpen(false)}
            users={usersList}
            branches={branches}
            onCreateUser={handleCreateUser}
            onUpdateRole={handleUpdateUserRole}
            onToggleStatus={handleToggleUserStatus}
            onDeleteUser={handleDeleteUser}
            onAddToast={addToast}
          />
        )}

        {/* Branch Network Commissioning CRUD Modal */}
        {isBranchManagementOpen && (
          <BranchManagementModal 
            isOpen={isBranchManagementOpen}
            onClose={() => setIsBranchManagementOpen(false)}
            branches={branches}
            onCreateBranch={handleCreateBranch}
            onDeleteBranch={handleDeleteBranch}
            onSelectBranch={(b) => {
              setActiveTab('topology');
            }}
            onAddToast={addToast}
          />
        )}

        {/* AI Recurring Problem & Outage Detector Modal */}
        {isRecurringOpen && (
          <RecurringProblemModal 
            isOpen={isRecurringOpen}
            onClose={() => setIsRecurringOpen(false)}
            tickets={tickets}
            branches={branches}
            onAddToast={addToast}
            onOpenRunbook={(cat) => {
              setIsTroubleshooterOpen(true);
            }}
          />
        )}

        {/* AI Model Performance Metrics Drawer */}
        {isAiDrawerOpen && (
          <AIModelDrawer 
            isOpen={isAiDrawerOpen}
            onClose={() => setIsAiDrawerOpen(false)}
          />
        )}

        {/* AI Co-Pilot Chat Assistant Drawer */}
        {isCopilotOpen && (
          <AICopilotDrawer 
            isOpen={isCopilotOpen}
            onClose={() => setIsCopilotOpen(false)}
            tickets={tickets}
            incidents={incidents}
            branches={branches}
            assets={assets}
            onNavigate={setActiveTab}
            currentLang={currentLang}
          />
        )}

        {/* Executive Automated Operations Report Modal */}
        {isExecutiveReportOpen && (
          <ExecutiveReportModal 
            isOpen={isExecutiveReportOpen}
            onClose={() => setIsExecutiveReportOpen(false)}
            tickets={tickets}
            incidents={incidents}
            branches={branches}
            assets={assets}
          />
        )}

        {/* Global Quick Command Palette Modal */}
        {isCommandPaletteOpen && (
          <CommandPaletteModal 
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onNavigate={setActiveTab}
            onOpenTicketModal={() => setIsTicketCreateOpen(true)}
            onOpenCreateTicket={() => setIsTicketCreateOpen(true)}
            onOpenCopilot={() => setIsCopilotOpen(true)}
            onOpenExecutiveReport={() => setIsExecutiveReportOpen(true)}
            onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
            onOpenPredictiveMaintenance={() => setIsPredictiveOpen(true)}
            onOpenSlaPenalty={() => setIsSlaPenaltyOpen(true)}
            onOpenTroubleshooter={() => setIsTroubleshooterOpen(true)}
            onOpenWhatsapp={() => setIsWhatsappOpen(true)}
            onOpenUserManagement={() => setIsUserManagementOpen(true)}
            onOpenBranchManagement={() => setIsBranchManagementOpen(true)}
            onOpenRecurringModal={() => setIsRecurringOpen(true)}
            tickets={tickets}
            incidents={incidents}
            branches={branches}
          />
        )}

        {/* WhatsApp & SMS Outage Broadcast Notification Drawer */}
        {isWhatsappOpen && (
          <WhatsappBroadcastDrawer 
            isOpen={isWhatsappOpen}
            onClose={() => setIsWhatsappOpen(false)}
            onAddToast={addToast}
          />
        )}

        {/* Voice Command AI Assistant Modal */}
        {isVoiceAssistantOpen && (
          <VoiceAssistantModal 
            isOpen={isVoiceAssistantOpen}
            onClose={() => setIsVoiceAssistantOpen(false)}
            onExecuteCommand={handleExecuteVoiceCommand}
            onAddToast={addToast}
          />
        )}

        {/* Multi-Lingual Voice AI Ticket Studio Modal */}
        {isVoiceStudioOpen && (
          <VoiceTicketStudioModal 
            isOpen={isVoiceStudioOpen}
            onClose={() => setIsVoiceStudioOpen(false)}
            onCreateTicket={handleCreateTicket}
            activeUser={activeUser}
            onAddToast={addToast}
          />
        )}

        {/* Predictive Maintenance & Health Telemetry Drawer */}
        {isPredictiveOpen && (
          <PredictiveMaintenanceDrawer 
            isOpen={isPredictiveOpen}
            onClose={() => setIsPredictiveOpen(false)}
            branches={branches}
            tickets={tickets}
            assets={assets}
          />
        )}

        {/* Regulatory SLA Penalty Calculator Modal */}
        {isSlaPenaltyOpen && (
          <SlaPenaltyModal 
            isOpen={isSlaPenaltyOpen}
            onClose={() => setIsSlaPenaltyOpen(false)}
            tickets={tickets}
          />
        )}

        {/* Root Cause Analysis (RCA) Incident Generator Modal */}
        {selectedRcaIncident && (
          <RcaGeneratorModal 
            isOpen={!!selectedRcaIncident}
            incident={selectedRcaIncident}
            onClose={() => setSelectedRcaIncident(null)}
          />
        )}

        {/* Interactive Guided IT Troubleshooter Modal */}
        {isTroubleshooterOpen && (
          <InteractiveTroubleshooterModal 
            isOpen={isTroubleshooterOpen}
            onClose={() => setIsTroubleshooterOpen(false)}
            onAddToast={addToast}
          />
        )}

        {/* Advanced PDF / Word Report Exporter */}
        {isExporterOpen && (
          <DocumentExporterModal
            isOpen={isExporterOpen}
            onClose={() => setIsExporterOpen(false)}
            onAddToast={addToast}
          />
        )}

        {/* Secure Privacy Link Sharing */}
        {isShareOpen && (
          <SecureShareModal
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
            onAddToast={addToast}
          />
        )}

        {/* 24/7 IT Emergency Helpline Directory */}
        {isHelplineOpen && (
          <HelplineModal
            isOpen={isHelplineOpen}
            onClose={() => setIsHelplineOpen(false)}
            onAddToast={addToast}
          />
        )}

        {/* AI Screenshot OCR Error Scanner */}
        {isOcrScannerOpen && (
          <OcrScannerModal
            isOpen={isOcrScannerOpen}
            onClose={() => setIsOcrScannerOpen(false)}
            onScanComplete={handleOcrScanComplete}
          />
        )}

        {/* Platform Showcase Modal */}
        {isShowcaseOpen && (
          <PlatformShowcaseModal
            isOpen={isShowcaseOpen}
            onClose={() => setIsShowcaseOpen(false)}
            onNavigate={setActiveTab}
          />
        )}
      </Suspense>

      {/* Toast Floating Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Responsive Mobile Bottom Navigation Bar */}
      <MobileBottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
      />
    </div>
  );
}
