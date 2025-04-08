/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-light': '#FAF9FB',
        'gray-light': '#727272',
        'gray-dark': '#2E2E2E',
        'primary': '#DB8B8A',
      },
    },
  },
  plugins: [],
} 