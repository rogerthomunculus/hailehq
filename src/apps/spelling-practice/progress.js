// Progress model shared by the practice island and the parent view on the hub.
//
// Everything lives in localStorage on whichever browser he practises in — there
// is no backend — so treat every read as "might be missing or from an older
// shape" and never throw out of here.

export const STORAGE_KEY = 'hailehq.spelling.v1';

/** New → Shaky → Learning → Steady → Solid. Index is the stored level. */
export const LEVELS = ['New', 'Shaky', 'Learning', 'Steady', 'Solid'];

// What each level is worth when projecting a test score. A word never
// practised contributes nothing, because nothing has been demonstrated — the
// parent view says how many words that covers so the number can't mislead.
const LEVEL_WEIGHT = [0, 0.25, 0.55, 0.85, 1];

// A word is only "clean" if it came back inside this budget. Scaled by length
// so a long word isn't mistaken for a weak one: a 7-year-old hunt-and-pecking
// needs about a second a letter before he has even started thinking.
const BUDGET_BASE_MS = 3000;
const BUDGET_PER_LETTER_MS = 900;

const MAX_ATTEMPTS_PER_WORD = 12;
const MAX_SESSIONS = 60;

export const key = (word) => word.trim().toLowerCase();

export const budgetMs = (word) => BUDGET_BASE_MS + BUDGET_PER_LETTER_MS * key(word).length;

/** The shape every read falls back to. Also the server-render state: there is
 *  no localStorage during the build, so the first paint must assume no history
 *  or hydration will mismatch. */
export const emptyStore = () => ({ version: 1, words: {}, sessions: [] });

export function load() {
  if (typeof localStorage === 'undefined') return emptyStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw);
    return {
      version: 1,
      words: parsed && typeof parsed.words === 'object' && parsed.words ? parsed.words : {},
      sessions: Array.isArray(parsed?.sessions) ? parsed.sessions : [],
    };
  } catch {
    return emptyStore();
  }
}

export function save(data) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Private mode, or the quota is full. Losing history is not worth breaking
    // practice over, so carry on with whatever is in memory.
  }
}

/**
 * Was this attempt effortless, rather than merely right? Right-but-slow and
 * right-after-a-replay are real signals that the spelling isn't automatic yet,
 * and they are exactly what separates "he got it" from "he's ready".
 */
function isClean(attempt, word) {
  // ms is null when the clock never started — speech synthesis exists but its
  // onend never fired, which some browsers do. Unknown timing must not read as
  // fast; it just drops out of the judgement and the other signals decide.
  const inTime = attempt.ms == null || attempt.ms <= budgetMs(word);
  return attempt.ok && attempt.replays === 0 && attempt.edits <= 1 && inTime;
}

/** 0–4. See LEVELS. */
export function levelFor(data, word) {
  const record = data.words[key(word)];
  const attempts = record?.attempts ?? [];
  if (attempts.length === 0) return 0;
  if (!attempts[attempts.length - 1].ok) return 1;

  let clean = 0;
  for (let i = attempts.length - 1; i >= 0; i--) {
    if (isClean(attempts[i], word)) clean++;
    else break;
  }
  if (clean >= 3) return 4;
  if (clean === 2) return 3;

  // Correct, but not three clean in a row. Recent accuracy decides whether
  // that reads as progress or as a word still being guessed at.
  const recent = attempts.slice(-4);
  const accuracy = recent.filter((a) => a.ok).length / recent.length;
  return accuracy >= 0.5 ? 2 : 1;
}

export function recordAttempt(data, word, attempt) {
  const k = key(word);
  const record = data.words[k] ?? { attempts: [] };
  record.attempts = [...record.attempts, attempt].slice(-MAX_ATTEMPTS_PER_WORD);
  data.words[k] = record;
  return data;
}

export function recordSession(data, session) {
  data.sessions = [...data.sessions, session].slice(-MAX_SESSIONS);
  return data;
}

/**
 * Projected test score for a set of words, plus the breakdown behind it so the
 * percentage is never the only thing on screen.
 */
export function readiness(data, words) {
  const levels = words.map((w) => levelFor(data, typeof w === 'string' ? w : w.word));
  const counts = [0, 0, 0, 0, 0];
  levels.forEach((l) => counts[l]++);
  const total = words.length || 1;
  const percent = Math.round((levels.reduce((sum, l) => sum + LEVEL_WEIGHT[l], 0) / total) * 100);
  const name = (w) => (typeof w === 'string' ? w : w.word);
  return {
    percent,
    counts,
    practised: words.length - counts[0],
    total: words.length,
    shaky: words.filter((_w, i) => levels[i] === 1).map(name),
    notStarted: words.filter((_w, i) => levels[i] === 0).map(name),
  };
}

/** Every word he has actually missed, worst first — the cross-week drill list. */
export function troubleWords(data, allWords) {
  return allWords
    .map((w) => (typeof w === 'string' ? { word: w } : w))
    .filter((w) => levelFor(data, w.word) === 1)
    .sort((a, b) => {
      const misses = (x) => (data.words[key(x.word)]?.attempts ?? []).filter((at) => !at.ok).length;
      return misses(b) - misses(a);
    });
}
