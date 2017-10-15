const request = require('./request');
const properties = require('./properties');

const maxTime = 2;

const dates = {
  "0" : { //sun
    "14" : {
      day: 3,
      time: 18
    },
    "16" : {
      day: 6,
      time: 12
    },
    "18" : {
      day: 6,
      time: 14
    },
  },
  "3" : { //wed
    "20" : {
      day: 6,
      time: 16
    }
  },
  "6" : { //sat
    "14" : {
      day: 0,
      time: 12
    },
    "16" : {
      day: 0,
      time: 14
    },
    "18" : {
      day: 0,
      time: 16
    },
  }
}

const form = {
  StartTime: undefined,
  EndTime: undefined,
  Fullname: undefined,
  Status: "bscis4",
  StartDate: undefined,
  StartMonth: undefined,
  StartYear: 1
};

let getNextDayOfWeek = (date, dayOfWeek) => {
  const resultDate = new Date(date.getTime());
  resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
  return resultDate;
};

exports.handler = (event, context, callback) => {
  let date = new Date();
  let dayProperties = dates[date.getDay()][date.getHours()];
  if (dayProperties == null) {
    return callback(new Error('No date settings found.'));
  }

  request.statuses((err, result) => {
    if (err) {
      return callback(err);
    }

    let user = result[0].user;
    let nextDate = getNextDayOfWeek(date, dayProperties.day);

    form.StartTime = dayProperties.time + 1;
    form.EndTime = form.StartTime + maxTime;
    form.Fullname = user.name;
    form.StartDate = nextDate.getDate();
    form.StartMonth = nextDate.getMonth()+1;

    request.makeRequest(0, result[0].auth, form, (err, result) => {
      if (err) {
        return callback(err);
      }

      callback(null, result);
    });
  });
};
