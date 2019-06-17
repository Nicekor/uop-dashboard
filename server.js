'use strict'

const express = require('express');
require('dotenv').config();
const app = express();
const config = require('./models/config');
const bodyParser  = require('body-parser');

// start the server
app.listen(8080, (err) => {
  if (err) console.error('error starting server', err);
  else console.log('Server running');
});

// logging
app.use('/', (req, res, next) => { console.log(new Date(), req.method, req.url); next(); });

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
const locationAddressRouter = require('./routes/api/locationAddress');
const newsHeadlinesRouter = require('./routes/api/newsHeadlines')
const adminRouter = require('./routes/admin/admin');
const checkTokenRouter = require('./routes/api/checkToken');
const settingsRouter = require('./routes/api/settings');

// static files
app.use('/', express.static(config.webpages));

// api
app.use('/api/locationAddress', locationAddressRouter);
app.use('/api/newsHeadlines', newsHeadlinesRouter);
app.use('/api/checkToken', checkTokenRouter);
app.use('/api/settings', settingsRouter);

// auth
app.use('/admin', adminRouter);
