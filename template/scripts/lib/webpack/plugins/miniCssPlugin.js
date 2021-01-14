const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(suffix) {
  return suffix ? [new MiniCssExtractPlugin({
    filename: `[name].${suffix}`,
  })] : [];
};
