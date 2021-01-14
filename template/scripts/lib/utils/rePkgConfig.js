const merge = require('lodash.merge'),
  { prjEnvComp } = require('./envCompare'),
  envData = require('../envData/getEnvData'),
  distPkg = require('../../etc/project.config');
module.exports = function(content = '{}') {
  let appid = '';
  try {
    appid = JSON.parse(envData || '{}').APP_ID || '';
    content = JSON.stringify(merge(JSON.parse(content), appid ? { appid } : ''));
  } catch (e) {
    console.error(e);
  }
  if (prjEnvComp('development')) {
    return content;
  }
  let pkgConf = '';
  try {
    pkgConf = JSON.stringify(merge(JSON.parse(content), distPkg));
  } catch (e) {
    throw e;
  }
  return pkgConf;
}