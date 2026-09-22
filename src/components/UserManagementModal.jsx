import React, { useState } from 'react';
import { Users, Plus, X, Search, Shield, UserCheck, Edit3, Trash2, CheckCircle2, AlertTriangle, Building2, Key } from 'lucide-react';

export default function UserManagementModal({ 
  isOpen, 
  onClose, 
  users = [], 
  branches = [], 
  onCreateUser, 
  onUpdateUserRole, 
  onToggleUserStatus, 
  onDeleteUser, 
  onAddToast 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  // New User Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('bank_employee');
  const [title, setTitle] = useState('');
  const [branchId, setBranchId] = useState(branches[0]?.id || 'BR-101');
  const [department, setDepartment] = useState('Branch Retail Operations');

  if (!isOpen) return null;

  const roleLabels = {
    bank_employee: { name: 'Branch Staff / Teller', badge: 'bg-[#ff2d78]/20 text-[#ff2d78] border-[#ff2d78]/30' },
    it_support_engineer: { name: 'L2 IT Support Engineer', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
    it_manager: { name: 'Regional IT Operations Manager', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    senior_management: { name: 'Executive Director / CIO', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    external_vendor: { name: 'External Hardware Vendor (AMC)', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30' }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newUser = {
      id: `U-00${users.length + 1}`,
      name,
      email,
      role,
      roleCategory: role === 'bank_employee' ? '1. Bank Employees (Primary Users)' : role === 'it_support_engineer' ? '2. IT Support Team (Core Users)' : '3. IT Manager / Admin',
      title: title || (role === 'bank_employee' ? 'Branch Teller' : 'IT Engineer'),
      branchId,
      department: department || 'Branch Operations',
      isActive: true,
      createdAt: new Date().toISOString()
    };

    if (onCreateUser) {
      onCreateUser(newUser);
    }
    if (onAddToast) {
      onAddToast('User Provisioned 👤', `Created ${name} with ${roleLabels[role]?.name || role} role.`, 'success');
    }
    setShowAddForm(false);
    setName('');
    setEmail('');
    setTitle('');
  };

  const handleRoleChange = (userId, newRole) => {
    if (onUpdateUserRole) {
      onUpdateUserRole(userId, newRole);
    }
    if (onAddToast) {
      onAddToast('Role Updated 🛡️', `Assigned new role permissions to user.`, 'info');
    }
    setEditingUserId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-4xl bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-5 max-h-[90vh] overflow-y-auto modal-pop-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-[#ff2d78] flex items-center justify-center text-white shadow-glow">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center space-x-2">
                <span>Enterprise User &amp; Identity Management (RBAC)</span>
              </h2>
              <p className="text-xs text-white/50">
                Manage bank staff personas, provision new technicians, and audit role access entitlements
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-95 text-white font-extrabold text-xs flex items-center space-x-1.5 transition-all shadow-glow-emerald cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'Cancel' : 'Provision Staff'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add User Form Drawer */}
        {showAddForm && (
          <form onSubmit={handleCreateSubmit} className="p-5 rounded-3xl bg-white/[0.03] border border-emerald-500/30 space-y-4 text-xs animate-in fade-in">
            <h3 className="font-bold text-sm text-emerald-400 flex items-center space-x-1.5">
              <UserCheck className="w-4 h-4" />
              <span>Provision New BankIT360 User</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-white/70 font-bold">Full Name *</label>
                  <span className={`text-[10px] font-mono ${name.length < 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    min 3 chars
                  </span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Nair"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-2xl bg-black/70 border text-white focus:outline-none transition-colors ${
                    name.length > 0 && name.length < 3 ? 'border-rose-500' : name.length >= 3 ? 'border-emerald-500/50' : 'border-white/15'
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-white/70 font-bold">Bank Email Address *</label>
                  <span className={`text-[10px] font-mono ${email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'invalid format' : 'valid'}
                  </span>
                </div>
                <input
                  type="email"
                  required
                  placeholder="priya.nair@bankit360.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-2xl bg-black/70 border text-white focus:outline-none transition-colors ${
                    email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'border-rose-500' : email ? 'border-emerald-500/50' : 'border-white/15'
                  }`}
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Job Title / Designation</label>
                <input
                  type="text"
                  placeholder="Senior Vault Officer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">System Role (RBAC)</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="bank_employee">1. Branch Staff / Teller</option>
                  <option value="it_support_engineer">2. L2 IT Support Engineer</option>
                  <option value="it_manager">3. Regional IT Operations Manager</option>
                  <option value="senior_management">4. Executive Director / CIO</option>
                  <option value="external_vendor">5. External AMC Hardware Vendor</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Assigned Branch Location</label>
                <select
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.city})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Department</label>
                <input
                  type="text"
                  placeholder="Branch Operations"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-emerald-500"
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
                disabled={name.trim().length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                className="px-5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold shadow-glow-emerald cursor-pointer transition-all"
              >
                Save &amp; Provision User
              </button>
            </div>
          </form>
        )}

        {/* Search Bar */}
        <div className="p-3.5 rounded-2xl glass-card border border-white/10 flex items-center space-x-3 text-xs">
          <Search className="w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search users by name, email, designation, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none text-white placeholder-white/40 focus:outline-none text-xs"
          />
        </div>

        {/* Users Table */}
        <div className="rounded-2xl glass-card border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-extrabold uppercase tracking-wider text-white/50">
                  <th className="p-3.5 pl-5">User</th>
                  <th className="p-3.5">Designation &amp; Dept</th>
                  <th className="p-3.5">Branch Location</th>
                  <th className="p-3.5">RBAC Role</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredUsers.map(user => {
                  const roleMeta = roleLabels[user.role] || roleLabels.bank_employee;
                  const branchObj = branches.find(b => b.id === user.branchId);

                  return (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 pl-5">
                        <div className="font-bold text-white flex items-center space-x-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-[#00f5ff] flex items-center justify-center text-[10px] font-black text-white shrink-0">
                            {user.name?.slice(0, 2).toUpperCase() || 'US'}
                          </div>
                          <div>
                            <div>{user.name}</div>
                            <div className="text-[10px] font-mono text-white/40">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="text-white font-medium">{user.title}</div>
                        <div className="text-[10px] text-white/40">{user.department}</div>
                      </td>

                      <td className="p-3.5 text-white/80">
                        {branchObj ? `${branchObj.name} (${branchObj.city})` : user.branchId || 'Downtown Main'}
                      </td>

                      <td className="p-3.5">
                        {editingUserId === user.id ? (
                          <select
                            defaultValue={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="px-2 py-1 rounded-lg bg-black border border-white/30 text-white text-[11px] cursor-pointer"
                          >
                            <option value="bank_employee">Branch Staff</option>
                            <option value="it_support_engineer">L2 Support Engineer</option>
                            <option value="it_manager">IT Manager</option>
                            <option value="senior_management">Senior Executive</option>
                            <option value="external_vendor">External Vendor</option>
                          </select>
                        ) : (
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${roleMeta.badge}`}>
                            {roleMeta.name}
                          </span>
                        )}
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          user.isActive !== false ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        }`}>
                          {user.isActive !== false ? 'Active' : 'Suspended'}
                        </span>
                      </td>

                      <td className="p-3.5 pr-5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setEditingUserId(editingUserId === user.id ? null : user.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                          title="Edit Role"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        {onToggleUserStatus && (
                          <button
                            onClick={() => onToggleUserStatus(user.id)}
                            className={`p-1.5 rounded-lg border text-[10px] font-bold transition-colors cursor-pointer ${
                              user.isActive !== false ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            }`}
                            title={user.isActive !== false ? 'Suspend User' : 'Activate User'}
                          >
                            {user.isActive !== false ? 'Suspend' : 'Activate'}
                          </button>
                        )}
                        {onDeleteUser && (
                          <button
                            onClick={() => onDeleteUser(user.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                            title="Delete User"
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
