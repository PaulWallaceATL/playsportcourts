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
      {/* Tile grid background */}
      <defs>
        <linearGradient id="ps-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <pattern id="tile-grid" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        </pattern>
      </defs>
      
      {/* Background */}
      <rect width="100" height="100" rx="16" fill="url(#ps-gradient)"/>
      <rect width="100" height="100" rx="16" fill="url(#tile-grid)"/>
      
      {/* Court outline */}
      <rect x="15" y="20" width="70" height="60" rx="2" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="2"/>
      
      {/* Bold P */}
      <path
        d="M 28 38 L 28 68 M 28 38 C 28 38 28 38 40 38 C 46 38 46 44 46 48 C 46 52 46 53 40 53 L 28 53"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
      
      {/* Bold S with court lines */}
      <path
        d="M 54 42 C 58 40 64 40 68 42 C 70 43 70 46 68 48 C 66 49 62 50 60 50 M 60 50 C 58 50 54 51 52 52 C 50 54 50 57 52 59 C 54 61 60 62 64 60"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
      
      {/* Court markings accents */}
      <circle cx="50" cy="53" r="8" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"/>
      <line x1="50" y1="20" x2="50" y2="80" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
    </svg>
  );
}
