const users = require('./users');
const times = require('./times');
const rooms = require('./rooms');

let getUsers = () => {
  return users.statuses();
};

let findNextTimesForUsers = (users) => {
  console.log('findNextTimesForUsers');
  console.log(JSON.stringify(users));
  return times.nextTimesForUsers(users);
};

let bookRoomsForUsersWithTimes = (usersWithTimes) => {
  console.log('bookRoomsForUsersWithTimes');
  console.log(JSON.stringify(usersWithTimes));
  return rooms.bookForUsersWithTimes(usersWithTimes);
};

exports.handler = (event, context, callback) => {
  getUsers()
    .then(users => findNextTimesForUsers(users))
    .then(timesForUsers => bookRoomsForUsersWithTimes(timesForUsers))
    .then(result => { 
      console.log('Result');
      console.log(JSON.stringify(result));
      callback(null, result)
    })
    .catch(err => callback(err));
};
