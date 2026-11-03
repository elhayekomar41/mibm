import { useId } from 'react'

/**
 * MIBM mark: two pillars forming an M, with a pointed arch cut between them.
 * Drawn as a vector so it stays sharp at every size (favicon to billboard).
 */
export const MARK_PATH =
  'M0 0H30L50 25L70 0H100V92H71V54Q71 39 50 30Q29 39 29 54V92H0Z'

export function Mark({ className = '', glow = true }: { className?: string; glow?: boolean }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="-8 -8 116 108" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#13895A" />
          <stop offset="0.55" stopColor="#1FAF6B" />
          <stop offset="1" stopColor="#7DF7B6" />
        </linearGradient>
        <filter id={`b${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {glow && <path d={MARK_PATH} fill="#1FAF6B" opacity="0.45" filter={`url(#b${id})`} />}
      <path d={MARK_PATH} fill={`url(#g${id})`} />
      <path d={MARK_PATH} fill="none" stroke="#B8FFD8" strokeOpacity="0.55" strokeWidth="1.2" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.42em] ${className}`}>
      <Mark className="h-[1.05em] w-auto" />
      <span className="font-display font-bold tracking-[-0.01em] leading-none">MIBM</span>
    </span>
  )
}

/** Thin waxing crescent (hilal). The outer rim carries an LED edge light. */
export function hilalPaths(cx: number, cy: number, r: number, thickness: number) {
  const d = thickness
  const h = Math.sqrt(r * r - (d / 2) ** 2)
  const x = cx - d / 2
  const crescent = `M${x} ${cy - h} A${r} ${r} 0 1 1 ${x} ${cy + h} A${r} ${r} 0 0 0 ${x} ${cy - h}Z`
  const rim = `M${x} ${cy - h} A${r} ${r} 0 1 1 ${x} ${cy + h}`
  return { crescent, rim }
}

export function Hilal({
  className = '',
  thickness = 70,
  intensity = 1,
}: {
  className?: string
  thickness?: number
  intensity?: number
}) {
  const id = useId().replace(/:/g, '')
  const { crescent, rim } = hilalPaths(500, 500, 400, thickness)
  return (
    <svg viewBox="0 0 1000 1000" className={className} aria-hidden="true" overflow="visible">
      <defs>
        <linearGradient id={`f${id}`} x1="0.35" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0B3D2E" stopOpacity="0" />
          <stop offset="0.7" stopColor="#1FAF6B" stopOpacity="0.5" />
          <stop offset="1" stopColor="#5CF2A0" />
        </linearGradient>
        <linearGradient id={`v${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#fff" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.15" />
        </linearGradient>
        <mask id={`m${id}`} maskUnits="userSpaceOnUse" x="-200" y="-200" width="1400" height="1400">
          <rect x="-200" y="-200" width="1400" height="1400" fill={`url(#v${id})`} />
        </mask>
        <filter id={`w${id}`} filterUnits="userSpaceOnUse" x="-200" y="-200" width="1400" height="1400">
          <feGaussianBlur stdDeviation="50" />
        </filter>
        <filter id={`s${id}`} filterUnits="userSpaceOnUse" x="-200" y="-200" width="1400" height="1400">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <g mask={`url(#m${id})`} opacity={intensity}>
        <path d={rim} fill="none" stroke="#1FAF6B" strokeWidth="50" opacity="0.5" filter={`url(#w${id})`} />
        <path d={crescent} fill={`url(#f${id})`} />
        <path d={rim} fill="none" stroke="#5CF2A0" strokeWidth="9" filter={`url(#s${id})`} />
        <path d={rim} fill="none" stroke="#E9FFF3" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/** Pointed arch outline (the negative space of the mark, enlarged into architecture). */
export const ARCH_PATH = 'M60 1000V520Q60 230 300 40Q540 230 540 520V1000'

export function Arch({ className = '', drawRef }: { className?: string; drawRef?: React.Ref<SVGPathElement> }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 600 1000" className={className} aria-hidden="true" overflow="visible">
      <defs>
        <linearGradient id={`a${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9FFF3" />
          <stop offset="0.45" stopColor="#5CF2A0" />
          <stop offset="1" stopColor="#1FAF6B" stopOpacity="0" />
        </linearGradient>
        <filter id={`ag${id}`} filterUnits="userSpaceOnUse" x="-100" y="-100" width="800" height="1200">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <path d={ARCH_PATH} fill="none" stroke="#5CF2A0" strokeWidth="8" opacity="0.55" filter={`url(#ag${id})`} className="arch-line" />
      <path ref={drawRef} d={ARCH_PATH} fill="none" stroke={`url(#a${id})`} strokeWidth="1.6" className="arch-line" />
    </svg>
  )
}

/** Curved horizon line with a soft emerald bloom above it. */
export function Horizon({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 1600 300" preserveAspectRatio="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`h${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5CF2A0" stopOpacity="0" />
          <stop offset="0.5" stopColor="#B8FFD8" />
          <stop offset="1" stopColor="#5CF2A0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`r${id}`} cx="0.5" cy="1" r="0.6">
          <stop offset="0" stopColor="#1FAF6B" stopOpacity="0.35" />
          <stop offset="1" stopColor="#1FAF6B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="800" cy="300" rx="900" ry="200" fill={`url(#r${id})`} />
      <path d="M-100 300Q800 40 1700 300" fill="none" stroke={`url(#h${id})`} strokeWidth="1.5" className="horizon-line" />
    </svg>
  )
}
