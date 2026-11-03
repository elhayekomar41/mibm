/**
 * Site-wide settings. Edit these values; components read from here.
 *
 * FOUNDER TO CONFIRM (marked TODO):
 * - url: the live domain (used for canonical links, Open Graph and the sitemap)
 * - contact: email and WhatsApp number for booking follow-up
 * - formEndpoint: where diagnosis requests are sent (Formspree, Supabase function, etc.)
 * - legalName: "Muslim Business Management" vs "Muslim Influencers Business Management"
 */
export const site = {
  name: 'MIBM',
  // TODO(founder): confirm the public expansion of the name.
  legalName: 'MIBM | Muslim Business Management',
  category: 'Consulting Agency',
  markets: 'Cairo, Egypt and the GCC',
  tagline: 'You lead the impact. We run the business.',
  support: 'Business management for Muslim entrepreneurs, creators and changemakers.',
  essence: ['Diagnose', 'Fix', 'Grow'],
  // TODO(founder): replace with the live domain, e.g. https://mibm.co
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? '',
  contact: {
    // TODO(founder): add a real inbox. Leave empty to hide email actions.
    email: '',
    // TODO(founder): WhatsApp number in international format without +, e.g. 201000000000
    whatsapp: '',
    instagram: 'https://www.instagram.com/',
  },
  // TODO(founder): a POST endpoint that accepts JSON. Empty = form is not connected yet.
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? '',
}

export const nav = [
  { label: 'What we do', to: '/what-we-do' },
  { label: 'Our method', to: '/our-method' },
  { label: 'Who we serve', to: '/who-we-serve' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
]
