import { useSeo } from '../hooks/useSeo'
import { DiagnosisForm, NextSteps } from '../components/forms/DiagnosisForm'
import { Hilal } from '../components/brand/Brand'

export function BookPage() {
  useSeo({
    title: 'Book a business diagnosis',
    description: 'Tell us about your business. MIBM reviews your answers, then we agree on a diagnosis that finds what is holding your growth back.',
  })
  return (
    <section className="relative overflow-clip pb-28 pt-40 sm:pt-48">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[20vw] top-[4vh] w-[60vw] max-w-[720px] opacity-60">
        <Hilal className="h-auto w-full" thickness={50} intensity={0.7} />
      </div>
      <div className="wrap relative grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h1 className="t-1 max-w-[9em]">Book a business diagnosis</h1>
          <p className="lead mt-6">
            Three short steps, about four minutes. Tell us where the business is and what's in the way.
          </p>
          <div className="mt-12 hidden lg:block">
            <h2 className="t-3">After you send it</h2>
            <NextSteps />
          </div>
        </div>
        <div className="rounded-[28px] bg-[#070D0A]/80 p-6 shadow-[inset_0_0_0_1px_rgba(92,242,160,0.14)] backdrop-blur sm:p-10">
          <DiagnosisForm />
        </div>
        <div className="lg:hidden">
          <h2 className="t-3">After you send it</h2>
          <NextSteps />
        </div>
      </div>
    </section>
  )
}
