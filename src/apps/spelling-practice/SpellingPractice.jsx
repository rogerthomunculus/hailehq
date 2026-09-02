import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import './spelling-practice.css';
import {
  emptyStore,
  load,
  save,
  recordAttempt,
  recordSession,
  readiness,
  troubleWords,
} from './progress.js';

const FEEDBACK_MS = 1400;

/**
 * Chrome drops an utterance queued in the same tick as cancel(), so give it a
 * beat. Long-standing bug, and the workaround is cheap.
 */
function speak(text, onEnd) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();
    window.speechSynthesis.speak(utterance);
  }, 60);
}

/** How a teacher gives it: word, sentence, word again. */
const dictation = (entry) =>
  entry.sentence ? `${entry.word}. ${entry.sentence} ${entry.word}.` : entry.word;

/** @typedef {import('../../lib/spelling').SpellingWeek} SpellingWeek */

/** @param {{ weeks?: SpellingWeek[] }} props */
export default function SpellingPractice({ weeks = [] }) {
  const data = useRef(emptyStore());
  const [weekId, setWeekId] = useState(weeks[0]?.id ?? null);
  const [view, setView] = useState('setup');
  const [showWords, setShowWords] = useState(false);
  // The store is a ref, so changes to it need an explicit nudge to repaint.
  const [, repaint] = useReducer((n) => n + 1, 0);

  const [sessionWords, setSessionWords] = useState([]);
  const [sessionMode, setSessionMode] = useState('week');
  const [index, setIndex] = useState(0);
  const [missed, setMissed] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // { ok, word }
  const [locked, setLocked] = useState(false);

  // Per-word fluency signals, reset on every word. Refs, not state — updating
  // them must never re-render mid-typing.
  const clockRef = useRef(null);
  const replaysRef = useRef(0);
  const editsRef = useRef(0);
  const inputRef = useRef(null);
  const advanceRef = useRef(null);

  const week = weeks.find((w) => w.id === weekId) ?? weeks[0] ?? null;
  const allWords = weeks.flatMap((w) => w.words);
  const trouble = troubleWords(data.current, allWords);

  // Saved history and the deep link both arrive after mount, so that the first
  // client render matches what the server produced.
  useEffect(() => {
    data.current = load();
    const requested = new URLSearchParams(window.location.search).get('week');
    if (requested && weeks.some((w) => w.id === requested)) setWeekId(requested);
    repaint();
  }, [weeks]);

  useEffect(() => () => clearTimeout(advanceRef.current), []);

  const current = sessionWords[index] ?? null;

  const presentWord = useCallback((entry) => {
    clockRef.current = null;
    replaysRef.current = 0;
    editsRef.current = 0;
    setAnswer('');
    setFeedback(null);
    setLocked(false);
    // The clock starts when he has finished hearing it, not when it starts
    // playing — otherwise a long sentence reads as a slow answer.
    speak(dictation(entry), () => {
      clockRef.current = performance.now();
      inputRef.current?.focus();
    });
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const startSession = (words, mode) => {
    if (words.length === 0) return;
    setSessionWords(words);
    setSessionMode(mode);
    setIndex(0);
    setMissed([]);
    setCorrectCount(0);
    setView('practice');
    presentWord(words[0]);
  };

  const finishSession = (words, correct) => {
    const store = data.current;
    recordSession(store, {
      ts: Date.now(),
      weekId: week?.id ?? null,
      mode: sessionMode,
      total: words.length,
      correct,
      readiness: week ? readiness(store, week.words).percent : null,
    });
    save(store);
    repaint();
    setView('results');
  };

  const check = () => {
    if (locked || !current) return;
    const attempt = answer.trim();
    if (!attempt) return;

    const ok = attempt.toLowerCase() === current.word.toLowerCase();
    const ms = clockRef.current == null ? null : Math.round(performance.now() - clockRef.current);
    setLocked(true);

    recordAttempt(data.current, current.word, {
      ts: Date.now(),
      ok,
      ms,
      replays: replaysRef.current,
      edits: editsRef.current,
      weekId: week?.id ?? null,
    });
    save(data.current);

    const nextMissed = ok ? missed : [...missed, { entry: current, attempt }];
    const nextCorrect = ok ? correctCount + 1 : correctCount;
    setMissed(nextMissed);
    setCorrectCount(nextCorrect);
    setFeedback({ ok, word: current.word });

    advanceRef.current = setTimeout(() => {
      const next = index + 1;
      if (next < sessionWords.length) {
        setIndex(next);
        presentWord(sessionWords[next]);
      } else {
        finishSession(sessionWords, nextCorrect);
      }
    }, FEEDBACK_MS);
  };

  const replay = (wordOnly) => {
    if (!current) return;
    replaysRef.current += 1;
    speak(wordOnly ? current.word : dictation(current));
  };

  if (!week) {
    return (
      <div className="sp-page">
        <h1 className="sp-title">Spelling Practice</h1>
        <p className="sp-sub">No word lists yet — this week's words haven't been added.</p>
      </div>
    );
  }

  return (
    <div className="sp-page">
      {view === 'setup' && (
        <section>
          <h1 className="sp-title">{week.title}</h1>
          <p className="sp-sub">
            {week.grade} · {week.words.length} words
          </p>

          {weeks.length > 1 && (
            <div className="sp-weeks">
              {weeks.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  className={`sp-week-chip${w.id === week.id ? ' is-on' : ''}`}
                  onClick={() => setWeekId(w.id)}
                >
                  {w.title.replace(' Spelling', '')}
                </button>
              ))}
            </div>
          )}

          <div className="sp-card">
            <button
              type="button"
              className="sp-disclosure"
              onClick={() => setShowWords((s) => !s)}
              aria-expanded={showWords}
            >
              {showWords ? 'Hide the words' : 'Study the words first'}
            </button>
            {showWords && (
              <ol className="sp-word-list">
                {week.words.map((w) => (
                  <li key={w.word}>
                    <span className="sp-word">{w.word}</span>
                    {w.sentence && <span className="sp-word-sentence">{w.sentence}</span>}
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="sp-actions">
            <button
              type="button"
              className="sp-btn sp-btn-primary"
              onClick={() => startSession(week.words, 'week')}
            >
              Start practice
            </button>
            {trouble.length > 0 && (
              <button
                type="button"
                className="sp-btn sp-btn-secondary"
                onClick={() => startSession(trouble, 'trouble')}
              >
                Practice tricky words ({trouble.length})
              </button>
            )}
          </div>

          <a className="sp-exit" href="/school/spelling/">
            ← All spelling weeks
          </a>
        </section>
      )}

      {view === 'practice' && current && (
        <section>
          <p className="sp-progress">
            Word {index + 1} of {sessionWords.length}
          </p>

          <div className="sp-speaker-wrap">
            <button
              type="button"
              className="sp-speaker"
              onClick={() => replay(false)}
              aria-label="Hear the word again"
            >
              🔊
            </button>
          </div>
          <p className="sp-replay-hint">
            Tap to hear it again ·{' '}
            <button type="button" className="sp-linkish" onClick={() => replay(true)}>
              just the word
            </button>
          </p>

          <input
            ref={inputRef}
            type="text"
            className={`sp-answer${feedback && !feedback.ok ? ' is-wrong' : ''}`}
            value={answer}
            disabled={locked}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') editsRef.current += 1;
              if (e.key === 'Enter') check();
            }}
            placeholder="Type what you hear"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />

          <div className={`sp-feedback${feedback ? (feedback.ok ? ' is-ok' : ' is-bad') : ''}`}>
            {feedback ? (feedback.ok ? 'Nice! ✓' : `It's spelled: ${feedback.word}`) : ''}
          </div>

          <div className="sp-actions">
            <button
              type="button"
              className="sp-btn sp-btn-primary"
              onClick={check}
              disabled={locked}
            >
              Check
            </button>
          </div>
        </section>
      )}

      {view === 'results' && (
        <section>
          <h1 className="sp-title">Nice work!</h1>
          <div className="sp-score">
            {correctCount}/{sessionWords.length}
          </div>
          <p className="sp-score-label">words spelled correctly</p>

          {missed.length > 0 ? (
            <ul className="sp-missed">
              {missed.map((m, i) => (
                <li key={`${m.entry.word}-${i}`}>
                  <span className="sp-attempt">{m.attempt}</span>
                  <span className="sp-correct">{m.entry.word}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="sp-all-right">Every word right — great practice!</p>
          )}

          <div className="sp-actions">
            {missed.length > 0 && (
              <button
                type="button"
                className="sp-btn sp-btn-primary"
                onClick={() =>
                  startSession(
                    missed.map((m) => m.entry),
                    'retry',
                  )
                }
              >
                Practice missed words again
              </button>
            )}
            <button
              type="button"
              className="sp-btn sp-btn-secondary"
              onClick={() => {
                setView('setup');
                repaint();
              }}
            >
              Back to word list
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
