const express = require('express');
const userController = require('../controllers/user');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getAllUsers);

module.exports = userRouter;
