const moment = require('moment');
const dates = require('./properties').dates;

exports.nextTimesForUsers = (users) => {
  return new Promise((resolve, reject) => {
    let currentTime = moment();
    let currentDay = currentTime.day();
    let currentHour = currentTime.hour();

    let repeatingDates = dates.concat(dates);

    let nextThreeTimesIndex = repeatingDates.findIndex(date => (currentDay < date.day) || (currentDay == date.day && currentHour <= date.hour));
    let nextThreeTimes = repeatingDates.slice(nextThreeTimesIndex, nextThreeTimesIndex + 3);

    let newDates = nextThreeTimes.map(date => moment().day(date.day).hour(date.hour).minute(0).second(0).millisecond(0));

    for (let i = 0; i < newDates.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if(!users[j].delete && !newDates[i].delete && newDates[i].isSame(users[j].nextBookingDate)) {
          users[j].delete = true;
          newDates[i].delete = true;
          break;
        }
      }
    }

    newDates = newDates.filter((date) => !date.delete).reverse();
    users = users.filter((user) =>typeof user.nextBookingDate === 'undefined' && typeof user.delete === 'undefined');

    if(users.length <= 0){
      reject(new Error('No available users.'));
    }
    
    for (let i = 0; i < users.length; i++) {
      users[i].dateToBook = newDates.pop();
    };

    resolve(users);
  });
};