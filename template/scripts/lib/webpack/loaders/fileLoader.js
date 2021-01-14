module.exports = function() {
  return {
    limit: 1,
    context: 'src',
    name: '[path][name].[ext]',
    publicPath(url) {
      return '/' + url;
    },
  };
};