import type { ReactNode } from 'react'
import { Hilal } from '../brand/Brand'

/** Inner-page opening: large editorial title with a small hilal as the recurring signature. */
export function PageHero({ title, lead, children }: { title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-clip pb-20 pt-40 sm:pb-24 sm:pt-48">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[18vw] -top-[8vw] w-[58vw] max-w-[760px] opacity-80 sm:-right-[8vw]">
        <Hilal className="h-auto w-full" thickness={54} intensity={0.75} />
      </div>
      <div className="wrap relative">
        <h1 className="t-1 max-w-[13em]">{title}</h1>
        <p className="lead mt-7">{lead}</p>
        {children}
      </div>
    </section>
  )
}
