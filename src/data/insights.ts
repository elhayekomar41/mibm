/**
 * Insights articles. CMS-ready shape: replace this array with a fetch from
 * any headless CMS (Sanity, Contentful, Supabase) that returns the same fields.
 */
export type Topic =
  | 'Business management'
  | 'Muslim entrepreneurship'
  | 'Creator businesses'
  | 'Operations'
  | 'Marketing'
  | 'Finance'
  | 'Sales'
  | 'Systems & delegation'
  | 'Growth'

export const topics: Topic[] = [
  'Business management',
  'Muslim entrepreneurship',
  'Creator businesses',
  'Operations',
  'Marketing',
  'Finance',
  'Sales',
  'Systems & delegation',
  'Growth',
]

export interface Article {
  slug: string
  title: string
  excerpt: string
  topic: Topic
  readMinutes: number
  date: string // ISO
  body: string[] // paragraphs; a paragraph starting with "## " renders as a subheading
}

export const articles: Article[] = [
  {
    slug: 'one-blocked-chain',
    title: 'Most businesses don\'t have a growth problem. They have one blocked chain.',
    excerpt: 'Why fixing everything at once fails, and how to find the single constraint that is holding the rest back.',
    topic: 'Business management',
    readMinutes: 4,
    date: '2026-11-03',
    body: [
      'When growth stalls, the instinct is to fix everything: post more, hire someone, redo the website, cut prices. Most of that effort lands on parts of the business that were never the problem.',
      'Every business runs on four chains: operations, finance, marketing and sales. They are connected. A business can only move as fast as its weakest chain allows.',
      '## How a blocked chain hides',
      'A blocked chain rarely announces itself. A sales problem often looks like a marketing problem: "we need more followers". A finance problem often looks like a sales problem: "we need more orders". The symptom shows up one chain away from the cause.',
      '## Finding it',
      'Trace one customer from the moment they first hear about you to the moment you are paid and they are served. Note every place they wait, every place you lose them, and every place the work depends on one person. The longest wait is usually the blocked chain.',
      'Fix that one first. Then measure again. Growth comes from removing the constraint, not from adding effort everywhere else.',
    ],
  },
  {
    slug: 'audience-is-not-a-business',
    title: 'You built the audience. Here is what the business behind it needs.',
    excerpt: 'An audience is an asset, not a business. Four things turn attention into a company that lasts.',
    topic: 'Creator businesses',
    readMinutes: 5,
    date: '2026-11-03',
    body: [
      'Creators often reach a point where the audience is large and engaged, but revenue is unpredictable. Every launch depends on the energy of that week.',
      'An audience becomes a business when four things exist behind it.',
      '## A clear offer',
      'One product or service people can understand in a sentence, priced from real costs, not from what feels comfortable to post.',
      '## A path to buy',
      'A defined route from content to purchase: where people go, what they see, and who answers their questions. If buyers have to DM you to pay, the path is not built yet.',
      '## Delivery that runs without you',
      'Fulfillment, support and onboarding documented so someone else can run them. Otherwise growth becomes more of your time, not more of the business.',
      '## Numbers you can read',
      'Monthly revenue, costs and margin in one view. Without this, every decision is a guess.',
    ],
  },
  {
    slug: 'delegation-starts-with-writing-it-down',
    title: 'Delegation starts with writing it down',
    excerpt: 'Founders say they can\'t delegate because nobody does it right. Usually, nobody was ever shown what right looks like.',
    topic: 'Systems & delegation',
    readMinutes: 3,
    date: '2026-11-03',
    body: [
      'The most common reason founders stay stuck in daily operations is not a lack of good people. It is that the standard only exists in the founder\'s head.',
      '## Start with what repeats',
      'List the tasks you did more than twice last week. Each one is a candidate for a standard operating procedure.',
      '## Write it as you do it',
      'The next time you do the task, record the steps as you go: what you check, what good looks like, what to do when something goes wrong. A short checklist beats a long manual nobody reads.',
      '## Hand it over, then check',
      'Give the procedure to someone else, watch the first run, and fix the document, not the person. After three clean runs, the task is no longer yours.',
    ],
  },
]
