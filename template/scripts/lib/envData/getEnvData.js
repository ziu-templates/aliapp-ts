const path = require('path'),
  fs = require('fs'),
  glob = require('glob'),
  YAML = require('yaml'),
  merge = require('lodash/merge');

let version = "";

try {
  version = process.env.npm_package_version;
} catch (e) {
  console.error(e);
}

const envCwd = path.join(process.cwd(), 'config'),
  globConfig = {
    cwd: envCwd,
    root: '/',
  },
  PRJ_ENV = process.env.PRJ_ENV || process.env.NODE_ENV || 'production',
  defaultEnvPath = glob.sync('default.*(yaml|yml)', globConfig)[0] || '';


if (!defaultEnvPath) {
  throw new Error(`config dir must include default.yml or default.yaml`);
}

const defaultEnv = getEnvData(defaultEnvPath, envCwd),
  envFile = glob.sync(`${PRJ_ENV}.*(yaml|yml)`, globConfig)[0] || '',
  env = getEnvData(envFile, envCwd),
  envMergeData = merge({
    PRJ_ENV,
    VERSION: version,
  }, defaultEnv, env);

function getEnvData(url = '', envCwd = process.cwd()) {
  if (!url) {
    return {};
  }
  return YAML.parse(fs.readFileSync(path.join(envCwd, url || ''), 'utf8'));
}

module.exports = JSON.stringify(envMergeData);
