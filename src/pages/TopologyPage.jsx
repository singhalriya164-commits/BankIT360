import React, { useState } from 'react';
import { Network, Server, HardDrive, RefreshCw, Zap, CheckCircle2, AlertTriangle, Cpu, Activity, ShieldCheck } from 'lucide-react';

export default function TopologyPage({ branches }) {
  const [selectedBranchId, setSelectedBranchId] = useState('BR-102');
  const [rebootingNodeId, setRebootingNodeId] = useState(null);
  const [nodes, setNodes] = useState([
    { id: 'NODE-1', name: 'Metro Central Core Catalyst 9300 Switch', type: 'Core Switch', ip: '10.240.10.1', latency: '4ms', status: 'Healthy', port: 'GigE 1/0/1' },
    { id: 'NODE-2', name: 'Teller Counter #1 Workstation WS-101', type: 'Workstation', ip: '10.240.10.15', latency: '12ms', status: 'Healthy', port: 'Fa 0/1' },
    { id: 'NODE-3', name: 'Teller Counter #3 Epson Thermal Printer', type: 'Printer', ip: '10.240.10.42', latency: '180ms', status: 'Degraded', port: 'USB-3' },
    { id: 'NODE-4', name: 'Drive-Thru NCR SelfServ 84 ATM', type: 'ATM Node', ip: '10.240.10.99', latency: '980ms', status: 'Critical Fault', port: 'WAN-2' },
    { id: 'NODE-5', name: 'Cisco VoIP Gateway Router', type: 'Router', ip: '10.240.10.254', latency: '6ms', status: 'Healthy', port: 'Serial 0/0' },
  ]);

  const handleRebootNode = (nodeId) => {
    setRebootingNodeId(nodeId);
    setTimeout(() => {
      setNodes(prev => prev.map(n => {
        if (n.id === nodeId) {
          return { ...n, status: 'Healthy', latency: '8ms' };
        }
        return n;
      }));
      setRebootingNodeId(null);
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Network className="w-6 h-6 text-[#00f5ff]" />
            <span>Interactive Infrastructure &amp; ATM Network Topology Map</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Real-time ping latency telemetry, port mapping, and 1-click remote node diagnostic power cycle
          </p>
        </div>

        {/* Branch Selector */}
        <select
          value={selectedBranchId}
          onChange={(e) => setSelectedBranchId(e.target.value)}
          className="px-3 py-2 rounded-xl bg-black/80 border border-white/15 text-white text-xs font-bold shadow-xs focus:outline-none focus:border-[#00f5ff] cursor-pointer"
        >
          {branches.map(b => (
            <option key={b.id} value={b.id}>{b.name} ({b.code})</option>
          ))}
        </select>
      </div>

      {/* Network Visualizer Panel */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-6 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-[#00f5ff]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Branch Infrastructure Nodes — {branches.find(b => b.id === selectedBranchId)?.name}
            </h3>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-extrabold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live Telemetry Feed
          </span>
        </div>

        {/* Node Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nodes.map(node => {
            const isCritical = node.status === 'Critical Fault';
            const isDegraded = node.status === 'Degraded';
            const isRebooting = rebootingNodeId === node.id;

            return (
              <div 
                key={node.id} 
                className={`p-4 rounded-2xl border space-y-3 transition-all ${
                  isCritical 
                    ? 'bg-rose-950/20 border-rose-500/40 shadow-glow-rose' 
                    : isDegraded 
                    ? 'bg-amber-950/20 border-amber-500/40' 
                    : 'bg-white/5 border-white/10 shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-white/40">{node.ip}</span>
                    <h4 className="text-xs font-bold text-white">{node.name}</h4>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                    isCritical ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                    isDegraded ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {node.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-black/50 p-2.5 rounded-xl border border-white/10">
                  <div>
                    <span className="text-white/40 text-[10px] block font-bold">Latency</span>
                    <span className={`font-mono font-bold ${isCritical ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {node.latency}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] block font-bold">Port Mapping</span>
                    <span className="text-white font-mono font-bold">{node.port}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRebootNode(node.id)}
                  disabled={isRebooting}
                  className="w-full py-2 px-3 rounded-xl bg-[#ff2d78]/20 hover:bg-[#ff2d78]/30 text-white border border-[#ff2d78]/40 font-extrabold text-xs flex items-center justify-center space-x-1.5 transition-all disabled:opacity-50 shadow-xs cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#ff2d78] ${isRebooting ? 'animate-spin' : ''}`} />
                  <span>{isRebooting ? 'Power Cycling Node...' : 'Simulate Diagnostic Reboot'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
