import type { Metadata } from 'next';
import Link from 'next/link';
import { columns } from '@/lib/columns';

export const metadata: Metadata = {
  title: "Chrono's Career Column | Career TimeTravel",
  description: '退職・転職・副業・年収アップにまつわるコラム一覧です。',
};

export default function ColumnsPage() {
  return (
    <main className="container section">
      <div className="eyebrow">Column</div>
      <h1
        style={{
          fontFamily: 'var(--font-heading-jp)',
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          margin: '14px 0 16px',
          color: 'var(--chrono-white)',
        }}
      >
        Chrono’s Career Column
      </h1>
      <p style={{ color: 'var(--chrono-text-dim)', lineHeight: 1.9, marginBottom: 44, maxWidth: 600 }}>
        退職・転職・副業・年収アップにまつわる、知っておきたい視点をChronoが整理します。
      </p>

      <div className="grid-cards">
        {columns.map((c) => (
          <Link key={c.slug} href={`/columns/${c.slug}`} className="glass-card card-pad" style={{ display: 'block' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--chrono-gold)', marginBottom: 10 }}>{c.category}</div>
            <h2 style={{ fontSize: '1.05rem', color: 'var(--chrono-white)', lineHeight: 1.6, marginBottom: 12 }}>
              {c.title}
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--chrono-text-dim)', lineHeight: 1.8 }}>{c.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
