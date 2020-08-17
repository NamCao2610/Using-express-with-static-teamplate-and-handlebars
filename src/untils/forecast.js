const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/76733e9c3ca293ed6de639d3d5bf874f/${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to forecast", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        response.body.daily.data[0].summary +
          " .It is currently " +
          response.body.currently.temperature +
          " degress out. There is a " +
          response.body.currently.precipProbability +
          " % chance of rain"
      );
    }
  });
};

module.exports = forecast;
