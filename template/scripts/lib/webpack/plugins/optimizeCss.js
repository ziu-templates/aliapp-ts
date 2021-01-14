const {envComp} = require('../../utils'),
  OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function(suffix) {
  return [new OptimizeCSSAssetsPlugin(envComp('development') ? {} : {
    assetNameRegExp: new RegExp(`\.${suffix}$`, 'g'),
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['miniapp', { discardComments: { removeAll: true } }],
    },
    canPrint: true
  })];
};
