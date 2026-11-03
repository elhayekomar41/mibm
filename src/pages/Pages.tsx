import { Link, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useSeo } from '../hooks/useSeo'
import { Hero } from '../components/sections/Hero'
import { Problem } from '../components/sections/Problem'
import { FourChains } from '../components/sections/FourChains'
import { Method } from '../components/sections/Method'
import { Audiences, Difference, FinalCta, Services, Tiers } from '../components/sections/HomeSections'
import { PageHero } from '../components/layout/PageHero'
import { audiences, method, voice } from '../data/content'
import { articles, topics, type Topic } from '../data/insights'
import { site } from '../data/site'

const org = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  alternateName: site.legalName,
  description: site.support,
  slogan: site.tagline,
  areaServed: ['Egypt', 'Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'],
  serviceType: ['Business management', 'Business operations consulting', 'Brand positioning', 'Growth management'],
  ...(site.url ? { url: site.url } : {}),
}

export function HomePage() {
  useSeo({
    title: 'Home',
    description:
      'MIBM is business management for Muslim entrepreneurs, creators and changemakers in Egypt and the GCC. We diagnose what is holding your business back, fix it and run the systems that help it grow.',
    jsonLd: org,
  })
  return (
    <>
      <Hero />
      <Problem />
      <FourChains />
      <Method />
      <Services />
      <Audiences />
      <Difference />
      <Tiers />
      <FinalCta />
    </>
  )
}

export function WhatWeDoPage() {
  useSeo({
    title: 'What we do',
    description:
      'Business management for entrepreneurs and creators: strategy, operations, finance, marketing, sales, content and systems, selected through a diagnosis.',
  })
  return (
    <>
      <PageHero
        title="We manage the business side, so you can stay on the work that matters."
        lead="MIBM covers strategy, operations, finance, marketing and sales. What we take on for you is decided by the diagnosis, not by a fixed package."
      />
      <section className="border-t border-line py-24">
        <div className="wrap grid gap-12 lg:grid-cols-3">
          {[
            { t: 'We diagnose first', b: 'Every engagement begins by mapping your four chains. This tells us where the business is really blocked.' },
            { t: 'We choose services from the diagnosis', b: 'If the problem is sales follow-up, we build the sales system. We don\'t sell you a website you don\'t need.' },
            { t: 'We run what we build', b: 'Where you want it, MIBM stays on to manage the systems, report on them and keep improving them.' },
          ].map((x) => (
            <div key={x.t} className="border-t border-line pt-6">
              <h2 className="t-3">{x.t}</h2>
              <p className="body mt-3">{x.b}</p>
            </div>
          ))}
        </div>
      </section>
      <FourChains />
      <Services detailed />
      <Tiers />
      <FinalCta />
    </>
  )
}

export function MethodPage() {
  useSeo({
    title: 'Our method',
    description: 'Position & brand, diagnose, implement & run. The MIBM method for finding and fixing the chain that blocks business growth.',
  })
  return (
    <>
      <PageHero
        title="Position. Diagnose. Implement and run."
        lead="The same three moves for every business. The order matters: we understand the business before we diagnose it, and diagnose before we change anything."
      />
      <Method withLink={false} />
      <section className="border-t border-line py-28">
        <div className="wrap">
          <h2 className="t-1 max-w-[12em]">What you get at each stage</h2>
          <div className="mt-16 grid gap-14 lg:grid-cols-3">
            {method.map((m) => (
              <div key={m.n}>
                <p className="meta">Stage {m.n}</p>
                <h3 className="t-2 mt-2">{m.title}</h3>
                <ul className="mt-6 border-t border-line">
                  {m.outputs.map((o) => (
                    <li key={o} className="border-b border-line py-4 text-[1.05rem] text-[#D5DED9]">{o}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FourChains />
      <FinalCta />
    </>
  )
}

export function WhoWeServePage() {
  useSeo({
    title: 'Who we serve',
    description: 'MIBM serves Muslim and Arab entrepreneurs, creators with a business, and changemakers who need the business behind their impact managed.',
  })
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) setTimeout(() => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }) }, 300)
  }, [])
  return (
    <>
      <PageHero
        title="People with a mission and a business to grow."
        lead="Our clients have built something valuable. What they share is a need for a capable partner to take responsibility for the business side."
      />
      {audiences.map((a, i) => (
        <section key={a.id} id={a.id} className="scroll-mt-24 border-t border-line py-24 sm:py-28">
          <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="meta">Journey {i + 1} of 3</p>
              <h2 className="t-1 mt-3">{a.name}</h2>
              <p className="t-3 mt-6 text-[#DDE5E1]">{a.who}</p>
            </div>
            <div>
              <p className="lead">{a.situation}</p>
              <h3 className="meta mt-10">Signs it's time</h3>
              <ul className="mt-3 border-t border-line">
                {a.signs.map((s) => <li key={s} className="border-b border-line py-4 text-[1.05rem] text-[#D5DED9]">{s}</li>)}
              </ul>
              <h3 className="meta mt-10">How MIBM helps</h3>
              <p className="mt-3 max-w-[34em] border-l-2 border-mint pl-5 text-[1.12rem] leading-relaxed text-signal">{a.help}</p>
              <Link to={`/book-a-diagnosis?profile=${a.id}`} className="btn btn-primary mt-9">Book a diagnosis</Link>
            </div>
          </div>
        </section>
      ))}
      <FinalCta />
    </>
  )
}

export function AboutPage() {
  useSeo({
    title: 'About',
    description: 'Why MIBM exists: impactful Muslims shouldn\'t lose their growth to the business side of their work.',
  })
  return (
    <>
      <PageHero
        title="Impactful Muslims shouldn't lose their growth to the business side of their work."
        lead="The people doing real good for the community are often the busiest. Their message is strong, but the business behind it runs on whatever time is left."
      />
      <section className="border-t border-line py-28">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="t-2">Why we exist</h2>
            <p className="body mt-5">
              Problems go unsolved, systems never get built, and growth stalls. Not because the founder lacks vision, but
              because one person cannot lead the mission and run every part of the business at once.
            </p>
            <p className="body mt-4">MIBM exists to carry that weight, so the people leading the impact can keep leading it.</p>
          </div>
          <div>
            <h2 className="t-2">How we think about management</h2>
            <p className="body mt-5">
              We don't believe in vague advice. A business is a set of connected chains. When growth stops, one of them is
              usually blocked. Our job is to find it, fix it, document the fix, and keep the whole system running.
            </p>
            <p className="font-arabic mt-8 text-[1.5rem] text-signal" lang="ar" dir="rtl">أنت تصنع الأثر، ونحن ندير العمل</p>
          </div>
        </div>
      </section>
      <Difference />
      <section className="border-t border-line py-28">
        <div className="wrap">
          <h2 className="t-2">How we sound</h2>
          <ul className="mt-10 grid gap-10 lg:grid-cols-3">
            {voice.map((v) => (
              <li key={v} className="border-l-2 border-mint pl-6 font-display text-[1.35rem] font-semibold leading-snug text-signal">{v}</li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function InsightsPage() {
  useSeo({
    title: 'Insights',
    description: 'Practical writing on business management, Muslim entrepreneurship, creator businesses, operations, marketing, finance, sales and delegation.',
  })
  const [topic, setTopic] = useState<Topic | 'All'>('All')
  const list = useMemo(() => (topic === 'All' ? articles : articles.filter((a) => a.topic === topic)), [topic])
  const used = new Set(articles.map((a) => a.topic))
  return (
    <>
      <PageHero title="Insights" lead="Practical thinking on running the business behind the impact." />
      <section className="border-t border-line py-16">
        <div className="wrap">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            {(['All', ...topics] as const).map((t) => {
              const has = t === 'All' || used.has(t as Topic)
              return (
                <button
                  key={t}
                  type="button"
                  disabled={!has}
                  aria-pressed={topic === t}
                  onClick={() => setTopic(t)}
                  className={`rounded-full px-4 py-2 text-[0.9rem] transition-all disabled:cursor-not-allowed disabled:opacity-35 ${
                    topic === t ? 'bg-signal text-void font-medium' : 'text-[#C9D4CE] shadow-[inset_0_0_0_1px_rgba(244,247,245,0.18)] hover:text-signal'
                  }`}
                >
                  {t}
                </button>
              )
            })}
          </div>
          <ul className="mt-14 border-t border-line">
            {list.map((a) => (
              <li key={a.slug} className="border-b border-line">
                <Link to={`/insights/${a.slug}`} className="group grid gap-3 py-10 lg:grid-cols-[12rem_1fr_6rem] lg:gap-10">
                  <span className="meta">{a.topic}</span>
                  <span>
                    <span className="t-2 block !text-[clamp(1.45rem,2.4vw,2.2rem)] transition-colors group-hover:text-mint">{a.title}</span>
                    <span className="body mt-3 block">{a.excerpt}</span>
                  </span>
                  <span className="meta lg:text-right">{a.readMinutes} min read</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export function ArticlePage() {
  const { slug } = useParams()
  const a = articles.find((x) => x.slug === slug)
  useSeo({
    title: a?.title ?? 'Article not found',
    description: a?.excerpt ?? 'This article does not exist.',
    jsonLd: a
      ? { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.excerpt, datePublished: a.date, author: { '@type': 'Organization', name: site.name } }
      : undefined,
  })
  if (!a) return <NotFoundPage />
  return (
    <article className="pb-28 pt-40 sm:pt-48">
      <div className="wrap max-w-[52rem]">
        <Link to="/insights" className="text-link meta">All insights</Link>
        <p className="meta mt-10">{a.topic}, {formatDate(a.date)}, {a.readMinutes} min read</p>
        <h1 className="t-1 mt-4 !text-[clamp(2rem,4.4vw,3.6rem)]">{a.title}</h1>
        <p className="lead mt-6">{a.excerpt}</p>
        <div className="mt-12 border-t border-line pt-10">
          {a.body.map((p, i) =>
            p.startsWith('## ') ? (
              <h2 key={i} className="t-3 mb-3 mt-10">{p.slice(3)}</h2>
            ) : (
              <p key={i} className="mb-5 text-[1.1rem] leading-[1.8] text-[#C9D4CE]">{p}</p>
            ),
          )}
        </div>
        <div className="mt-14 border-t border-line pt-10">
          <p className="t-3">Want us to find the blocked chain in your business?</p>
          <Link to="/book-a-diagnosis" className="btn btn-primary mt-6">Book a diagnosis</Link>
        </div>
      </div>
    </article>
  )
}

export function NotFoundPage() {
  useSeo({ title: 'Page not found', description: 'This page does not exist.' })
  return (
    <section className="flex min-h-[80vh] items-center pt-32">
      <div className="wrap">
        <h1 className="t-1">This page doesn't exist.</h1>
        <p className="lead mt-5">The link may be old or mistyped. Start from the homepage or book a diagnosis.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary">Go to the homepage</Link>
          <Link to="/book-a-diagnosis" className="btn btn-ghost">Book a diagnosis</Link>
        </div>
      </div>
    </section>
  )
}
