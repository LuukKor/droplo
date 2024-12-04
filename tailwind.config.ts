import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          200: '#EAECF0',
          300: '#D0D5DD',
          400: '#667085',
          500: '#475467',
          600: '#344054',
          700: '#101828',
        },
        violet: {
          300: '#D6BBFB',
          400: '#7F56D9',
          500: '#6941C6',
        },
      },
      boxShadow: {
        sm: ' 1px 2px  #1018280D',
      },
    },
  },
  plugins: [],
} satisfies Config;
