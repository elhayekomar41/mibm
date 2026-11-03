import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Header } from '../navigation/Header'
import { Logo } from '../brand/Brand'
import { nav, site } from '../../data/site'
import { ScrollTrigger } from '../../lib/motion'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    const t = setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => clearTimeout(t)
  }, [pathname])
  return null
}

function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" aria-label="MIBM home" className="text-[1.6rem]"><Logo /></Link>
          <p className="body mt-5 max-w-[22rem]">{site.support}</p>
          <p className="font-arabic mt-4 text-[1.05rem] text-[#C9D4CE]" lang="ar" dir="rtl">
            أنت تصنع الأثر، ونحن ندير العمل
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="meta mb-4">Explore</h2>
          <ul className="space-y-2.5">
            {nav.map((n) => (
              <li key={n.to}><Link className="text-[#C9D4CE] hover:text-signal transition-colors" to={n.to}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="meta mb-4">Start</h2>
          <p className="text-[#C9D4CE]">Every engagement starts with a diagnosis.</p>
          <Link to="/book-a-diagnosis" className="btn btn-ghost mt-5">Book a diagnosis</Link>
          <p className="meta mt-8">{site.markets}</p>
        </div>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-line py-6 text-sm text-mute sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>Diagnose. Fix. Grow.</span>
      </div>
    </footer>
  )
}

export function Layout() {
  return (
    <div className="grain min-h-screen">
      <ScrollToTop />
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </div>
  )
}
