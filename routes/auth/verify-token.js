const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader != 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.body.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
