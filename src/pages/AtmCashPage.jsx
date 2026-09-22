import React, { useState } from 'react';
import { 
  DollarSign, 
  HardDrive, 
  RefreshCw, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Wifi, 
  CreditCard, 
  Radio, 
  Sparkles, 
  Zap, 
  Smartphone, 
  Layers, 
  ArrowRight,
  Printer,
  Signal
} from 'lucide-react';
import contactlessPosImg from '../assets/contactless_nfc_pos.jpg';

export default function AtmCashPage({ branches }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pos' | 'atms'
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tapState, setTapState] = useState('idle'); // 'idle' | 'tapping' | 'success'
  const [txHistory, setTxHistory] = useState([
    { id: 'TX-9481', amount: '$42.50', card: 'Visa Contactless (••8821)', time: '1m ago', speed: '0.34s', status: 'Approved' },
    { id: 'TX-9480', amount: '$120.00', card: 'Mastercard PayPass (••3410)', time: '3m ago', speed: '0.41s', status: 'Approved' },
    { id: 'TX-9479', amount: '$15.00', card: 'RuPay Contactless (••9012)', time: '6m ago', speed: '0.29s', status: 'Approved' },
  ]);

  const [atms, setAtms] = useState([
    { id: 'ATM-101', name: 'Downtown Main Lobby NCR 84 ATM', branch: 'Downtown Main Branch', cashLevel: 78, status: 'Normal', vaultSensor: 'Locked (Secure)', cassette1: '82%', cassette2: '74%', cassette3: '80%', cassette4: '76%' },
    { id: 'ATM-102', name: 'Metro Central Walk-up Diebold ATM', branch: 'Metro Central Branch', cashLevel: 14, status: 'Low Cash Warning', vaultSensor: 'Locked (Secure)', cassette1: '12% (Refill Needed)', cassette2: '15%', cassette3: '10%', cassette4: '19%' },
    { id: 'ATM-103', name: 'Airport Plaza Drive-Thru ATM #1', branch: 'Airport Plaza Branch', cashLevel: 92, status: 'Dispenser Fault', vaultSensor: 'Locked (Secure)', cassette1: '95%', cassette2: '90%', cassette3: '94%', cassette4: '89%' },
    { id: 'ATM-104', name: 'Financial District Plaza NCR ATM', branch: 'Financial District Plaza', cashLevel: 64, status: 'Normal', vaultSensor: 'Locked (Secure)', cassette1: '68%', cassette2: '60%', cassette3: '65%', cassette4: '63%' },
  ]);

  const [posTerminals, setPosTerminals] = useState([
    { id: 'POS-T101', name: 'Teller Counter #1 Smart POS Terminal', branch: 'Downtown Main Branch', nfcSignal: '100% (Optimal)', simSignal: '5G Full', battery: '98%', paperRoll: '84%', emvLevel: 'EMVCo Level 3', status: 'Active' },
    { id: 'POS-T102', name: 'Customer Service Contactless Reader', branch: 'Metro Central Branch', nfcSignal: '96% (Optimal)', simSignal: '4G LTE', battery: '100%', paperRoll: '92%', emvLevel: 'EMVCo Level 3', status: 'Active' },
    { id: 'POS-T103', name: 'Drive-Thru Payment Terminal #2', branch: 'Airport Plaza Branch', nfcSignal: '88% (Normal)', simSignal: '4G LTE', battery: '76%', paperRoll: '18% (Low Roll)', emvLevel: 'EMVCo Level 3', status: 'Warning' },
  ]);

  const handleRefreshTelemetry = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1200);
  };

  const handleSimulateTap = () => {
    if (tapState !== 'idle') return;
    setTapState('tapping');
    setTimeout(() => {
      setTapState('success');
      const newTx = {
        id: `TX-${Math.floor(9500 + Math.random() * 500)}`,
        amount: `$${(Math.random() * 80 + 10).toFixed(2)}`,
        card: 'NFC Contactless Debit (••' + Math.floor(1000 + Math.random() * 9000) + ')',
        time: 'Just now',
        speed: `${(Math.random() * 0.2 + 0.25).toFixed(2)}s`,
        status: 'Approved'
      };
      setTxHistory(prev => [newTx, ...prev.slice(0, 3)]);

      setTimeout(() => {
        setTapState('idle');
      }, 3500);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-left animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#032d60] via-[#091b36] to-[#041226] p-6 sm:p-8 border border-white/15 overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                SMART POS &amp; CONTACTLESS NFC TELEMETRY
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                EMVCo L3 Certified
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              ATM Cash &amp; Contactless NFC PoS Terminals
            </h1>
            <p className="text-sm text-white/70 max-w-2xl leading-relaxed">
              Real-time monitoring of Contactless Tap-to-Pay PoS terminals, NFC RFID radio signal integrity, ATM cash cassette levels, and vault magnetic security sensors.
            </p>
          </div>

          <button
            onClick={handleRefreshTelemetry}
            disabled={isRefreshing}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#ff2d78] via-[#ec4899] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs flex items-center justify-center space-x-2 transition-all shadow-glow shrink-0 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Polling Sensors...' : 'Refresh Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Contactless NFC Tap-to-Pay Simulator Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 3D Visual PoS Terminal Card */}
        <div className="lg:col-span-7 rounded-3xl bg-[#0c0e17]/95 border border-white/12 p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Smart PoS Contactless Terminal</h3>
                  <span className="text-[11px] text-white/50">NFC / RFID Frequency: 13.56 MHz ISO/IEC 14443</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                ● 0.34s Auth Speed
              </span>
            </div>

            {/* High-Res Cinematic Image Showcase */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 aspect-[16/10] group">
              <img 
                src={contactlessPosImg} 
                alt="Contactless NFC PoS Terminal Telemetry" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                    NFC Radio Field Active
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-white/20">
                    AES-256 Tokenized
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Tap Simulator Trigger */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div className="text-xs text-white/70">
              {tapState === 'idle' && 'Hold contactless debit card to terminal to verify latency.'}
              {tapState === 'tapping' && <span className="text-cyan-400 font-bold flex items-center gap-1"><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Transmitting EMV cryptogram over 13.56 MHz...</span>}
              {tapState === 'success' && <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Approved in 0.31s! Cryptogram token validated.</span>}
            </div>

            <button
              onClick={handleSimulateTap}
              disabled={tapState !== 'idle'}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                tapState === 'idle'
                  ? 'bg-gradient-to-r from-[#00f5ff] to-[#0176d3] text-black shadow-glow-cyan hover:opacity-95 transform hover:scale-105'
                  : tapState === 'tapping'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500 text-black font-extrabold shadow-glow'
              }`}
            >
              <Wifi className="w-4 h-4" />
              <span>{tapState === 'idle' ? 'Tap Card (Test NFC)' : tapState === 'tapping' ? 'Authorizing...' : 'Payment Verified ✓'}</span>
            </button>
          </div>
        </div>

        {/* Right: Live Contactless Feed & PoS Health */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          
          {/* Live Recent Contactless Transactions */}
          <div className="rounded-3xl bg-[#0c0e17]/95 border border-white/12 p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Live NFC Tap-to-Pay Feed
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">100% Success</span>
            </div>

            <div className="space-y-2">
              {txHistory.map(tx => (
                <div key={tx.id} className="p-3 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{tx.amount}</span>
                      <span className="text-[10px] font-normal text-white/50">• {tx.time}</span>
                    </div>
                    <div className="text-[11px] text-cyan-300 font-mono">{tx.card}</div>
                  </div>

                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                      {tx.status}
                    </span>
                    <div className="text-[10px] text-white/40 font-mono mt-0.5">{tx.speed}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PoS Terminal Hardware Telemetry */}
          <div className="rounded-3xl bg-[#0c0e17]/95 border border-white/12 p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-pink-400" />
              PoS Fleet Hardware Status
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-black/50 p-2.5 rounded-xl border border-white/10">
                <span className="text-white/40 text-[10px] block">NFC Field Strength</span>
                <span className="font-bold text-cyan-300 font-mono">-42 dBm (Excellent)</span>
              </div>
              <div className="bg-black/50 p-2.5 rounded-xl border border-white/10">
                <span className="text-white/40 text-[10px] block">Wireless Connectivity</span>
                <span className="font-bold text-emerald-400 font-mono">5G Private APN</span>
              </div>
              <div className="bg-black/50 p-2.5 rounded-xl border border-white/10">
                <span className="text-white/40 text-[10px] block">Receipt Thermal Paper</span>
                <span className="font-bold text-white font-mono">92% Full</span>
              </div>
              <div className="bg-black/50 p-2.5 rounded-xl border border-white/10">
                <span className="text-white/40 text-[10px] block">Battery Health</span>
                <span className="font-bold text-emerald-400 font-mono">98% (Healthy)</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. ATM Cash Cassette & Vault IT Telemetry Cards Grid */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">ATM Cash Cassettes &amp; Vault Telemetry ({atms.length} Terminals)</h3>
          </div>
          <span className="text-xs text-cyan-400 font-mono font-bold">15/15 Terminals Online</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {atms.map(atm => {
            const isLowCash = atm.cashLevel < 25;
            const isFault = atm.status.includes('Fault');

            return (
              <div key={atm.id} className="p-5 rounded-3xl bg-[#0c0e17]/95 border border-white/12 space-y-4 shadow-xl text-white hover:border-white/25 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#00f5ff]">{atm.id}</span>
                    <h3 className="text-sm font-extrabold text-white">{atm.name}</h3>
                    <span className="text-[11px] text-white/50 font-medium">{atm.branch}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full font-black text-xs border ${
                    isLowCash ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : isFault ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {atm.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white/60">Overall Vault Cash Capacity</span>
                    <span className={isLowCash ? 'text-amber-400 font-mono' : 'text-emerald-400 font-mono'}>{atm.cashLevel}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden border border-white/10">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isLowCash ? 'bg-amber-500' : isFault ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${atm.cashLevel}%` }}
                    />
                  </div>
                </div>

                {/* 4 Cassette Denomination Table */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs bg-black/50 p-2.5 rounded-2xl border border-white/10 font-mono">
                  <div>
                    <span className="text-white/40 text-[9px] uppercase block font-sans font-bold">$100 Denom</span>
                    <span className="font-bold text-white">{atm.cassette1}</span>
                  </div>
                  <div>
                    <span className="text-white/40 text-[9px] uppercase block font-sans font-bold">$50 Denom</span>
                    <span className="font-bold text-white">{atm.cassette2}</span>
                  </div>
                  <div>
                    <span className="text-white/40 text-[9px] uppercase block font-sans font-bold">$20 Denom</span>
                    <span className="font-bold text-white">{atm.cassette3}</span>
                  </div>
                  <div>
                    <span className="text-white/40 text-[9px] uppercase block font-sans font-bold">$10 Denom</span>
                    <span className="font-bold text-white">{atm.cassette4}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10 text-white/50">
                  <span>Vault Sensor: <strong className="text-emerald-400 font-bold">{atm.vaultSensor}</strong></span>
                  <span className="font-mono text-[11px] text-[#00f5ff]">SNMP v3 Monitored</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
