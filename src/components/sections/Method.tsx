import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { method } from '../../data/content'
import { ScrollTrigger, prefersReducedMotion } from '../../lib/motion'

/** Three moves on one continuous line: progress is linked to scroll on desktop. */
export function Method({ withLink = true }: { withLink?: boolean }) {
  const root = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion() || window.innerWidth < 1024) { setProgress(1); return }
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (s) => setProgress(s.progress),
    })
    return () => st.kill()
  }, [])

  const active = Math.min(2, Math.floor(progress * 3))

  return (
    <section ref={root} className="relative border-t border-line lg:h-[300vh]" aria-labelledby="method-title">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <div className="wrap py-24 lg:py-0">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="method-title" className="t-1">One method. Three moves.</h2>
            {withLink && <Link to="/our-method" className="text-link">See the method in detail</Link>}
          </div>

          {/* Desktop: progress line */}
          <div className="relative mt-16 hidden lg:block" aria-hidden="true">
            <div className="h-px w-full bg-[#1D2A24]" />
            <div className="absolute left-0 top-0 h-px bg-mint shadow-[0_0_12px_2px_rgba(92,242,160,0.5)]" style={{ width: `${Math.min(100, progress * 105)}%` }} />
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute -top-[5px] h-[11px] w-[11px] rounded-full border transition-colors duration-500"
                style={{
                  left: `${i * 33.333}%`,
                  background: i <= active ? '#5CF2A0' : '#050807',
                  borderColor: i <= active ? '#5CF2A0' : '#3B4A43',
                }}
              />
            ))}
          </div>

          <ol className="mt-12 grid gap-14 lg:mt-10 lg:grid-cols-3 lg:gap-0">
            {method.map((m, i) => (
              <li
                key={m.n}
                className="relative border-l border-line pl-6 transition-opacity duration-700 lg:border-l-0 lg:pl-0 lg:pr-12"
                style={{ opacity: i <= active ? 1 : 0.25 }}
              >
                <span className="font-display text-[4.5rem] font-bold leading-none tracking-tightest text-transparent [-webkit-text-stroke:1.2px_#5CF2A0]">
                  {m.n}
                </span>
                <h3 className="t-3 mt-5">{m.title}</h3>
                <p className="mt-2 font-display text-[1.05rem] font-medium text-[#DDE5E1]">{m.lead}</p>
                <p className="body mt-3">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
