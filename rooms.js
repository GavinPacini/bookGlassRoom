const request = require('./request');
const maxHourForBooking = require('./properties').maxHourForBooking;

exports.bookForUsersWithTimes = (users) => {
  let promises = [];

  users.forEach((user) => {
    promises.push(new Promise((resolve, reject) => {
      let form = {
        StartTime: undefined,
        EndTime: undefined,
        Fullname: undefined,
        Status: "bscis4",
        StartDate: undefined,
        StartMonth: undefined,
        StartYear: 1
      };

      form.StartTime = user.dateToBook.hour() + 1;
      form.EndTime = form.StartTime + maxHourForBooking;
      form.Fullname = user.name;
      form.StartDate = user.dateToBook.date();
      form.StartMonth = user.dateToBook.month() + 1;

      request.bookRoom(0, user.auth, form, (err, result) => {
        if (err) {
          reject(err);
        }
  
        resolve(result);
      });
    }));
  });

  return Promise.all(promises.map(p => p.catch(e => e)));
};