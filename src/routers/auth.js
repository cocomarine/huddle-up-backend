const express = require('express');
const { verifySignUp } = require('../middleware');
const authController = require('../controllers/auth');

const authRouter = express.Router();

// full route: http://localhost:4000/api/auth
authRouter.post('/signup', authController.signup);

authRouter.post('/signin', authController.signin);

module.exports = authRouter;