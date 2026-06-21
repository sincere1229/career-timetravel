import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(192, 214, 242, 0.1)',
        padding: '56px 0 40px',
        marginTop: 80,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 40,
          }}
        >
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <img
                src="/chrono-icon.png"
                alt="Chrono"
                width={22}
                height={22}
                style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                Career TimeTravel
              </span>
            </div>
            <p style={{ color: 'var(--chrono-text-dim)', fontSize: '0.86rem', lineHeight: 1.8 }}>
              未来の自分に、会いに行こう。Chronoと一緒に、退職・転職・副業・年収アップの不安を整理し、次の一手を見つけるキャリアナビゲーションサイトです。
            </p>
          </div>

          <FooterCol
            title="診断・ツール"
            links={[
              { label: '退職シミュレーター', href: '/retirement-simulator' },
              { label: '年収アップ行動診断', href: '/diagnosis/salary-up' },
              { label: '副業適性診断', href: '/diagnosis/side-hustle' },
              { label: 'AI活用適性診断', href: '/diagnosis/ai' },
              { label: '就活キャリア診断', href: '/diagnosis/career' },
              { label: '転職市場価値診断', href: '/diagnosis/career-change' },
            ]}
          />
          <FooterCol
            title="コンテンツ"
            links={[
              { label: 'Chrono’s Career Column', href: '/columns' },
              { label: 'おすすめサービス', href: '/services' },
              { label: 'Chronoについて', href: '/chrono' },
            ]}
          />
        </div>

        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid rgba(192, 214, 242, 0.08)',
            fontSize: '0.78rem',
            color: 'var(--chrono-text-dim)',
          }}
        >
          © {new Date().getFullYear()} Career TimeTravel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div
        style={{
          fontSize: '0.78rem',
          letterSpacing: '0.08em',
          color: 'var(--chrono-ice)',
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{ fontSize: '0.86rem', color: 'var(--chrono-silver)' }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
