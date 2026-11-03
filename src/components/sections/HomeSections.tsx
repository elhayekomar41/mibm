import { useState } from 'react'
import { Link } from 'react-router-dom'
import { audiences, serviceGroups, tiers, values } from '../../data/content'
import { Arch, Hilal, Horizon } from '../brand/Brand'

export function Services({ detailed = false }: { detailed?: boolean }) {
  const [open, setOpen] = useState<number | null>(detailed ? null : 0)
  return (
    <section className="relative border-t border-line py-28 sm:py-36" aria-labelledby="services-title">
      <div className="wrap grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="services-title" className="t-1 max-w-[9em]">What MIBM manages</h2>
          <p className="lead mt-6">
            Implementation depends on the diagnosis. We only take on the areas your business actually needs, agreed in
            the scope of each engagement.
          </p>
          {!detailed && <Link to="/what-we-do" className="text-link mt-8 inline-block">How services are chosen</Link>}
        </div>
        <div className="border-t border-line">
          {serviceGroups.map((g, i) => {
            const isOpen = detailed || open === i
            return (
              <div key={g.name} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                    aria-expanded={isOpen}
                    onClick={() => !detailed && setOpen(isOpen ? null : i)}
                    disabled={detailed}
                  >
                    <span className="t-2 !text-[clamp(1.4rem,2.2vw,2rem)]">{g.name}</span>
                    {!detailed && (
                      <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                        <span className="absolute left-0 top-1/2 h-px w-4 bg-signal" />
                        <span className={`absolute left-1/2 top-0 h-4 w-px bg-signal transition-transform duration-300 ${isOpen ? 'scale-y-0' : ''}`} />
                      </span>
                    )}
                  </button>
                </h3>
                <div className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <ul className="flex flex-wrap gap-2 pb-8">
                      {g.items.map((it) => (
                        <li key={it} className="rounded-full px-4 py-2 text-[0.95rem] text-[#D5DED9] shadow-[inset_0_0_0_1px_rgba(92,242,160,0.22)]">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Audiences() {
  const [i, setI] = useState(0)
  const a = audiences[i]
  return (
    <section className="relative overflow-clip border-t border-line py-28 sm:py-36" aria-labelledby="audience-title">
      <div className="wrap">
        <h2 id="audience-title" className="t-1 max-w-[12em]">Built for people with something real to grow</h2>
        <div role="tablist" aria-label="Who we serve" className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-b border-line">
          {audiences.map((x, k) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={k === i}
              onClick={() => setI(k)}
              className={`-mb-px border-b-2 pb-4 font-display text-[1.15rem] font-semibold transition-colors sm:text-[1.35rem] ${
                k === i ? 'border-mint text-signal' : 'border-transparent text-mute hover:text-signal'
              }`}
            >
              {x.name}
            </button>
          ))}
        </div>
        <div key={a.id} role="tabpanel" className="mt-12 grid gap-12 animate-[fadein_.5s_ease_both] lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="t-2">{a.who}</p>
            <p className="lead mt-5">{a.situation}</p>
            <p className="mt-8 max-w-[34em] border-l-2 border-mint pl-5 text-[1.12rem] leading-relaxed text-signal">{a.help}</p>
            <Link to={`/who-we-serve#${a.id}`} className="text-link mt-8 inline-block">Read the {a.name.toLowerCase()} journey</Link>
          </div>
          <div>
            <h3 className="meta mb-4">You might recognise this</h3>
            <ul className="space-y-0">
              {a.signs.map((s) => (
                <li key={s} className="border-t border-line py-5 text-[1.08rem] text-[#D5DED9]">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Difference() {
  return (
    <section className="relative border-t border-line py-28 sm:py-36" aria-labelledby="diff-title">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <h2 id="diff-title" className="t-1 max-w-[10em]">We don't hand you a report. We fix it.</h2>
          <p className="lead self-end">
            Most advisors stop at recommendations. MIBM takes ownership of implementation, then stays to run what was
            built. That responsibility is the difference.
          </p>
        </div>
        <dl className="mt-20 grid gap-x-16 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.name} className="group border-t border-line py-9">
              <dt className="font-display text-[clamp(2.2rem,4.4vw,3.8rem)] font-bold leading-none tracking-tightest text-signal transition-colors duration-500 group-hover:text-mint">
                {v.name}
              </dt>
              <dd className="body mt-4">{v.line}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Tiers() {
  return (
    <section className="relative border-t border-line py-28 sm:py-36" aria-labelledby="tiers-title">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <h2 id="tiers-title" className="t-1 max-w-[10em]">How we work together</h2>
          <p className="lead self-end">
            A partnership in three stages. Every client starts with a diagnosis, so the work that follows is based on
            what your business actually needs.
          </p>
        </div>
        <ol className="relative mt-20 grid gap-0 lg:grid-cols-3">
          <span aria-hidden="true" className="absolute left-0 right-0 top-0 hidden h-px bg-gradient-to-r from-mint via-emerald to-transparent lg:block" />
          {tiers.map((t, i) => (
            <li
              key={t.name}
              className={`relative flex flex-col border-t border-line pt-10 lg:border-t-0 lg:pr-10 ${i > 0 ? 'mt-14 lg:mt-0 lg:border-l lg:pl-10' : ''} pb-2`}
            >
              <span className="meta">{t.stage}</span>
              <h3 className="t-2 mt-3">{t.name}</h3>
              <p className="body mt-4">{t.for}</p>
              <ul className="mt-7 space-y-2.5 text-[#D5DED9]">
                {t.includes.map((x) => (
                  <li key={x} className="flex gap-3"><span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-mint" />{x}</li>
                ))}
              </ul>
              <p className="mt-9 font-display text-[1.25rem] font-semibold text-signal">
                {t.price ?? 'Priced after the first call'}
              </p>
              <Link
                to={`/book-a-diagnosis?interest=${encodeURIComponent(t.name)}`}
                className={`btn mt-5 self-start ${i === 0 ? 'btn-primary' : 'btn-ghost'}`}
              >
                {t.cta}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="relative overflow-clip border-t border-line" aria-labelledby="final-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 h-[40%] w-[min(52vw,320px)] sm:h-[46%] -translate-x-1/2">
          <div className="absolute bottom-0 left-1/2 t-1/2 w-[160%] -translate-x-1/2" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(92,242,160,.3), rgba(31,175,107,.1) 45%, transparent 70%)' }} />
          <div className="absolute left-[14%] top-[14%] w-[72%]"><Hilal className="h-auto w-full" thickness={60} /></div>
          <Arch className="absolute inset-0 h-full w-full opacity-70" />
        </div>
        <Horizon className="absolute -bottom-px left-0 h-[26vh] w-full" />
      </div>
      <div className="wrap relative flex min-h-[100svh] sm:min-h-[92vh] flex-col items-center justify-start pt-28 text-center sm:pt-32">
        <h2 id="final-title" className="t-1 max-w-[13em]">Your business deserves the same attention as your mission.</h2>
        <p className="lead mt-6">Let's identify what's holding it back and build what comes next.</p>
        <Link to="/book-a-diagnosis" className="btn btn-primary mt-9">Book your business diagnosis</Link>
      </div>
    </section>
  )
}
