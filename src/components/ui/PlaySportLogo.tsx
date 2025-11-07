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
      <defs>
        {/* Premium gradient */}
        <linearGradient id="logo-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        
        {/* Accent gradient */}
        <linearGradient id="logo-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer hexagon frame (represents court boundary) */}
      <path
        d="M 50 8 L 80 25 L 80 75 L 50 92 L 20 75 L 20 25 Z"
        fill="url(#logo-grad-1)"
        opacity="0.15"
      />
      
      {/* Inner court grid pattern */}
      <g opacity="0.3">
        <line x1="35" y1="30" x2="35" y2="70" stroke="url(#logo-grad-1)" strokeWidth="1"/>
        <line x1="50" y1="30" x2="50" y2="70" stroke="url(#logo-grad-1)" strokeWidth="1"/>
        <line x1="65" y1="30" x2="65" y2="70" stroke="url(#logo-grad-1)" strokeWidth="1"/>
        <line x1="30" y1="40" x2="70" y2="40" stroke="url(#logo-grad-1)" strokeWidth="1"/>
        <line x1="30" y1="50" x2="70" y2="50" stroke="url(#logo-grad-1)" strokeWidth="1"/>
        <line x1="30" y1="60" x2="70" y2="60" stroke="url(#logo-grad-1)" strokeWidth="1"/>
      </g>
      
      {/* Modern geometric P */}
      <g filter="url(#glow)">
        <path
          d="M 28 32 L 28 68 M 28 32 L 45 32 C 52 32 52 38 52 42 C 52 46 52 50 45 50 L 28 50"
          stroke="url(#logo-grad-1)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      
      {/* Modern geometric S with accent */}
      <g filter="url(#glow)">
        <path
          d="M 56 36 C 60 34 68 34 72 36 C 74 38 74 41 72 43 C 70 44 66 45 64 45 M 64 45 C 62 45 58 46 56 48 C 54 50 54 54 56 56 C 58 58 66 60 72 58"
          stroke="url(#logo-grad-2)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      
      {/* Court centerline accent */}
      <line 
        x1="50" 
        y1="28" 
        x2="50" 
        y2="38" 
        stroke="url(#logo-grad-1)" 
        strokeWidth="2" 
        strokeLinecap="round"
        opacity="0.6"
      />
      <line 
        x1="50" 
        y1="62" 
        x2="50" 
        y2="72" 
        stroke="url(#logo-grad-2)" 
        strokeWidth="2" 
        strokeLinecap="round"
        opacity="0.6"
      />
      
      {/* Subtle corner marks (court corners) */}
      <circle cx="32" cy="32" r="1.5" fill="url(#logo-grad-1)" opacity="0.8"/>
      <circle cx="68" cy="32" r="1.5" fill="url(#logo-grad-2)" opacity="0.8"/>
      <circle cx="32" cy="68" r="1.5" fill="url(#logo-grad-2)" opacity="0.8"/>
      <circle cx="68" cy="68" r="1.5" fill="url(#logo-grad-1)" opacity="0.8"/>
    </svg>
  );
}
