import type { Metadata } from 'next';
import Link from 'next/link';
import ClockDial from '@/components/ClockDial';

export const metadata: Metadata = {
  title: 'Chronoについて | Career TimeTravel',
  description: 'キャリアタイムナビゲーター Chronoのプロフィールと、Career TimeTravelの世界観を紹介します。',
};

export default function ChronoPage() {
  return (
    <main>
      <section
        style={{
          position: 'relative',
          padding: '100px 0 80px',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 70% 60% at 80% 10%, rgba(18,59,109,0.45), transparent)',
        }}
      >
        <div style={{ position: 'absolute', right: '-10%', top: '-10%', opacity: 0.6 }}>
          <ClockDial size={520} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 680 }}>
          <div className="eyebrow">Profile</div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
              margin: '14px 0 6px',
              color: 'var(--chrono-white)',
            }}
          >
            Chrono
          </h1>
          <div style={{ fontFamily: 'var(--font-heading-jp)', fontSize: '1.1rem', color: 'var(--chrono-silver)', marginBottom: 24 }}>
            ― クロノ ― 未来案内人・タイムトラベルナビゲーター
          </div>
          <p style={{ color: 'var(--chrono-text-dim)', lineHeight: 1.9, fontSize: '0.98rem' }}>
            「未来の自分に、会いに行こう。」
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 680 }}>
          <div className="glass-card card-pad">
            <ProfileRow label="年齢イメージ" value="27歳" />
            <ProfileRow label="性格" value="冷静・知的・論理的・優しい・責任感が強い" />
            <ProfileRow label="役割" value="Career TimeTravelの案内役" />
            <ProfileRow label="モチーフ" value="時計・歯車・砂時計・未来都市・時空ゲート" last />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'rgba(13,27,42,0.4)' }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <div className="eyebrow">Story</div>
          <h2 className="section-title">Chronoが大切にしていること</h2>
          <p style={{ color: 'var(--chrono-silver)', lineHeight: 2, marginBottom: 20 }}>
            退職や転職、副業を始めるかどうかという判断は、どうしても感情が先に動いてしまいます。不安、焦り、勢い——それ自体は自然なことですが、後から振り返って後悔しないためには、感情と事実を一度切り分けて見る視点が必要です。
          </p>
          <p style={{ color: 'var(--chrono-silver)', lineHeight: 2, marginBottom: 20 }}>
            Chronoは、質問とシミュレーションという形で、その「切り分け」をお手伝いします。何ヶ月生活できるのか、今の行動パターンは年収アップにつながっているのか、自分はどんな働き方を優先したいのか。一つひとつ数字と言葉にしていくことで、迷いの正体が見えてきます。
          </p>
          <p style={{ color: 'var(--chrono-silver)', lineHeight: 2 }}>
            未来は誰にも見えません。けれど、今の自分の状態を正確に知ることはできます。Chronoと一緒に、その一歩から始めましょう。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 680, textAlign: 'center' }}>
          <h2 className="section-title">まずはここから</h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
            <Link href="/retirement-simulator" className="btn btn-primary">
              退職シミュレーターを試す
            </Link>
            <Link href="/diagnosis/salary-up" className="btn btn-ghost">
              年収アップ行動診断を始める
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfileRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 20,
        padding: '16px 0',
        borderBottom: last ? 'none' : '1px solid rgba(192,214,242,0.1)',
      }}
    >
      <div style={{ width: 110, flexShrink: 0, fontSize: '0.82rem', color: 'var(--chrono-ice)' }}>{label}</div>
      <div style={{ fontSize: '0.92rem', color: 'var(--chrono-white)' }}>{value}</div>
    </div>
  );
}
