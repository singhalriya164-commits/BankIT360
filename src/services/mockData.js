// Comprehensive Seed Data for BankIT360 Enterprise Prototype

export const INITIAL_BRANCHES = [
  { id: 'BR-101', name: 'Downtown Main Branch', code: 'MAIN-01', region: 'Metro East', city: 'New York', healthScore: 94, activeTickets: 4, openIncidents: 0, failedAssets: 1, manager: 'Sarah Jenkins', phone: '+1 212-555-0101' },
  { id: 'BR-102', name: 'Metro Central Branch', code: 'METRO-02', region: 'Metro East', city: 'New York', healthScore: 58, activeTickets: 12, openIncidents: 2, failedAssets: 4, manager: 'David Ross', phone: '+1 212-555-0102' },
  { id: 'BR-103', name: 'Financial District Plaza', code: 'FINDIS-03', region: 'Metro South', city: 'Chicago', healthScore: 88, activeTickets: 5, openIncidents: 0, failedAssets: 1, manager: 'Elena Rostova', phone: '+1 312-555-0103' },
  { id: 'BR-104', name: 'Westside Commercial', code: 'WEST-04', region: 'Western Region', city: 'San Francisco', healthScore: 72, activeTickets: 8, openIncidents: 1, failedAssets: 2, manager: 'Marcus Vance', phone: '+1 415-555-0104' },
  { id: 'BR-105', name: 'Tech Park Branch', code: 'TPARK-05', region: 'Western Region', city: 'San Jose', healthScore: 96, activeTickets: 2, openIncidents: 0, failedAssets: 0, manager: 'Anita Chen', phone: '+1 408-555-0105' },
  { id: 'BR-106', name: 'Suburban Hub Branch', code: 'SUB-06', region: 'Northern Region', city: 'Boston', healthScore: 82, activeTickets: 6, openIncidents: 0, failedAssets: 2, manager: 'Robert Thorne', phone: '+1 617-555-0106' },
  { id: 'BR-107', name: 'Airport Plaza Branch', code: 'AIR-07', region: 'Southern Region', city: 'Dallas', healthScore: 64, activeTickets: 9, openIncidents: 1, failedAssets: 3, manager: 'Carlos Gomez', phone: '+1 214-555-0107' },
  { id: 'BR-108', name: 'Harbor Bay Centre', code: 'HARBOR-08', region: 'Southern Region', city: 'Miami', healthScore: 91, activeTickets: 3, openIncidents: 0, failedAssets: 1, manager: 'Amanda Miller', phone: '+1 305-555-0108' },
  { id: 'BR-109', name: 'Northside Commercial', code: 'NORTH-09', region: 'Northern Region', city: 'Chicago', healthScore: 78, activeTickets: 7, openIncidents: 0, failedAssets: 2, manager: 'Kevin O\'Connor', phone: '+1 312-555-0109' },
  { id: 'BR-110', name: 'Park Avenue Branch', code: 'PARK-10', region: 'Metro East', city: 'New York', healthScore: 86, activeTickets: 4, openIncidents: 0, failedAssets: 1, manager: 'Lisa Wang', phone: '+1 212-555-0110' },
];

export const USERS = [
  { id: 'U-001', name: 'Raj Sharma', email: 'raj.sharma@bankit360.com', role: 'bank_employee', roleCategory: '1. Bank Employees (Primary Users)', title: 'Branch Operations Officer / Teller', branchId: 'BR-102', department: 'Branch Operations' },
  { id: 'U-002', name: 'Michael Chang', email: 'michael.chang@bankit360.com', role: 'it_support_engineer', roleCategory: '2. IT Support Team (Core Users)', title: 'L2 IT Support Lead', branchId: 'BR-102', department: 'IT Field Support' },
  { id: 'U-003', name: 'Elena Rostova', email: 'elena.rostova@bankit360.com', role: 'it_manager', roleCategory: '3. IT Manager / Admin (Management Users)', title: 'Regional IT Operations Manager', branchId: 'BR-103', department: 'IT Operations & Governance' },
  { id: 'U-004', name: 'Vikram Mehta', email: 'vikram.mehta@bankit360.com', role: 'senior_management', roleCategory: '4. Senior Management (Monitoring Users)', title: 'Chief Operations Officer / CIO', branchId: 'BR-101', department: 'Executive Leadership' },
  { id: 'U-005', name: 'Alex Morgan', email: 'alex.morgan@bankit360.com', role: 'bank_employee', roleCategory: '1. Bank Employees (Primary Users)', title: 'Senior Branch Teller', branchId: 'BR-101', department: 'Retail Banking' },
  { id: 'U-006', name: 'James Wilson', email: 'james.wilson@bankit360.com', role: 'it_support_engineer', roleCategory: '2. IT Support Team (Core Users)', title: 'Network & Hardware Specialist', branchId: 'BR-101', department: 'IT Field Support' },
];

export const CATEGORIES = [
  'Hardware',
  'Software',
  'Network',
  'Access Control',
  'ATM & POS Systems',
  'Core Banking App',
  'Security & Compliance',
];

export const PRIORITIES = [
  { level: 'P1', name: 'Critical', responseHours: 1, resolutionHours: 4, badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
  { level: 'P2', name: 'High', responseHours: 2, resolutionHours: 8, badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { level: 'P3', name: 'Medium', responseHours: 4, resolutionHours: 24, badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { level: 'P4', name: 'Low', responseHours: 8, resolutionHours: 48, badge: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
];

export const INITIAL_TICKETS = [
  {
    id: 'TICK-8021',
    title: 'Teller Counter #3 Receipt Printer Failure during peak hours',
    description: 'Thermal receipt printer connected to workstation WS-102 is producing unreadable blank slips. Driver reinstallation did not fix.',
    category: 'Hardware',
    priority: 'P2',
    status: 'In Progress',
    branchId: 'BR-102',
    requesterId: 'U-005',
    requesterName: 'Raj Sharma',
    assignedToId: 'U-006',
    assignedToName: 'Michael Chang',
    createdAt: '2026-08-15T09:15:00Z',
    slaDeadline: '2026-08-15T17:15:00Z',
    isSlaBreached: false,
    aiSuggestedCategory: 'Hardware',
    aiConfidence: 0.94,
    comments: [
      { id: 'C-1', author: 'Raj Sharma', role: 'Bank Employee', text: 'This is affecting customer checkouts at counter 3.', createdAt: '2026-08-15T09:16:00Z' },
      { id: 'C-2', author: 'Michael Chang', role: 'IT Support Engineer', text: 'Dispatching replacement thermal print head assembly to Metro Central branch.', createdAt: '2026-08-15T10:30:00Z' }
    ]
  },
  {
    id: 'TICK-8022',
    title: 'Core Banking Application session crash on loan approval step',
    description: 'When approving commercial loan applications over $500k, the screen freezes with SQL timeout exception 0x80040154.',
    category: 'Core Banking App',
    priority: 'P1',
    status: 'Open',
    branchId: 'BR-102',
    requesterId: 'U-005',
    requesterName: 'Raj Sharma',
    assignedToId: 'U-002',
    assignedToName: 'James Wilson',
    createdAt: '2026-08-15T11:45:00Z',
    slaDeadline: '2026-08-15T15:45:00Z',
    isSlaBreached: true,
    aiSuggestedCategory: 'Core Banking App',
    aiConfidence: 0.96,
    comments: [
      { id: 'C-3', author: 'Raj Sharma', role: 'Bank Employee', text: 'Loan officers cannot process high priority customer applications today.', createdAt: '2026-08-15T11:46:00Z' }
    ]
  },
  {
    id: 'TICK-8019',
    title: 'VPN Gateway authentication failure for remote branch auditors',
    description: 'External auditing team receiving SSL handshake error when connecting to Metro East VPN profile.',
    category: 'Network',
    priority: 'P3',
    status: 'Resolved',
    branchId: 'BR-101',
    requesterId: 'U-001',
    requesterName: 'Alex Morgan',
    assignedToId: 'U-002',
    assignedToName: 'James Wilson',
    createdAt: '2026-08-14T14:20:00Z',
    slaDeadline: '2026-08-15T14:20:00Z',
    isSlaBreached: false,
    aiSuggestedCategory: 'Network',
    aiConfidence: 0.91,
    comments: [
      { id: 'C-4', author: 'James Wilson', text: 'Updated CA certificate chain on firewall pool 2. Resolved.', createdAt: '2026-08-14T16:45:00Z' }
    ]
  },
  {
    id: 'TICK-8018',
    title: 'Drive-thru ATM #1 Card Reader Jam and Sensor Warning',
    description: 'ATM #1 motorized card reader rejected 3 customer cards sequentially and entered supervisory lockdown mode.',
    category: 'ATM & POS Systems',
    priority: 'P1',
    status: 'In Progress',
    branchId: 'BR-107',
    requesterId: 'U-001',
    requesterName: 'Alex Morgan',
    assignedToId: 'U-006',
    assignedToName: 'Michael Chang',
    createdAt: '2026-08-15T08:00:00Z',
    slaDeadline: '2026-08-15T12:00:00Z',
    isSlaBreached: true,
    aiSuggestedCategory: 'ATM & POS Systems',
    aiConfidence: 0.98,
    comments: [
      { id: 'C-5', author: 'Michael Chang', text: 'Armored carrier technician notified. On site investigation active.', createdAt: '2026-08-15T08:30:00Z' }
    ]
  },
  {
    id: 'TICK-8015',
    title: 'Request for SWIFT Payment Processing Terminal Access Level 2',
    description: 'New international trade settlement officer requires authorized approval for SWIFT Alliance Access credentials.',
    category: 'Access Control',
    priority: 'P2',
    status: 'Open',
    branchId: 'BR-103',
    requesterId: 'U-001',
    requesterName: 'Alex Morgan',
    assignedToId: 'U-003',
    assignedToName: 'Elena Rostova',
    createdAt: '2026-08-15T10:00:00Z',
    slaDeadline: '2026-08-15T18:00:00Z',
    isSlaBreached: false,
    aiSuggestedCategory: 'Access Control',
    aiConfidence: 0.95,
    comments: []
  },
  {
    id: 'TICK-8014',
    title: 'Intermittent VoIP phone dropouts across Westside Commercial branch',
    description: 'Cisco IP phones on VLAN 40 experience packet loss and muted audio every 15 minutes.',
    category: 'Network',
    priority: 'P2',
    status: 'In Progress',
    branchId: 'BR-104',
    requesterId: 'U-005',
    requesterName: 'Raj Sharma',
    assignedToId: 'U-002',
    assignedToName: 'James Wilson',
    createdAt: '2026-08-15T07:30:00Z',
    slaDeadline: '2026-08-15T15:30:00Z',
    isSlaBreached: false,
    aiSuggestedCategory: 'Network',
    aiConfidence: 0.93,
    comments: []
  }
];

export const INITIAL_INCIDENTS = [
  {
    id: 'INC-2026-004',
    incidentCode: 'INC-004',
    title: 'Metro Central Core Network Switch Stack Power Redundancy Failure',
    severity: 'P1 - Critical',
    status: 'Investigating',
    branchId: 'BR-102',
    branchName: 'Metro Central Branch',
    reportedBy: 'Michael Chang',
    leadEngineer: 'James Wilson',
    affectedServices: ['Teller Workstations', 'ATM Network', 'VoIP Communications'],
    rootCause: 'Primary PSU in Catalyst 9300 switch stack faulted following utility power spike.',
    createdAt: '2026-08-15T07:10:00Z',
    targetResolution: '2026-08-15T11:10:00Z'
  },
  {
    id: 'INC-2026-003',
    incidentCode: 'INC-003',
    title: 'Airport Plaza Branch ATM Switch Relay Intermittent Timeout',
    severity: 'P2 - High',
    status: 'Assigned',
    branchId: 'BR-107',
    branchName: 'Airport Plaza Branch',
    reportedBy: 'Carlos Gomez',
    leadEngineer: 'Michael Chang',
    affectedServices: ['Drive-Thru ATM #1', 'Lobby ATM #2'],
    rootCause: 'Under investigation (suspected WAN latency spike on cellular backup loop).',
    createdAt: '2026-08-15T08:05:00Z',
    targetResolution: '2026-08-15T16:05:00Z'
  }
];

export const INITIAL_ASSETS = [
  { id: 'AST-4010', tag: 'BNK-NY-042', name: 'Dell OptiPlex 7090 Teller Workstation', category: 'Workstation', makeModel: 'Dell OptiPlex 7090 i7 32GB', branchId: 'BR-101', branchName: 'Downtown Main Branch', assignedTo: 'Alex Morgan', status: 'In Service', purchaseDate: '2024-03-15', warrantyExpiry: '2027-03-15' },
  { id: 'AST-4011', tag: 'BNK-NY-088', name: 'Epson TM-T88VI Thermal Receipt Printer', category: 'Printer', makeModel: 'Epson TM-T88VI Serial/USB', branchId: 'BR-102', branchName: 'Metro Central Branch', assignedTo: 'Raj Sharma', status: 'Under Maintenance', purchaseDate: '2023-01-10', warrantyExpiry: '2026-09-10' },
  { id: 'AST-4012', tag: 'BNK-CHI-012', name: 'NCR SelfServ 84 Walk-Up ATM', category: 'ATM Machine', makeModel: 'NCR SelfServ 84 Multi-Function', branchId: 'BR-103', branchName: 'Financial District Plaza', assignedTo: 'Unassigned (Branch Asset)', status: 'In Service', purchaseDate: '2022-06-20', warrantyExpiry: '2026-08-30' },
  { id: 'AST-4013', tag: 'BNK-DAL-099', name: 'Diebold Nixdorf CS 5500 Drive-thru ATM', category: 'ATM Machine', makeModel: 'Diebold CS 5500 Rear-Load', branchId: 'BR-107', branchName: 'Airport Plaza Branch', assignedTo: 'Unassigned (Branch Asset)', status: 'Faulted', purchaseDate: '2023-11-01', warrantyExpiry: '2026-11-01' },
  { id: 'AST-4014', tag: 'BNK-SF-033', name: 'Cisco Catalyst 9300 48-Port Switch', category: 'Network Switch', makeModel: 'Cisco C9300-48P-A', branchId: 'BR-104', branchName: 'Westside Commercial', assignedTo: 'Unassigned (Branch Infrastructure)', status: 'In Service', purchaseDate: '2024-01-15', warrantyExpiry: '2029-01-15' },
  { id: 'AST-4015', tag: 'BNK-BOS-071', name: 'Honeywell Passbook Printer PR2 Plus', category: 'Specialized Printer', makeModel: 'Honeywell PR2 Dual Interface', branchId: 'BR-106', branchName: 'Suburban Hub Branch', assignedTo: 'Robert Thorne', status: 'In Service', purchaseDate: '2023-05-12', warrantyExpiry: '2026-12-12' },
];

export const INITIAL_ACCESS_REQUESTS = [
  {
    id: 'ACC-901',
    requestNumber: 'REQ-ACC-901',
    employeeName: 'Raj Sharma',
    employeeRole: 'Branch Operations Officer',
    branchName: 'Metro Central Branch',
    applicationName: 'SWIFT International Payments Gateway',
    accessLevel: 'Maker / Operator',
    reason: 'Temporary coverage for international wire desk operator on leave.',
    status: 'Pending IT Approval',
    managerApproval: 'Approved',
    managerName: 'David Ross',
    itApproval: 'Pending',
    createdAt: '2026-08-15T09:30:00Z'
  },
  {
    id: 'ACC-902',
    requestNumber: 'REQ-ACC-902',
    employeeName: 'Alex Morgan',
    employeeRole: 'Senior Teller',
    branchName: 'Downtown Main Branch',
    applicationName: 'High-Value Loan Origination System',
    accessLevel: 'Read-Only / Credit Verification',
    reason: 'Cross-training for commercial credit processing team.',
    status: 'Granted',
    managerApproval: 'Approved',
    managerName: 'Sarah Jenkins',
    itApproval: 'Approved',
    grantedAt: '2026-08-14T15:20:00Z',
    createdAt: '2026-08-14T11:00:00Z'
  }
];

export const INITIAL_AUDIT_LOGS = [
  { id: 'LOG-5001', userId: 'U-003', userName: 'Elena Rostova', action: 'ACCESS_GRANTED', entityType: 'AccessRequest', entityId: 'ACC-902', details: 'Granted SWIFT Gateway Read-Only permissions to Alex Morgan', ip: '10.240.12.89', timestamp: '2026-08-14T15:20:00Z' },
  { id: 'LOG-5002', userId: 'U-006', userName: 'Michael Chang', action: 'TICKET_STATUS_UPDATE', entityType: 'Ticket', entityId: 'TICK-8021', details: 'Status changed from Open to In Progress', ip: '10.240.15.12', timestamp: '2026-08-15T10:30:00Z' },
  { id: 'LOG-5003', userId: 'U-004', userName: 'Vikram Mehta', action: 'SLA_POLICY_MODIFIED', entityType: 'SLAPolicy', entityId: 'SLA-P1', details: 'Adjusted P1 Resolution deadline from 6h to 4h', ip: '10.240.10.4', timestamp: '2026-08-15T08:00:00Z' },
  { id: 'LOG-5004', userId: 'U-002', userName: 'James Wilson', action: 'INCIDENT_LOGGED', entityType: 'Incident', entityId: 'INC-2026-004', details: 'Logged P1 Critical Incident: Metro Central Switch Redundancy Failure', ip: '10.240.15.22', timestamp: '2026-08-15T07:10:00Z' },
];

export const INITIAL_VENDORS = [
  { id: 'VEND-01', name: 'Diebold Nixdorf Global', service: 'ATM Cash Recyclers & Hardware AMC', contact: '+1 800-343-2653', email: 'support@dieboldnixdorf.com', amcExpiry: '2027-12-31', activeSla: '4 Hours Response', status: 'Active SLA', contractValue: '$48,000/yr' },
  { id: 'VEND-02', name: 'Cisco Systems Enterprise', service: 'Catalyst Core Switches & SD-WAN', contact: '+1 800-553-2447', email: 'tac@cisco.com', amcExpiry: '2028-06-30', activeSla: '2 Hours 24x7 TAC', status: 'Active SLA', contractValue: '$72,000/yr' },
  { id: 'VEND-03', name: 'Dell Enterprise Services', service: 'Teller Workstations & Edge Servers', contact: '+1 800-456-3355', email: 'prosupport@dell.com', amcExpiry: '2026-11-15', activeSla: 'Next Business Day', status: 'Renewal Due', contractValue: '$34,000/yr' },
  { id: 'VEND-04', name: 'NCR Corporation', service: 'SelfServ ATMs & Cheque Scanners', contact: '+1 800-225-5627', email: 'service@ncr.com', amcExpiry: '2027-04-20', activeSla: '4 Hours Response', status: 'Active SLA', contractValue: '$52,000/yr' },
  { id: 'VEND-05', name: 'Oracle Financial Services', service: 'Core Banking SQL Database & Middleware', contact: '+1 800-223-1711', email: 'oracle.cbs@oracle.com', amcExpiry: '2029-01-01', activeSla: '1 Hour P1 Sev-1', status: 'Active SLA', contractValue: '$120,000/yr' }
];

export const INITIAL_BRANCH_MEMORY = {
  'BR-101': [
    { date: '2026-08-14', title: 'VPN Gateway Certificate Renewed', impact: 'Zero downtime achieved. 20 remote auditors re-authenticated smoothly.', engineer: 'James Wilson' },
    { date: '2026-07-22', title: 'Teller Counter #1-6 Workstations Upgraded to 32GB RAM', impact: 'CBS query render time dropped from 4.2s to 0.8s.', engineer: 'Michael Chang' },
    { date: '2026-05-10', title: 'Primary Fiber Link Redundancy Deployed', impact: 'Added secondary Verizon 1Gbps backup route with BGP failover.', engineer: 'Elena Rostova' }
  ],
  'BR-102': [
    { date: '2026-08-15', title: 'Core Switch Redundancy Fault & Power Surge', impact: 'P1 Outage logged. L2 incident team bypassed PSU breaker.', engineer: 'James Wilson' },
    { date: '2026-06-18', title: 'Thermal Printer Head Alignment Refurbished', impact: 'Counter #3 replaced worn roller gear assembly.', engineer: 'Michael Chang' },
    { date: '2026-04-02', title: 'ATM-108 Note Acceptor Optical Calibration', impact: 'Rejected banknote rate decreased by 85%.', engineer: 'Alex Morgan' }
  ],
  'BR-103': [
    { date: '2026-08-01', title: 'SWIFT Alliance Gateway 2FA Migration', impact: 'Zero Trust step-up verification enforced for all wire desks.', engineer: 'Elena Rostova' },
    { date: '2026-05-19', title: 'ATM-103 Cash Dispenser Routine AMC Servicing', impact: 'Diebold OEM completed quarterly maintenance.', engineer: 'Diebold Tech' }
  ]
};
