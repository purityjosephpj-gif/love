interface LogoProps {
  size?: number
  variant?: 'monogram' | 'runner'
  className?: string
}

export default function Logo({ size = 32, variant = 'monogram', className = '' }: LogoProps) {
  if (variant === 'runner') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Runner with parcel icon */}
        <circle cx="50" cy="50" r="48" fill="#8B0000" stroke="#FFD700" strokeWidth="2"/>
        <g fill="#FFFFFF">
          {/* Runner figure */}
          <circle cx="45" cy="25" r="8"/> {/* Head */}
          <rect x="42" y="35" width="6" height="25" rx="3"/> {/* Body */}
          <rect x="40" y="40" width="4" height="15" rx="2" transform="rotate(-20 42 47)"/> {/* Left arm */}
          <rect x="48" y="40" width="4" height="15" rx="2" transform="rotate(20 50 47)"/> {/* Right arm */}
          <rect x="41" y="58" width="4" height="18" rx="2" transform="rotate(-10 43 67)"/> {/* Left leg */}
          <rect x="47" y="58" width="4" height="18" rx="2" transform="rotate(10 49 67)"/> {/* Right leg */}
        </g>
        {/* Parcel */}
        <rect x="60" y="40" width="12" height="8" fill="#FFD700" stroke="#8B0000" strokeWidth="1"/>
        <path d="M66 40v8M60 44h12" stroke="#8B0000" strokeWidth="1"/>
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ER Monogram */}
      <circle cx="50" cy="50" r="48" fill="#8B0000" stroke="#FFD700" strokeWidth="2"/>
      <g fill="#FFFFFF" fontSize="36" fontFamily="Inter, sans-serif" fontWeight="800">
        <text x="20" y="65" textAnchor="start">E</text>
        <text x="50" y="65" textAnchor="start">R</text>
      </g>
      {/* Decorative elements */}
      <circle cx="50" cy="20" r="2" fill="#FFD700"/>
      <circle cx="20" cy="50" r="2" fill="#FFD700"/>
      <circle cx="80" cy="50" r="2" fill="#FFD700"/>
      <circle cx="50" cy="80" r="2" fill="#FFD700"/>
    </svg>
  )
}