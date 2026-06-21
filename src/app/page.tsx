import Link from 'next/link';
import ClockDial from '@/components/ClockDial';
import { diagnosisList, getDiagnosisUrl } from '@/lib/diagnosisMeta';
import { columns } from '@/lib/columns';
import { serviceCategories } from '@/lib/services';
import ToolIcon from '@/components/ToolIcon';

export default function HomePage() {
  return (
    <main>
      {/* 1. ファーストビュー */}
      <section
        style={{
          position: 'relative',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background:
            'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(18,59,109,0.45), transparent), linear-gradient(180deg, #060d1f 0%, #0a1530 60%, #060d1f 100%)',
        }}
      >
        <div
          className="hero-chrono-image"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '56%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <img
            src="/chrono-main.png"
            alt="Chrono - Career TimeTravel 未来案内人"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, #060d1f 0%, rgba(6,13,31,0.5) 18%, transparent 45%), linear-gradient(0deg, #060d1f 0%, transparent 30%)',
            }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="fade-up" style={{ maxWidth: 640 }}>
            <div className="eyebrow">Career TimeTravel — 未来案内人 Chrono</div>
            <h1
              style={{
                fontFamily: 'var(--font-heading-jp)',
                fontWeight: 700,
                fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
                lineHeight: 1.35,
                margin: '20px 0 18px',
                color: 'var(--chrono-white)',
              }}
            >
              未来の働き方を、
              <br />
              いま選び直す。
            </h1>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--chrono-silver)',
                lineHeight: 1.9,
                marginBottom: 36,
              }}
            >
              Chronoが、退職・転職・副業・年収アップの不安を整理し、
              <br />
              あなたに合う次の一手を可視化します。
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/retirement-simulator" className="btn btn-primary">
                退職シミュレーターを試す
              </Link>
              <Link href="/diagnosis/salary-up" className="btn btn-ghost">
                年収アップ診断を始める
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Chrono紹介 */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.4fr',
              gap: 48,
              alignItems: 'center',
            }}
            className="chrono-intro-grid"
          >
            <div
              className="glass-card"
              style={{
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
                <ClockDial size={420} />
              </div>
              <img
                src="/chrono-bust.png"
                alt="Chrono"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
            </div>

            <div>
              <div className="eyebrow">Navigator</div>
              <h2 className="section-title">キャリアタイムナビゲーター Chrono</h2>
              <p className="section-lead" style={{ marginBottom: 18 }}>
                Chronoは、感情だけで決めがちな退職・転職・副業の判断を、質問とシミュレーションで整理する案内人です。
                冷静で論理的、それでいて優しい——あなたの迷いに寄り添いながら、未来の自分が選ぶべき一手を一緒に見つけます。
              </p>
              <Link href="/chrono" className="btn btn-ghost">
                Chronoについて詳しく見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 主要ツール */}
      <section className="section" style={{ background: 'rgba(13,27,42,0.4)' }}>
        <div className="container">
          <div className="eyebrow">Tools</div>
          <h2 className="section-title">あなたの次の一手を見つける4つのツール</h2>
          <p className="section-lead" style={{ marginBottom: 40 }}>
            まずは気になるところから。所要時間は2〜3分、すべて無料で診断できます。
          </p>

          <div className="grid-cards">
            <ToolCard
              icon="timer"
              title="退職シミュレーター"
              desc="退職後、何ヶ月生活できるかを簡易計算"
              href="/retirement-simulator"
              tag="シミュレーター"
              external={false}
            />
            {diagnosisList.map((d) => (
              <ToolCard
                key={d.id}
                icon={d.accentIcon}
                title={d.name}
                desc={d.tagline}
                href={getDiagnosisUrl(d.id)}
                tag="診断"
                external={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. コラム導線 */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 36,
            }}
          >
            <div>
              <div className="eyebrow">Column</div>
              <h2 className="section-title" style={{ margin: '10px 0 0' }}>
                Chrono’s Career Column
              </h2>
            </div>
            <Link href="/columns" style={{ color: 'var(--chrono-ice)', fontSize: '0.9rem' }}>
              すべてのコラムを見る →
            </Link>
          </div>

          <div className="grid-cards">
            {columns.slice(0, 3).map((c) => (
              <Link
                key={c.slug}
                href={`/columns/${c.slug}`}
                className="glass-card card-pad"
                style={{ display: 'block' }}
              >
                <div
                  style={{
                    fontSize: '0.74rem',
                    color: 'var(--chrono-gold)',
                    letterSpacing: '0.06em',
                    marginBottom: 10,
                  }}
                >
                  {c.category}
                </div>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    marginBottom: 12,
                    color: 'var(--chrono-white)',
                  }}
                >
                  {c.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--chrono-text-dim)', lineHeight: 1.8 }}>
                  {c.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. おすすめサービス導線 */}
      <section className="section" style={{ background: 'rgba(13,27,42,0.4)' }}>
        <div className="container">
          <div className="eyebrow">Services</div>
          <h2 className="section-title">あなたに合う選択肢を探す</h2>
          <p className="section-lead" style={{ marginBottom: 36 }}>
            診断結果に応じて、転職エージェント・副業サービス・AIスクールなど次の一歩につながるサービスをご紹介します。
          </p>

          <div className="grid-cards">
            {serviceCategories.map((cat) => (
              <div key={cat.id} className="glass-card card-pad">
                <h3 style={{ fontSize: '1rem', color: 'var(--chrono-white)', marginBottom: 8 }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--chrono-text-dim)', lineHeight: 1.7 }}>
                  {cat.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <Link href="/services" className="btn btn-ghost">
              サービス一覧を見る
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          .chrono-intro-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 900px) {
          .hero-chrono-image {
            opacity: 0.4;
            width: 75% !important;
          }
        }
        @media (max-width: 560px) {
          .hero-chrono-image {
            opacity: 0.28;
            width: 95% !important;
          }
        }
      `}</style>
    </main>
  );
}

function ToolCard({
  icon,
  title,
  desc,
  href,
  tag,
  external,
}: {
  icon: string;
  title: string;
  desc: string;
  href: string;
  tag: string;
  external: boolean;
}) {
  const content = (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 18,
        }}
      >
        <ToolIcon name={icon} />
        <span
          style={{
            fontSize: '0.7rem',
            color: 'var(--chrono-ice)',
            border: '1px solid rgba(56,161,214,0.4)',
            borderRadius: 999,
            padding: '3px 10px',
          }}
        >
          {tag}
        </span>
      </div>
      <h3 style={{ fontSize: '1.05rem', color: 'var(--chrono-white)', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: '0.84rem', color: 'var(--chrono-text-dim)', lineHeight: 1.7 }}>{desc}</p>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="glass-card card-pad" style={{ display: 'block' }}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="glass-card card-pad" style={{ display: 'block' }}>
      {content}
    </Link>
  );
}
