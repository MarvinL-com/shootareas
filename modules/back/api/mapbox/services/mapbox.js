'use strict';
/**
 * `mapbox` service.
 */
const geocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const client = geocoding({accessToken: process.env.MAPBOX_TOKEN})


module.exports = {
  find: (name) => client.forwardGeocode({
    query: name,
  }).send()
};
