const express = require('express');
const userEventController = require('../controllers/userEvent');

const userEventRouter = express.Router();

userEventRouter.post('/', userEventController.createUserEvent);
userEventRouter.get('/', userEventController.getAllUserEvents);
userEventRouter.get('/:id', userEventController.getUserEventById);
userEventRouter.patch('/:id', userEventController.updateUserEventById);
userEventRouter.delete('/:id', userEventController.deleteUserEventById);

module.exports = userEventRouter;