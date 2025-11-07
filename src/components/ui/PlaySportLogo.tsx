export function PlaySportLogo({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background square representing a tile */}
      <rect width="100" height="100" rx="12" fill="url(#logo-gradient)" />
      
      {/* Grid lines to represent court tiles */}
      <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      
      {/* Stylized P and S */}
      <path
        d="M 30 35 L 30 65 M 30 35 L 45 35 Q 52 35 52 42 Q 52 49 45 49 L 30 49"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      <path
        d="M 58 38 Q 65 35 72 38 Q 75 40 75 45 Q 75 50 72 52 Q 65 55 58 52 M 58 48 Q 65 45 72 48 Q 75 50 75 55 Q 75 60 72 62 Q 65 65 58 62"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Small court markings detail */}
      <circle cx="25" cy="75" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="75" cy="25" r="3" fill="currentColor" opacity="0.6" />
      
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

