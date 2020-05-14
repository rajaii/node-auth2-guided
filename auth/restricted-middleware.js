const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {

  try {
    console.log(req.headers.authorization)
    //const token = req.headers.authorization.split(' ')[1];
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwt_secret, (err, decodedToken) => {
      if (err) {
        console.log(err)
        throw new Error(err)
        res.status(401).json({message: 'bad auth'})
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    
    
    res.status(401).json({message: 'bad auth'})
  }
} catch (err) {
  console.log(err)
  res.status(401).json({message: 'bad auth'})
}
};
