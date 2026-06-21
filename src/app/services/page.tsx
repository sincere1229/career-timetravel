import type { Metadata } from 'next';
import { serviceCategories } from '@/lib/services';

export const metadata: Metadata = {
  title: 'あなたに合う選択肢を探す | Career TimeTravel',
  description: '転職エージェント・副業サービス・AIスクール・資格講座・キャリア相談など、次の一歩につながるサービスをご紹介します。',
};

export default function ServicesPage() {
  return (
    <main className="container section">
      <div className="eyebrow">Services</div>
      <h1
        style={{
          fontFamily: 'var(--font-heading-jp)',
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          margin: '14px 0 16px',
          color: 'var(--chrono-white)',
        }}
      >
        あなたに合う選択肢を探す
      </h1>
      <p style={{ color: 'var(--chrono-text-dim)', lineHeight: 1.9, marginBottom: 48, maxWidth: 600 }}>
        診断結果や今の状況に合わせて、転職・副業・学び直しの次の一歩を後押しするサービスをご紹介します。
      </p>

      {serviceCategories.map((cat) => (
        <div key={cat.id} style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: '1.05rem', color: 'var(--chrono-white)', marginBottom: 8 }}>{cat.title}</h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--chrono-text-dim)', marginBottom: 22, maxWidth: 560 }}>
            {cat.description}
          </p>
          <div className="grid-cards">
            {cat.items.map((item) => {
              const cardStyle: React.CSSProperties = { position: 'relative', display: 'block' };
              const inner = (
                <>
                  {item.comingSoon && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 18,
                        right: 18,
                        fontSize: '0.68rem',
                        color: 'var(--chrono-text-dim)',
                        border: '1px solid rgba(192,214,242,0.2)',
                        borderRadius: 999,
                        padding: '3px 9px',
                      }}
                    >
                      準備中
                    </span>
                  )}
                  <h3 style={{ fontSize: '0.94rem', color: 'var(--chrono-white)', marginBottom: 8, paddingRight: 56 }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--chrono-text-dim)', lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                </>
              );

              if (item.href && !item.comingSoon) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card card-pad"
                    style={cardStyle}
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <div key={item.name} className="glass-card card-pad" style={cardStyle}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}
