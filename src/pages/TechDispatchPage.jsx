import React, { useState } from 'react';
import { Truck, MapPin, Clock, User, Phone, CheckCircle2, Navigation, AlertOctagon } from 'lucide-react';

export default function TechDispatchPage() {
  const [techs, setTechs] = useState([
    { id: 'TECH-1', name: 'James Wilson', role: 'L2 Field Operations Lead', vehicle: 'Van #4 (BNK-TECH-01)', assignedIncident: 'INC-2026-004 Metro Central Switch Outage', destination: 'Metro Central Branch', eta: '14 mins', status: 'En Route', location: '4th Ave & 23rd St' },
    { id: 'TECH-2', name: 'Michael Chang', role: 'ATM & Hardware Specialist', vehicle: 'Van #7 (BNK-TECH-07)', assignedIncident: 'TICK-8018 Airport ATM Card Reader Jam', destination: 'Airport Plaza Branch', eta: '8 mins', status: 'On Site Investigation', location: 'Airport Terminal 2 Plaza' },
  ]);

  return (
    <div className="space-y-6 pb-12 font-sans text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <Truck className="w-6 h-6 text-[#00f5ff]" />
            <span>Mobile Field Technician GPS Dispatch &amp; Live ETA Tracker</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Real-time GPS dispatch tracking map for field engineers responding to branch hardware outages
          </p>
        </div>
      </div>

      {/* Technician Dispatch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {techs.map(tech => (
          <div key={tech.id} className="p-5 rounded-3xl glass-card glass-card-hover border border-white/10 space-y-4 shadow-xl text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff2d78] to-[#00f5ff] flex items-center justify-center text-white font-black text-sm shadow-glow">
                  {tech.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">{tech.name}</h3>
                  <span className="text-[11px] text-white/50 font-medium">{tech.role}</span>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full font-black text-xs border ${
                tech.status === 'En Route' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
                {tech.status}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-white/50 font-bold">Assigned Outage Task:</span>
                <span className="font-mono font-bold text-[#ff2d78]">{tech.assignedIncident.split(' ')[0]}</span>
              </div>
              <p className="text-white font-bold">{tech.assignedIncident}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-black/40 p-3 rounded-2xl border border-white/10">
              <div>
                <span className="text-white/40 text-[10px] uppercase block font-bold">Destination</span>
                <span className="text-white font-bold">{tech.destination}</span>
              </div>
              <div>
                <span className="text-white/40 text-[10px] uppercase block font-bold">Estimated Arrival ETA</span>
                <span className="text-emerald-400 font-bold font-mono">{tech.eta}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10 text-white/50">
              <span className="flex items-center space-x-1.5 font-medium">
                <Navigation className="w-3.5 h-3.5 text-[#00f5ff]" />
                <span>GPS: {tech.location}</span>
              </span>
              <span className="font-mono font-bold text-white/80">{tech.vehicle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
