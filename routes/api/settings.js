const express = require('express');
const router = express.Router();
const db = require('../../models/mysql');
const verifyToken = require('../auth/verify-token');
const jwt = require('jsonwebtoken');

router.get('/', async function(req, res) {
  const settings = await db.getSettings();
  res.json(settings);
});

router.post('/', verifyToken, function(req, res) {
  jwt.verify(req.body.token, process.env.JWT_KEY, async (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      await db.setSetting(req.body.setting, req.body.value);
      res.json('Setting changed successfully');
    }
  });
});

router.delete('/', verifyToken, function(req, res) {
  jwt.verify(req.body.token, process.env.JWT_KEY, async (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      await db.resetSettings();
      res.json('Settings resetted successfully');
    }
  });
})

module.exports = router;
