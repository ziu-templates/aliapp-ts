/**
 * 构建
 */

const webpack = require('webpack'),
  ora = require('ora'),
  baseConfig = require('./webpack/webpack.base.config');

/**
 * [compiler 初始化webpack配置]
 */
let compiler = null,
  spinner = null;

process.on('SIGINT', () => {
  if (spinner && typeof spinner.stop === 'function') {
    spinner.stop();
    console.log('终止批处理操作吗(Y/N)? ');
  }
});
module.exports = {
  compiler,
  /**
   * [启动编译]
   */
  runCompile(cb = () => {
  }) {
    spinner = ora('Compiling Start....').start();
    spinner.color = 'yellow';
    compiler = webpack(baseConfig());
    compiler.run((err) => {
      if (spinner && typeof spinner.stop === 'function') {
        spinner.stop();
        spinner = null;
      }
      if (err) {
        throw err;
      }
      cb();
    });
    return true;
  },
  /**
   * [监听改变]
   */
  watch() {
    spinner = ora('Watching Compile Start....').start();
    spinner.color = 'yellow';
    compiler = webpack(baseConfig());
    return compiler.watch({
      aggregateTimeout: 300,
      poll: 1000
    }, (err, stats) => {
      if (spinner && typeof spinner.stop === 'function') {
        spinner.stop();
        spinner = null;
      }
      if (err) {
        throw err;
      }
      console.log('Compilation success! Watching...\n');
    });
  }
};