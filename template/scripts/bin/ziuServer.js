
const minimist = require('minimist'),
  conf = require('../etc'),
  argv = minimist(process.argv.slice(2)),
  PRJ_ENV = argv._[0] || 'production',
  bundleAnalyzerReport = argv.report || (argv.r || false);

if (!conf.envList[PRJ_ENV]) {
  throw new Error(`Not Support ${PRJ_ENV} env!`);
  process.exit(1);
}
process.env.NODE_ENV = 'production';

if (PRJ_ENV === 'development') {
  process.env.NODE_ENV = PRJ_ENV;
}
process.env.PRJ_ENV = PRJ_ENV;

if (bundleAnalyzerReport) {
  process.env.bundleAnalyzerReport = bundleAnalyzerReport;
}

const build = require('./build');

build();
