const properties = require('./properties');

exports.createAuthForUser = (username) => {
  const password = 'lol'; // Replace with call to KMS
  return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
};