// отдельно роуты логина и регистрации, чтобы не сваливать все в app.js
const router = require('express').Router();
const login = require('../controllers/login');
const { createUser } = require('../controllers/users');
const {
  validateSignUp,
  validateSignIn,
} = require('../middlewares/validator');

router.post('/signup', validateSignUp, createUser);

router.post('/signin', validateSignIn, login);

module.exports = router;
