module.exports = {
  darkMode: 'class', // false or 'media' or 'class'
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    mode: 'all',
    options: {
      safelist: ['dark', 'hover'],
      keyframes: false,
    },
    content: [
      './public/**/*.ts',
      './src/**/*.njk',
    ],
  },
};
