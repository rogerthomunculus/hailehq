import { useMemo, useState } from 'react';
import './houston-guide.css';

const FILTERS = [
  { f: 'all', label: 'Everything' },
  { f: 'food', label: 'Food' },
  { f: 'indoor', label: 'Indoor / AC' },
  { f: 'free', label: 'Free' },
  { f: 'mon', label: 'Open Monday' },
  { f: 'late', label: 'Open late' },
  { f: 'book', label: 'Book ahead' },
  { f: 'active', label: 'Active' },
  { f: 'kids', label: 'Kids' },
  { f: 'group9', label: 'Group of 9' },
  { f: 'obscure', label: 'Obscure pile' },
];

const mapURL = (q) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
const bare = (u) => u.replace(/^https?:\/\//, '').replace(/\/$/, '');

export default function HoustonGuide({ sections }) {
  const [filter, setFilter] = useState('all');

  const { visibleSections, shown } = useMemo(() => {
    let shown = 0;
    const visibleSections = sections
      .map((sec) => {
        const items = sec.items.filter((it) => filter === 'all' || it.filters.includes(filter));
        shown += items.length;
        return { ...sec, visibleItems: items };
      })
      .filter((sec) => sec.visibleItems.length > 0);
    return { visibleSections, shown };
  }, [sections, filter]);

  return (
    <div className="houston">
      <nav className="filters" aria-label="Filter">
        <div className="chips" role="group">
          {FILTERS.map(({ f, label }) => (
            <button
              key={f}
              className="chip"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="count">
          {shown} {shown === 1 ? 'place' : 'places'}
        </div>
      </nav>

      <main className="list">
        {visibleSections.length === 0 && (
          <p className="empty">
            Nothing matches that filter. Tap &ldquo;Everything&rdquo; to reset.
          </p>
        )}
        {visibleSections.map((sec, si) => (
          <section key={sec.title}>
            <div className="sec-head">
              <span className="sec-num">{String(si + 1).padStart(2, '0')}</span>
              <h2>{sec.title}</h2>
            </div>
            <p className="sec-note">{sec.note}</p>
            {sec.visibleItems.map((it, i) => (
              <div key={it.name}>
                {it.area && it.area !== sec.visibleItems[i - 1]?.area && (
                  <h3 className="area-head">{it.area}</h3>
                )}
                <article className="card">
                  <div className="rank" aria-hidden="true">
                    {sec.items.indexOf(it) + 1}
                  </div>
                  <h3 className="name">{it.name}</h3>
                  <p className="where">{it.where}</p>
                  <p className="why">{it.why}</p>
                  <div className="strip">
                    {it.tags.map(([label, kind], ti) => (
                      <span className={kind ? `tag ${kind}` : 'tag'} key={ti}>
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="links">
                    <a className="btn map" href={mapURL(it.map)} target="_blank" rel="noopener">
                      Open in Maps
                    </a>
                    {it.site && (
                      <a className="btn" href={it.site} target="_blank" rel="noopener">
                        Website
                      </a>
                    )}
                  </div>
                  {it.site && <p className="url">{bare(it.site)}</p>}
                </article>
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}
