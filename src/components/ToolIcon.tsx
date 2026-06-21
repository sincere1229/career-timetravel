export default function ToolIcon({ name }: { name: string }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#D4AF37',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'timer':
      return (
        <svg {...common}>
          <path d="M8 2h8" />
          <path d="M12 14l3-3" />
          <circle cx="12" cy="14" r="8" />
        </svg>
      );
    case 'trend':
      return (
        <svg {...common}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M17 7h4v4" />
        </svg>
      );
    case 'compass':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9l-2 6-6 2 2-6z" />
        </svg>
      );
    case 'side':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="14" rx="1.5" />
          <path d="M3 9h18" />
          <path d="M8 14h3" />
        </svg>
      );
    case 'ai':
      return (
        <svg {...common}>
          <rect x="5" y="5" width="14" height="14" rx="3" />
          <circle cx="9.5" cy="11" r="1" fill="#D4AF37" stroke="none" />
          <circle cx="14.5" cy="11" r="1" fill="#D4AF37" stroke="none" />
          <path d="M9 15c1 1 5 1 6 0" />
          <path d="M12 5V2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
