const path = require('path'),
  eslintFriendiyFormatter = require('eslint-friendly-formatter');

module.exports = function(suffix) {
  const reg = new RegExp(`\\.${suffix}$`);
  return suffix ? [{
    test: reg,
    use: {
      loader: 'eslint-loader',
      options: {
        formatter: eslintFriendiyFormatter,
        emitWarning: true,
      },
    },
    enforce: 'pre',
    include: [path.join(process.cwd(), 'src')],
  }] : [];
};
