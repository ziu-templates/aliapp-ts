
const crypto = require('crypto');

module.exports = function(entry = {}) {
  return crypto.createHash('md5').update(JSON.stringify(entry)).digest('base64');
};
