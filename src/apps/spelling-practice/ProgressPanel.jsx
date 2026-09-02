import { useEffect, useState } from 'react';
import './progress-panel.css';
import { LEVELS, STORAGE_KEY, load, levelFor, readiness } from './progress.js';

const dayFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

/** @param {{ points: number[] }} props */
function Sparkline({ points }) {
  if (points.length < 2) return null;
  const width = 220;
  const height = 44;
  const step = width / (points.length - 1);
  const path = points
    .map(
      (p, i) =>
        `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(height - (p / 100) * height).toFixed(1)}`,
    )
    .join(' ');
  return (
    <svg
      className="spp-spark"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Readiness over time"
    >
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

/** @typedef {import('../../lib/spelling').SpellingWeek} SpellingWeek */

/** @param {{ weeks?: SpellingWeek[] }} props */
export default function ProgressPanel({ weeks = [] }) {
  // localStorage does not exist during the build, so the first paint is
  // deliberately empty and the real numbers arrive on mount.
  const [data, setData] = useState(null);
  const [weekId, setWeekId] = useState(weeks[0]?.id ?? null);

  useEffect(() => setData(load()), []);

  const week = weeks.find((w) => w.id === weekId) ?? weeks[0] ?? null;

  if (!week) return null;

  if (!data) {
    return <p className="spp-empty">Loading progress…</p>;
  }

  const summary = readiness(data, week.words);
  const sessions = data.sessions.filter((s) => s.weekId === week.id);
  const trend = sessions.map((s) => s.readiness).filter((r) => typeof r === 'number');
  const noHistory = summary.practised === 0 && sessions.length === 0;

  return (
    <div className="spp">
      {weeks.length > 1 && (
        <div className="spp-tabs">
          {weeks.map((w) => (
            <button
              key={w.id}
              type="button"
              className={`spp-tab${w.id === week.id ? ' is-on' : ''}`}
              onClick={() => setWeekId(w.id)}
            >
              {w.title.replace(' Spelling', '')}
            </button>
          ))}
        </div>
      )}

      {noHistory ? (
        <p className="spp-empty">
          No practice recorded on this browser yet. Progress is stored on the device he practises
          on, so open this page there to see it.
        </p>
      ) : (
        <>
          <div className="spp-headline">
            <div className="spp-percent">{summary.percent}%</div>
            <div className="spp-headline-text">
              <strong>Projected test score</strong>
              <span>
                {summary.counts[4]} solid · {summary.counts[3]} steady · {summary.counts[2]}{' '}
                learning · {summary.counts[1]} shaky
                {summary.counts[0] > 0 && ` · ${summary.counts[0]} not practised`}
              </span>
              <span className="spp-basis">
                Based on {summary.practised} of {summary.total} words practised.
              </span>
            </div>
            {trend.length > 1 && (
              <div className="spp-trend">
                <Sparkline points={trend} />
                <span>readiness over {trend.length} sessions</span>
              </div>
            )}
          </div>

          {summary.shaky.length > 0 && (
            <p className="spp-shaky">
              <strong>Still shaky:</strong> {summary.shaky.join(', ')}
            </p>
          )}

          <ul className="spp-words">
            {week.words.map((w) => {
              const level = levelFor(data, w.word);
              return (
                <li key={w.word} className={`spp-word lvl-${level}`}>
                  <span>{w.word}</span>
                  <span className="spp-level">{LEVELS[level]}</span>
                </li>
              );
            })}
          </ul>

          {sessions.length > 0 && (
            <table className="spp-history">
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Score</th>
                  <th>Ready</th>
                </tr>
              </thead>
              <tbody>
                {[...sessions].reverse().map((s) => (
                  <tr key={s.ts}>
                    <td>
                      {dayFormat.format(new Date(s.ts))}
                      {s.mode !== 'week' && <span className="spp-mode"> · {s.mode}</span>}
                    </td>
                    <td>
                      {s.correct}/{s.total}
                    </td>
                    <td>{typeof s.readiness === 'number' ? `${s.readiness}%` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <button
            type="button"
            className="spp-reset"
            onClick={() => {
              if (!window.confirm('Erase all spelling progress on this browser?')) return;
              localStorage.removeItem(STORAGE_KEY);
              setData(load());
            }}
          >
            Reset progress on this browser
          </button>
        </>
      )}
    </div>
  );
}
