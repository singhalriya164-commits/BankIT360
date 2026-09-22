// ============================================================================
// BankIT360 Security & Compliance Layer Engine (Architecture & Core Services)
// Identity → Access → Activity → Detection → Response → Audit
// Reference: OWASP Top 10, Zero-Trust Architecture, Defense-in-Depth
// Note: Simulated prototype controls for academic and evaluation purposes
// ============================================================================

// 1. ROLES & RBAC PERMISSION MATRIX
export const ROLES = {
  BANK_EMPLOYEE: {
    id: 'bank_employee',
    name: 'Bank Employee / Teller',
    category: '1. Primary Users',
    clearanceLevel: 'L1 - Branch Operations',
    allowedTabs: ['dashboard', 'tickets', 'access', 'power-grid', 'topology', 'branch-map'],
    canCreateTickets: true,
    canViewAllBranches: false,
    canApproveAccess: false,
    canManageUsers: false,
    canAccessSecuritySOC: false,
    canExportReports: false,
    canManageAssets: false,
    description: 'Frontline branch teller and customer desk officer with branch-scoped access.'
  },
  IT_SUPPORT_ENGINEER: {
    id: 'it_support_engineer',
    name: 'IT Support Engineer',
    category: '2. Core Operations',
    clearanceLevel: 'L2 - Technical Support',
    allowedTabs: ['dashboard', 'tickets', 'incidents', 'topology', 'power-grid', 'shift-handover', 'atm-cash', 'tech-dispatch', 'branch-map', 'assets', 'access', 'branch-health'],
    canCreateTickets: true,
    canViewAllBranches: false, // Scoped to assigned cluster
    canApproveAccess: false,
    canManageUsers: false,
    canAccessSecuritySOC: false,
    canExportReports: true,
    canManageAssets: true,
    description: 'Field engineer and hardware technician handling branch hardware, ATMs, and network routers.'
  },
  IT_ADMIN: {
    id: 'it_administrator',
    name: 'IT Administrator',
    category: '3. Admin Level',
    clearanceLevel: 'L3 - System Administrator',
    allowedTabs: ['dashboard', 'tickets', 'incidents', 'topology', 'power-grid', 'shift-handover', 'atm-cash', 'tech-dispatch', 'branch-map', 'security', 'assets', 'access', 'branch-health', 'analytics', 'sla', 'audit'],
    canCreateTickets: true,
    canViewAllBranches: true,
    canApproveAccess: true,
    canManageUsers: true,
    canAccessSecuritySOC: true,
    canExportReports: true,
    canManageAssets: true,
    description: 'System administrator managing user accounts, security policies, and enterprise hardware.'
  },
  IT_MANAGER: {
    id: 'it_manager',
    name: 'IT Operations Manager',
    category: '3. Admin Level',
    clearanceLevel: 'L3 - Operations Management',
    allowedTabs: ['dashboard', 'tickets', 'incidents', 'topology', 'power-grid', 'shift-handover', 'atm-cash', 'tech-dispatch', 'branch-map', 'security', 'assets', 'access', 'branch-health', 'analytics', 'sla', 'audit'],
    canCreateTickets: true,
    canViewAllBranches: true,
    canApproveAccess: true,
    canManageUsers: true,
    canAccessSecuritySOC: true,
    canExportReports: true,
    canManageAssets: true,
    description: 'Regional IT manager overseeing all 15 branches, incident response, and SLAs.'
  },
  EXTERNAL_VENDOR: {
    id: 'external_vendor',
    name: 'External Hardware Vendor',
    category: '5. Vendor Partners',
    clearanceLevel: 'L0 - Third Party Contractor',
    allowedTabs: ['tickets', 'assets'],
    canCreateTickets: false,
    canViewAllBranches: false,
    canApproveAccess: false,
    canManageUsers: false,
    canAccessSecuritySOC: false,
    canExportReports: false,
    canManageAssets: false,
    description: 'Third-party hardware vendor (e.g. NCR, Diebold, Cisco) restricted to assigned vendor maintenance tickets.'
  },
  SENIOR_MANAGEMENT: {
    id: 'senior_management',
    name: 'Bank Leadership / Director / CTO',
    category: '4. Executive Command',
    clearanceLevel: 'L4 - Executive Oversight',
    allowedTabs: ['dashboard', 'branch-health', 'analytics', 'sla', 'audit', 'security'],
    canCreateTickets: false,
    canViewAllBranches: true,
    canApproveAccess: true,
    canManageUsers: false,
    canAccessSecuritySOC: true,
    canExportReports: true,
    canManageAssets: false,
    description: 'Executive leadership with read-only enterprise telemetry, ROI analytics, and compliance audit exports.'
  }
};

// 2. SENSITIVE ACTIONS REQUIRING STEP-UP AUTHORIZATION / DUAL-SIGNOFF
export const SENSITIVE_ACTIONS = [
  { id: 'CHANGE_USER_ROLE', label: 'Modify User Role / Elevate Privileges', requiredSignoffs: 2, severity: 'HIGH' },
  { id: 'DEACTIVATE_USER', label: 'Deactivate Bank Staff Account', requiredSignoffs: 1, severity: 'MEDIUM' },
  { id: 'APPROVE_HIGH_RISK_ACCESS', label: 'Approve High-Risk SWIFT/Core Banking Access', requiredSignoffs: 2, severity: 'CRITICAL' },
  { id: 'DELETE_OR_ARCHIVE_ASSET', label: 'Decommission / Archive Banking Hardware Asset', requiredSignoffs: 1, severity: 'MEDIUM' },
  { id: 'REVOKE_ACTIVE_SESSIONS', label: 'Emergency Revocation of All User Sessions', requiredSignoffs: 1, severity: 'HIGH' },
  { id: 'OVERRIDE_SLA_POLICY', label: 'Modify Regulatory SLA Policy Deadlines', requiredSignoffs: 2, severity: 'HIGH' }
];

// 3. SECURE PASSWORD HASHING SIMULATOR (Argon2id / bcrypt representation)
export const simulateSecureHash = (plainPassword, salt = 'b360_s@lt_2026') => {
  // Representation of Argon2id hash with memory, iterations, parallelism parameters
  const pseudoHash = btoa(`${salt}:${plainPassword}:argon2id_v19_m65536_t3_p4`).slice(0, 32);
  return `$argon2id$v=19$m=65536,t=3,p=4$${btoa(salt).slice(0, 16)}$${pseudoHash}`;
};

// 4. MULTI-FACTOR AUTHENTICATION (MFA / TOTP) SIMULATION ENGINE
export const generateDynamicOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

// 5. RULE-BASED ACCESS REQUEST RISK SCORING ENGINE (0 - 100 Score)
export const calculateAccessRiskScore = ({
  employeeRole = 'bank_employee',
  department = 'Branch Operations',
  applicationName = 'SWIFT International Payments Gateway',
  accessLevel = 'Maker / Operator',
  deviceTrust = 'Managed Bank Laptop', // 'Managed Bank Laptop' | 'Personal Laptop (BYOD)' | 'Untrusted Device'
  requestHour = new Date().getHours(),
  hasPastViolations = false
}) => {
  let score = 0;
  const factors = [];

  // A. Application Sensitivity Factor (0 - 45 pts)
  const appLower = applicationName.toLowerCase();
  if (appLower.includes('swift') || appLower.includes('wire') || appLower.includes('settlement')) {
    score += 40;
    factors.push({ name: 'Critical Financial Gateway (SWIFT/Wire)', points: '+40', risk: 'HIGH' });
  } else if (appLower.includes('core banking') || appLower.includes('cbs') || appLower.includes('database')) {
    score += 45;
    factors.push({ name: 'Core Banking Master Database Access', points: '+45', risk: 'CRITICAL' });
  } else if (appLower.includes('loan') || appLower.includes('credit')) {
    score += 30;
    factors.push({ name: 'High-Value Commercial Credit Processing', points: '+30', risk: 'MEDIUM' });
  } else if (appLower.includes('vpn') || appLower.includes('remote')) {
    score += 20;
    factors.push({ name: 'Remote Network Perimeter Access (VPN)', points: '+20', risk: 'MEDIUM' });
  } else {
    score += 10;
    factors.push({ name: 'Standard IT Helpdesk / Internal Application', points: '+10', risk: 'LOW' });
  }

  // B. Role Eligibility & Privilege Level (0 - 25 pts)
  if (accessLevel.includes('Admin') || accessLevel.includes('Checker') || accessLevel.includes('Full Control')) {
    score += 25;
    factors.push({ name: 'Elevated Administrator / Checker Privileges Requested', points: '+25', risk: 'HIGH' });
  } else if (accessLevel.includes('Maker') || accessLevel.includes('Operator') || accessLevel.includes('Write')) {
    score += 15;
    factors.push({ name: 'Transaction Maker / Operator Privilege Level', points: '+15', risk: 'MEDIUM' });
  } else {
    score += 5;
    factors.push({ name: 'Read-Only / Inquiry Privilege Level', points: '+5', risk: 'LOW' });
  }

  // C. Device Trust Status (0 - 20 pts)
  if (deviceTrust === 'Untrusted Device') {
    score += 20;
    factors.push({ name: 'Access Requested from Unregistered / Untrusted Device', points: '+20', risk: 'HIGH' });
  } else if (deviceTrust === 'Personal Laptop (BYOD)') {
    score += 15;
    factors.push({ name: 'Personal BYOD Laptop without Endpoint Compliance', points: '+15', risk: 'MEDIUM' });
  } else {
    factors.push({ name: 'Encrypted & Managed Bank Asset (Compliant)', points: '+0', risk: 'SAFE' });
  }

  // D. Request Conditions / Time (0 - 15 pts)
  if (requestHour < 7 || requestHour > 20) {
    score += 15;
    factors.push({ name: 'Off-Hours Request (Outside Normal Branch Working Hours)', points: '+15', risk: 'MEDIUM' });
  }

  // E. Past Security Incidents
  if (hasPastViolations) {
    score += 15;
    factors.push({ name: 'User Has Past Failed MFA or Denied Access History', points: '+15', risk: 'HIGH' });
  }

  // Bound score between 5 and 98
  const finalScore = Math.min(Math.max(score, 8), 98);

  let riskLevel = 'LOW';
  let approvalPath = 'Single Branch Manager Approval';
  let badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';

  if (finalScore >= 70) {
    riskLevel = 'HIGH';
    approvalPath = 'Dual-Signoff Required (Branch Manager + Chief Information Security Officer)';
    badgeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
  } else if (finalScore >= 40) {
    riskLevel = 'MEDIUM';
    approvalPath = '2-Stage Verification (Branch Manager + IT Operations Lead)';
    badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  }

  return {
    score: finalScore,
    riskLevel,
    approvalPath,
    badgeColor,
    factors,
    evaluatedAt: new Date().toISOString()
  };
};

// 6. SUSPICIOUS ACTIVITY DETECTION ENGINE
export const INITIAL_SECURITY_ALERTS = [
  {
    id: 'SEC-ALERT-101',
    title: 'Multiple Failed Login Attempts (Brute Force Pattern)',
    severity: 'HIGH',
    user: 'Employee_102 (Raj Sharma)',
    branchId: 'BR-102',
    branchName: 'Metro Central Branch',
    timestamp: '10 minutes ago',
    sourceIp: '10.240.15.89 (Teller WS-04)',
    reason: '7 failed password attempts recorded within 4.5 minutes.',
    recommendedAction: 'Temporarily lock user credentials, revoke active sessions, and mandate SMS OTP verification.',
    status: 'Action Required',
    mitigated: false
  },
  {
    id: 'SEC-ALERT-102',
    title: 'Unusual Off-Hours Vault Door Vibration Sensor Alert',
    severity: 'CRITICAL',
    user: 'Physical Security Grid',
    branchId: 'BR-101',
    branchName: 'Downtown Main Branch',
    timestamp: '32 minutes ago',
    sourceIp: '10.240.10.201 (Vault Lock Controller)',
    reason: 'Seismic vibration anomaly detected on Strongroom Door #1 at 02:45 AM outside branch hours.',
    recommendedAction: 'Trigger CCTV auto-record, alert armed night guard patrol, and verify dual-custody key logs.',
    status: 'Investigating',
    mitigated: false
  },
  {
    id: 'SEC-ALERT-103',
    title: 'Sudden Privilege Escalation on Core Network Switch',
    severity: 'HIGH',
    user: 'Tech_409 (Michael Chang)',
    branchId: 'BR-104',
    branchName: 'Westside Commercial',
    timestamp: '1 hour ago',
    sourceIp: '10.240.14.33 (Field Diagnostic Laptop)',
    reason: 'Non-admin technician attempted SSH connection to Cisco C9300 Core VLAN 10 switch port.',
    recommendedAction: 'Enforce Step-Up Administrator approval and log terminal session audit video.',
    status: 'Mitigated',
    mitigated: true
  },
  {
    id: 'SEC-ALERT-104',
    title: 'Login from Unregistered & Untrusted Device Fingerprint',
    severity: 'MEDIUM',
    user: 'Officer_880 (David Ross)',
    branchId: 'BR-103',
    branchName: 'Financial District Plaza',
    timestamp: '2 hours ago',
    sourceIp: '198.51.100.14 (External ISP IP)',
    reason: 'MAC address & browser fingerprint mismatch against bank asset inventory register.',
    recommendedAction: 'Restrict to read-only guest portal until IT Helpdesk registers device serial number.',
    status: 'Mitigated',
    mitigated: true
  }
];

// 7. TAMPER-RESISTANT CRYPTOGRAPHIC AUDIT TRAIL LOGS (Hash Chaining Simulator)
export const INITIAL_TAMPER_AUDIT_LOGS = [
  {
    id: 'AUD-8801',
    blockIndex: 1042,
    userId: 'U-003',
    userName: 'Elena Rostova',
    action: 'ACCESS_APPROVAL_GRANTED',
    target: 'SWIFT Alliance Gateway (Req: REQ-ACC-901)',
    result: 'SUCCESS',
    sourceIp: '10.240.12.89',
    timestamp: '2026-08-15T09:30:00Z',
    previousHash: '8f4c2e1b9a7d3f0e5c8b2a1d4e7f0b3c2a1d4e7f0b3c2a1d4e7f0b3c2a1d4e7f',
    hashDigest: 'a3d8f1e2c4b5a6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1',
    verified: true
  },
  {
    id: 'AUD-8802',
    blockIndex: 1043,
    userId: 'U-001',
    userName: 'Raj Sharma',
    action: 'FAILED_LOGIN_ATTEMPT',
    target: 'Teller Portal WS-04',
    result: 'REJECTED (Invalid PIN)',
    sourceIp: '10.240.15.89',
    timestamp: '2026-08-15T09:35:00Z',
    previousHash: 'a3d8f1e2c4b5a6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1',
    hashDigest: 'b4e9f2a3d5c6b7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2',
    verified: true
  },
  {
    id: 'AUD-8803',
    blockIndex: 1044,
    userId: 'U-004',
    userName: 'Vikram Mehta',
    action: 'SECURITY_INCIDENT_RESOLVED',
    target: 'Account Lockout Auto-Reset (U-001)',
    result: 'SUCCESS (MFA Verified)',
    sourceIp: '10.240.10.4',
    timestamp: '2026-08-15T09:40:00Z',
    previousHash: 'b4e9f2a3d5c6b7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2',
    hashDigest: 'c5f0a3b4e6d7c8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3',
    verified: true
  },
  {
    id: 'AUD-8804',
    blockIndex: 1045,
    userId: 'U-002',
    userName: 'Michael Chang',
    action: 'ASSET_MAINTENANCE_LOGGED',
    target: 'Diebold ATM CS-5500 (AST-4013)',
    result: 'SUCCESS',
    sourceIp: '10.240.15.12',
    timestamp: '2026-08-15T10:15:00Z',
    previousHash: 'c5f0a3b4e6d7c8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3',
    hashDigest: 'd6a1b4c5f7e8d9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4',
    verified: true
  }
];

// 8. SECURITY IMPACT ANALYSIS & STOLEN ASSET INCIDENT WORKFLOW
export const executeStolenAssetIncidentWorkflow = (assetId, assetList = [], userList = []) => {
  const asset = assetList.find(a => a.id === assetId || a.tag === assetId) || {
    id: assetId || 'AST-4010',
    tag: 'BNK-NY-042',
    name: 'Dell OptiPlex 7090 Banking Workstation',
    assignedTo: 'Raj Sharma',
    branchName: 'Metro Central Branch',
    category: 'Workstation'
  };

  const assignedUser = userList.find(u => u.name === asset.assignedTo) || {
    id: 'U-001',
    name: asset.assignedTo || 'Raj Sharma',
    email: 'raj.sharma@bankit360.com',
    role: 'bank_employee',
    department: 'Branch Operations'
  };

  return {
    incidentId: `SEC-INC-${Math.floor(1000 + Math.random() * 9000)}`,
    asset,
    assignedUser,
    associatedApplications: [
      { name: 'Core Banking Teller Application', sensitivity: 'HIGH', tokenStatus: 'Active Session Revoked' },
      { name: 'SWIFT International Payments Terminal', sensitivity: 'CRITICAL', tokenStatus: 'Keys De-authorized' },
      { name: 'Internal Bank Email & Intranet', sensitivity: 'MEDIUM', tokenStatus: 'MFA Reset Enforced' }
    ],
    recommendedActions: [
      '1. Instant Revocation of all active JWT and OAuth session tokens.',
      '2. Remote trigger of device BitLocker / TPM crypto-erase lock.',
      '3. Mandatory credential password reset upon next login attempt.',
      '4. Dispatch physical security report to Branch Manager & CISO desk.',
      '5. Append immutable cryptographic entry to Tamper-Resistant Audit Log.'
    ],
    riskLevel: 'CRITICAL',
    status: 'Mitigation Automated',
    timestamp: new Date().toISOString()
  };
};

// 9. BACKEND AUTHORIZATION ENFORCEMENT SIMULATOR
export const enforceAuthorization = ({ user, action, resource, targetBranchId }) => {
  if (!user) return { authorized: false, reason: 'Authentication required. No active session token.' };

  const roleConfig = ROLES[user.role?.toUpperCase()] || ROLES.BANK_EMPLOYEE;

  // Cross-branch check:
  if (!roleConfig.canViewAllBranches && targetBranchId && user.branchId && user.branchId !== targetBranchId) {
    return {
      authorized: false,
      reason: `Access Denied: Your role (${roleConfig.name}) is restricted to authorized branch ${user.branchId}. Target branch ${targetBranchId} requires Elevated Cross-Branch clearance.`
    };
  }

  // Action check:
  if (action === 'DELETE_ASSET' && !roleConfig.canManageAssets) {
    return { authorized: false, reason: `Unauthorized Action: Role ${roleConfig.name} cannot decommission hardware assets.` };
  }

  if (action === 'APPROVE_ACCESS' && !roleConfig.canApproveAccess) {
    return { authorized: false, reason: `Unauthorized Action: Role ${roleConfig.name} cannot grant application access permissions.` };
  }

  if (action === 'VIEW_SOC' && !roleConfig.canAccessSecuritySOC) {
    return { authorized: false, reason: `Unauthorized Area: Cybersecurity Command Center requires L3/L4 Security Clearance.` };
  }

  return { authorized: true, reason: 'Authorized under RBAC least-privilege policy.' };
};
