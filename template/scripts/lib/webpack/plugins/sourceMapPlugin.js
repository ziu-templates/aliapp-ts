const webpack = require('webpack');

module.exports = function(useSourceMap = true) {
  return useSourceMap ? [new webpack.SourceMapDevToolPlugin({
    filename: '[name].js.map',
  })] : [];
};
