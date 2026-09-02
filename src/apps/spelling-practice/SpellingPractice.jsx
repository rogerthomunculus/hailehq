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
import {
  SENTENCE_RATE,
  WORD_RATE,
  cancelSpeech,
  dictationParts,
  primeVoices,
  speakParts,
} from './speech.js';

/** How long a correct answer stays on screen before the next word. */
const CORRECT_MS = 1200;

const HUB = '/school/spelling/';

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
  const [feedback, setFeedback] = useState(null); // { ok, word, attempt }

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
  const current = sessionWords[index] ?? null;

  // Saved history, the deep link and the voice list all arrive after mount, so
  // that the first client render matches what the server produced.
  useEffect(() => {
    data.current = load();
    const requested = new URLSearchParams(window.location.search).get('week');
    if (requested && weeks.some((w) => w.id === requested)) setWeekId(requested);
    repaint();
    return primeVoices();
  }, [weeks]);

  useEffect(
    () => () => {
      clearTimeout(advanceRef.current);
      cancelSpeech();
    },
    [],
  );

  const presentWord = useCallback((entry) => {
    clockRef.current = null;
    replaysRef.current = 0;
    editsRef.current = 0;
    setAnswer('');
    setFeedback(null);
    // The clock starts when he has finished hearing it, not when it starts
    // playing — otherwise a long sentence reads as a slow answer.
    speakParts(dictationParts(entry), () => {
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

  /** Move past the word just answered, whether that was automatic or a tap. */
  const advance = (correctSoFar) => {
    clearTimeout(advanceRef.current);
    const next = index + 1;
    if (next < sessionWords.length) {
      setIndex(next);
      presentWord(sessionWords[next]);
    } else {
      finishSession(sessionWords, correctSoFar);
    }
  };

  const check = () => {
    if (feedback || !current) return;
    const attempt = answer.trim();
    if (!attempt) return;

    const ok = attempt.toLowerCase() === current.word.toLowerCase();
    const ms = clockRef.current == null ? null : Math.round(performance.now() - clockRef.current);
    cancelSpeech();

    recordAttempt(data.current, current.word, {
      ts: Date.now(),
      ok,
      ms,
      replays: replaysRef.current,
      edits: editsRef.current,
      weekId: week?.id ?? null,
    });
    save(data.current);

    const nextCorrect = ok ? correctCount + 1 : correctCount;
    if (!ok) setMissed([...missed, { entry: current, attempt }]);
    setCorrectCount(nextCorrect);
    setFeedback({ ok, word: current.word, attempt });

    // A correct answer moves on by itself. A wrong one waits: the whole point
    // of showing the spelling large is that he gets to look at it.
    if (ok) advanceRef.current = setTimeout(() => advance(nextCorrect), CORRECT_MS);
  };

  const replayWord = () => {
    if (!current) return;
    replaysRef.current += 1;
    speakParts([{ text: current.word, rate: WORD_RATE }]);
  };

  const replaySentence = () => {
    if (!current?.sentence) return;
    replaysRef.current += 1;
    speakParts([{ text: current.sentence, rate: SENTENCE_RATE }]);
  };

  const leavePractice = (nextView) => {
    clearTimeout(advanceRef.current);
    cancelSpeech();
    setFeedback(null);
    setView(nextView);
    repaint();
  };

  if (!week) {
    return (
      <div className="sp-page">
        <a className="sp-back" href={HUB}>
          ← All spelling weeks
        </a>
        <h1 className="sp-title">Spelling Practice</h1>
        <p className="sp-sub">No word lists yet — this week's words haven't been added.</p>
      </div>
    );
  }

  return (
    <div className="sp-page">
      <nav className="sp-nav">
        <a className="sp-back" href={HUB}>
          ← All spelling weeks
        </a>
        {view !== 'setup' && (
          <button
            type="button"
            className="sp-back sp-back-btn"
            onClick={() => leavePractice('setup')}
          >
            Word list
          </button>
        )}
      </nav>

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
        </section>
      )}

      {view === 'practice' && current && (
        <section>
          <p className="sp-progress">
            Word {index + 1} of {sessionWords.length}
          </p>

          <div className="sp-listen">
            <button type="button" className="sp-listen-btn" onClick={replayWord}>
              <span aria-hidden="true">🔊</span> Repeat word
            </button>
            <button
              type="button"
              className="sp-listen-btn"
              onClick={replaySentence}
              disabled={!current.sentence}
            >
              <span aria-hidden="true">💬</span> Use it in a sentence
            </button>
          </div>

          {feedback && !feedback.ok ? (
            <div className="sp-correction">
              <p className="sp-correction-label">You wrote {feedback.attempt}. It's spelled:</p>
              <p className="sp-correction-word">{feedback.word}</p>
              <p className="sp-correction-letters" aria-hidden="true">
                {feedback.word.toUpperCase().split('').join(' ')}
              </p>
              <div className="sp-actions">
                {/* Deliberately not autofocused: the Enter that submitted the
                    wrong answer would activate it in the same keystroke and
                    blow straight past the correction. */}
                <button
                  type="button"
                  className="sp-btn sp-btn-primary"
                  onClick={() => advance(correctCount)}
                >
                  Got it — next word
                </button>
              </div>
            </div>
          ) : (
            <>
              <input
                ref={inputRef}
                type="text"
                className="sp-answer"
                value={answer}
                disabled={!!feedback}
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

              <div className={`sp-feedback${feedback?.ok ? ' is-ok' : ''}`}>
                {feedback?.ok ? 'Nice! ✓' : ''}
              </div>

              <div className="sp-actions">
                <button
                  type="button"
                  className="sp-btn sp-btn-primary"
                  onClick={check}
                  disabled={!!feedback}
                >
                  Check
                </button>
              </div>
            </>
          )}
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
              onClick={() => leavePractice('setup')}
            >
              Back to word list
            </button>
            <a className="sp-btn sp-btn-secondary" href={HUB}>
              All spelling weeks
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
