import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'

interface Seo { title: string; description: string; jsonLd?: Record<string, unknown> }

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', content)
}

/** Page-level SEO: title, description, canonical, Open Graph, Twitter and optional JSON-LD. */
export function useSeo({ title, description, jsonLd }: Seo) {
  const { pathname } = useLocation()
  useEffect(() => {
    const full = pathname === '/' ? `${site.name} | ${site.tagline}` : `${title} | ${site.name}`
    document.title = full
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)
    if (site.url) {
      const url = site.url.replace(/\/$/, '') + pathname
      setMeta('property', 'og:url', url)
      setMeta('property', 'og:image', site.url.replace(/\/$/, '') + '/og-image.png')
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
      link.href = url
    }
    const old = document.getElementById('page-jsonld')
    old?.remove()
    if (jsonLd) {
      const s = document.createElement('script')
      s.type = 'application/ld+json'; s.id = 'page-jsonld'; s.text = JSON.stringify(jsonLd)
      document.head.appendChild(s)
    }
  }, [title, description, pathname, jsonLd])
}
