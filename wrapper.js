const index = require('./index');

const event = {
  "version": "0",
  "id": "89d1a02d-5ec7-412e-82f5-13505f849b41",
  "detail-type": "Scheduled Event",
  "source": "aws.events",
  "account": "123456789012",
  "time": "2017-10-08T11:01:00Z",
  "region": "eu-west-1",
  "resources": [
    "arn:aws:events:us-east-1:123456789012:rule/SampleRule"
  ],
  "detail": {}
};

process.env.ALREADY_BOOKED_MESSAGE = "will have to cancel your pending booking or wait until";
process.env.SUCCESSFULLY_BOOKED_MESSAGE = "Booking Request SUCCESSFUL"
process.env.URL_PREFIX = "https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr";

process.env.PASSWORD_PACINIG = "lol";
process.env.PASSWORD_BRINIZ = "you";
process.env.PASSWORD_GATTIA = "wish";

console.log("----------------------");
console.log("| Result from server |");
console.log("----------------------\n");
index.handler(event, null, function (error, res) {
  if (error) {
    console.error(error);
  } else {
    console.log("\n\n" + JSON.stringify(res) + "\n");
  }
  console.log("\n----------------------");
  console.log("|     End result     |");
  console.log("----------------------");
});