export default function Logo({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b9bff" />
          <stop offset="1" stopColor="#1250d6" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#lg)" />
      <path d="M8 36 L17 12 L26 36" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 29 H22" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M31 12 V36 M31 25 L41 12 M33.5 22.5 L41 36" fill="none" stroke="#9fd0ff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
