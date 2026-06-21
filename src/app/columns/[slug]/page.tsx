import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { columns, getColumnBySlug } from '@/lib/columns';
import { buildAmazonUrl } from '@/lib/amazon';

export function generateStaticParams() {
  return columns.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const column = getColumnBySlug(params.slug);
  if (!column) return {};
  return {
    title: `${column.title} | Career TimeTravel`,
    description: column.excerpt,
  };
}

export default function ColumnDetailPage({ params }: { params: { slug: string } }) {
  const column = getColumnBySlug(params.slug);
  if (!column) notFound();

  const related = columns.filter((c) => c.slug !== column.slug).slice(0, 2);

  return (
    <main className="container section" style={{ maxWidth: 680 }}>
      <Link href="/columns" style={{ fontSize: '0.84rem', color: 'var(--chrono-ice)' }}>
        ← コラム一覧へ戻る
      </Link>

      <div className="eyebrow" style={{ marginTop: 28 }}>
        {column.category}
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-heading-jp)',
          fontSize: 'clamp(1.5rem, 4vw, 2.1rem)',
          lineHeight: 1.5,
          margin: '14px 0 24px',
          color: 'var(--chrono-white)',
        }}
      >
        {column.title}
      </h1>

      <div style={{ color: 'var(--chrono-silver)', fontSize: '0.98rem', lineHeight: 2.1 }}>
        {column.body.map((p, i) => (
          <p key={i} style={{ marginBottom: 22 }}>
            {p}
          </p>
        ))}
      </div>

      {column.recommendedBook && (
        <div
          className="glass-card card-pad"
          style={{
            marginTop: 36,
            marginBottom: 24,
            borderColor: 'rgba(212,175,55,0.3)',
          }}
        >
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--chrono-gold)', marginBottom: 14 }}>
            📚 おすすめの本（Amazon）
          </p>
          <a
            href={buildAmazonUrl(column.recommendedBook.asin)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: 14,
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 10,
              border: '1px solid rgba(212,175,55,0.25)',
              textDecoration: 'none',
            }}
          >
            <span style={{ fontSize: 26, flexShrink: 0 }}>📖</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--chrono-white)', marginBottom: 4 }}>
                {column.recommendedBook.title}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--chrono-text-dim)', lineHeight: 1.6 }}>
                {column.recommendedBook.description}
              </p>
            </div>
            <span
              style={{
                fontSize: '0.68rem',
                padding: '3px 10px',
                borderRadius: 999,
                background: 'rgba(212,175,55,0.15)',
                color: 'var(--chrono-gold)',
                border: '1px solid rgba(212,175,55,0.3)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Amazon
            </span>
          </a>
        </div>
      )}

      {/* 必須CTA */}
      <div
        className="glass-card card-pad"
        style={{
          marginTop: 24,
          marginBottom: 48,
          textAlign: 'center',
          borderColor: 'rgba(212,175,55,0.4)',
        }}
      >
        <p style={{ fontSize: '0.88rem', color: 'var(--chrono-silver)', marginBottom: 18 }}>
          このコラムを読んだあなたにおすすめです
        </p>
        {column.ctaHref.startsWith('http') ? (
          <a href={column.ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {column.ctaLabel}
          </a>
        ) : (
          <Link href={column.ctaHref} className="btn btn-primary">
            {column.ctaLabel}
          </Link>
        )}
      </div>

      <div>
        <h2 style={{ fontSize: '0.92rem', color: 'var(--chrono-ice)', marginBottom: 16 }}>関連記事</h2>
        <div className="grid-cards">
          {related.map((c) => (
            <Link key={c.slug} href={`/columns/${c.slug}`} className="glass-card card-pad" style={{ display: 'block' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--chrono-gold)', marginBottom: 8 }}>{c.category}</div>
              <h3 style={{ fontSize: '0.92rem', color: 'var(--chrono-white)', lineHeight: 1.6 }}>{c.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
