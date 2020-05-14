const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {

  try {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token) {
    jwt.verify(token, secrets.jwt_secret, (err, decodedToken) => {
      if (err) {
        throw new Error(err)
        res.status(401).json({message: 'bad auth'})
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    throw new Error()
    res.status(401).json({message: 'bad auth'})
  }
} catch (err) {
  res.status(401).json({message: 'bad auth'})
}
};
