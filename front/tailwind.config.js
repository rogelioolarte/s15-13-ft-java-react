/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
export default withMT({
  content: ['./index.html', './src/**'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFF8F8',
          20: '#FFF8F820',
          40: '#FFF8F840',
          60: '#FFF8F860',
          80: '#FFF8F880',
          90: '#FFF8F890'
        },
        secondary: {
          DEFAULT: '#2E90FA',
          20: '#2E90FA20',
          40: '#2E90FA40',
          60: '#2E90FA60',
          80: '#2E90FA80',
          90: '#2E90FA90'
        },
        warning: {
          DEFAULT: '#FBB03B',
          20: '#FBB03B20',
          40: '#FBB03B40',
          60: '#FBB03B60',
          80: '#FBB03B80',
          90: '#FBB03B90'
        }
      }
    }
  },
  plugins: []
})
