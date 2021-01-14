const webpack = require('webpack'),
  envData = require('../../envData/getEnvData');

module.exports = function() {
  return new webpack.DefinePlugin({
    'process.env.outData': envData,
    'process.env.ENV_DATA': envData,
  });
};
