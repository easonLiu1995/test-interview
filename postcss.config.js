const tailwindcss = require('tailwindcss')

module.exports = {
  map: process.env.NODE_ENV === 'development',
  plugins: ['postcss-preset-env', tailwindcss]
}
