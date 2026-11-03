import { useLayoutEffect, useRef, useState } from 'react'
import { problems } from '../../data/content'
import { ScrollTrigger, prefersReducedMotion } from '../../lib/motion'

const POS = [
  { x: 120, y: 110 },
  { x: 480, y: 110 },
  { x: 120, y: 390 },
  { x: 480, y: 390 },
]

function Weight({ active }: { active: number }) {
  return (
    <svg viewBox="0 0 600 500" className="h-auto w-full" role="img" aria-label="Four business chains all pulling on one founder">
      <defs>
        <radialGradient id="pr-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#1FAF6B" stopOpacity="0.4" />
          <stop offset="1" stopColor="#1FAF6B" stopOpacity="0" />
        </radialGradient>
      </defs>
      {POS.map((p, i) => {
        const on = i < active
        return (
          <g key={i} style={{ transition: 'opacity .6s' }} opacity={on ? 1 : 0.18}>
            <line
              x1={p.x} y1={p.y} x2={300} y2={250}
              stroke={on ? '#5CF2A0' : '#3B4A43'}
              strokeWidth={on ? 1.6 : 1}
              strokeDasharray={on ? '3 7' : '0'}
            >
              {on && <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="1.4s" repeatCount="indefinite" />}
            </line>
            <circle cx={p.x} cy={p.y} r="34" fill="#08100C" stroke={on ? '#5CF2A0' : '#2A3731'} strokeWidth="1.2" />
            <text x={p.x} y={p.y + 5} textAnchor="middle" fill="#F4F7F5" fontFamily="Poppins" fontWeight="600" fontSize="13">
              {problems[i].chain}
            </text>
          </g>
        )
      })}
      <circle cx="300" cy="250" r={60 + active * 10} fill="url(#pr-core)" style={{ transition: 'r .8s' }} />
      <circle cx="300" cy="250" r="44" fill="#050807" stroke={active === 4 ? '#F4F7F5' : '#5CF2A0'} strokeWidth="1.4" />
      <text x="300" y="256" textAnchor="middle" fill="#F4F7F5" fontFamily="Poppins" fontWeight="700" fontSize="17">You</text>
    </svg>
  )
}

export function Problem() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    if (!root.current) return
    if (prefersReducedMotion() || window.innerWidth < 1024) { setActive(4); return }
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (s) => setActive(Math.min(4, Math.floor(s.progress * 5.2))),
    })
    return () => st.kill()
  }, [])

  return (
    <section ref={root} className="relative lg:h-[320vh]" aria-labelledby="problem-title">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="wrap grid items-center gap-12 py-24 lg:grid-cols-[1fr_1fr] lg:py-0 lg:pt-16">
          <div>
            <h2 id="problem-title" className="t-1 max-w-[13em] lg:!text-[clamp(2.2rem,3.7vw,3.7rem)]">Your impact shouldn't be limited by the business behind it.</h2>
            <p className="lead mt-7">
              You built the vision and the audience. The business behind it still runs on whatever time is left.
            </p>
            <ol className="mt-10 space-y-5">
              {problems.map((p, i) => (
                <li
                  key={p.chain}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line pt-4 transition-opacity duration-500"
                  style={{ opacity: i < active ? 1 : 0.28 }}
                >
                  <span className="font-display font-semibold text-signal">{p.chain}</span>
                  <span className="text-[#C9D4CE]">{p.line}</span>
                </li>
              ))}
            </ol>
            <p
              className="mt-10 font-display text-[1.35rem] font-semibold text-signal transition-opacity duration-700"
              style={{ opacity: active === 4 ? 1 : 0 }}
            >
              One person can't hold four chains at once.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[560px]">
            <Weight active={active} />
          </div>
        </div>
      </div>
    </section>
  )
}
