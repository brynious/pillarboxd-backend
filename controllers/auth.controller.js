const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = err => {
  // console.log(err.message, err.code);
  let errors = { username: '', email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registered';
    return errors;
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'that password is incorrect';
    return errors;
  }

  // duplicate username error code
  if (err.code === 11000 && Object.keys(err.keyValue)[0] === 'username') {
    errors.username = 'that username is already taken';
    return errors;
  }

  // duplicate email error code
  if (err.code === 11000 && Object.keys(err.keyValue)[0] === 'email') {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }

  console.log("Error in auth.controller function that wasn't able to be handled by handleErrors");
  console.log({ err });
};

const maxAge = 60 * 60 * 24 * 3;
const createToken = id => {
  return jwt.sign({ id }, 'net ninja secret ABC', { expiresIn: maxAge });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
};

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.signup_post = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, SameSite: 'None', Secure });
    res.status(201).json({ userID: user._id, username: user.username, email: user.email });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, SameSite: 'None', Secure });
    res.status(200).json({ userID: user._id, username: user.username, email: user.email });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }).json({ authorisation: 'logged out' });
};
