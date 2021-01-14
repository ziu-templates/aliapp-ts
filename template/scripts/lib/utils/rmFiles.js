/**
 * 删除文件
 */
const rm = require('rimraf');

module.exports = function(url, cb = () => {
}) {
  rm(url, {
      glob: true
    }, function(err) {
      if (err) {
        throw err;
      }
      cb();
    }
  );
};
