import React, { useState } from 'react';
import { Mic, X, Sparkles, CheckCircle2, Volume2, RefreshCw, Radio } from 'lucide-react';

export default function VoiceTicketStudioModal({ isOpen, onClose, onCreateTicket, onAddToast, activeUser }) {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [aiParsedTicket, setAiParsedTicket] = useState(null);

  if (!isOpen) return null;

  const sampleHindiPhrase = 'हमारे पासबुक प्रिंटर में पेपर जैम हो गया है और काउंटर 3 का स्कैनर नहीं चल रहा है।';

  const handleStartRecording = () => {
    setIsRecording(true);
    setVoiceText('');
    setAiParsedTicket(null);

    setTimeout(() => {
      setIsRecording(false);
      setVoiceText(sampleHindiPhrase);
      setAiParsedTicket({
        title: 'Passbook Printer Jam & Counter #3 Scanner Failure',
        category: 'Hardware Support',
        priority: 'P2 - High',
        branch: 'Downtown Main Branch (BR-101)',
        description: 'Voice note recorded in Hindi: "हमारे पासबुक प्रिंटर में पेपर जैम हो गया है और काउंटर 3 का स्कैनर नहीं चल रहा है।". Hardware printer feed roller jam detected.'
      });
      if (onAddToast) onAddToast('Voice Processed by AI 🎙️', 'Speech recognized in Hindi and translated into IT ticket structure!', 'success');
    }, 2500);
  };

  const handleSubmitVoiceTicket = () => {
    if (!aiParsedTicket) return;

    const newTicket = {
      id: `TICK-${Math.floor(8900 + Math.random() * 100)}`,
      title: aiParsedTicket.title,
      description: aiParsedTicket.description,
      category: aiParsedTicket.category,
      priority: 'P2',
      status: 'Open',
      branchId: 'BR-101',
      requesterId: activeUser.id,
      requesterName: activeUser.name,
      assignedToId: 'U-002',
      assignedToName: 'James Wilson',
      createdAt: new Date().toISOString(),
      slaDeadline: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
      isSlaBreached: false,
      aiSuggestedCategory: aiParsedTicket.category,
      aiConfidence: 0.98,
      comments: []
    };

    onCreateTicket(newTicket);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 modal-backdrop-smooth text-white font-sans text-left">
      <div className="w-full max-w-lg bg-[#0a0b10]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-5 text-left border border-white/20 text-white modal-pop-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff2d78] to-[#00f5ff] text-white flex items-center justify-center shadow-glow">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">AI Voice-to-Ticket Multi-Lingual Studio</h3>
              <p className="text-[11px] text-white/50 font-medium">Record voice note in Hindi or English — AI auto-creates IT ticket</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voice Recording Control */}
        <div className="p-6 rounded-3xl bg-black/50 border border-white/10 text-center space-y-4 shadow-inner">
          {isRecording ? (
            <div className="space-y-3 py-2">
              <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-rose-500/50 animate-pulse">
                <Radio className="w-8 h-8 text-white animate-spin" />
              </div>
              <p className="text-xs font-black text-rose-400">Listening to Voice Dictation (Hindi / English)...</p>
            </div>
          ) : (
            <button
              onClick={handleStartRecording}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ff2d78] to-[#00f5ff] text-white flex items-center justify-center mx-auto shadow-glow transform hover:scale-105 transition-all cursor-pointer"
            >
              <Mic className="w-8 h-8 text-white" />
            </button>
          )}

          <p className="text-xs font-extrabold text-white/70">
            {isRecording ? 'Speak your IT issue now...' : 'Click Microphone to start speaking'}
          </p>
        </div>

        {/* Recognized Speech Text & AI Parsed Ticket Card */}
        {voiceText && (
          <div className="space-y-3 animate-in fade-in duration-200 text-xs">
            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-1">
              <span className="text-[10px] font-black text-[#00f5ff] uppercase tracking-wider block">Recognized Voice Audio (Hindi):</span>
              <p className="text-xs font-semibold text-white/90 italic">"{voiceText}"</p>
            </div>

            {aiParsedTicket && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-emerald-300 flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>AI Formatted IT Ticket</span>
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">98% Confidence</span>
                </div>
                <div className="space-y-1 text-white/80">
                  <p><strong className="text-white">Title:</strong> {aiParsedTicket.title}</p>
                  <p><strong className="text-white">Category:</strong> {aiParsedTicket.category}</p>
                  <p><strong className="text-white">Priority:</strong> {aiParsedTicket.priority}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!aiParsedTicket}
            onClick={handleSubmitVoiceTicket}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff2d78] to-[#00f5ff] hover:opacity-95 disabled:opacity-50 text-white font-extrabold text-xs shadow-glow cursor-pointer transition-all"
          >
            Submit Voice Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
