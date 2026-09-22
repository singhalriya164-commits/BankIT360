import React, { useState } from 'react';
import { Mic, MicOff, X, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

export default function VoiceAssistantModal({ isOpen, onClose, onExecuteVoiceCommand }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [statusText, setStatusText] = useState('Click microphone button to speak IT voice command...');

  if (!isOpen) return null;

  const presetVoiceCommands = [
    'Create thermal receipt printer ticket for Metro Central branch',
    'Show critical branch health scores and SLA breaches',
    'Reboot core switch stack at Metro Central branch',
    'Open AI ticket category classifier drawer'
  ];

  const handleStartListening = () => {
    setIsListening(true);
    setStatusText('Listening to voice telemetry input...');
    setTranscript('');

    setTimeout(() => {
      const sample = presetVoiceCommands[Math.floor(Math.random() * presetVoiceCommands.length)];
      setTranscript(sample);
      setIsListening(false);
      setStatusText('Voice command recognized successfully!');
    }, 2200);
  };

  const handleConfirmCommand = () => {
    if (!transcript) return;
    onExecuteVoiceCommand(transcript);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 modal-backdrop-smooth">
      <div className="w-full max-w-md bg-[#0a0b10]/95 backdrop-blur-2xl border border-indigo-500/40 rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-6 text-center modal-pop-in">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Voice AI Command Assistant</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pulse Mic Button */}
        <div className="py-6 flex flex-col items-center justify-center space-y-4">
          <button
            onClick={handleStartListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-600 text-white animate-bounce shadow-xl shadow-rose-500/50 glow-rose'
                : 'bg-gradient-to-tr from-indigo-600 to-blue-600 text-white hover:scale-105 shadow-xl shadow-indigo-600/30 glow-blue'
            }`}
          >
            {isListening ? <Mic className="w-10 h-10 animate-pulse" /> : <Mic className="w-10 h-10" />}
          </button>

          <p className="text-xs text-slate-400 font-medium">{statusText}</p>
        </div>

        {/* Speech Transcript */}
        {transcript && (
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-2 text-left animate-in fade-in">
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">Recognized Speech Input:</span>
            <p className="text-white font-medium italic">"{transcript}"</p>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmCommand}
            disabled={!transcript}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/20"
          >
            Execute Voice Command
          </button>
        </div>
      </div>
    </div>
  );
}
