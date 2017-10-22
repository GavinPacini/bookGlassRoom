const users = require('./properties').users;
const request = require('./request');

let createAuthForUser = (username) => {
  let password = process.env["PASSWORD_" + username.toUpperCase()];
  return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
};

exports.statuses = () => {
  let promises = [];
  users.forEach((user) => {
    user.auth = createAuthForUser(user.username);
    promises.push(request.statusForUser(user));
  });

  return Promise.all(promises).then((users) => {
    users = users.filter((value) => value != null); 
    if (users.length > 0) {
      return users;
    } else {
      throw new Error('No available users.');
    }
  });

};