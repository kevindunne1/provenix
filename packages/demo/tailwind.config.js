/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
        primary: {
          DEFAULT: '#5C6BFF',
          dark: '#3D47B7',
          light: '#EEF0FF',
        },
        // Neutral palette
        neutral: {
          900: '#0F172A',
          700: '#334155',
          500: '#64748B',
          300: '#CBD5E1',
          100: '#F1F5F9',
        },
        // Background
        background: '#FAFAFF',
        // Feedback colors
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'Menlo', 'Monaco', 'monospace'],
      },
      fontSize: {
        'h1': ['3rem', { lineHeight: '1.1', fontWeight: '600' }], // 48px
        'h2': ['2.125rem', { lineHeight: '1.2', fontWeight: '600' }], // 34px
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 24px
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        'code': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
      },
      spacing: {
        'rhythm': '1.5rem', // 24px baseline rhythm
      },
      maxWidth: {
        'container': '80rem', // 1280px
      },
      borderRadius: {
        'card': '0.75rem', // 12px
        'input': '0.625rem', // 10px
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}
