module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      '3xl':{'max':'2000px'},

      '2xl': {'max': '1535px'},

      'xl': {'max': '1300px'},

      'lg': {'max': '1080px'},

      'md': {'max': '767px'},

      'sm': {'max': '500px'},
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
