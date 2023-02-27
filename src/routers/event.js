const express = require('express');
const eventController = require('../controllers/event');

const eventRouter = express.Router();

eventRouter.post('/', eventController.createEvent);
eventRouter.get('/', eventController.getAllEvents);

module.exports = eventRouter;
