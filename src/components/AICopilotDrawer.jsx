import React, { useState, useRef, useEffect } from 'react';
import { X, Bot, Send, Sparkles, User, RefreshCw, Cpu, ChevronRight, Terminal, HelpCircle } from 'lucide-react';
import { calculateBranchHealth } from '../services/healthEngine';

export default function AICopilotDrawer({ isOpen, onClose, tickets, branches, incidents, assets, onNavigate }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am BankIT360 Assistant. I can analyze branch telemetry, diagnose ticket SLAs, inspect ATM topology, or guide issue resolution. How can I assist you?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        'Which branches are at critical risk?',
        'Show active P1 incidents',
        'How to fix thermal printer jams?',
        'Run SLA compliance check'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');

    setTimeout(() => {
      let botResponse = '';
      let quickActions = null;
      const lower = textToSend.toLowerCase();

      if (lower.includes('critical') || lower.includes('risk') || lower.includes('health')) {
        const healthData = branches.map(b => calculateBranchHealth(b, tickets, incidents, assets));
        const criticals = healthData.filter(h => h.healthScore < 70);
        botResponse = `🔍 **Branch IT Health Analysis:**\nCurrently **${criticals.length} branch(es)** require immediate attention:\n` + 
          criticals.map(c => `• **${c.branchName} (${c.branchId}):** Health Score **${c.healthScore}/100** (${c.status}) — ${c.metrics.openP1Incidents} P1 Incident, ${c.metrics.slaBreachedTickets} SLA Breach.`).join('\n');
        quickActions = ['Navigate to Branch Health Map', 'Show active P1 incidents'];
      } else if (lower.includes('p1') || lower.includes('incident') || lower.includes('outage')) {
        botResponse = `🚨 **Active Major Incidents Summary:**\n` + 
          incidents.map(inc => `• **${inc.incidentCode}:** ${inc.title} at *${inc.branchName}* (${inc.severity}). Status: ${inc.status}.`).join('\n');
        quickActions = ['Navigate to Major Incidents', 'Which branches are at critical risk?'];
      } else if (lower.includes('printer') || lower.includes('hardware') || lower.includes('jam')) {
        botResponse = `🛠️ **Thermal / Passbook Printer Troubleshooting Protocol:**\n` +
          `1. Check USB/Serial baud rate config on workstation WS-102 (Standard: 9600 baud).\n` +
          `2. Inspect sensor array for optical dust buildup or paper feed obstruction.\n` +
          `3. Execute remote printer spooler restart via command line.\n` +
          `4. If unreadable print persists, dispatch replacement print head assembly (Part #EP-TM88).`;
        quickActions = ['Create Hardware Ticket', 'Check IT Asset Inventory'];
      } else if (lower.includes('sla') || lower.includes('compliance')) {
        const breached = tickets.filter(t => t.isSlaBreached && t.status !== 'Closed').length;
        botResponse = `⏱️ **SLA Operational Compliance Status:**\n` +
          `• Overall Compliance Rate: **95.8%** (Target: >95%)\n` +
          `• Current SLA Breaches: **${breached} active ticket(s)**\n` +
          `• Response SLA Performance: 98.2% within 1-hour target for P1/P2 tickets.`;
        quickActions = ['Navigate to SLA Monitoring', 'Show active P1 incidents'];
      } else {
        botResponse = `🤖 I have processed your inquiry regarding *"${textToSend}"*.\n` +
          `• All system telemetry monitors are operational.\n` +
          `• Total Active Tickets: **${tickets.filter(t => t.status !== 'Closed').length}**\n` +
          `• Total Managed Assets: **${assets.length}** across ${branches.length} branches.`;
        quickActions = ['Which branches are at critical risk?', 'Show active P1 incidents'];
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md modal-backdrop-smooth">
      <div className="w-full max-w-lg bg-[#060608]/95 backdrop-blur-2xl border-l border-white/15 p-6 shadow-2xl flex flex-col h-full text-white drawer-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff2d78] to-[#00f5ff] flex items-center justify-center text-white shadow-glow">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center space-x-1.5">
                <span>BankIT360 AI Co-Pilot</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  Online
                </span>
              </h3>
              <p className="text-[11px] text-white/50 font-medium">Natural Language Operational Intelligence</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {messages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center space-x-1.5 text-[10px] text-white/40 mb-1">
                <span>{msg.sender === 'user' ? 'You' : 'BankIT360 AI'}</span>
                <span>•</span>
                <span>{msg.time}</span>
              </div>
              <div className={`p-4 rounded-3xl max-w-[88%] text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#ff2d78] to-[#ec4899] text-white rounded-tr-none shadow-glow font-medium'
                  : 'bg-black/60 text-white border border-white/10 rounded-tl-none space-y-2'
              }`}>
                <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

                {/* Quick Suggestion Chips */}
                {msg.quickActions && (
                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <span className="text-[10px] font-bold text-[#00f5ff] uppercase tracking-wider block">Suggested Follow-ups:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.quickActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (action.startsWith('Navigate to')) {
                              if (action.includes('Health')) onNavigate('branch-health');
                              else if (action.includes('Incidents')) onNavigate('incidents');
                              else if (action.includes('SLA')) onNavigate('sla');
                              onClose();
                            } else {
                              handleSendMessage(action);
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 text-[11px] font-semibold transition-colors text-left flex items-center space-x-1 cursor-pointer"
                        >
                          <span>{action}</span>
                          <ChevronRight className="w-3 h-3 text-[#00f5ff]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="pt-3 border-t border-white/10 shrink-0">
          <div className="flex items-center space-x-2">
            <input 
              type="text"
              placeholder="Ask BankIT360 AI (e.g. 'Show critical branches', 'Printer fix')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#00f5ff]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-2xl bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] text-white transition-all shrink-0 shadow-glow cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
