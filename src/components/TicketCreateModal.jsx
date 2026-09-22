import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  ScanText, 
  Zap, 
  Laptop, 
  HardDrive, 
  MapPin, 
  Clock, 
  ArrowRight,
  Edit3
} from 'lucide-react';
import { CATEGORIES, PRIORITIES, INITIAL_BRANCHES, USERS } from '../services/mockData';
import { predictTicketCategory, parseSmartTicketPrompt } from '../services/mlEngine';

export default function TicketCreateModal({ isOpen, onClose, onCreateTicket, activeUser, onOpenOcrScanner }) {
  const [creationMode, setCreationMode] = useState('smart'); // 'smart' | 'manual'
  
  // Smart Mode State
  const [smartPrompt, setSmartPrompt] = useState('');
  const [smartParsed, setSmartParsed] = useState(null);

  // Manual Mode Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [priority, setPriority] = useState('P2');
  const [branchId, setBranchId] = useState(activeUser?.branchId || 'BR-101');
  const [assignedToId, setAssignedToId] = useState('U-002');
  const [aiPrediction, setAiPrediction] = useState(null);

  const samplePrompts = [
    "Laptop is extremely slow and keeps disconnecting from Wi-Fi.",
    "Passbook printer jamming and paper misfeeding at Counter #2.",
    "ATM-NCR-108 cash dispenser motorized sensor jammed after note refill.",
    "Unable to connect to Core Banking application due to database timeout."
  ];

  // Real-time Smart Prompt Parser
  useEffect(() => {
    if (!isOpen) return;
    if (smartPrompt.trim().length > 5) {
      const parsed = parseSmartTicketPrompt(smartPrompt, activeUser?.branchId || 'BR-101');
      setSmartParsed(parsed);
    } else {
      setSmartParsed(null);
    }
  }, [smartPrompt, isOpen, activeUser]);

  // Live AI Prediction Trigger for Manual Mode
  useEffect(() => {
    if (!isOpen || creationMode !== 'manual') return;
    const text = `${title} ${description}`;
    if (text.trim().length > 8) {
      const pred = predictTicketCategory(text);
      setAiPrediction(pred);
    }
  }, [title, description, isOpen, creationMode]);

  if (!isOpen) return null;

  const handleSmartSubmit = (e) => {
    e.preventDefault();
    if (!smartPrompt.trim()) return;

    const parsed = smartParsed || parseSmartTicketPrompt(smartPrompt, activeUser?.branchId || 'BR-101');
    const assignedUser = USERS.find(u => u.role === 'it_support_engineer') || USERS[1];

    const newTicket = {
      id: `TICK-${Math.floor(8000 + Math.random() * 1000)}`,
      title: parsed.title || smartPrompt.slice(0, 50),
      description: `[AI Smart Intake]\nEmployee Observation: "${smartPrompt}"\nInferred Asset: ${parsed.suggestedAsset}\nDetected Symptoms: ${parsed.category}`,
      category: parsed.category || 'Hardware',
      priority: parsed.priority || 'P3',
      status: 'Open',
      branchId: parsed.branchId || activeUser?.branchId || 'BR-101',
      requesterId: activeUser?.id || 'U-001',
      requesterName: activeUser?.name || 'Bank Employee',
      assignedToId: assignedUser.id,
      assignedToName: assignedUser.name,
      createdAt: new Date().toISOString(),
      slaDeadline: new Date(Date.now() + (parsed.priority === 'P1' ? 4 : parsed.priority === 'P2' ? 8 : 24) * 3600 * 1000).toISOString(),
      isSlaBreached: false,
      aiSuggestedCategory: parsed.category,
      aiConfidence: parsed.confidence || 0.95,
      comments: []
    };

    onCreateTicket(newTicket);
    setSmartPrompt('');
    onClose();
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const assignedUser = USERS.find(u => u.id === assignedToId);

    const newTicket = {
      id: `TICK-${Math.floor(8000 + Math.random() * 1000)}`,
      title,
      description,
      category,
      priority,
      status: 'Open',
      branchId,
      requesterId: activeUser?.id || 'U-001',
      requesterName: activeUser?.name || 'Bank Employee',
      assignedToId: assignedUser ? assignedUser.id : 'U-002',
      assignedToName: assignedUser ? assignedUser.name : 'James Wilson',
      createdAt: new Date().toISOString(),
      slaDeadline: new Date(Date.now() + (priority === 'P1' ? 4 : priority === 'P2' ? 8 : 24) * 3600 * 1000).toISOString(),
      isSlaBreached: false,
      aiSuggestedCategory: aiPrediction ? aiPrediction.category : category,
      aiConfidence: aiPrediction ? aiPrediction.confidence : 0.85,
      comments: []
    };

    onCreateTicket(newTicket);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 modal-backdrop-smooth text-white">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-5 max-h-[90vh] overflow-y-auto relative overflow-hidden modal-pop-in">
        {/* Glow accent */}
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">Create New IT Support Ticket</h3>
              <p className="text-xs text-slate-400 font-mono">AI-First 1-Prompt Intake Engine</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onOpenOcrScanner && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenOcrScanner();
                }}
                className="px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-bold text-xs flex items-center space-x-1.5"
              >
                <ScanText className="w-4 h-4 text-purple-400" />
                <span>📷 OCR Scanner</span>
              </button>
            )}
            <button 
              onClick={onClose}
              aria-label="Close ticket creation modal"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex rounded-xl bg-slate-950 p-1 text-xs font-bold border border-slate-800 relative z-10">
          <button
            type="button"
            onClick={() => setCreationMode('smart')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              creationMode === 'smart' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>⚡ Smart 1-Prompt AI (Recommended)</span>
          </button>
          <button
            type="button"
            onClick={() => setCreationMode('manual')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              creationMode === 'manual' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Manual Multi-Field Form</span>
          </button>
        </div>

        {/* MODE 1: SMART 1-PROMPT AI CREATION */}
        {creationMode === 'smart' && (
          <form onSubmit={handleSmartSubmit} className="space-y-4 text-left relative z-10">
            <div className="space-y-2">
              <label className="block text-xs font-black text-cyan-400 uppercase tracking-wider">
                What's wrong? (Describe issue in plain words) *
              </label>
              <div className="relative">
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Laptop is extremely slow and keeps disconnecting from Wi-Fi..."
                  value={smartPrompt}
                  onChange={(e) => setSmartPrompt(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-all font-medium"
                />
              </div>

              {/* Sample 1-Click Prompt Chips */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">Or select a quick template:</span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSmartPrompt(p)}
                      className="px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-cyan-300 transition-colors text-left"
                    >
                      "{p.slice(0, 42)}..."
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Smart Real-Time Inferred Telemetry Suggestions */}
            {smartParsed && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border border-cyan-500/30 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                  <div className="flex items-center space-x-1.5 text-cyan-400 font-bold text-xs">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span className="uppercase tracking-wider">AI Inferred Ticket Specifications</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    {Math.round((smartParsed.confidence || 0.95) * 100)}% Confidence
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Category</span>
                    <span className="font-bold text-cyan-300">{smartParsed.category}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Priority</span>
                    <span className="font-bold text-amber-300">{smartParsed.priority} Priority</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Possible Asset</span>
                    <span className="font-bold text-white truncate block">{smartParsed.suggestedAsset.split(' ')[0]}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Branch</span>
                    <span className="font-bold text-white truncate block">{smartParsed.branchName.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 flex items-center space-x-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Auto-Title: <strong className="text-white">"{smartParsed.title}"</strong></span>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!smartPrompt.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black text-xs transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2 border border-blue-400/30"
              >
                <span>Confirm & Raise Ticket</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* MODE 2: MANUAL MULTI-FIELD FORM */}
        {creationMode === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-4 text-left relative z-10">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Ticket Issue Title *
                </label>
                <span className={`text-[10px] font-mono ${title.length < 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {title.length}/100 chars (min 5)
                </span>
              </div>
              <input 
                type="text"
                required
                maxLength={100}
                placeholder="e.g. Teller Counter #2 Receipt Printer Jamming & Communication Failure"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                  title.length > 0 && title.length < 5 
                    ? 'border-rose-500 focus:border-rose-400' 
                    : title.length >= 5 
                    ? 'border-emerald-500/50 focus:border-emerald-400' 
                    : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {title.length > 0 && title.length < 5 && (
                <p className="text-[10px] text-rose-400 mt-1 flex items-center space-x-1 animate-shake">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Title is too short (minimum 5 characters required).</span>
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Detailed Issue Description *
                </label>
                <span className={`text-[10px] font-mono ${description.length < 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {description.length}/500 chars (min 10)
                </span>
              </div>
              <textarea
                required
                rows={3}
                maxLength={500}
                placeholder="Describe symptoms, workstation tag, application code, error message..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                  description.length > 0 && description.length < 10 
                    ? 'border-rose-500 focus:border-rose-400' 
                    : description.length >= 10 
                    ? 'border-emerald-500/50 focus:border-emerald-400' 
                    : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {description.length > 0 && description.length < 10 && (
                <p className="text-[10px] text-rose-400 mt-1 flex items-center space-x-1 animate-shake">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Please provide more detail (minimum 10 characters required).</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Priority & SLA Deadline
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  {PRIORITIES.map(p => (
                    <option key={p.level} value={p.level}>
                      {p.level} - {p.name} ({p.resolutionHours}h SLA target)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Affected Bank Branch
                </label>
                <select
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  {INITIAL_BRANCHES.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Assign IT Engineer
                </label>
                <select
                  value={assignedToId}
                  onChange={(e) => setAssignedToId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  {USERS.filter(u => u.role === 'it_support_engineer' || u.role === 'it_administrator').map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.title})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={title.trim().length < 5 || description.trim().length < 10}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Ticket to Helpdesk</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

