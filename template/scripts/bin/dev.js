/**
 * 开发环境
 */

process.env.PRJ_ENV = process.env.NODE_ENV = 'development';
const build = require('./build');

build();
