'use client';

import { buildLineUrl } from '@/lib/lineConfig';

type LineSource = 'top' | 'diagnosis' | 'result' | 'article' | 'affiliate';
type LineType = 'career' | 'job_change' | 'side_hustle' | 'independence' | 'ai' | 'income' | 'freelance';

interface LineCTAProps {
  source?: LineSource;
  type?: LineType;
  result?: string;
  article?: string;
  affiliate?: string;
  /** CTAボタンのテキスト。未指定時はsourceに応じて自動選択 */
  label?: string;
  /** 表示バリアント */
  variant?: 'full' | 'compact' | 'banner';
}

const DEFAULT_LABELS: Record<LineSource, string> = {
  top:       'LINEでキャリアロードマップを受け取る',
  diagnosis: '無料AI仕事力診断を受ける',
  result:    'Chronoに相談する',
  article:   'LINEで無料相談する',
  affiliate: '転職・副業・AI活用のヒントを受け取る',
};

export default function LineCTA({
  source = 'top',
  type,
  result,
  article,
  affiliate,
  label,
  variant = 'full',
}: LineCTAProps) {
  const url = buildLineUrl({ source, type, result, article, affiliate });
  const btnLabel = label ?? DEFAULT_LABELS[source];

  if (variant === 'compact') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#06C755',
          color: '#fff',
          borderRadius: 8,
          padding: '9px 18px',
          fontSize: '0.85rem',
          fontWeight: 700,
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}
      >
        <LineIcon />
        {btnLabel}
      </a>
    );
  }

  if (variant === 'banner') {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(6,199,85,0.12), rgba(6,199,85,0.04))',
        border: '1px solid rgba(6,199,85,0.3)',
        borderRadius: 14,
        padding: '20px 24px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.78rem', color: '#06C755', fontWeight: 700, marginBottom: 8, letterSpacing: '0.05em' }}>
          📲 LINE で無料相談
        </p>
        <p style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1.4 }}>
          Chrono があなたの次の一歩を整理します
        </p>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: 16, lineHeight: 1.6 }}>
          転職・副業・AI活用・キャリア相談を無料で受け付けています
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#06C755',
            color: '#fff',
            borderRadius: 10,
            padding: '12px 28px',
            fontSize: '0.9rem',
            fontWeight: 800,
            textDecoration: 'none',
            letterSpacing: '0.03em',
          }}
        >
          <LineIcon size={20} />
          {btnLabel}
        </a>
      </div>
    );
  }

  // full variant（デフォルト）
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(6,199,85,0.1), rgba(6,13,31,0.8))',
      border: '1px solid rgba(6,199,85,0.25)',
      borderRadius: 16,
      padding: '24px 20px',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(6,199,85,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <LineIcon size={20} />
        </div>
        <p style={{ fontSize: '0.78rem', color: '#06C755', fontWeight: 700, letterSpacing: '0.05em' }}>
          Chrono 公式LINE
        </p>
      </div>
      <p style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1.4 }}>
        あなた専用の<br />キャリアロードマップを受け取る
      </p>
      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', marginBottom: 18, lineHeight: 1.7 }}>
        ✦ 無料AI仕事力診断<br />
        ✦ 転職・副業・AI活用の相談<br />
        ✦ あなた専用キャリアロードマップ
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: '#06C755',
          color: '#fff',
          borderRadius: 12,
          padding: '14px 32px',
          fontSize: '0.95rem',
          fontWeight: 800,
          textDecoration: 'none',
          letterSpacing: '0.03em',
          boxShadow: '0 4px 20px rgba(6,199,85,0.3)',
        }}
      >
        <LineIcon size={22} />
        {btnLabel}
      </a>
      <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: 10 }}>
        無料 · いつでも退会できます
      </p>
    </div>
  );
}

function LineIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
    </svg>
  );
}
