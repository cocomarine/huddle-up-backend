const express = require('express');
const eventController = require('../controllers/event');

const eventRouter = express.Router();

eventRouter.post('/', eventController.createEvent);
eventRouter.get('/', eventController.getAllEvents);
eventRouter.get('/:id', eventController.getEventById);
eventRouter.patch('/:id', eventController.updateEventById);
eventRouter.delete('/:id', eventController.deleteEventById);

eventRouter.get('/:id/votes', eventController.getEventVotesById);

module.exports = eventRouter;
