/**
 * Audio synthesis utility for game sound effects using Web Audio API
 */
export const playSlashSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const t = ctx.currentTime;

    // 1. Air swoosh / blade rush
    const oscRush = ctx.createOscillator();
    const gainRush = ctx.createGain();
    oscRush.type = 'sawtooth';
    oscRush.frequency.setValueAtTime(980, t);
    oscRush.frequency.exponentialRampToValueAtTime(120, t + 0.18);
    gainRush.gain.setValueAtTime(0.28, t);
    gainRush.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    oscRush.connect(gainRush);
    gainRush.connect(ctx.destination);
    oscRush.start(t);
    oscRush.stop(t + 0.18);

    // 2. High metallic sword chime / flame spark resonance
    const oscChime = ctx.createOscillator();
    const gainChime = ctx.createGain();
    oscChime.type = 'sine';
    oscChime.frequency.setValueAtTime(1760, t + 0.03);
    oscChime.frequency.exponentialRampToValueAtTime(880, t + 0.22);
    gainChime.gain.setValueAtTime(0.18, t + 0.03);
    gainChime.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    oscChime.connect(gainChime);
    gainChime.connect(ctx.destination);
    oscChime.start(t + 0.03);
    oscChime.stop(t + 0.22);
  } catch {}
};
