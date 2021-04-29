const autoprefixer = require('autoprefixer')
const tailwind = require('tailwindcss')
const postcssImport = require('postcss-import')

module.exports = {
  plugins: [postcssImport, tailwind]
}
