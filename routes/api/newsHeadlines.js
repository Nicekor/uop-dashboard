const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/**
 * Sends a response in an array with the news headlines obtained from an api
 * through a route
 * @query {String} country - country code, e.g. gb or us
 * @query {Int} pageSize - quantity of news
 * @query {String} category - Category is undefined for default, the admin can change it later if desired
 * @query {String} apiKey
 * @param {Object} req - The HTTP request
 * @param {Object} res - To send back the desired HTTP response
 */
router.get('/', async function(req, res) {
  try {
    let url = `https://newsapi.org/v2/top-headlines?country=${req.query.country}&pageSize=${req.query.pageSize}&apiKey=${process.env.NEWS_API_KEY}`;
    if (req.query.category) {
      url = `https://newsapi.org/v2/top-headlines?country=${req.query.country}&pageSize=${req.query.pageSize}&category=${req.query.category}&apiKey=${process.env.NEWS_API_KEY}`;
    }
    const response = await fetch(url);
    const data = await response.json();

    let newsHeadlines = [];
    for (let i = 0; i < data.articles.length; i++) {
      newsHeadlines.push(data.articles[i].title);
    }

    res.send(newsHeadlines);
  } catch (e) {
    error(res, e);
  }
});

module.exports = router;
