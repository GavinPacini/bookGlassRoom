const users = require('./users');
const times = require('./times');
const rooms = require('./rooms');

let getUsers = () => {
  return users.statuses();
};

let findNextTimesForUsers = (users) => {
  return times.nextTimesForUsers(users);
};

let bookRoomsForUsersWithTimes = (usersWithTimes) => {
  return rooms.bookForUsersWithTimes(usersWithTimes);
};

exports.handler = (event, context, callback) => {
  getUsers()
    .then(users => findNextTimesForUsers(users))
    .then(timesForUsers => bookRoomsForUsersWithTimes(timesForUsers))
    .then(result => callback(null, result))
    .catch(err => callback(err));
};
