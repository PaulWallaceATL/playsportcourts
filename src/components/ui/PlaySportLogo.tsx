export function PlaySportLogo({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Sophisticated gradient - cyan to blue */}
        <linearGradient id="ps-gradient-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
          <stop offset="50%" stopColor="#0ea5e9" stopOpacity="1" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="1" />
        </linearGradient>
        
        {/* Accent gradient - orange */}
        <linearGradient id="ps-gradient-accent" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        
        {/* Subtle glow */}
        <filter id="ps-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="1.5"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Court tile pattern */}
        <pattern id="ps-tiles" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="11" height="11" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      
      {/* Background shape - rounded square */}
      <rect x="10" y="10" width="100" height="100" rx="20" fill="url(#ps-gradient-main)"/>
      
      {/* Tile pattern overlay */}
      <rect x="10" y="10" width="100" height="100" rx="20" fill="url(#ps-tiles)"/>
      
      {/* Court outline accent */}
      <rect x="20" y="25" width="80" height="70" rx="4" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"/>
      
      {/* Stylized P - modern, geometric */}
      <g filter="url(#ps-glow)">
        <path
          d="M 35 45 L 35 85 M 35 45 L 55 45 C 62 45 65 48 65 55 C 65 62 62 65 55 65 L 35 65"
          stroke="#000000"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.95"
        />
      </g>
      
      {/* Stylized S - modern, geometric with accent */}
      <g filter="url(#ps-glow)">
        <path
          d="M 70 50 C 75 47 83 47 88 50 C 91 52 91 56 88 58 C 85 60 80 61 78 61 M 78 61 C 76 61 71 62 68 64 C 65 66 65 71 68 73 C 71 75 79 76 85 73"
          stroke="url(#ps-gradient-accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.95"
        />
      </g>
      
      {/* Court center circle detail */}
      <circle cx="60" cy="65" r="12" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>
      
      {/* Subtle corner accents - representing court corners */}
      <circle cx="25" cy="30" r="2" fill="rgba(0,0,0,0.2)"/>
      <circle cx="95" cy="30" r="2" fill="url(#ps-gradient-accent)" opacity="0.6"/>
      <circle cx="25" cy="90" r="2" fill="url(#ps-gradient-accent)" opacity="0.6"/>
      <circle cx="95" cy="90" r="2" fill="rgba(0,0,0,0.2)"/>
      
      {/* Center line accent */}
      <line x1="60" y1="25" x2="60" y2="35" stroke="rgba(0,0,0,0.15)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="60" y1="85" x2="60" y2="95" stroke="rgba(0,0,0,0.15)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
