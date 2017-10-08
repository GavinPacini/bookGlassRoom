const request = require('request-promise-native');
const auth = require('./auth');
const properties = require('./properties');
const validRooms = properties.validRooms;

exports.statuses = (cb) => {
  let promises = [];
  properties.users.forEach((value) => {
    let authValue = auth.createAuthForUser(value.username);
    promises.push(statusForAuth(value, authValue));
  });

  return Promise.all(promises).then((users) => {
    users = users.filter((value) => value != null); 
    if (users.length > 0) {
      cb(null, users);
    } else {
      cb(new Error('No available users.'));
    }
  }).catch((err) => {
    cb(err);
  });
};

let statusForAuth = (user, auth) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: process.env.URL_PREFIX + validRooms[0] + ".request.pl",
      headers: {
        'Authorization': auth
      }
    };

    request.get(options)
      .then((body) => {
        let alreadyBooked = body.includes(process.env.ALREADY_BOOKED_MESSAGE);
        if (!alreadyBooked) {
          resolve({ user: user, auth: auth });
        } else {
          resolve();
        }
      })
      .catch((err) => {
        resolve();
      });
  });
};

let makeRequest = (roomNumber, auth, formData, cb) => {
  if (roomNumber > validRooms.length) {
    // TODO: Notify on slack, no rooms available
    return cb(new Error('NO ROOMS AVAILABLE!'));
  }

  const options = {
    url: process.env.URL_PREFIX + validRooms[roomNumber] + ".request.pl",
    headers: {
      'Authorization': auth
    },
    form: formData
  };

  request.post(options, function (error, response, body) {
    if (error) {
      return makeRequest(roomNumber + 1, auth, formData, cb);
    }

    if (response.statusCode == 200) {
      let booked = body.includes(process.env.SUCCESSFULLY_BOOKED_MESSAGE);
      if (booked) {
        return cb(null, 'success');
      }
    }

    return makeRequest(roomNumber + 1, auth, formData, cb);
  });
};
exports.makeRequest = makeRequest;