// Speech for dictation, which is a harder job than it looks: a single word with
// no surrounding context is the worst case for a TTS engine, and the default
// voice on a given device is often a poor one. So pick a good English voice,
// read words slower than sentences, and put real silence between the parts
// rather than relying on punctuation in one long string.

/** Isolated words get the slowest rate — this is where "reach" turns into "rage". */
export const WORD_RATE = 0.6;
/** Sentences carry their own context, and sound unnatural read this slowly. */
export const SENTENCE_RATE = 0.85;
/** Silence between word, sentence and word again. */
const PAUSE_MS = 750;

// Known-clear voices, best first. Anything not listed still works; this only
// avoids the robotic fallbacks that ship as default on some platforms.
const PREFERRED = [
  /Google US English/i,
  /Samantha/i,
  /^Ava/i,
  /Allison/i,
  /Microsoft (Aria|Jenny|Michelle)/i,
  /Karen/i,
  /Daniel/i,
  /Microsoft Zira/i,
];

let cachedVoice = null;
let generation = 0;
let timer = null;

const synth = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

export function bestVoice() {
  const s = synth();
  if (!s) return null;
  if (cachedVoice) return cachedVoice;
  const voices = s.getVoices();
  if (!voices.length) return null; // Not loaded yet; voiceschanged will re-run this.

  const english = voices.filter((v) => /^en([-_]|$)/i.test(v.lang ?? ''));
  const pool = english.length ? english : voices;
  for (const pattern of PREFERRED) {
    const hit = pool.find((v) => pattern.test(v.name ?? ''));
    if (hit) return (cachedVoice = hit);
  }
  const isUS = (v) => (v.lang ?? '').replace('_', '-').toLowerCase() === 'en-us';
  // A local voice is usually the higher-quality one on Apple platforms.
  return (cachedVoice = pool.find((v) => isUS(v) && v.localService) ?? pool.find(isUS) ?? pool[0]);
}

/** Voices load asynchronously, so ask early and again when the list arrives. */
export function primeVoices() {
  const s = synth();
  if (!s) return undefined;
  bestVoice();
  const onChange = () => {
    cachedVoice = null;
    bestVoice();
  };
  s.addEventListener?.('voiceschanged', onChange);
  return () => s.removeEventListener?.('voiceschanged', onChange);
}

export function cancelSpeech() {
  generation++;
  clearTimeout(timer);
  synth()?.cancel();
}

/**
 * Speak parts in order with a pause between each.
 * @param {{ text: string, rate: number }[]} parts
 * @param {() => void} [onDone] fired once the last part finishes
 */
export function speakParts(parts, onDone) {
  const s = synth();
  if (!s) {
    onDone?.();
    return;
  }
  cancelSpeech();
  const gen = generation;
  let i = 0;

  const next = () => {
    if (gen !== generation) return; // superseded by a newer request
    const part = parts[i++];
    const utterance = new SpeechSynthesisUtterance(part.text);
    utterance.rate = part.rate;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voice = bestVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    const after = () => {
      if (gen !== generation) return;
      if (i < parts.length) timer = setTimeout(next, PAUSE_MS);
      else onDone?.();
    };
    utterance.onend = after;
    utterance.onerror = after;
    s.speak(utterance);
  };

  // Chrome drops an utterance queued in the same tick as cancel().
  timer = setTimeout(next, 60);
}

/** How a teacher gives it: the word, the sentence, then the word again. */
export function dictationParts(entry) {
  const parts = [{ text: entry.word, rate: WORD_RATE }];
  if (entry.sentence) parts.push({ text: entry.sentence, rate: SENTENCE_RATE });
  parts.push({ text: entry.word, rate: WORD_RATE });
  return parts;
}
