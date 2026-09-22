import React, { useState } from 'react';
import { HardDrive, Plus, AlertTriangle, ShieldCheck, CheckCircle2, User, Building2, Search, X, Users, Phone, Mail, Edit3, Trash2, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { INITIAL_VENDORS } from '../services/mockData';
import EmptyState from '../components/EmptyState';

export default function AssetsPage({ 
  assets = [], 
  branches = [], 
  vendors = INITIAL_VENDORS, 
  onCreateAsset, 
  onUpdateAssetStatus, 
  onDeleteAsset, 
  onAddToast 
}) {
  const [activeTab, setActiveTab] = useState('assets'); // 'assets' | 'vendors'
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState(null);

  const [tag, setTag] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Workstation');
  const [makeModel, setMakeModel] = useState('');
  const [branchId, setBranchId] = useState('BR-101');
  const [assignedTo, setAssignedTo] = useState('Alex Morgan');

  const filteredAssets = assets.filter(a => 
    a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.tag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.makeModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.branchName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVendors = vendors.filter(v =>
    v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.contact?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const branch = branches.find(b => b.id === branchId);

    const newAsset = {
      id: `AST-${Math.floor(4000 + Math.random() * 1000)}`,
      tag: tag || `BNK-NY-${Math.floor(100 + Math.random() * 900)}`,
      name,
      category,
      makeModel: makeModel || 'Dell Workstation',
      branchId,
      branchName: branch ? branch.name : 'Downtown Main Branch',
      assignedTo: assignedTo || 'Unassigned',
      status: 'In Service',
      purchaseDate: new Date().toISOString().split('T')[0],
      warrantyExpiry: '2028-08-15'
    };

    if (onCreateAsset) onCreateAsset(newAsset);
    if (onAddToast) onAddToast('Asset Registered 💾', `Successfully registered ${name} (${newAsset.tag}).`, 'success');
    setShowAddModal(false);
    setTag('');
    setName('');
    setMakeModel('');
  };

  const handleStatusChange = (assetId, newStatus) => {
    if (onUpdateAssetStatus) {
      onUpdateAssetStatus(assetId, newStatus);
    }
    if (onAddToast) {
      onAddToast('Asset Status Updated 🔄', `Asset status updated to ${newStatus}`, 'info');
    }
    setEditingAssetId(null);
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <HardDrive className="w-6 h-6 text-purple-400" />
            <span>IT Asset Management, Hardware Lifecycle &amp; AMC</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Track workstation allocation, ATM maintenance status, warranty expirations, and OEM vendor SLA contracts
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex rounded-2xl bg-white/5 p-1 border border-white/10 text-xs font-bold">
            <button
              onClick={() => setActiveTab('assets')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'assets' ? 'bg-purple-600 text-white shadow-glow' : 'text-white/60 hover:text-white'
              }`}
            >
              💻 Hardware Assets ({assets.length})
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'vendors' ? 'bg-purple-600 text-white shadow-glow' : 'text-white/60 hover:text-white'
              }`}
            >
              🤝 Vendor AMC Contracts ({vendors.length})
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-[#ff2d78] hover:opacity-95 text-white font-extrabold text-xs flex items-center space-x-2 transition-all shadow-glow shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register Asset</span>
          </button>
        </div>
      </div>

      {/* Warranty Alert Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-3 shadow-md">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
        <div>
          <span className="font-bold text-amber-200 uppercase tracking-wider">AMC &amp; Warranty Renewal Alert:</span>
          <p className="text-white/80 text-[11px] mt-0.5">
            Dell Enterprise Server contract and 2 teller printer warranties expire in the next 45 days. Automated vendor dispatch scheduled.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-3xl glass-card border border-white/10 flex items-center space-x-3 text-xs">
        <Search className="w-4 h-4 text-white/40" />
        <input
          type="text"
          placeholder={activeTab === 'assets' ? "Filter assets by Tag, Model, Serial, or Branch..." : "Search vendors by OEM Name, Service Scope, or Contact..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent border-none text-white text-xs placeholder-white/40 focus:outline-none"
        />
      </div>

      {/* TAB 1: ASSETS TABLE */}
      {activeTab === 'assets' && (
        filteredAssets.length === 0 ? (
          <EmptyState
            icon={HardDrive}
            title="No Hardware Assets Found"
            description={searchTerm ? "No assets match your search keyword. Try another tag or branch name." : "No IT assets currently registered in the database."}
            actionLabel="Register New Asset"
            onAction={() => setShowAddModal(true)}
            secondaryActionLabel="Clear Search"
            onSecondaryAction={() => setSearchTerm('')}
            badge="Asset Inventory"
          />
        ) : (
          <div className="rounded-3xl glass-card border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[760px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-extrabold uppercase tracking-wider text-white/50">
                    <th className="p-4 pl-6">Asset Tag</th>
                    <th className="p-4">Asset Name &amp; Model</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Assigned Branch</th>
                    <th className="p-4">Current User / Allocation</th>
                    <th className="p-4">Lifecycle Status</th>
                    <th className="p-4">Warranty Expiry</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-xs">
                  {filteredAssets.map(asset => (
                    <tr key={asset.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 pl-6 font-mono font-bold text-purple-400">{asset.tag}</td>
                      <td className="p-4">
                        <div className="font-bold text-white">{asset.name}</div>
                        <div className="text-[11px] text-white/50">{asset.makeModel}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-white/80 font-medium text-[11px] border border-white/10">
                          {asset.category}
                        </span>
                      </td>
                      <td className="p-4 text-white/80">{asset.branchName}</td>
                      <td className="p-4 text-white font-medium">{asset.assignedTo}</td>
                      <td className="p-4">
                        {editingAssetId === asset.id ? (
                          <select
                            defaultValue={asset.status}
                            onChange={(e) => handleStatusChange(asset.id, e.target.value)}
                            className="px-2 py-1 rounded-lg bg-black border border-white/30 text-white text-[11px] cursor-pointer"
                          >
                            <option value="In Service">In Service</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                            <option value="Faulted">Faulted</option>
                            <option value="Retired">Retired / Decommissioned</option>
                          </select>
                        ) : (
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
                            asset.status === 'In Service' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : asset.status === 'Under Maintenance' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : asset.status === 'Faulted' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                          }`}>
                            {asset.status}
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-mono text-[11px] text-white/50">{asset.warrantyExpiry}</td>
                      <td className="p-4 pr-6 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setEditingAssetId(editingAssetId === asset.id ? null : asset.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                          title="Edit Status"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        {onDeleteAsset && (
                          <button
                            onClick={() => onDeleteAsset(asset.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                            title="Delete / Decommission Asset"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* TAB 2: VENDOR AMC CONTRACTS */}
      {activeTab === 'vendors' && (
        filteredVendors.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No Vendor Contracts Found"
            description={searchTerm ? "No vendor or service scope matches your search query." : "No third-party AMC vendors are currently contracted."}
            secondaryActionLabel="Clear Search"
            onSecondaryAction={() => setSearchTerm('')}
            badge="Vendor Network"
          />
        ) : (
          <div className="rounded-3xl glass-card border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[760px] text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-extrabold uppercase tracking-wider text-white/50">
                    <th className="p-4 pl-6">Vendor Name</th>
                    <th className="p-4">Scope of Service</th>
                    <th className="p-4">Contractual SLA</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">Annual Cost</th>
                    <th className="p-4">AMC Expiry Date</th>
                    <th className="p-4 pr-6 text-right">Escalation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredVendors.map(vendor => (
                    <tr key={vendor.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 pl-6 font-bold text-white flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-[10px]">
                          {vendor.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span>{vendor.name}</span>
                      </td>
                      <td className="p-4 text-white/80">{vendor.service}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold text-[10px]">
                          {vendor.activeSla}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-mono text-[11px]">{vendor.contact}</div>
                        <div className="text-white/40 text-[10px]">{vendor.email}</div>
                      </td>
                      <td className="p-4 font-mono font-bold text-amber-300">{vendor.contractValue || '$50,000/yr'}</td>
                      <td className="p-4 font-mono text-white/60">{vendor.amcExpiry}</td>
                      <td className="p-4 pr-6 text-right">
                        <button
                          onClick={() => {
                            if (onAddToast) onAddToast('Vendor Dispatched 🚨', `High-priority dispatch request sent to ${vendor.name} 24x7 TAC team.`, 'warning');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:opacity-95 text-white font-bold text-[11px] transition-all cursor-pointer shadow-glow"
                        >
                          🚨 Escalate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0a0b10] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative text-white">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-white">Register Technology Asset</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/80 font-bold mb-1">Asset Tag *</label>
                  <input 
                    type="text"
                    required
                    placeholder="BNK-NY-099"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/80 font-bold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value="Workstation">Workstation</option>
                    <option value="Printer">Thermal / Passbook Printer</option>
                    <option value="ATM Machine">ATM Machine</option>
                    <option value="Network Switch">Network Switch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/80 font-bold mb-1">Asset Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="Dell OptiPlex 7090 Teller Workstation"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs text-white/80 font-bold mb-1">Make / Model Specification</label>
                <input 
                  type="text"
                  placeholder="Dell OptiPlex 7090 i7 32GB 512GB NVMe"
                  value={makeModel}
                  onChange={(e) => setMakeModel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/80 font-bold mb-1">Assigned Branch</label>
                  <select
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/80 font-bold mb-1">Assigned Employee / Counter</label>
                  <input 
                    type="text"
                    placeholder="e.g. Alex Morgan / Counter 4"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold shadow-glow transition-all cursor-pointer"
                >
                  Register Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
