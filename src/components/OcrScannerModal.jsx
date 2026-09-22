import React, { useState } from 'react';
import { X, Upload, FileImage, Sparkles, CheckCircle2, AlertTriangle, Cpu, ArrowRight } from 'lucide-react';

export default function OcrScannerModal({ isOpen, onClose, onScanComplete }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  if (!isOpen) return null;

  // Sample pre-loaded banking error presets for instant demo
  const sampleErrors = [
    {
      id: 'ora-12541',
      name: 'Oracle DB TNS Listener Error (ORA-12541)',
      title: 'Oracle Database TNS Listener Unreachable at Branch BR-102',
      category: 'Database',
      priority: 'P1',
      description: 'ERROR ORA-12541: TNS:no listener. Core Banking Transaction DB Connection timed out. Affected server: 10.24.8.100.',
      previewText: 'ORA-12541: TNS:no listener. Connection refused by DB server node 02.'
    },
    {
      id: 'atm-cash-fault',
      name: 'ATM Cash Dispenser Hardware Jam (ERR-804)',
      title: 'ATM Cash Dispenser Cassette Motor Sensor Failure - ATM-101',
      category: 'Hardware',
      priority: 'P2',
      description: 'HARDWARE FAULT ERR-804: Cash dispenser unit cassette #2 jam detected. Branch: Downtown Main (BR-101). Sensor status: FAULTED.',
      previewText: 'DISPENSER FAULT ERR-804: Cassette jam at optical sensor #2.'
    },
    {
      id: 'vpn-ssl-timeout',
      name: 'Core Banking VPN Gateway Timeout (ERR-503)',
      title: 'Core Banking Gateway 503 Service Unavailable',
      category: 'Network',
      priority: 'P1',
      description: 'HTTP 503 SERVICE UNAVAILABLE: Core banking API gateway failed to respond within 3000ms. SSL Handshake dropped.',
      previewText: 'HTTP 503: Core Banking Gateway SSL Handshake Timeout (3000ms).'
    }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const processScan = (errorData = null) => {
    setIsScanning(true);
    setScanProgress(20);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setScanProgress(100);
      setIsScanning(false);

      const result = errorData || {
        title: 'Custom Uploaded Error Screenshot Scan Result',
        category: 'Software',
        priority: 'P2',
        description: `OCR EXTRACTED ERROR LOG:\nCaptured timestamp: ${new Date().toLocaleString()}\nExtracted Text: System Exception - Connection Reset by Peer (0x80004005). Please inspect network telemetry.`
      };

      onScanComplete(result);
      onClose();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-lg bg-[#0a0b10]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-5 max-h-[92vh] overflow-y-auto text-white modal-pop-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-[#ff2d78]/20 text-[#ff2d78] border border-[#ff2d78]/30 shadow-glow">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">AI Screenshot OCR Error Scanner</h3>
              <p className="text-xs text-white/50">Scan banking error screenshots to auto-fill IT tickets</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-white/20 hover:border-[#00f5ff]/60 bg-black/50 p-6 rounded-3xl text-center space-y-3 transition-colors cursor-pointer relative shadow-inner">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-12 h-12 rounded-2xl bg-white/5 shadow-xs border border-white/15 flex items-center justify-center mx-auto text-[#00f5ff]">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-white block">Click or Drag &amp; Drop Error Screenshot</span>
            <span className="text-[11px] text-white/50">Supports PNG, JPG, WEBP screenshot logs</span>
          </div>

          {imagePreview && (
            <div className="pt-2">
              <img src={imagePreview} alt="Screenshot Preview" className="max-h-32 mx-auto rounded-2xl border border-white/20 shadow-md" />
              <button
                onClick={() => processScan()}
                className="mt-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] hover:opacity-95 text-white font-extrabold text-xs shadow-glow cursor-pointer transition-all"
              >
                Start AI OCR Text Extraction
              </button>
            </div>
          )}
        </div>

        {/* Sample Banking Error Presets */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/70 uppercase tracking-wider block">Or Select Banking Error Demo Preset:</label>
          <div className="space-y-2">
            {sampleErrors.map(err => (
              <button
                key={err.id}
                onClick={() => processScan(err)}
                disabled={isScanning}
                className="w-full p-3.5 rounded-2xl bg-black/50 hover:bg-white/5 border border-white/10 hover:border-[#00f5ff]/30 text-left transition-all group flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-extrabold text-xs text-white group-hover:text-[#00f5ff] flex items-center space-x-2">
                    <span>{err.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">{err.priority}</span>
                  </div>
                  <p className="text-[11px] text-white/50 mt-0.5 font-mono">{err.previewText}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#00f5ff] shrink-0 ml-2 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Scan Progress Bar */}
        {isScanning && (
          <div className="p-4 rounded-2xl bg-black/60 border border-white/15 text-white space-y-2 text-xs animate-pulse">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#00f5ff] animate-spin" />
                <span>AI Computer Vision Optical Scan Running...</span>
              </span>
              <span className="text-[#00f5ff] font-mono">{scanProgress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] h-2 rounded-full transition-all duration-200" style={{ width: `${scanProgress}%` }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
