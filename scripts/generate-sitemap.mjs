// Writes public/sitemap.xml and robots.txt using SITE_URL (set it to the live domain).
import { writeFileSync, readFileSync } from 'node:fs'
const base = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://mibm.lovable.app').replace(/\/$/, '')
const src = readFileSync(new URL('../src/data/insights.ts', import.meta.url), 'utf8')
const slugs = [...src.matchAll(/slug: '([^']+)'/g)].map((m) => m[1])
const routes = ['/', '/what-we-do', '/our-method', '/who-we-serve', '/about', '/insights', '/book-a-diagnosis', ...slugs.map((s) => `/insights/${s}`)]
const today = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((r) => `  <url><loc>${base}${r}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}\n</urlset>\n`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
writeFileSync(new URL('../public/robots.txt', import.meta.url), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)
console.log(`sitemap: ${routes.length} urls for ${base}`)
