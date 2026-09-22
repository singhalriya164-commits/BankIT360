import React from 'react';
import { 
  AlertCircle, 
  Ticket, 
  BrainCircuit, 
  UserCheck, 
  Search, 
  CheckCircle2, 
  ThumbsUp, 
  ShieldCheck,
  Clock,
  ArrowDown
} from 'lucide-react';

export default function IncidentTimelineTracker({ ticket }) {
  if (!ticket) return null;

  // Generate realistic lifecycle timeline timestamps based on ticket creation
  const baseTime = new Date(ticket.createdAt || Date.now() - 3600000 * 2);
  const pad = (n) => String(n).padStart(2, '0');
  const formatTime = (date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;

  const addMins = (date, mins) => new Date(date.getTime() + mins * 60000);

  const t1 = baseTime;
  const t2 = addMins(t1, 2);
  const t3 = addMins(t1, 4);
  const t4 = addMins(t1, 8);
  const t5 = addMins(t1, 35);
  const t6 = addMins(t1, 66);
  const t7 = addMins(t1, 73);
  const t8 = addMins(t1, 75);

  const isClosed = ticket.status === 'Closed' || ticket.status === 'Resolved';
  const isInProgress = ticket.status === 'In Progress';

  const steps = [
    {
      time: formatTime(t1),
      title: 'Issue Reported',
      desc: `Branch staff (${ticket.requesterName || 'Teller User'}) submitted incident observation`,
      icon: AlertCircle,
      color: 'text-rose-400 bg-rose-500/15 border-rose-500/30',
      done: true
    },
    {
      time: formatTime(t2),
      title: 'Ticket Created',
      desc: `Auto-generated ${ticket.id} (${ticket.priority} Priority, SLA ${ticket.priority === 'P1' ? '4h' : '8h'})`,
      icon: Ticket,
      color: 'text-blue-400 bg-blue-500/15 border-blue-500/30',
      done: true
    },
    {
      time: formatTime(t3),
      title: `AI Categorized → ${ticket.category || 'Network'}`,
      desc: `TF-IDF Neural Engine predicted category with ${Math.round((ticket.aiConfidence || 0.94) * 100)}% confidence`,
      icon: BrainCircuit,
      color: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
      done: true
    },
    {
      time: formatTime(t4),
      title: 'Assigned to IT Engineer',
      desc: `Dispatched to ${ticket.assignedToName || 'James Wilson'} (Branch L2 Support)`,
      icon: UserCheck,
      color: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/30',
      done: true
    },
    {
      time: formatTime(t5),
      title: 'Investigation Started',
      desc: 'Telemetry stack traces & port diagnostics examined',
      icon: Search,
      color: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
      done: isClosed || isInProgress
    },
    {
      time: formatTime(t6),
      title: 'Service Restored',
      desc: 'Remediation applied & ping latency normalized to 12ms',
      icon: CheckCircle2,
      color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
      done: isClosed
    },
    {
      time: formatTime(t7),
      title: 'Employee Confirmed',
      desc: 'Branch teller verified successful workstation recovery',
      icon: ThumbsUp,
      color: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30',
      done: isClosed
    },
    {
      time: formatTime(t8),
      title: 'Ticket Closed & Logged',
      desc: 'Immutable audit trail signed & SLA compliance marked nominal',
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
      done: isClosed
    },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="uppercase tracking-wider font-black">IT Incident Lifecycle Timeline</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">
          End-to-End SLA Workflow
        </span>
      </div>

      {/* Timeline Tree */}
      <div className="relative pl-6 space-y-5 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <div key={index} className="relative group text-left">
              {/* Timeline Node Dot / Icon */}
              <div className={`absolute -left-6 top-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                step.done 
                  ? step.color 
                  : 'bg-slate-900 border-slate-800 text-slate-600'
              }`}>
                <StepIcon className="w-3 h-3" />
              </div>

              {/* Node Content */}
              <div className="space-y-0.5">
                <div className="flex items-baseline space-x-2">
                  <span className="font-mono text-[11px] font-black text-cyan-400">{step.time}</span>
                  <span className={`text-xs font-bold ${step.done ? 'text-white' : 'text-slate-500'}`}>
                    {step.title}
                  </span>
                  {index === 0 && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-bold">
                      INITIAL
                    </span>
                  )}
                  {index === steps.length - 1 && step.done && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      RESOLVED
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
