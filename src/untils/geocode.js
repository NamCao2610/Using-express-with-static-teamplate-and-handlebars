const request = require("request");

const geocode = (address, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibmFtZHpwcm8iLCJhIjoiY2tkdXYydTl4MmQ1bDJycXFkOWJnbWd0OCJ9.H53K_bM51O6Xgf_Nyp2I4A&limit=5`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to map service", undefined);
    } else if (response.body.features.length === 0) {
      callback("Uable to find location . Try another search");
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
