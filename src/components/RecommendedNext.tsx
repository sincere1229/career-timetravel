import Link from 'next/link';
import { diagnosisList, getDiagnosisUrl } from '@/lib/diagnosisMeta';
import { columns } from '@/lib/columns';

export default function RecommendedNext() {
  const featured = diagnosisList.slice(0, 3);

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: '0.92rem', color: 'var(--chrono-ice)', marginBottom: 16 }}>
          あわせて受けたい診断
        </h3>
        <div className="grid-cards">
          {featured.map((d) => (
            <Link
              key={d.id}
              href={getDiagnosisUrl(d.id)}
              className="glass-card card-pad"
              style={{ display: 'block' }}
            >
              <h4 style={{ fontSize: '0.95rem', color: 'var(--chrono-white)', marginBottom: 8 }}>{d.name}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--chrono-text-dim)', lineHeight: 1.7 }}>{d.tagline}</p>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '0.92rem', color: 'var(--chrono-ice)', marginBottom: 16 }}>関連記事</h3>
        <div className="grid-cards">
          {columns.slice(0, 2).map((c) => (
            <Link key={c.slug} href={`/columns/${c.slug}`} className="glass-card card-pad" style={{ display: 'block' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--chrono-gold)', marginBottom: 8 }}>{c.category}</div>
              <h4 style={{ fontSize: '0.92rem', color: 'var(--chrono-white)', lineHeight: 1.6 }}>{c.title}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
