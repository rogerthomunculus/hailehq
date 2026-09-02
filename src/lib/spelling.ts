import { getCollection } from 'astro:content';

export interface SpellingWord {
  word: string;
  sentence?: string;
}

export interface SpellingWeek {
  /** Collection id, which is the file name: "2026-08-31". */
  id: string;
  /** Derived, never authored: "August 31st Spelling". */
  title: string;
  /** ISO date of the Monday the week starts. */
  weekStart: string;
  grade: string;
  words: SpellingWord[];
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** 1st, 2nd, 3rd, 4th … 11th, 12th, 13th … 21st. */
export function ordinal(n: number): string {
  const suffix =
    n % 100 >= 11 && n % 100 <= 13
      ? 'th'
      : n % 10 === 1
        ? 'st'
        : n % 10 === 2
          ? 'nd'
          : n % 10 === 3
            ? 'rd'
            : 'th';
  return `${n}${suffix}`;
}

// YAML dates parse to UTC midnight, so read them back in UTC — a local-time
// getDate() would render "August 31st" as "August 30th" west of Greenwich.
export function weekTitle(weekStart: Date): string {
  return `${MONTHS[weekStart.getUTCMonth()]} ${ordinal(weekStart.getUTCDate())} Spelling`;
}

/** Short form for chips and history rows: "Aug 31". */
export function weekShort(weekStart: Date): string {
  return `${MONTHS[weekStart.getUTCMonth()].slice(0, 3)} ${weekStart.getUTCDate()}`;
}

/**
 * Every practice week, newest first, normalised to plain JSON so it can cross
 * the island boundary as a prop.
 */
export async function loadWeeks(): Promise<SpellingWeek[]> {
  const entries = await getCollection('spelling');
  return entries
    .sort((a, b) => b.data.weekStart.getTime() - a.data.weekStart.getTime())
    .map((entry) => ({
      id: entry.id,
      title: weekTitle(entry.data.weekStart),
      weekStart: entry.data.weekStart.toISOString().slice(0, 10),
      grade: entry.data.grade,
      words: entry.data.words.map((w) => (typeof w === 'string' ? { word: w } : w)),
    }));
}
