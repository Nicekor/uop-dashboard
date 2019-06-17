const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/**
 * Sends a response in json with the city, country and country code obtained from an api
 * and the current latitude and longitude of the user through a route
 * @query {Double} lat - latitude of a geographical position
 * @query {Double} long - longitude of a geographical position
 * @param {Object} req - The HTTP request
 * @param {Object} res - To send back the desired HTTP response
 */
router.get('/', async function(req, res) {
  try {
    let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${req.query.lat}&lon=${req.query.long}`;
    const response = await fetch(url);
    const data = await response.json();

    let locationAddress = {};
    locationAddress.village = data.address.village;
    locationAddress.city = data.address.city;
    locationAddress.country = data.address.country;
    locationAddress.countryCode = data.address.country_code;

    res.json(locationAddress);
  } catch (e) {
    error(res, e);
  }
});

module.exports = router;
