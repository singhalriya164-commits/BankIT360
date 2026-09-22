import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Building2, 
  User, 
  X, 
  Sparkles,
  Fingerprint,
  Eye,
  EyeOff,
  Wrench,
  Settings,
  LineChart,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  LockKeyhole,
  Smartphone,
  AlertTriangle,
  Clock,
  RefreshCw,
  FileCheck,
  Check
} from 'lucide-react';
import { USERS } from '../services/mockData';
import { simulateSecureHash, generateDynamicOTP } from '../services/securityEngine';

// Targeted Role Configurations
const ROLE_CONFIGS = {
  bank_employee: {
    id: 'bank_employee',
    label: 'Branch Staff & Tellers',
    shortLabel: 'Branch Staff',
    icon: User,
    badge: '1. Teller & Branch Staff',
    gradient: 'from-[#ff2d78] via-[#ec4899] to-[#00f5ff]',
    buttonGradient: 'from-[#ff2d78] to-[#ec4899] hover:from-[#ec4899] hover:to-[#ff2d78] shadow-[#ff2d78]/30',
    borderActive: 'border-[#ff2d78]',
    accentColor: 'text-[#ff2d78]',
    loginIdPlaceholder: 'Enter Employee ID (e.g. raj.sharma@bankit360.com)',
    loginIdLabel: 'Bank Employee / Teller ID',
    defaultUserId: 'U-001', // Raj Sharma
    demoPassword: '••••••••',
    buttonText: 'Verify Password → Step 2 MFA',
    capabilities: [
      'Report computer, printer & ATM cash errors',
      'Instant 1-click AI problem diagnosis',
      'Branch-scoped data access (Metro Central)',
      'Live SMS updates & ticket resolution tracking'
    ]
  },
  it_support_engineer: {
    id: 'it_support_engineer',
    label: 'IT Support & Hardware Engineer',
    shortLabel: 'IT Support',
    icon: Wrench,
    badge: '2. Support Engineer',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    buttonGradient: 'from-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 shadow-blue-500/30',
    borderActive: 'border-cyan-400',
    accentColor: 'text-cyan-400',
    loginIdPlaceholder: 'Enter Technician ID (e.g. michael.chang@bankit360.com)',
    loginIdLabel: 'IT Support Engineer ID',
    defaultUserId: 'U-002', // Michael Chang
    demoPassword: '••••••••',
    buttonText: 'Verify Password → Step 2 MFA',
    capabilities: [
      'Accept & triage incoming branch tickets',
      'Scan error screens via OCR AI classifier',
      'GPS navigation to branch for urgent repairs',
      'Manage spare parts & sub-15 min resolution timers'
    ]
  },
  it_manager: {
    id: 'it_manager',
    label: 'Branch & IT Operations Manager',
    shortLabel: 'IT Admin',
    icon: Settings,
    badge: '3. Branch Manager',
    gradient: 'from-purple-600 via-violet-600 to-pink-600',
    buttonGradient: 'from-purple-600 to-pink-600 hover:from-pink-500 hover:to-purple-600 shadow-purple-500/30',
    borderActive: 'border-purple-400',
    accentColor: 'text-purple-400',
    loginIdPlaceholder: 'Enter Manager ID (e.g. elena.rostova@bankit360.com)',
    loginIdLabel: 'Branch Manager ID',
    defaultUserId: 'U-003', // Elena Rostova
    demoPassword: '••••••••',
    buttonText: 'Verify Password → Step 2 MFA',
    capabilities: [
      'Cross-branch live health map (15 Branches)',
      'Click "WHY?" button for instant Root Cause analysis',
      'Review & approve privileged application access',
      'Inspect Security Command Center & Audit logs'
    ]
  },
  senior_management: {
    id: 'senior_management',
    label: 'Bank Leadership / Director / CTO',
    shortLabel: 'Executive',
    icon: LineChart,
    badge: '4. Bank Executive',
    gradient: 'from-[#00f5ff] via-pink-600 to-[#ff2d78]',
    buttonGradient: 'from-[#00f5ff] to-[#ff2d78] hover:from-[#ff2d78] hover:to-[#00f5ff] shadow-[#00f5ff]/30',
    borderActive: 'border-[#00f5ff]',
    accentColor: 'text-[#00f5ff]',
    loginIdPlaceholder: 'Enter Executive Key (e.g. vikram.mehta@bankit360.com)',
    loginIdLabel: 'Executive Director Key',
    defaultUserId: 'U-004', // Vikram Mehta
    demoPassword: '••••••••',
    buttonText: 'Verify Password → Step 2 MFA',
    capabilities: [
      'Track 99.999% bank network uptime guarantee',
      'View ₹14.2 Cr total money saved in penalty prevention',
      'Compare Before vs After BankIT360 performance'
    ]
  }
};

export default function PinLoginModal({ 
  isOpen, 
  onClose, 
  onAuthenticateSuccess, 
  onAddToast, 
  onSelectUser, 
  activeUser 
}) {
  // Main Mode Tab: 'SIGNIN' | 'SIGNUP' | 'RESET'
  const [mainTab, setMainTab] = useState('SIGNIN');

  // Active Selected Role Tab
  const [selectedRole, setSelectedRole] = useState(
    activeUser?.role && ROLE_CONFIGS[activeUser.role] ? activeUser.role : 'bank_employee'
  );

  // Authentication Flow Steps: 'CREDENTIALS' | 'MFA_OTP' | 'LOCKED_OUT'
  const [authStep, setAuthStep] = useState('CREDENTIALS');

  // Form Inputs
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('492815');
  const [otpCountdown, setOtpCountdown] = useState(60);

  // Sign Up Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupRole, setSignupRole] = useState('bank_employee');
  const [signupBranch, setSignupBranch] = useState('BR-101');
  const [signupPassword, setSignupPassword] = useState('');

  // Reset PIN Form State
  const [resetEmail, setResetEmail] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [resetStep, setResetStep] = useState(1); // 1: Email -> 2: OTP & New Password

  // Failed Attempts & Account Lockout Tracker
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [isBioAuthenticating, setIsBioAuthenticating] = useState(false);

  const currentRoleConfig = ROLE_CONFIGS[selectedRole] || ROLE_CONFIGS.bank_employee;
  const currentDemoUser = USERS.find(u => u.id === currentRoleConfig.defaultUserId) || USERS[0];

  // Auto-fill demo credentials when switching role tab
  useEffect(() => {
    if (!isOpen) return;
    const defaultU = USERS.find(u => u.id === currentRoleConfig.defaultUserId);
    if (defaultU) {
      setLoginId(defaultU.email);
      setPassword('BankIT@2026!');
    }
    setAuthStep('CREDENTIALS');
  }, [selectedRole, isOpen, currentRoleConfig.defaultUserId]);

  // MFA Countdown Timer
  useEffect(() => {
    let timer;
    if (authStep === 'MFA_OTP' && otpCountdown > 0) {
      timer = setInterval(() => setOtpCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [authStep, otpCountdown]);

  // Lockout Countdown Timer
  useEffect(() => {
    let lockTimer;
    if (authStep === 'LOCKED_OUT' && lockoutTimer > 0) {
      lockTimer = setInterval(() => setLockoutTimer(prev => prev - 1), 1000);
    } else if (lockoutTimer === 0 && authStep === 'LOCKED_OUT') {
      setAuthStep('CREDENTIALS');
      setFailedAttempts(0);
    }
    return () => clearInterval(lockTimer);
  }, [authStep, lockoutTimer]);

  if (!isOpen) return null;

  const handleRoleTabClick = (roleKey) => {
    setSelectedRole(roleKey);
    const targetUser = USERS.find(u => u.id === ROLE_CONFIGS[roleKey].defaultUserId);
    if (targetUser) {
      setLoginId(targetUser.email);
      setPassword('BankIT@2026!');
    }
    setAuthStep('CREDENTIALS');
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      if (onAddToast) onAddToast('Missing Information', 'Please complete all required fields.', 'warning');
      return;
    }

    const newUser = {
      id: `U-${Math.floor(100 + Math.random() * 900)}`,
      name: signupName,
      email: signupEmail,
      role: signupRole,
      roleCategory: signupRole === 'bank_employee' ? '1. Bank Employees (Primary Users)' : signupRole === 'it_support_engineer' ? '2. IT Support Team (Core Users)' : '3. IT Manager / Admin',
      title: signupRole === 'bank_employee' ? 'Branch Teller / Staff' : signupRole === 'it_support_engineer' ? 'L2 IT Engineer' : 'Operations Manager',
      branchId: signupBranch,
      department: 'Retail Banking Operations'
    };

    if (onSelectUser) onSelectUser(newUser);
    if (onAddToast) {
      onAddToast('Staff Registered Successfully 🚀', `Welcome ${signupName}! Initialized with ${newUser.role} permissions.`, 'success');
    }
    onAuthenticateSuccess();
  };

  const handleResetPinSubmit = (e) => {
    e.preventDefault();
    if (resetStep === 1) {
      if (!resetEmail.trim()) {
        if (onAddToast) onAddToast('Email Required', 'Please enter your bank email address.', 'warning');
        return;
      }
      setResetStep(2);
      if (onAddToast) onAddToast('OTP Dispatched 📱', 'Reset verification code sent to registered device: 582109', 'info');
    } else {
      if (!resetNewPassword.trim() || resetNewPassword.length < 6) {
        if (onAddToast) onAddToast('Password Too Short', 'Password must be at least 6 characters.', 'warning');
        return;
      }
      if (onAddToast) onAddToast('Password Reset Successfully 🔒', 'Your password has been updated. Please sign in.', 'success');
      setMainTab('SIGNIN');
      setResetStep(1);
    }
  };

  // Step 1: Submit Password & Trigger MFA
  const handleVerifyPassword = (e) => {
    e.preventDefault();
    if (!loginId.trim() || !password.trim()) {
      if (onAddToast) onAddToast('Missing Credentials', 'Please enter your ID and password.', 'warning');
      return;
    }

    const isValidPassword = password.length >= 6;

    if (!isValidPassword) {
      const newFails = failedAttempts + 1;
      setFailedAttempts(newFails);
      if (newFails >= 5) {
        setAuthStep('LOCKED_OUT');
        setLockoutTimer(120); // 2 minutes lockout
        if (onAddToast) onAddToast('Account Locked Out 🚨', '5 failed password attempts. Account temporarily locked for 2 minutes.', 'danger');
        return;
      }
      if (onAddToast) onAddToast('Invalid Credentials ❌', `Incorrect password. ${5 - newFails} attempts remaining before account lockout.`, 'danger');
      return;
    }

    // Password passed -> Generate MFA Code
    const otp = generateDynamicOTP(6);
    setGeneratedOTP(otp);
    setMfaCode(otp);
    setOtpCountdown(60);
    setAuthStep('MFA_OTP');

    if (onAddToast) {
      onAddToast('Password Verified 🔒', `MFA OTP sent to registered mobile (+91 ••••• ••891): ${otp}`, 'info');
    }
  };

  // Step 2: Verify MFA Code & Complete Secure Login
  const handleVerifyMFA = (e) => {
    e.preventDefault();
    if (mfaCode.trim() !== generatedOTP) {
      if (onAddToast) onAddToast('Invalid MFA Code', 'The 6-digit verification code is incorrect.', 'danger');
      return;
    }

    const matchedUser = USERS.find(
      u => u.email.toLowerCase() === loginId.trim().toLowerCase() ||
           u.id.toLowerCase() === loginId.trim().toLowerCase()
    ) || currentDemoUser;

    if (onSelectUser) onSelectUser(matchedUser);
    if (onAddToast) {
      onAddToast(
        'Identity Verified 🛡️', 
        `MFA Succeeded. Signed in as ${matchedUser.name} (${matchedUser.title})`, 
        'success'
      );
    }
    onAuthenticateSuccess();
  };

  // Instant 1-Click Demo Login
  const handleQuickDemoLogin = (userToLogin) => {
    const user = userToLogin || currentDemoUser;
    if (onSelectUser) onSelectUser(user);
    if (onAddToast) {
      onAddToast(
        'Authentication Verified 🔒', 
        `Signed in as ${user.name} (${user.title}) with 2-Factor Clearance`, 
        'success'
      );
    }
    onAuthenticateSuccess();
  };

  // Biometric Passkey Simulation
  const handleBiometricAuth = () => {
    setIsBioAuthenticating(true);
    setTimeout(() => {
      setIsBioAuthenticating(false);
      handleQuickDemoLogin(currentDemoUser);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl text-white font-sans p-3 sm:p-4 modal-backdrop-smooth">
      
      {/* Container with Obsidian Glass Styling & Pop In Motion */}
      <div className="w-full max-w-xl bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_90px_rgba(0,0,0,0.95)] space-y-6 relative overflow-hidden max-h-[95vh] overflow-y-auto modal-pop-in">
        
        {/* Dynamic Glow Accents */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[100px] opacity-25 pointer-events-none bg-[#ff2d78]" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none bg-[#00f5ff]" />

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close authentication modal"
            className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header Branding */}
        <div className="flex items-center space-x-3 text-left relative z-10 border-b border-white/10 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff2d78] via-[#ec4899] to-[#00f5ff] flex items-center justify-center text-white shadow-glow shrink-0 p-0.5">
            <div className="w-full h-full bg-[#0a0b10] rounded-[14px] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#ff2d78]" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-white">BankIT<span className="text-[#ff2d78]">360</span></span>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#ff2d78]/20 text-[#ff2d78] border border-[#ff2d78]/40 tracking-wider">
                SECURITY &amp; COMPLIANCE GATEWAY
              </span>
            </div>
            <p className="text-xs text-white/60 font-medium">Multi-Factor Authentication &amp; Role-Based Authorization</p>
          </div>
        </div>

        {/* MODE SWITCHER: SIGN IN vs STAFF SIGN UP vs RESET PIN */}
        <div className="flex rounded-2xl bg-white/5 p-1 border border-white/10 relative z-10 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMainTab('SIGNIN')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
              mainTab === 'SIGNIN' ? 'bg-[#ff2d78] text-white shadow-glow' : 'text-white/60 hover:text-white'
            }`}
          >
            🔑 Secure Sign In
          </button>
          <button
            type="button"
            onClick={() => setMainTab('SIGNUP')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
              mainTab === 'SIGNUP' ? 'bg-emerald-600 text-white shadow-glow-emerald' : 'text-white/60 hover:text-white'
            }`}
          >
            📝 Staff Sign Up
          </button>
          <button
            type="button"
            onClick={() => setMainTab('RESET')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
              mainTab === 'RESET' ? 'bg-cyan-600 text-white shadow-glow' : 'text-white/60 hover:text-white'
            }`}
          >
            🔄 Reset PIN / OTP
          </button>
        </div>

        {/* STAFF SIGN UP MODE */}
        {mainTab === 'SIGNUP' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-4 text-left relative z-10 animate-in fade-in text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <span className="font-bold block">New Banking Staff Self-Registration</span>
              <span className="text-[11px] text-white/70">Create a secure profile with branch clearance and biometric passkey enrollment.</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-white/80 font-bold mb-1">Full Employee Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Deshmukh"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-2xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">Official Bank Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="ananya.deshmukh@bankit360.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-2xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 font-bold mb-1">Assigned Role</label>
                  <select
                    value={signupRole}
                    onChange={(e) => setSignupRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-2xl text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="bank_employee">Branch Staff / Teller</option>
                    <option value="it_support_engineer">L2 Support Engineer</option>
                    <option value="it_manager">IT Operations Manager</option>
                    <option value="senior_management">Executive Leadership</option>
                    <option value="external_vendor">External AMC Vendor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 font-bold mb-1">Primary Branch</label>
                  <select
                    value={signupBranch}
                    onChange={(e) => setSignupBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-2xl text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="BR-101">Downtown Main (BR-101)</option>
                    <option value="BR-102">Metro Central (BR-102)</option>
                    <option value="BR-103">Financial District (BR-103)</option>
                    <option value="BR-104">Westside Commercial (BR-104)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">Set Security Password / PIN (Min 6 Chars) *</label>
                <input
                  type="password"
                  required
                  placeholder="Create secure password..."
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-2xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-glow-emerald transition-all cursor-pointer"
            >
              Complete Registration &amp; Sign In →
            </button>
          </form>
        )}

        {/* RESET PIN / OTP MODE */}
        {mainTab === 'RESET' && (
          <form onSubmit={handleResetPinSubmit} className="space-y-4 text-left relative z-10 animate-in fade-in text-xs">
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              <span className="font-bold block">Self-Service PIN &amp; Password Reset</span>
              <span className="text-[11px] text-white/70">Verify identity with registered 2-Factor OTP to set a new security credential.</span>
            </div>

            {resetStep === 1 ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-white/80 font-bold mb-1">Enter Registered Bank Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. raj.sharma@bankit360.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-2xl text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-glow transition-all cursor-pointer"
                >
                  Send Verification OTP →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-white/80 font-bold mb-1">Enter 6-Digit OTP Sent to Device (Demo: 582109)</label>
                  <input
                    type="text"
                    required
                    placeholder="582109"
                    value={resetOtp}
                    onChange={(e) => setResetOtp(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-2xl text-white focus:outline-none focus:border-cyan-500 font-mono tracking-widest text-center text-base"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-bold mb-1">New Security Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter at least 6 characters..."
                    value={resetNewPassword}
                    onChange={(e) => setResetNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-2xl text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-glow transition-all cursor-pointer"
                >
                  Confirm &amp; Update Password →
                </button>
              </div>
            )}
          </form>
        )}

        {/* ACCOUNT LOCKOUT WARNING BANNER */}
        {mainTab === 'SIGNIN' && authStep === 'LOCKED_OUT' && (
          <div className="p-5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-left space-y-2 relative z-10 animate-pulse">
            <div className="flex items-center gap-2 text-rose-400 font-black text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Security Lockout Triggered (Brute Force Protection)</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              5 consecutive failed password attempts were detected. As a banking security measure, this account is temporarily locked for <strong className="text-white font-mono">{lockoutTimer}s</strong>.
            </p>
            <div className="pt-2 flex items-center justify-between text-xs text-white/60">
              <span>Automatic Reset In: {lockoutTimer} seconds</span>
              <button 
                onClick={() => {
                  setLockoutTimer(0);
                  setAuthStep('CREDENTIALS');
                  setFailedAttempts(0);
                }}
                className="text-xs font-bold text-[#ff2d78] underline hover:text-white cursor-pointer"
              >
                Reset Lockout (Demo Mode)
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: ROLE SELECTOR & CREDENTIALS FORM */}
        {mainTab === 'SIGNIN' && authStep === 'CREDENTIALS' && (
          <>
            {/* TARGETED ROLE SEGMENTED TABS */}
            <div className="space-y-2 relative z-10">
              <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-white/70">
                <span>Select Banking Role Clearance:</span>
                <span className="text-[10px] font-mono text-[#00f5ff]">RBAC_LEVEL_ENFORCED</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.values(ROLE_CONFIGS).map((cfg) => {
                  const Icon = cfg.icon;
                  const isActive = selectedRole === cfg.id;
                  return (
                    <button
                      key={cfg.id}
                      type="button"
                      onClick={() => handleRoleTabClick(cfg.id)}
                      className={`p-2.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-2 cursor-pointer ${
                        isActive
                          ? 'bg-[#ff2d78]/15 border-[#ff2d78] shadow-glow text-white'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#ff2d78]' : 'text-white/60'}`} />
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#ff2d78] animate-ping" />}
                      </div>
                      <span className="text-[11px] font-black leading-tight block">{cfg.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Role Capability Banner */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-left space-y-2 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white">{currentRoleConfig.label}</span>
                <span className="text-[10px] font-bold text-white/50">{currentRoleConfig.badge}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-white/70">
                {currentRoleConfig.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-[#00f5ff] shrink-0" />
                    <span className="truncate">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Login Credentials Form */}
            <form onSubmit={handleVerifyPassword} className="space-y-4 text-left relative z-10">
              
              {/* ID / Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/80 flex items-center justify-between">
                  <span>{currentRoleConfig.loginIdLabel}</span>
                  <span className="text-[10px] text-white/40 font-mono">Branch: {currentDemoUser.branchId || 'BR-102'}</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder={currentRoleConfig.loginIdPlaceholder}
                    className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/15 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff2d78] transition-colors"
                  />
                </div>
              </div>

              {/* Password with Simulated Hash Badge */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white/80">Account Password</label>
                  <span className="text-[10px] text-[#00f5ff] font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Argon2id Hash Protected</span>
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full pl-10 pr-10 py-3 bg-black/60 border border-white/15 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff2d78] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-white/40 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Security Hash Footprint Indicator */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-[10px] font-mono text-white/50 flex items-center justify-between truncate">
                <span className="truncate">Digest: {simulateSecureHash(password || 'demo').slice(0, 42)}...</span>
                <span className="text-[#00f5ff] font-bold shrink-0 ml-2">OWASP Compliant</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff] text-white font-extrabold text-xs uppercase tracking-wider shadow-glow hover:opacity-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{currentRoleConfig.buttonText}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin(currentDemoUser)}
                    className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-[11px] font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#00f5ff] fill-[#00f5ff]" />
                    <span>1-Click Demo Bypass</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBiometricAuth}
                    disabled={isBioAuthenticating}
                    className="py-2.5 px-3 rounded-xl bg-[#00f5ff]/15 hover:bg-[#00f5ff]/25 border border-[#00f5ff]/30 text-[#00f5ff] text-[11px] font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Fingerprint className="w-3.5 h-3.5" />
                    <span>{isBioAuthenticating ? 'Scanning...' : 'TouchID / Passkey'}</span>
                  </button>
                </div>
              </div>

            </form>
          </>
        )}

        {/* STEP 2: MULTI-FACTOR AUTHENTICATION (MFA / OTP) */}
        {authStep === 'MFA_OTP' && (
          <div className="space-y-5 text-left relative z-10 animate-in fade-in duration-300">
            
            <div className="p-4 rounded-2xl bg-[#ff2d78]/10 border border-[#ff2d78]/30 space-y-1">
              <div className="flex items-center gap-2 text-[#ff2d78] font-bold text-xs">
                <Smartphone className="w-4 h-4" />
                <span>Multi-Factor Authentication Required</span>
              </div>
              <p className="text-xs text-white/80">
                A 6-digit dynamic OTP verification code has been dispatched to your bank registered device.
              </p>
            </div>

            <form onSubmit={handleVerifyMFA} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-white/80">Enter 6-Digit OTP Code</label>
                  <span className="font-mono text-[#00f5ff] font-bold">Expires in: {otpCountdown}s</span>
                </div>

                <input
                  type="text"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 492815"
                  className="w-full text-center tracking-[0.5em] font-mono text-2xl py-3 bg-black/80 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-[#ff2d78] transition-colors"
                />

                <p className="text-[11px] text-white/50 text-center">
                  Demo Auto-Filled Code: <strong className="text-[#00f5ff] font-mono">{generatedOTP}</strong>
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#ff2d78] hover:bg-white hover:text-black text-white font-extrabold text-xs uppercase tracking-wider shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify OTP &amp; Complete Login →</span>
                </button>

                <div className="flex items-center justify-between text-xs text-white/60 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const newOtp = generateDynamicOTP(6);
                      setGeneratedOTP(newOtp);
                      setMfaCode(newOtp);
                      setOtpCountdown(60);
                      if (onAddToast) onAddToast('New OTP Sent', `Fresh code: ${newOtp}`, 'info');
                    }}
                    className="hover:text-white underline cursor-pointer"
                  >
                    Resend OTP Code
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthStep('CREDENTIALS')}
                    className="hover:text-white cursor-pointer"
                  >
                    ← Back to Password
                  </button>
                </div>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
}
