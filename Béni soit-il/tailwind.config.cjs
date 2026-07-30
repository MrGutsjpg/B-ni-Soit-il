module.exports = {
  content: [
    './src/**/*.{astro,html,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C1121F',
        'primary-dark': '#8A0F18',
        accent: '#111111',
        muted: '#F4F4F4'
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
