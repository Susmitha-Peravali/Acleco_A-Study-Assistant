/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        em:      { DEFAULT: '#176B5D', light: '#EBF5F2', mid: 'rgba(23,107,93,0.12)' },
        amber:   { DEFAULT: '#F2A900', light: '#FFF8E6' },
        coral:   { DEFAULT: '#E67E6A', light: 'rgba(230,126,106,0.1)' },
        ivory:   '#F8F6F2',
        charcoal:'#232323',
        success: '#3AA66B',
        error:   '#D64545',
      },
      borderRadius: {
        sm: '12px', md: '16px', lg: '20px', xl: '24px', '2xl': '32px',
      },
    },
  },
  plugins: [],
}
