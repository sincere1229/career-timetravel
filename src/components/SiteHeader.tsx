import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(10px)',
        background: 'rgba(6, 13, 31, 0.78)',
        borderBottom: '1px solid rgba(192, 214, 242, 0.1)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 68,
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src="/chrono-icon.png"
            alt="Chrono"
            width={32}
            height={32}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid rgba(212,175,55,0.5)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              letterSpacing: '0.02em',
              color: 'var(--chrono-white)',
            }}
          >
            Career TimeTravel
          </span>
        </Link>
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            fontSize: '0.88rem',
            color: 'var(--chrono-silver)',
          }}
          className="nav-links"
        >
          <Link href="/chrono">Chronoについて</Link>
          <Link href="/columns">コラム</Link>
          <Link href="/services">サービスを探す</Link>
          <Link
            href="/retirement-simulator"
            className="btn btn-primary"
            style={{ padding: '9px 18px', fontSize: '0.84rem' }}
          >
            退職シミュレーター
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function ClockMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="21" stroke="#D4AF37" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="1.8" fill="#D4AF37" />
      <line x1="24" y1="24" x2="24" y2="11" stroke="#E8F1FF" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="24" y1="24" x2="32" y2="27" stroke="#38A1D6" strokeWidth="1.4" strokeLinecap="round" />
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 24 + 18 * Math.sin(angle);
        const y1 = 24 - 18 * Math.cos(angle);
        const x2 = 24 + 20 * Math.sin(angle);
        const y2 = 24 - 20 * Math.cos(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C0D6F2" strokeWidth="0.8" />;
      })}
    </svg>
  );
}
