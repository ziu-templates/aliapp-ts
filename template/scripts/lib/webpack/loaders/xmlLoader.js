const {envComp} = require('../../utils'),
  miniJsLoader = require('./miniJsLoader');

module.exports = function(suffix) {
  const reg = new RegExp(`\\.${suffix}$`);
  return suffix ? [{
    test: reg,
    use: [{
      loader: 'mini-xml-loader',
      options: {
        filename: `[name].${suffix}`,
        minimize: envComp('production'),
        fallback: miniJsLoader('js')[0] || null,
      },
    }],
  }] : [];
};
