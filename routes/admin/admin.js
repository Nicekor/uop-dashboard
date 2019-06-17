const express = require('express');
const router = express.Router();
const db = require('../../models/mysql');
const jwt = require('jsonwebtoken');

router.post('/', async function(req,res) {
  try {
    const user = await db.getUserDataByUsername(req.body.username);
    if (user.length < 1) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    if (req.body.password === user[0].pass) {
      const token = jwt.sign({
        username: user[0].user_name,
        userId: user[0].id
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h'
        }
      );
      return res.status(200).json({
        message: 'Auth successful',
        token: token
      });
    } else {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
  } catch (e) {
    error(res, e);
  }
});

module.exports = router;
