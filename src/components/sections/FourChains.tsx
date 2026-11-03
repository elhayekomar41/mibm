import { useState } from 'react'
import { chains, type ChainId } from '../../data/content'

const NODES: Record<ChainId, { x: number; y: number }> = {
  operations: { x: 300, y: 70 },
  marketing: { x: 530, y: 300 },
  sales: { x: 300, y: 530 },
  finance: { x: 70, y: 300 },
}

const TABS = [
  { key: 'controls', label: 'What it controls' },
  { key: 'breaks', label: 'What goes wrong' },
  { key: 'investigate', label: 'What we investigate' },
  { key: 'improve', label: 'How we improve it' },
] as const

type TabKey = (typeof TABS)[number]['key']

function Diagram({ selected, broken, onSelect }: { selected: ChainId; broken: boolean; onSelect: (id: ChainId) => void }) {
  return (
    <svg viewBox="0 0 600 600" className="h-auto w-full select-none" role="img" aria-label="The four business chains connected to the business at the centre">
      <defs>
        <radialGradient id="fc-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#1FAF6B" stopOpacity={broken ? 0.12 : 0.42} />
          <stop offset="1" stopColor="#1FAF6B" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Outer ring linking the chains to each other */}
      <circle cx="300" cy="300" r="230" fill="none" stroke="rgba(92,242,160,0.12)" strokeWidth="1" />
      <circle cx="300" cy="300" r="170" fill="url(#fc-core)" style={{ transition: 'all .8s' }} />

      {chains.map((c) => {
        const n = NODES[c.id]
        const isSel = c.id === selected
        const isBroken = broken && isSel
        const mx = (n.x + 300) / 2
        const my = (n.y + 300) / 2
        return (
          <g key={c.id}>
            {/* Spoke: flow from chain into the business */}
            {isBroken ? (
              <>
                <line x1={n.x} y1={n.y} x2={(n.x + mx) / 2 + (mx - n.x) * 0.15} y2={(n.y + my) / 2 + (my - n.y) * 0.15} stroke="#F4F7F5" strokeOpacity="0.5" strokeWidth="1.4" />
                <line x1={mx + (300 - mx) * 0.2} y1={my + (300 - my) * 0.2} x2={300} y2={300} stroke="#3B4A43" strokeWidth="1.2" />
              </>
            ) : (
              <line
                x1={n.x} y1={n.y} x2={300} y2={300}
                stroke={isSel ? '#5CF2A0' : broken ? '#2E3B35' : 'rgba(92,242,160,0.45)'}
                strokeWidth={isSel ? 2 : 1.2}
                strokeDasharray="4 8"
                style={{ transition: 'stroke .5s' }}
              >
                {!broken && <animate attributeName="stroke-dashoffset" from="0" to="-48" dur={isSel ? '1s' : '2.2s'} repeatCount="indefinite" />}
              </line>
            )}
            <g
              role="button"
              tabIndex={-1}
              onClick={() => onSelect(c.id)}
              className="cursor-pointer"
            >
              <circle cx={n.x} cy={n.y} r="54" fill="transparent" />
              <circle
                cx={n.x} cy={n.y} r={isSel ? 46 : 40}
                fill={isSel ? '#0B3D2E' : '#08100C'}
                stroke={isBroken ? '#F4F7F5' : isSel ? '#5CF2A0' : 'rgba(92,242,160,0.35)'}
                strokeWidth={isSel ? 1.8 : 1.2}
                style={{ transition: 'all .45s' }}
              />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fill="#F4F7F5" fontFamily="Poppins" fontWeight="600" fontSize="14">
                {c.name}
              </text>
            </g>
          </g>
        )
      })}

      <circle cx="300" cy="300" r="62" fill="#050807" stroke={broken ? '#56665E' : '#5CF2A0'} strokeWidth="1.5" style={{ transition: 'stroke .6s' }} />
      <text x="300" y="296" textAnchor="middle" fill="#F4F7F5" fontFamily="Poppins" fontWeight="700" fontSize="16">Your</text>
      <text x="300" y="316" textAnchor="middle" fill="#F4F7F5" fontFamily="Poppins" fontWeight="700" fontSize="16">business</text>
      <text x="300" y="392" textAnchor="middle" fill={broken ? '#F4F7F5' : 'transparent'} fontFamily="Inter" fontSize="13" style={{ transition: 'fill .5s' }}>
        Growth slows to the pace of the weakest chain
      </text>
    </svg>
  )
}

export function FourChains({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const [selected, setSelected] = useState<ChainId>('operations')
  const [tab, setTab] = useState<TabKey>('controls')
  const [broken, setBroken] = useState(false)
  const chain = chains.find((c) => c.id === selected)!
  const H = headingLevel

  return (
    <section className="relative py-28 sm:py-36" aria-labelledby="chains-title">
      <div className="wrap">
        <H id="chains-title" className="t-1 max-w-[13em]">Every business runs on four chains. We find the one that's broken.</H>
        <p className="lead mt-6">Select a chain to see what it controls, what goes wrong, and how we fix it.</p>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div className="mx-auto w-full max-w-[540px]">
            <Diagram selected={selected} broken={broken} onSelect={(id) => setSelected(id)} />
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setBroken((b) => !b)}
                aria-pressed={broken}
                className="btn btn-ghost !py-2.5 text-[0.9rem]"
              >
                {broken ? `Repair ${chain.name.toLowerCase()}` : `Break ${chain.name.toLowerCase()}`}
              </button>
            </div>
          </div>

          <div>
            <div role="tablist" aria-label="Choose a chain" className="flex flex-wrap gap-2">
              {chains.map((c) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={c.id === selected}
                  onClick={() => setSelected(c.id)}
                  className={`rounded-full px-4 py-2 font-display text-[0.92rem] font-semibold transition-all ${
                    c.id === selected
                      ? 'bg-signal text-void'
                      : 'text-[#C9D4CE] shadow-[inset_0_0_0_1px_rgba(244,247,245,0.18)] hover:text-signal'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <h3 className="t-2 mt-10">{chain.name}</h3>
            <p className="body mt-3">{chain.short}</p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-line" role="tablist" aria-label="Chain detail">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className={`-mb-px border-b pb-3 text-[0.95rem] transition-colors ${
                    tab === t.key ? 'border-mint text-signal' : 'border-transparent text-mute hover:text-signal'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <ul key={selected + tab} className="mt-6 space-y-3" role="tabpanel">
              {chain[tab].map((item, i) => (
                <li
                  key={item}
                  className="flex gap-4 text-[1.08rem] text-[#D5DED9] animate-[fadein_.5s_ease_both]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-mint" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
