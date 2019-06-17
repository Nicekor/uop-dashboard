const express = require('express');
const router = express.Router();
const verifyToken = require('../auth/verify-token');
const jwt = require('jsonwebtoken');

router.post('/', function (req, res) {
  jwt.verify(req.body.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.json({
        authData
      });
    }
  });
});

module.exports = router;
