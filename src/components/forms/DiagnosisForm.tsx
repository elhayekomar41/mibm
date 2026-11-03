import { useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { site } from '../../data/site'

type Data = {
  name: string
  email: string
  whatsapp: string
  brand: string
  link: string
  type: string
  stage: string
  areas: string[]
  challenge: string
  goal: string
  interest: string
}

const TYPES = ['Product brand', 'Service business', 'Creator with a product or community', 'Community or impact organisation', 'Other']
const STAGES = ['Just starting', 'Selling, but inconsistently', 'Steady, but stuck', 'Growing faster than we can handle']
const AREAS = ['Operations', 'Finance', 'Marketing', 'Sales', 'Not sure yet']

const STEPS = ['About you', 'Your business', 'What you need'] as const

const empty: Data = { name: '', email: '', whatsapp: '', brand: '', link: '', type: '', stage: '', areas: [], challenge: '', goal: '', interest: '' }

function validate(step: number, d: Data) {
  const e: Partial<Record<keyof Data, string>> = {}
  if (step === 0) {
    if (d.name.trim().length < 2) e.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'Enter a valid email, like name@example.com.'
    if (d.whatsapp && !/^\+?[0-9\s-]{8,18}$/.test(d.whatsapp.trim())) e.whatsapp = 'Use digits only, with the country code, like +20 100 000 0000.'
    if (d.brand.trim().length < 2) e.brand = 'Enter your business or brand name.'
  }
  if (step === 1) {
    if (!d.type) e.type = 'Choose the option closest to your business.'
    if (!d.stage) e.stage = 'Choose your current stage.'
    if (d.areas.length === 0) e.areas = 'Choose at least one area, or "Not sure yet".'
  }
  if (step === 2) {
    if (d.challenge.trim().length < 20) e.challenge = 'Tell us a little more, at least a sentence or two.'
    if (d.goal.trim().length < 10) e.goal = 'Describe what you want to achieve.'
  }
  return e
}

function summary(d: Data) {
  return [
    `MIBM business diagnosis request`,
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.whatsapp && `WhatsApp: ${d.whatsapp}`,
    `Business: ${d.brand}`,
    d.link && `Website/social: ${d.link}`,
    `Type: ${d.type}`,
    `Stage: ${d.stage}`,
    `Areas: ${d.areas.join(', ')}`,
    d.interest && `Interested in: ${d.interest}`,
    `Main challenge: ${d.challenge}`,
    `Goal: ${d.goal}`,
  ].filter(Boolean).join('\n')
}

function Field({ label, error, hint, children, id }: { label: string; error?: string; hint?: string; children: ReactNode; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="block font-display text-[0.98rem] font-medium text-signal">{label}</label>
      {hint && <p id={`${id}-hint`} className="meta mt-1">{hint}</p>}
      <div className="mt-2.5">{children}</div>
      {error && <p id={`${id}-err`} role="alert" className="mt-2 text-[0.92rem] text-[#FFB4A8]">{error}</p>}
    </div>
  )
}

const input =
  'w-full rounded-xl bg-[#0A120E] px-4 py-3.5 text-[1.02rem] text-signal placeholder:text-[#5E6E66] shadow-[inset_0_0_0_1px_rgba(244,247,245,0.14)] outline-none transition-shadow focus:shadow-[inset_0_0_0_1.5px_rgba(92,242,160,0.8)]'

function Choice({ name, options, value, onChange, multi = false, describedBy }: { name: string; options: string[]; value: string | string[]; onChange: (v: string) => void; multi?: boolean; describedBy?: string }) {
  return (
    <div className="flex flex-wrap gap-2" role={multi ? 'group' : 'radiogroup'} aria-describedby={describedBy}>
      {options.map((o) => {
        const on = multi ? (value as string[]).includes(o) : value === o
        return (
          <label key={o} className={`cursor-pointer rounded-full px-4 py-2.5 text-[0.95rem] transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-mint ${on ? 'bg-signal text-void font-medium' : 'text-[#C9D4CE] shadow-[inset_0_0_0_1px_rgba(244,247,245,0.18)] hover:text-signal'}`}>
            <input type={multi ? 'checkbox' : 'radio'} name={name} className="sr-only" checked={on} onChange={() => onChange(o)} />
            {o}
          </label>
        )
      })}
    </div>
  )
}

export function DiagnosisForm() {
  const [params] = useSearchParams()
  const [d, setD] = useState<Data>({ ...empty, interest: params.get('interest') ?? '' })
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed' | 'unconnected'>('idle')
  const [copied, setCopied] = useState(false)

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((x) => ({ ...x, [k]: v }))
  const toggleArea = (a: string) =>
    set('areas', d.areas.includes(a) ? d.areas.filter((x) => x !== a) : a === 'Not sure yet' ? ['Not sure yet'] : [...d.areas.filter((x) => x !== 'Not sure yet'), a])

  const text = useMemo(() => summary(d), [d])

  const next = () => {
    const e = validate(step, d)
    setErrors(e)
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0]
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    setStep((s) => s + 1)
    const top = document.getElementById('form-top')
    if (top) window.scrollTo({ top: top.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' })
  }

  const submit = async () => {
    const e = validate(2, d)
    setErrors(e)
    if (Object.keys(e).length) return
    if (!site.formEndpoint) { setStatus('unconnected'); return }
    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...d, areas: d.areas.join(', '), source: 'mibm-website' }),
      })
      setStatus(res.ok ? 'sent' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  const err = (k: keyof Data) => errors[k]
  const aria = (k: keyof Data) => ({ 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `f-${k}-err` : undefined })

  if (status === 'sent') {
    return (
      <div role="status" className="animate-[fadein_.6s_ease_both]">
        <h2 className="t-2">Request received, {d.name.split(' ')[0]}.</h2>
        <p className="lead mt-5">Here is what happens next.</p>
        <NextSteps />
      </div>
    )
  }

  if (status === 'unconnected' || status === 'failed') {
    const wa = site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}` : ''
    const mail = site.contact.email ? `mailto:${site.contact.email}?subject=${encodeURIComponent('Business diagnosis request')}&body=${encodeURIComponent(text)}` : ''
    return (
      <div role="status" className="animate-[fadein_.6s_ease_both]">
        <h2 className="t-2">{status === 'failed' ? 'Your request didn\'t go through.' : 'Your answers are ready to send.'}</h2>
        <p className="lead mt-5">
          {status === 'failed'
            ? 'The connection to our inbox failed. Nothing was sent. Send your answers directly using one of the options below.'
            : 'Online submission isn\'t connected yet, so nothing has been sent. Send your answers to us directly using one of the options below.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {wa && <a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer">Send on WhatsApp</a>}
          {mail && <a className="btn btn-ghost" href={mail}>Send by email</a>}
          <button
            type="button"
            className={`btn ${wa || mail ? 'btn-ghost' : 'btn-primary'}`}
            onClick={async () => { try { await navigator.clipboard.writeText(text); setCopied(true) } catch { setCopied(false) } }}
          >
            {copied ? 'Answers copied' : 'Copy my answers'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>Edit my answers</button>
        </div>
        <pre className="mt-8 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl bg-[#0A120E] p-5 text-[0.92rem] leading-relaxed text-[#C9D4CE] shadow-[inset_0_0_0_1px_rgba(244,247,245,0.1)]">{text}</pre>
      </div>
    )
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (step < 2) next(); else void submit() }} noValidate aria-labelledby="form-title">
      <div id="form-top" className="scroll-mt-32" />
      <h2 id="form-title" className="sr-only">Business diagnosis request</h2>
      {/* Progress */}
      <ol className="mb-12 grid grid-cols-3 gap-3" aria-label="Form progress">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? 'step' : undefined}>
            <span className={`block h-[2px] rounded transition-colors duration-500 ${i <= step ? 'bg-mint shadow-[0_0_10px_rgba(92,242,160,0.6)]' : 'bg-[#1D2A24]'}`} />
            <span className={`mt-3 block text-[0.88rem] ${i === step ? 'text-signal' : 'text-mute'}`}>{i + 1}. {s}</span>
          </li>
        ))}
      </ol>

      <div key={step} className="grid gap-8 animate-[fadein_.45s_ease_both]">
        {step === 0 && (
          <>
            <div className="grid gap-8 sm:grid-cols-2">
              <Field id="f-name" label="Your name" error={err('name')}>
                <input id="f-name" className={input} autoComplete="name" value={d.name} onChange={(e) => set('name', e.target.value)} {...aria('name')} />
              </Field>
              <Field id="f-email" label="Email" error={err('email')}>
                <input id="f-email" type="email" inputMode="email" className={input} autoComplete="email" value={d.email} onChange={(e) => set('email', e.target.value)} {...aria('email')} />
              </Field>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <Field id="f-whatsapp" label="WhatsApp (optional)" error={err('whatsapp')}>
                <input id="f-whatsapp" type="tel" inputMode="tel" className={input} placeholder="+20 100 000 0000" autoComplete="tel" value={d.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} {...aria('whatsapp')} />
              </Field>
              <Field id="f-brand" label="Business or brand name" error={err('brand')}>
                <input id="f-brand" className={input} autoComplete="organization" value={d.brand} onChange={(e) => set('brand', e.target.value)} {...aria('brand')} />
              </Field>
            </div>
            <Field id="f-link" label="Website or social media (optional)">
              <input id="f-link" className={input} placeholder="instagram.com/yourbrand" value={d.link} onChange={(e) => set('link', e.target.value)} />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field id="f-type" label="What kind of business is it?" error={err('type')}>
              <Choice name="type" options={TYPES} value={d.type} onChange={(v) => set('type', v)} describedBy={err('type') ? 'f-type-err' : undefined} />
            </Field>
            <Field id="f-stage" label="Where is the business right now?" error={err('stage')}>
              <Choice name="stage" options={STAGES} value={d.stage} onChange={(v) => set('stage', v)} describedBy={err('stage') ? 'f-stage-err' : undefined} />
            </Field>
            <Field id="f-areas" label="Which areas need attention?" hint="Choose all that apply." error={err('areas')}>
              <Choice name="areas" multi options={AREAS} value={d.areas} onChange={toggleArea} describedBy={err('areas') ? 'f-areas-err' : undefined} />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field id="f-challenge" label="What is the main challenge right now?" error={err('challenge')}>
              <textarea id="f-challenge" rows={4} className={input} value={d.challenge} onChange={(e) => set('challenge', e.target.value)} {...aria('challenge')} />
            </Field>
            <Field id="f-goal" label="What do you want to achieve in the next 6 to 12 months?" error={err('goal')}>
              <textarea id="f-goal" rows={3} className={input} value={d.goal} onChange={(e) => set('goal', e.target.value)} {...aria('goal')} />
            </Field>
          </>
        )}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        {step > 0 && <button type="button" className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>Back</button>}
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {step < 2 ? 'Continue' : status === 'sending' ? 'Sending request' : 'Send diagnosis request'}
        </button>
        <span className="meta ml-1">Step {step + 1} of 3</span>
      </div>
    </form>
  )
}

export function NextSteps() {
  const steps = [
    { t: 'We read your answers', b: 'We review what you shared before we speak, so the first call isn\'t spent on basics.' },
    { t: 'A first call', b: 'We talk through the business and your goals, and agree whether a diagnosis is the right next step.' },
    { t: 'Scope and price', b: 'If it is, we confirm the scope and price of the diagnosis in writing before any work starts.' },
  ]
  return (
    <ol className="mt-8 border-t border-line">
      {steps.map((s, i) => (
        <li key={s.t} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-5">
          <span className="font-display font-semibold text-mint">{i + 1}</span>
          <span><span className="block font-display font-semibold text-signal">{s.t}</span><span className="body mt-1 block">{s.b}</span></span>
        </li>
      ))}
    </ol>
  )
}
