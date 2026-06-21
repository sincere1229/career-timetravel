export default function ClockDial({ size = 640 }: { size?: number }) {
  const center = 320;
  const hourMarks = [...Array(12)].map((_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const r1 = 260;
    const r2 = i % 3 === 0 ? 232 : 246;
    const x1 = center + r1 * Math.sin(angle);
    const y1 = center - r1 * Math.cos(angle);
    const x2 = center + r2 * Math.sin(angle);
    const y2 = center - r2 * Math.cos(angle);
    return { x1, y1, x2, y2, key: i };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 640 640"
      fill="none"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="dialGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#123B6D" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#0D1B2A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0D1B2A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8a6f23" />
        </linearGradient>
      </defs>

      <circle cx={center} cy={center} r="300" fill="url(#dialGlow)" />

      <g className="spin-slow" style={{ transformOrigin: '320px 320px' }}>
        <circle cx={center} cy={center} r="280" stroke="#C0D6F2" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx={center} cy={center} r="260" stroke="url(#goldStroke)" strokeOpacity="0.55" strokeWidth="1.2" />
        {hourMarks.map((m) => (
          <line
            key={m.key}
            x1={m.x1}
            y1={m.y1}
            x2={m.x2}
            y2={m.y2}
            stroke="#C0D6F2"
            strokeOpacity="0.4"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        ))}
      </g>

      <g className="spin-slow-reverse" style={{ transformOrigin: '320px 320px' }}>
        <circle
          cx={center}
          cy={center}
          r="200"
          stroke="#38A1D6"
          strokeOpacity="0.25"
          strokeWidth="0.8"
          strokeDasharray="2 10"
        />
      </g>

      <circle cx={center} cy={center} r="2.4" fill="#D4AF37" />
    </svg>
  );
}
