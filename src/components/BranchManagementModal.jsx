import React, { useState } from 'react';
import { Building2, Plus, X, Search, MapPin, Phone, User, Activity, Edit3, Trash2, CheckCircle2, AlertTriangle, ShieldCheck, Server, Globe } from 'lucide-react';

export default function BranchManagementModal({ 
  isOpen, 
  onClose, 
  branches = [], 
  onCreateBranch, 
  onUpdateBranch, 
  onDeleteBranch, 
  onAddToast,
  onNavigate
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBranchId, setEditingBranchId] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('Metro East');
  const [manager, setManager] = useState('');
  const [phone, setPhone] = useState('');
  const [ipSubnet, setIpSubnet] = useState('10.240.10.0/24');

  if (!isOpen) return null;

  const regions = ['ALL', 'Metro East', 'Metro South', 'Western Region', 'Northern Region', 'Southern Region'];

  const filteredBranches = branches.filter(b => {
    const matchesRegion = selectedRegion === 'ALL' || b.region === selectedRegion;
    const matchesSearch = 
      b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.manager?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !city.trim()) return;

    const newBranch = {
      id: `BR-${110 + branches.length + 1}`,
      name,
      code: code || `BR-${Math.floor(10 + Math.random() * 90)}`,
      region,
      city,
      healthScore: 95,
      activeTickets: 0,
      openIncidents: 0,
      failedAssets: 0,
      manager: manager || 'Branch Operations Lead',
      phone: phone || '+1 800-555-0199',
      ipSubnet: ipSubnet || '10.240.16.0/24'
    };

    if (onCreateBranch) {
      onCreateBranch(newBranch);
    }
    if (onAddToast) {
      onAddToast('Branch Commissioned 🏦', `Successfully provisioned ${name} (${city}) into the network.`, 'success');
    }
    setShowAddForm(false);
    setName('');
    setCode('');
    setCity('');
    setManager('');
    setPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-4xl bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-5 max-h-[90vh] overflow-y-auto modal-pop-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-glow">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center space-x-2">
                <span>Enterprise Branch Management &amp; Provisioning</span>
              </h2>
              <p className="text-xs text-white/50">
                Commission new physical branches, configure regional IP subnets, and assign branch managers
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white font-extrabold text-xs flex items-center space-x-1.5 transition-all shadow-glow cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'Cancel' : 'Commission Branch'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add Branch Form Drawer */}
        {showAddForm && (
          <form onSubmit={handleCreateSubmit} className="p-5 rounded-3xl bg-white/[0.03] border border-cyan-500/30 space-y-4 text-xs animate-in fade-in">
            <h3 className="font-bold text-sm text-cyan-400 flex items-center space-x-1.5">
              <Building2 className="w-4 h-4" />
              <span>Commission New Regional Branch</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-white/70 font-bold mb-1">Branch Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Austin Innovation Square"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Branch Code</label>
                <input
                  type="text"
                  placeholder="AUSTIN-11"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">City *</label>
                <input
                  type="text"
                  required
                  placeholder="Austin"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Geographic Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="Metro East">Metro East</option>
                  <option value="Metro South">Metro South</option>
                  <option value="Western Region">Western Region</option>
                  <option value="Northern Region">Northern Region</option>
                  <option value="Southern Region">Southern Region</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Branch Manager</label>
                <input
                  type="text"
                  placeholder="Rachel Green"
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Emergency Helpdesk Phone</label>
                <input
                  type="text"
                  placeholder="+1 512-555-0188"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={name.trim().length < 3 || city.trim().length < 2}
                className="px-5 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold shadow-glow cursor-pointer transition-all"
              >
                Save &amp; Connect Branch
              </button>
            </div>
          </form>
        )}

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 p-3.5 rounded-2xl glass-card border border-white/10 flex items-center space-x-3 text-xs">
            <Search className="w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search branches by name, city, code, or manager..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder-white/40 focus:outline-none text-xs"
            />
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto py-1">
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedRegion === r ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Branch Cards Table */}
        <div className="rounded-2xl glass-card border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-extrabold uppercase tracking-wider text-white/50">
                  <th className="p-3.5 pl-5">Branch Name &amp; Code</th>
                  <th className="p-3.5">City &amp; Region</th>
                  <th className="p-3.5">Branch Manager</th>
                  <th className="p-3.5">Emergency Phone</th>
                  <th className="p-3.5">Health Score</th>
                  <th className="p-3.5 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredBranches.map(branch => {
                  const isHealthy = (branch.healthScore || 90) >= 80;
                  const isCritical = (branch.healthScore || 90) < 65;

                  return (
                    <tr key={branch.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 pl-5">
                        <div className="font-bold text-white flex items-center space-x-2">
                          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div>{branch.name}</div>
                            <div className="text-[10px] font-mono text-white/40">{branch.id} • {branch.code}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="text-white font-medium">{branch.city}</div>
                        <div className="text-[10px] text-white/40">{branch.region}</div>
                      </td>

                      <td className="p-3.5 text-white font-medium">
                        {branch.manager || 'Sarah Jenkins'}
                      </td>

                      <td className="p-3.5 font-mono text-white/70">
                        {branch.phone || '+1 212-555-0101'}
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                          isCritical ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : isHealthy ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}>
                          {branch.healthScore || 88}/100
                        </span>
                      </td>

                      <td className="p-3.5 pr-5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => {
                            if (onNavigate) onNavigate('branch-health');
                            onClose();
                          }}
                          className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Telemetry
                        </button>
                        {onDeleteBranch && (
                          <button
                            onClick={() => onDeleteBranch(branch.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                            title="Decommission Branch"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
