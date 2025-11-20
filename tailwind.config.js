/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9', // Ocean Blue
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        slate: {
          850: '#1e293b', // Custom dark slate
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        serif: ['"Merriweather"', 'serif'],
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'world-map': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIj48ZyBmaWxsPSIjY2JkNWhlIiBmaWxsLW9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgMGg4MDB2NDAwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE1MCAxNTBjMTAgMCAyMCAyMCAzMCAxMHMyMC0zMCAxMC00MC0yMC0xMC0zMCAxMC0yMCAyMC0xMCAyMHoiLz48L2c+PC9zdmc+')", // Simple placeholder pattern
      }
    },
  },
  plugins: [],
}