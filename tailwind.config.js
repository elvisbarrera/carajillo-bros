/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 10% accent — creamy espresso-foam beige
        beige: {
          DEFAULT: '#E8D5B7',
          light:   '#F2E8D5',
          dark:    '#C9B48A',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"Courier Prime"', 'monospace'],
        cormorant: ['"Cormorant"', 'serif'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':       'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-up-slow':  'fadeUp 1s cubic-bezier(0.16,1,0.3,1) forwards',
        'flicker':       'flicker 3s ease-in-out infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'line-grow':     'lineGrow 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'pop-in':        'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'ingredient-in': 'ingredientIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-soft':    'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.65' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        lineGrow: {
          '0%':   { transform: 'scaleX(0)', opacity: '0' },
          '100%': { transform: 'scaleX(1)', opacity: '1' },
        },
        popIn: {
          '0%':   { opacity: '0', transform: 'scale(0.7)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        ingredientIn: {
          '0%':   { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
