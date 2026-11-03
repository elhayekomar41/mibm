/** All page copy lives here so it can be edited without touching layout code. */

export type ChainId = 'operations' | 'finance' | 'marketing' | 'sales'

export interface Chain {
  id: ChainId
  name: string
  short: string
  controls: string[]
  breaks: string[]
  investigate: string[]
  improve: string[]
}

export const chains: Chain[] = [
  {
    id: 'operations',
    name: 'Operations',
    short: 'Fulfillment, team, SOPs, suppliers and delivery.',
    controls: ['How orders are fulfilled', 'Who does what on the team', 'Supplier relationships', 'Delivery and service quality'],
    breaks: ['The founder is the bottleneck for every decision', 'Nothing is written down, so quality depends on who is working', 'Orders slip as volume grows'],
    investigate: ['The full path from order to delivery', 'Where work waits for one person', 'Which steps repeat without a standard'],
    improve: ['Documented SOPs the team can follow', 'Clear roles and delegation', 'A fulfillment flow that holds at higher volume'],
  },
  {
    id: 'finance',
    name: 'Finance',
    short: 'Cash flow, margins, pricing and financial leakage.',
    controls: ['Cash coming in and going out', 'Margin on every product or service', 'Pricing decisions', 'What the owner can safely draw'],
    breaks: ['Revenue grows but cash stays tight', 'Prices are set by feel, not by cost', 'Money leaks through untracked expenses'],
    investigate: ['True cost and margin per offer', 'Where cash is tied up or lost', 'How pricing compares to the value delivered'],
    improve: ['A simple cash-flow system with clear buckets', 'Pricing built from real costs', 'Monthly numbers the founder can read in minutes'],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    short: 'Positioning, content, channels and customer acquisition.',
    controls: ['How the brand is understood', 'What content goes out and why', 'Which channels bring customers'],
    breaks: ['Posting a lot with no clear message', 'An audience that likes the content but doesn\'t buy', 'Every channel tried, none owned'],
    investigate: ['Positioning: who it is for and why they choose you', 'Which content and channels actually convert', 'The gap between audience and customers'],
    improve: ['A clear position and message', 'A content system tied to the offer', 'One or two channels run properly'],
  },
  {
    id: 'sales',
    name: 'Sales',
    short: 'Lead generation, sales processes, conversion and sales teams.',
    controls: ['Where leads come from', 'How a lead becomes a customer', 'Who sells and how they are managed'],
    breaks: ['Leads arrive in DMs and get lost', 'No follow-up, so warm buyers go cold', 'Sales depend on the founder being online'],
    investigate: ['Every source of sales and its quality', 'The path from first message to payment', 'Where buyers drop off'],
    improve: ['A defined sales flow with follow-up', 'A CRM or tracker the team uses', 'Sales that run without the founder in every chat'],
  },
]

export const problems = [
  { chain: 'Operations', line: 'Orders, suppliers and the team all route through you.' },
  { chain: 'Finance', line: 'Revenue comes in, but you can\'t say where the money goes.' },
  { chain: 'Marketing', line: 'The audience grows faster than the customers do.' },
  { chain: 'Sales', line: 'Warm leads wait in your DMs until they go cold.' },
]

export const method = [
  {
    n: '01',
    title: 'Position & brand',
    lead: 'Understand the business before touching it.',
    body: 'We learn why the business exists, who it is for, why customers choose it and where it sits in its market. Then we build the brand on that.',
    outputs: ['Positioning statement', 'Ideal customer profile', 'Brand identity and messaging'],
  },
  {
    n: '02',
    title: 'Diagnose',
    lead: 'Find the one chain that is really blocking growth.',
    body: 'We break operations, finance, marketing and sales into their chains: where sales come from, how fulfillment flows, where money leaks, which channels bring customers.',
    outputs: ['Four-chain analysis', 'The named bottleneck', 'A prioritised fix plan'],
  },
  {
    n: '03',
    title: 'Implement & run',
    lead: 'Fix it, then keep it working.',
    body: 'We execute the improvements the diagnosis calls for, manage the systems and document every fix so the business runs better without depending on us.',
    outputs: ['Implemented systems', 'Ongoing management', 'Documented SOPs and handover'],
  },
]

export const serviceGroups = [
  {
    name: 'Strategy & brand',
    items: ['Business strategy', 'Brand positioning', 'Marketing strategy', 'Content strategy'],
  },
  {
    name: 'Operations & finance',
    items: ['Operations management', 'Delegation and SOPs', 'Financial systems and reporting'],
  },
  {
    name: 'Content & digital',
    items: ['Social media management', 'Video production and editing', 'Motion graphics', 'Website development'],
  },
  {
    name: 'Sales & systems',
    items: ['Sales systems', 'Sales team organisation', 'Funnels and customer journeys', 'CRM implementation', 'Automation'],
  },
]

export const audiences = [
  {
    id: 'entrepreneurs',
    name: 'Entrepreneurs',
    who: 'You own a Muslim brand or company.',
    situation: 'The product is good. But operations, sales or cash flow keep holding the company back, and you are the one patching every gap.',
    signs: ['You are involved in every order, hire and decision', 'Sales are steady but don\'t grow', 'You can\'t take a week off without things slipping'],
    help: 'We diagnose the four chains, fix the bottleneck and build the systems so the company runs without you in every detail.',
  },
  {
    id: 'creators',
    name: 'Creators with a business',
    who: 'You have an audience and something to sell.',
    situation: 'A product, course, platform or community. People listen to you, but there is no time or system to build the business behind the content.',
    signs: ['Launches depend on your energy that week', 'Followers grow faster than revenue', 'Orders, emails and DMs pile up'],
    help: 'We turn the audience into a business: the offer, the funnel, the sales flow and the operations behind it, so you stay on the content.',
  },
  {
    id: 'changemakers',
    name: 'Changemakers',
    who: 'You do impactful work in the community.',
    situation: 'You want it to grow and last. But the work that matters most leaves little time for the business side that pays for it.',
    signs: ['The mission is clear, the model is not', 'Growth depends on you personally', 'Good ideas wait because nobody can run them'],
    help: 'We build and manage the business side, from structure to finance to marketing, so the impact can scale.',
  },
]

export const values = [
  { name: 'Amanah', line: 'Your business, numbers, audience and reputation are a trust.' },
  { name: 'Clarity', line: 'We name the real problem instead of ten vague recommendations.' },
  { name: 'Ownership', line: 'We execute. We don\'t hand over a report and leave.' },
  { name: 'Systems', line: 'Every improvement is documented so it keeps working.' },
]

/**
 * ENGAGEMENT TIERS
 * FOUNDER TO CONFIRM: no tiers or prices have been agreed yet.
 * The structure follows the entry offer discussed (a paid diagnosis that leads into
 * implementation, then ongoing management). Set `price` to a string such as
 * "From 15,000 EGP" once confirmed; leave null to show "Priced after the first call".
 */
export const tiers: {
  name: string
  stage: string
  for: string
  includes: string[]
  price: string | null
  cta: string
}[] = [
  {
    name: 'Business Diagnosis',
    stage: 'Start here',
    for: 'For a business that knows something is blocking growth but not exactly what.',
    includes: ['Positioning review', 'Full four-chain analysis', 'The bottleneck named', 'A prioritised fix plan'],
    price: null,
    cta: 'Book a diagnosis',
  },
  {
    name: 'Implementation',
    stage: 'Fix',
    for: 'For a business with a diagnosis that needs the fixes built and launched.',
    includes: ['The services the diagnosis calls for', 'Systems built and handed over', 'Documented SOPs', 'Scope agreed per project'],
    price: null,
    cta: 'Discuss implementation',
  },
  {
    name: 'Business Management',
    stage: 'Run',
    for: 'For founders who want MIBM running the business side on an ongoing basis.',
    includes: ['Ongoing management of agreed chains', 'Regular reporting', 'Continuous improvement', 'Limited number of clients'],
    price: null,
    cta: 'Talk about management',
  },
]

export const voice = [
  'Most businesses don\'t have a growth problem. They have one blocked chain.',
  'You built the audience. Let us build the business behind it.',
  'We don\'t hand you a report. We fix it.',
]
