const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret ABC', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        // console.log({decodedToken})
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log('req.cookies.jwt not found in checkUser function');
  }

  if (token) {
    jwt.verify(token, 'net ninja secret ABC', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        res.status(400).send('Not verified - failed in auth.middleware.js > checkuser');
      } else {
        // console.log({ decodedToken });
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
