// Real Browser Voice Speech Synthesis Engine for BankIT360
// Uses Web Speech API (window.speechSynthesis) to speak telemetry & reports out loud

export function speakText(text, lang = 'en', onEnd = null) {
  if (!('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this browser.');
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language code
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
  utterance.pitch = 1.0;
  utterance.rate = 0.95; // Natural speaking rate

  // Get available voices
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.includes(lang === 'hi' ? 'hi' : 'en'));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeaking() {
  return 'speechSynthesis' in window && window.speechSynthesis.speaking;
}
