import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav } from '../../data/site'
import { Logo } from '../brand/Brand'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] btn btn-primary">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${scrolled ? 'pt-3' : 'pt-5 sm:pt-7'}`}
      >
        <div className="wrap">
          <div
            className={`flex items-center justify-between rounded-full transition-all duration-500 ${
              scrolled
                ? 'bg-[#08100C]/80 backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(92,242,160,0.14)] px-4 py-2.5 sm:px-5'
                : 'px-0 py-1'
            }`}
          >
            <Link to="/" aria-label="MIBM home" className="text-[1.45rem] text-signal relative z-[70]">
              <Logo />
            </Link>

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {nav.map((n) => (
                  <li key={n.to}>
                    <NavLink
                      to={n.to}
                      className={({ isActive }) =>
                        `text-[0.95rem] font-normal transition-colors ${isActive ? 'text-signal' : 'text-[#AEBBB4] hover:text-signal'}`
                      }
                    >
                      {n.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/book-a-diagnosis" className="btn btn-primary hidden sm:inline-flex !py-2.5 !px-5 text-[0.9rem]">
                Book a diagnosis
              </Link>
              <button
                type="button"
                className="lg:hidden relative z-[70] grid h-11 w-11 place-items-center rounded-full shadow-[inset_0_0_0_1px_rgba(244,247,245,0.2)]"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((o) => !o)}
              >
                <span className="relative block t-3 w-5">
                  <span className={`absolute left-0 h-[1.5px] w-5 bg-signal transition-all duration-500 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                  <span className={`absolute left-0 h-[1.5px] w-5 bg-signal transition-all duration-500 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu: an arch that opens from the top */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] lg:hidden transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] bg-void ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{ clipPath: open ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)' }}
        aria-hidden={!open}
      >
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(31,175,107,0.28),transparent_65%)]" />
        <nav aria-label="Mobile" className="wrap relative flex h-full flex-col justify-center pt-20">
          <ul className="space-y-1">
            {[{ label: 'Home', to: '/' }, ...nav].map((n, i) => (
              <li
                key={n.to}
                className="transition-all duration-700"
                style={{
                  transitionDelay: open ? `${180 + i * 60}ms` : '0ms',
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateY(24px)',
                }}
              >
                <NavLink
                  to={n.to}
                  tabIndex={open ? 0 : -1}
                  className={({ isActive }) =>
                    `block py-2 font-display text-[2.3rem] font-bold tracking-tightest ${isActive ? 'text-mint' : 'text-signal'}`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/book-a-diagnosis" tabIndex={open ? 0 : -1} className="btn btn-primary mt-10 self-start">
            Book a diagnosis
          </Link>
        </nav>
      </div>
    </>
  )
}
