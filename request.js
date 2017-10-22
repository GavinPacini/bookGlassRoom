const request = require('request-promise-native');
const moment = require('moment');
const validRooms = require('./properties').validRooms;

exports.statusForUser = (user) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: process.env.URL_PREFIX + validRooms[0] + ".request.pl",
      headers: {
        'Authorization': user.auth
      }
    };

    request.get(options)
      .then((body) => {
        let alreadyBooked = body.includes(process.env.ALREADY_BOOKED_MESSAGE);
        if (alreadyBooked) {
          let date = body.match(/\d{1,2}\/\d{1,2}\/\d{4}/)[0];
          let time = body.match(/\d{1,2}\:\d{1,2}/)[0];

          let dateAndTime = date + " " + time;
          user.nextBookingDate = moment(dateAndTime, "DD/MM/YYYY HH:mm");
        }

        resolve(user);
      })
      .catch((err) => resolve());
  });
};

let bookRoom = (roomNumber, auth, formData, cb) => {
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
      return bookRoom(roomNumber + 1, auth, formData, cb);
    }

    if (response.statusCode == 200) {
      let booked = body.includes(process.env.SUCCESSFULLY_BOOKED_MESSAGE);
      if (booked) {
        return cb(null, 'success');
      }
    }

    return bookRoom(roomNumber + 1, auth, formData, cb);
  });
};
exports.bookRoom = bookRoom;