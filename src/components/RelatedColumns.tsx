'use client';

import Link from 'next/link';
import { columns } from '@/lib/columns';
import { DIAGNOSIS_COLUMN_MAP, DIAGNOSIS_LABELS } from '@/lib/columnMapping';

interface RelatedColumnsProps {
  diagnosisId: string;
  maxItems?: number;
}

export default function RelatedColumns({ diagnosisId, maxItems = 3 }: RelatedColumnsProps) {
  const targetCategories = DIAGNOSIS_COLUMN_MAP[diagnosisId] ?? [];
  const diagLabel = DIAGNOSIS_LABELS[diagnosisId] ?? diagnosisId;

  const related = columns
    .filter((col) => targetCategories.includes(col.category))
    .slice(0, maxItems);

  if (related.length === 0) return null;

  return (
    <div style={{ marginTop: 40 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 18,
      }}>
        <div style={{
          width: 3,
          height: 20,
          background: 'linear-gradient(180deg, var(--chrono-ice), var(--chrono-gold))',
          borderRadius: 2,
          flexShrink: 0,
        }} />
        <div>
          <p style={{ fontSize: '0.7rem', color: 'var(--chrono-gold)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 2 }}>
            RELATED COLUMN
          </p>
          <p style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--chrono-white)' }}>
            {diagLabel}に関連するコラム
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {related.map((col) => (
          <Link
            key={col.slug}
            href={`/columns/${col.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                background: 'rgba(192,214,242,0.04)',
                border: '1px solid rgba(192,214,242,0.12)',
                borderRadius: 10,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.4)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(212,175,55,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(192,214,242,0.12)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(192,214,242,0.04)';
              }}
            >
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '1rem',
              }}>
                📄
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '0.7rem',
                  color: 'var(--chrono-gold)',
                  fontWeight: 700,
                  marginBottom: 4,
                  letterSpacing: '0.04em',
                }}>
                  {col.category}
                </p>
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--chrono-white)',
                  lineHeight: 1.5,
                  fontWeight: 600,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {col.title}
                </p>
                <p style={{
                  fontSize: '0.76rem',
                  color: 'var(--chrono-text-dim)',
                  marginTop: 4,
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {col.excerpt}
                </p>
              </div>
              <div style={{
                color: 'var(--chrono-ice)',
                fontSize: '0.8rem',
                flexShrink: 0,
                alignSelf: 'center',
              }}>
                →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 12, textAlign: 'right' }}>
        <Link
          href="/columns"
          style={{
            fontSize: '0.78rem',
            color: 'var(--chrono-ice)',
            textDecoration: 'none',
            letterSpacing: '0.03em',
          }}
        >
          すべてのコラムを見る →
        </Link>
      </div>
    </div>
  );
}
