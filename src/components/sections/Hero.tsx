import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Arch, Hilal, Horizon } from '../brand/Brand'
import { gsap, prefersReducedMotion } from '../../lib/motion'

/**
 * Signature hero: a pointed arch drawn in LED line, a hilal rising behind it,
 * and an emerald light source on the horizon. The single orchestrated moment of the site.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)
  const archLine = useRef<SVGPathElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll('[data-line]')
      if (prefersReducedMotion()) {
        gsap.set('[data-fade], [data-hilal], [data-light], [data-arch]', { opacity: 1 })
        return
      }
      const path = archLine.current
      const len = path?.getTotalLength() ?? 2400
      el.querySelectorAll<SVGPathElement>('.arch-line').forEach((p) => {
        p.style.strokeDasharray = `${len}`
        p.style.strokeDashoffset = `${len}`
      })
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.set('[data-arch]', { opacity: 1 })
        .to('.arch-line', { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut' }, 0.1)
        .fromTo('[data-light]', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 2.2 }, 0.6)
        .fromTo('[data-hilal]', { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 2.4, ease: 'power2.out' }, 0.9)
        .fromTo('.horizon-line', { opacity: 0 }, { opacity: 1, duration: 1.6 }, 1.0)
        .fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 1.0)
        .fromTo('[data-fade]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 1.7)

      // Scroll: the hilal keeps rising and the light grows as the visitor moves in.
      gsap.to('[data-hilal]', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('[data-light]', {
        scale: 1.25, opacity: 0.6, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('[data-copy]', {
        y: -60, opacity: 0.2, ease: 'none',
        scrollTrigger: { trigger: el, start: '30% top', end: 'bottom top', scrub: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-clip" aria-labelledby="hero-title">
      {/* Architecture */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[8%] h-[40%] w-[56%] -translate-x-1/2 sm:h-[50%] sm:w-[44%] lg:left-auto lg:right-[5%] lg:top-[9%] lg:h-[86%] lg:w-[min(40vw,560px)] lg:translate-x-0">
          {/* Light source emerging from behind the arch */}
          <div
            data-light
            className="absolute bottom-[2%] left-1/2 h-[55%] w-[120%] -translate-x-1/2 opacity-0"
            style={{ background: 'radial-gradient(ellipse at 50% 85%, rgba(92,242,160,0.32), rgba(31,175,107,0.12) 35%, transparent 62%)' }}
          />
          <div data-hilal className="absolute left-[12%] top-[16%] w-[76%] opacity-0">
            <Hilal className="h-auto w-full" thickness={64} />
          </div>
          <div data-arch className="absolute inset-0 opacity-0">
            <Arch drawRef={archLine} className="h-full w-full" />
          </div>
        </div>
        <Horizon className="absolute -bottom-px left-0 h-[22vh] w-full" />
      </div>

      {/* Copy */}
      <div data-copy className="wrap relative flex min-h-[100svh] flex-col justify-end pb-[9vh] pt-32">
        <h1 id="hero-title" className="t-hero max-w-[11.5em] lg:max-w-[9.6em]">
          <span className="reveal-mask"><span data-line>You lead the impact.</span></span>{' '}
          <span className="reveal-mask"><span data-line className="text-[#9FB3A8]">We run the business.</span></span>
        </h1>
        <p data-fade className="lead mt-7 max-w-[34em]">
          Business management for Muslim entrepreneurs, creators and changemakers. We find what's holding your business back,
          fix it from A to Z, and build the systems that help it grow.
        </p>
        <div data-fade className="mt-9 flex flex-wrap gap-3">
          <Link to="/book-a-diagnosis" className="btn btn-primary">Book a business diagnosis</Link>
          <Link to="/our-method" className="btn btn-ghost">Discover how we work</Link>
        </div>
      </div>
    </section>
  )
}
