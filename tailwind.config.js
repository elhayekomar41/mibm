/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050807',
        night: '#0A100D',
        deep: '#0B3D2E',
        emerald: '#1FAF6B',
        mint: '#5CF2A0',
        signal: '#F4F7F5',
        mute: '#8FA098',
        line: 'rgba(92,242,160,0.16)',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', 'Inter', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.035em' },
      maxWidth: { page: '1360px' },
    },
  },
  plugins: [],
}
