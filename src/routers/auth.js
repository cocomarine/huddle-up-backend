const express = require('express');
const { verifySignUp } = require('../middleware');
const authController = require('../controllers/auth');

const authRouter = express.Router();

// full route: http://localhost:4000/auth
authRouter.post(
  '/signup',
  [verifySignUp.checkDuplicateEmail],
  authController.signup
);

authRouter.post('/signin', authController.signin);

module.exports = authRouter;