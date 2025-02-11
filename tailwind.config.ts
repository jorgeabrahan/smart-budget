import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        night: {
          900: '#0A0A0A',
          DEFAULT: '#141414',
          700: '#1F1F1F',
          600: '#292929'
        },
        'steel-blue': {
          DEFAULT: '#2380BE',
          700: '#268BCF',
          600: '#3095D9',
          500: '#419EDC'
        }
      }
    }
  },
  plugins: []
} satisfies Config
