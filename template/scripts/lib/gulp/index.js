const gulp = require('gulp'),
  cp = require('cp'),
  exists = require('fs').existsSync,
  path = require('path'),
  conf = require('../../etc'),
  codePath = conf[process.env.PRJ_ENV].codePath,
  entryHash = require('../utils/entryHash'),
  { getEntry } = require('miniapp-auto-webpack-plugin');


module.exports = function({ compiler, watchFn }) {
  const scope = this;
  if (!watchFn) {
    throw new Error('Compiler not start;');
  }
  scope.webpackWatcher = watchFn();
  let { entry } = getEntry({
      xmlSuffix: conf.xmlSuffix,
      cssSuffix: conf.cssSuffix,
      compileCssSuffix: conf.compileCssSuffix,
      jsSuffix: conf.jsSuffix,
      autoImportAppConfigPath: conf.autoImportAppConfigPath,
    }),
    hashVal = entryHash(entry);
  scope.jsonWatcher = gulp.watch('src/**/*.json');
  scope.jsonWatcher.on('change', reWatch);
  scope.jsonWatcher.on('add', reWatch);
  scope.jsonWatcher.on('unlink', reWatch);

  function reWatch() {
    let curHashVal = entryHash(getEntry({
      xmlSuffix: conf.xmlSuffix,
      cssSuffix: conf.compileCssSuffix,
      autoImportAppConfigPath: conf.autoImportAppConfigPath,
    }).entry);
    if (hashVal === curHashVal) {
      return false;
    }
    hashVal = curHashVal;
    if (scope.webpackWatcher) {
      cpProjectConfig();
      scope.webpackWatcher.close(() => {
        console.log('Entry File changed!');
        setTimeout(() => {
          scope.webpackWatcher = watchFn();
        }, 100);
      });
      scope.webpackWatcher = null;
    }
  }

  function cpProjectConfig() {
    const prjConfig = path.join(codePath, 'project.config.json');
    if (exists(prjConfig)) {
      cp.sync(prjConfig, 'src/project.config.json');
    }
  }
}
