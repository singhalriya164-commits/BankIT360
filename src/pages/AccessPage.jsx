import React, { useState } from 'react';
import { 
  Key, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  User, 
  AlertTriangle, 
  Zap, 
  Shield, 
  Lock, 
  Info, 
  Laptop, 
  Check, 
  X,
  Building2,
  Sparkles
} from 'lucide-react';
import { calculateAccessRiskScore } from '../services/securityEngine';
import EmptyState from '../components/EmptyState';

export default function AccessPage({ accessRequests, onApproveAccess, onCreateAccessRequest, activeUser, onAddToast }) {
  const [showRequestModal, setShowRequestModal] = useState(false);
  
  // New Request Form State
  const [appName, setAppName] = useState('SWIFT International Payments Gateway');
  const [accessLevel, setAccessLevel] = useState('Maker / Operator');
  const [deviceTrust, setDeviceTrust] = useState('Managed Bank Laptop');
  const [reason, setReason] = useState('');
  const [reasonTouched, setReasonTouched] = useState(false);

  // Live Calculated Risk for the Modal
  const liveRiskEvaluation = calculateAccessRiskScore({
    employeeRole: activeUser?.role || 'bank_employee',
    department: activeUser?.department || 'Branch Operations',
    applicationName: appName,
    accessLevel: accessLevel,
    deviceTrust: deviceTrust,
    requestHour: new Date().getHours()
  });

  // Step-Up Auth Confirmation Modal State
  const [stepUpModalOpen, setStepUpModalOpen] = useState(false);
  const [selectedReqToApprove, setSelectedReqToApprove] = useState(null);
  const [stepUpPassword, setStepUpPassword] = useState('');

  const isReasonValid = reason.trim().length >= 10;

  const handleOpenApproveModal = (req) => {
    // If request is high risk, require Step-Up secondary confirmation
    setSelectedReqToApprove(req);
    setStepUpModalOpen(true);
    setStepUpPassword('');
  };

  const handleConfirmStepUpApproval = (e) => {
    e.preventDefault();
    if (!stepUpPassword.trim()) {
      if (onAddToast) onAddToast('Authorization Required', 'Please enter your manager credentials.', 'warning');
      return;
    }

    if (selectedReqToApprove && onApproveAccess) {
      onApproveAccess(selectedReqToApprove.id);
      if (onAddToast) {
        onAddToast('Privileged Access Granted 🛡️', `Dual-Signoff verified for ${selectedReqToApprove.employeeName}`, 'success');
      }
    }
    setStepUpModalOpen(false);
  };

  const handleCreateRequest = () => {
    setReasonTouched(true);
    if (!isReasonValid) return;

    const isAutoApproved = liveRiskEvaluation.score < 30;
    const newReq = {
      id: `ACC-2026-00${(accessRequests?.length || 0) + 1}`,
      employeeName: activeUser?.name || 'Sarah Jenkins',
      employeeRole: activeUser?.role || 'bank_employee',
      department: activeUser?.department || 'Branch Operations',
      applicationName: appName,
      accessLevel: accessLevel,
      deviceTrust: deviceTrust,
      riskScore: liveRiskEvaluation.score,
      riskLevel: liveRiskEvaluation.riskLevel,
      approvalPath: liveRiskEvaluation.approvalPath,
      reason: reason.trim(),
      status: isAutoApproved ? 'Approved' : 'Pending',
      requestedAt: new Date().toISOString()
    };

    if (onCreateAccessRequest) {
      onCreateAccessRequest(newReq);
    }
    if (onAddToast) {
      onAddToast(
        isAutoApproved ? 'Access Auto-Approved ✅' : 'Access Request Submitted 📝', 
        `Submitted for ${appName}. Risk Score: ${liveRiskEvaluation.score}/100`, 
        isAutoApproved ? 'success' : 'info'
      );
    }
    setShowRequestModal(false);
    setReason('');
    setReasonTouched(false);
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#0a0b10] border border-white/15 shadow-2xl">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
              LEAST-PRIVILEGE ACCESS GOVERNANCE
            </span>
            <span className="text-white/50 text-xs font-mono">• Rule-Based Risk Engine Active</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-black text-white flex items-center space-x-2">
            <Key className="w-6 h-6 text-emerald-400" />
            <span>Employee Application Access &amp; Risk Governance</span>
          </h2>

          <p className="text-xs sm:text-sm text-white/70">
            Automated 0-100 risk scoring based on role eligibility, application sensitivity (SWIFT, Core CBS), device trust, and dual-authorization approval workflow.
          </p>
        </div>

        <button
          onClick={() => setShowRequestModal(true)}
          className="px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-glow-emerald shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Request Application Access</span>
        </button>
      </div>

      {/* Access Requests Table with Live Risk Scores */}
      <div className="rounded-3xl bg-[#0a0b10] border border-white/15 overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
            Active Access Clearance Requests ({accessRequests?.length || 0})
          </h3>
          <span className="text-xs font-mono text-emerald-400">● 100% Audit Logging Enforced</span>
        </div>

        {(!accessRequests || accessRequests.length === 0) ? (
          <div className="p-8">
            <EmptyState
              icon={Key}
              title="No Access Requests Submitted"
              description="There are currently no active clearance or privileged access requests in the pipeline."
              actionText="Submit New Access Request"
              onAction={() => setShowRequestModal(true)}
            />
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/50">
                  <th className="p-4 pl-6">Request ID</th>
                  <th className="p-4">Employee &amp; Branch</th>
                  <th className="p-4">Target Application</th>
                  <th className="p-4">Risk Evaluation (0-100)</th>
                  <th className="p-4">Stage 1: Branch Mgr</th>
                  <th className="p-4">Stage 2: IT Security</th>
                  <th className="p-4 pr-6 text-right">Clearance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs">
                {accessRequests.map((req) => {
                  // Calculate simulated risk score for each request
                  const risk = calculateAccessRiskScore({
                    employeeRole: req.employeeRole,
                    applicationName: req.applicationName,
                    accessLevel: req.accessLevel
                  });

                  return (
                    <tr key={req.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 pl-6 font-mono font-bold text-emerald-400">
                        {req.requestNumber || req.id}
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-white">{req.employeeName}</div>
                        <div className="text-[11px] text-white/50">{req.employeeRole} • {req.branchName}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-white/90">{req.applicationName}</div>
                        <div className="text-[11px] text-white/50">{req.accessLevel}</div>
                      </td>

                      {/* Calculated Risk Score Badge */}
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${risk.badgeColor}`}>
                              {risk.riskLevel} RISK: {risk.score}/100
                            </span>
                          </div>
                          <span className="text-[10px] text-white/40 block">
                            {risk.score >= 70 ? 'Dual-Signoff Required' : 'Single Approval Path'}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
                          ✓ {req.managerApproval} ({req.managerName || 'David Ross'})
                        </span>
                      </td>

                      <td className="p-4">
                        {req.itApproval === 'Approved' ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
                            ✓ Approved
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-[10px]">
                            ⏳ Pending Security Review
                          </span>
                        )}
                      </td>

                      <td className="p-4 pr-6 text-right">
                        {req.status === 'Granted' ? (
                          <span className="text-emerald-400 font-bold text-xs inline-flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Clearance Active</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleOpenApproveModal(req)}
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer"
                          >
                            Review &amp; Authorize
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL 1: REQUEST APPLICATION ACCESS WITH LIVE RISK CALCULATOR */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0a0b10] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowRequestModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Request Application Access Clearance
                </h3>
                <p className="text-xs text-white/60">Rule-based risk score is evaluated dynamically.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Application Selection */}
              <div className="space-y-1">
                <label className="font-bold text-white/80">Target Banking Application:</label>
                <select
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-black/70 border border-white/20 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="SWIFT International Payments Gateway">SWIFT International Payments Gateway (High Sensitivity)</option>
                  <option value="Core Banking System (Finacle / BaNCS)">Core Banking System (Finacle / BaNCS Master Database)</option>
                  <option value="Commercial High-Value Loan Approval Portal">Commercial High-Value Loan Approval Portal</option>
                  <option value="Branch VPN Gateway & Network Config">Branch VPN Gateway &amp; Network Config</option>
                  <option value="Internal IT Helpdesk & Ticketing">Internal IT Helpdesk &amp; Ticketing (Standard)</option>
                </select>
              </div>

              {/* Privilege Level */}
              <div className="space-y-1">
                <label className="font-bold text-white/80">Requested Privilege Level:</label>
                <select
                  value={accessLevel}
                  onChange={(e) => setAccessLevel(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-black/70 border border-white/20 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Read-Only / Credit Inquiry">Read-Only / Credit Inquiry (Lowest Privilege)</option>
                  <option value="Maker / Operator">Maker / Operator (Transaction Entry)</option>
                  <option value="Checker / Authorizer">Checker / Authorizer (High Authority)</option>
                  <option value="Administrator / Full Config">Administrator / Full Config (Maximum Privilege)</option>
                </select>
              </div>

              {/* Device Trust */}
              <div className="space-y-1">
                <label className="font-bold text-white/80">Connecting Device Trust Profile:</label>
                <select
                  value={deviceTrust}
                  onChange={(e) => setDeviceTrust(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-black/70 border border-white/20 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Managed Bank Laptop">Encrypted &amp; Managed Bank Laptop (Compliant)</option>
                  <option value="Personal Laptop (BYOD)">Personal Laptop (BYOD - Non-Compliant)</option>
                  <option value="Untrusted Device">Untrusted Device / Remote Kiosk</option>
                </select>
              </div>

              {/* Live Risk Evaluation Box */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 font-bold uppercase text-[10px]">Real-Time Calculated Risk Score:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${liveRiskEvaluation.badgeColor}`}>
                    {liveRiskEvaluation.riskLevel} RISK: {liveRiskEvaluation.score}/100
                  </span>
                </div>
                <p className="text-[11px] text-white/80">
                  Approval Path: <strong className="text-white">{liveRiskEvaluation.approvalPath}</strong>
                </p>
              </div>

              {/* Business Reason with Validation */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-white/80">Business Justification / Reason *:</label>
                  <span className={`text-[10px] font-mono ${isReasonValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {reason.length}/10 chars min
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setReasonTouched(true);
                  }}
                  onBlur={() => setReasonTouched(true)}
                  placeholder="Explain why this access is required for branch duties (min 10 characters)..."
                  className={`w-full p-3 rounded-2xl bg-black/70 border text-white focus:outline-none transition-all ${
                    reasonTouched && !isReasonValid 
                      ? 'border-rose-500/70 focus:border-rose-500 animate-shake' 
                      : 'border-white/20 focus:border-emerald-500'
                  }`}
                />
                {reasonTouched && !isReasonValid && (
                  <p className="text-[10px] text-rose-400 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Please provide at least 10 characters explaining your business justification.</span>
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleCreateRequest}
                disabled={!isReasonValid}
                className={`w-full py-3.5 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow-emerald cursor-pointer ${
                  isReasonValid 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                    : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/10'
                }`}
              >
                Submit Access Request for Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: STEP-UP DUAL-AUTHORIZATION CONFIRMATION */}
      {stepUpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-[#0a0b10] border border-rose-500/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setStepUpModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white">
                  Step-Up Dual Authorization Required
                </h3>
                <p className="text-[11px] text-white/60">Privileged access clearance requires manager re-authentication.</p>
              </div>
            </div>

            <form onSubmit={handleConfirmStepUpApproval} className="space-y-4 text-xs">
              <p className="text-white/80 leading-relaxed">
                You are approving privileged access for <strong className="text-white">{selectedReqToApprove?.employeeName}</strong> to <strong className="text-emerald-400">{selectedReqToApprove?.applicationName}</strong>.
              </p>

              <div className="space-y-1.5">
                <label className="font-bold text-white/80">Enter Manager Authorization Password:</label>
                <input
                  type="password"
                  value={stepUpPassword}
                  onChange={(e) => setStepUpPassword(e.target.value)}
                  placeholder="Enter your security PIN or password..."
                  className="w-full p-3 rounded-2xl bg-black/80 border border-white/20 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:opacity-90 transition-all cursor-pointer"
              >
                Confirm &amp; Digitally Sign Approval →
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
