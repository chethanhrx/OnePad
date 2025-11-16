// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          base: '#0D0D0F',
        },
        sunrise: {
          from: '#A968FF',
          via: '#FF6F8F',
          to: '#FF914D'
        }
      },
      backgroundImage: {
        'sunrise': 'linear-gradient(135deg, #A968FF 0%, #FF6F8F 50%, #FF914D 100%)',
      }
    },
  },
  plugins: [],
}