import React, { useState } from 'react';
import { 
  Ticket, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  MessageSquare, 
  LayoutGrid, 
  List,
  Sparkles,
  User,
  ArrowUpDown
} from 'lucide-react';
import { CATEGORIES, PRIORITIES, INITIAL_BRANCHES } from '../services/mockData';
import EmptyState from '../components/EmptyState';

export default function TicketsPage({ tickets, onOpenCreateModal, onSelectTicket }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'kanban'

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || t.category === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;

    return matchesSearch && matchesCat && matchesStatus && matchesPriority;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('ALL');
    setStatusFilter('ALL');
    setPriorityFilter('ALL');
  };

  const kanbanColumns = ['Open', 'Assigned', 'In Progress', 'Resolved', 'Closed'];

  const priorityBadges = {
    P1: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    P2: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    P3: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    P4: 'bg-white/10 text-white/70 border border-white/15',
  };

  const statusBadges = {
    Open: 'bg-[#ff2d78]/20 text-[#ff2d78] border border-[#ff2d78]/30',
    Assigned: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    'In Progress': 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    Resolved: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    Closed: 'bg-white/10 text-white/60 border border-white/15',
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Ticket className="w-6 h-6 text-[#ff2d78]" />
            <span>IT Helpdesk &amp; Incident Tickets</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Track end-to-end service requests, SLA timers, technician assignment, and AI category predictions
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-black/60 p-1 rounded-2xl border border-white/15 shadow-inner">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 px-3 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-[#ff2d78] text-white shadow-glow' : 'text-white/60 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 px-3 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'kanban' ? 'bg-[#ff2d78] text-white shadow-glow' : 'text-white/60 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Kanban</span>
            </button>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs flex items-center space-x-2 transition-all shadow-glow cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create IT Ticket</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-3xl glass-card border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search tickets by ID, title, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#00f5ff]"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#00f5ff] font-medium cursor-pointer"
        >
          <option value="ALL">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#00f5ff] font-medium cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#00f5ff] font-medium cursor-pointer"
        >
          <option value="ALL">All Priorities</option>
          <option value="P1">P1 - Critical</option>
          <option value="P2">P2 - High</option>
          <option value="P3">P3 - Medium</option>
          <option value="P4">P4 - Low</option>
        </select>
      </div>

      {/* Main Content Area */}
      {filteredTickets.length === 0 ? (
        <EmptyState
          icon={Ticket}
          title="No IT Tickets Found"
          description={searchTerm || categoryFilter !== 'ALL' || statusFilter !== 'ALL' || priorityFilter !== 'ALL' 
            ? "No tickets match your active filter criteria. Try resetting filters to see all branch tickets."
            : "There are currently no tickets in the database. Create your first support ticket."}
          actionLabel="Create New IT Ticket"
          onAction={onOpenCreateModal}
          secondaryActionLabel="Clear All Filters"
          onSecondaryAction={handleClearFilters}
          badge="Zero Tickets Matching"
        />
      ) : viewMode === 'table' ? (
        <div className="rounded-3xl glass-card border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[720px] text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-extrabold uppercase tracking-wider text-white/50">
                  <th className="p-4 pl-6">Ticket ID</th>
                  <th className="p-4">Title &amp; Description</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Assigned Engineer</th>
                  <th className="p-4">SLA Target</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs">
                {filteredTickets.map(ticket => (
                  <tr 
                    key={ticket.id}
                    onClick={() => onSelectTicket(ticket)}
                    className="hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <td className="p-4 pl-6 font-mono font-extrabold text-[#00f5ff]">
                      {ticket.id}
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-extrabold text-white truncate">{ticket.title}</div>
                      <div className="text-[11px] text-white/50 truncate">{ticket.description}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-white/80 font-semibold text-[11px] border border-white/10">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[11px] ${priorityBadges[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${statusBadges[ticket.status]}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-4 text-white/80 font-medium">
                      {ticket.assignedToName || 'Unassigned'}
                    </td>
                    <td className="p-4">
                      {ticket.isSlaBreached ? (
                        <span className="text-rose-400 font-extrabold text-[11px] flex items-center space-x-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Breached</span>
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-mono text-[11px] flex items-center space-x-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-emerald-400" />
                          <span>On Track</span>
                        </span>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button className="px-3 py-1 rounded-xl bg-[#00f5ff]/15 text-[#00f5ff] border border-[#00f5ff]/30 hover:bg-[#00f5ff]/30 hover:text-white text-xs font-bold transition-colors cursor-pointer">
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban View */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kanbanColumns.map(status => {
            const colTickets = filteredTickets.filter(t => t.status === status);

            return (
              <div key={status} className="p-3.5 rounded-3xl glass-panel border border-white/10 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">{status}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/70 text-[10px] font-extrabold">
                    {colTickets.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {colTickets.map(t => (
                    <div
                      key={t.id}
                      onClick={() => onSelectTicket(t)}
                      className="p-3.5 rounded-2xl bg-black/60 border border-white/10 hover:border-[#00f5ff]/50 shadow-md cursor-pointer space-y-2 transition-all hover:scale-[1.01]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-extrabold text-[#00f5ff]">{t.id}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.2 rounded-full ${priorityBadges[t.priority]}`}>
                          {t.priority}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white line-clamp-2">{t.title}</h4>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-white/50 font-medium">
                        <span>{t.category}</span>
                        <span className="text-white/90 font-bold">{t.assignedToName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
