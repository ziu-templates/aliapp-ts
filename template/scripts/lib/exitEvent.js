/**
 * 退出事件
 */
const cp = require('cp'),
  conf = require('../etc'),
  exists = require('fs').existsSync,
  path = require('path'),
  confEnvData = conf[process.env.PRJ_ENV],
  codePath = confEnvData.codePath,
  rmFiles = require('./utils/rmFiles');
module.exports = {
  sigint(pathurl) {
    const scope = this;
    process.on('SIGINT', kill);
    // process.on('SIGHUP', kill);

    function kill() {
      const prjConfig = path.join(codePath, confEnvData.pkgConfigName);
      if (exists(prjConfig)) {
        cp.sync(prjConfig, `src/${confEnvData.pkgConfigName}`);
      }
      if (!scope.webpackWatcher && !scope.jsonWatcher) {
        return rmFiles(pathurl);
      }
      if (scope.webpackWatcher) {
        scope.webpackWatcher.close(() => {
          rmFiles(pathurl);
        });
        scope.webpackWatcher = null;
      }
      if (scope.jsonWatcher) {
        scope.jsonWatcher.close();
        scope.jsonWatcher = null;
      }
      if (scope.allWatcher) {
        scope.allWatcher.close();
        scope.allWatcher = null;
      }
    }
  },
};
