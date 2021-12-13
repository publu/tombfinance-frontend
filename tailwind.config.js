module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: '#6dffbf',
        'tomb-purple': '#9685ff',
        'bright-purple': '#9401FB',
        'dark-purple': '#16002c',
        bgColor: '#16072B',
        metaMask: '#FF7940',
        walletConnect: '#42BBFF',
      },
      fontFamily: {
        Amarante: ['Amarante', 'cursive'],
        Poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        tombGradient: 'linear-gradient(225deg, #A839FF, rgba(16, 0, 61, 1) 107.31%)',
        disabledGradient: 'linear-gradient(225deg, #A9A9A9, rgba(16, 0, 61, 1) 107.31%)',
        tombBackground: 'linear-gradient(360deg, rgba(30, 0, 56, 1), #16002c)',
      },
      borderWidth: {
        1: '1px',
      },
      width: {
        140: '44rem',
      },
      minWidth: { 140: '44rem' },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
