module.exports = {
  plugins: [
    require('autoprefixer')({
      grid: true,
      overrideBrowserslist: ['> 1%', 'last 5 versions', 'Firefox >= 45', 'ios >= 7', 'ie >= 10'],
    }),
  ],
};
