'use strict'

const path = require('path');

module.exports.mysql = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  charset: 'UTF8MB4',
  database: 'dashboard',
};

module.exports.webpages = path.join(__dirname, '../public/');
