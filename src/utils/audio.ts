/**
 * Audio synthesis utility using Web Audio API for soft baby toy chimes and sound effects.
 * Completely self-contained without any external asset dependencies.
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // muted by default as requested

  constructor() {
    // Lazy initialize on first interaction
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted) {
      this.getContext();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Soft music-box chime for the crib mobile (pentatonic lullaby tones)
   */
  public playMobileChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + index * 0.14);

      // Soft envelope for music-box bell timbre
      gain.gain.setValueAtTime(0, startTime + index * 0.14);
      gain.gain.linearRampToValueAtTime(0.12, startTime + index * 0.14 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + index * 0.14 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + index * 0.14);
      osc.stop(startTime + index * 0.14 + 0.95);
    });
  }

  /**
   * Cheerful high pop when a bubble is tapped
   */
  public playBubblePop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  /**
   * Soft wooden rattle sound when hovering/clicking rattle button
   */
  public playRattle() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Two rapid micro clicks
    [0, 0.04, 0.09].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320 + Math.random() * 80, now + delay);

      gain.gain.setValueAtTime(0.08, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.04);
    });
  }

  /**
   * Happy baby giggle audio cue (sweet ascending bounce)
   */
  public playGiggle() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const frequencies = [440, 587.33, 659.25, 783.99];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.07 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.26);
    });
  }

  /**
   * Celebratory sparkle when free gift is unlocked or order is confirmed
   */
  public playCelebration() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.5]; // C5 to E6 harp run

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.09, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.65);
    });
  }
}

export const soundManager = new SoundEffectsManager();
