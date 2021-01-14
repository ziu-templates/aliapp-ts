const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(cssSuffix = 'css') {
  return {
    test: new RegExp(`\.(scss|sass|${cssSuffix})$`),
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: `css-loader`,
        options: {
          importLoaders: 1,
        },
      },
      'sass-loader',
    ],
  };
};
