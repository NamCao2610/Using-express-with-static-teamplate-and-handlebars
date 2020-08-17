const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1cfdba09cc1d6dffe03bd686a480bb89&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback(response.body.error.info, undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          " It is currently " +
          response.body.current.temperature +
          " degress out .It feels like " +
          response.body.current.feelslike +
          " degress out . The humidity " +
          response.body.current.humidity +
          "%."
      );
    }
  });
};

module.exports = forecast;
