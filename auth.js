const properties = require('./properties');

exports.createAuthForUser = (username) => {
  let password = process.env["PASSWORD_" + username.toUpperCase()];
  return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
};