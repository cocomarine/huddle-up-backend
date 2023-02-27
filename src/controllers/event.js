const { createEntry, getAllEntry, getEntryById, updateEntryById, deleteEntryById } = require('./helpers');

const createEvent = (req, res) => createEntry(res, 'event', req.body);
const getAllEvents = (_, res) => getAllEntry(res, 'event');
const getEventById = (req, res) => getEntryById(res, 'event', req.params.id);
const updateEventById = (req, res) => updateEntryById(res, 'event', req.body, req.params.id);
const deleteEventById = (req, res) => deleteEntryById(res, 'event', req.params.id);

module.exports = { createEvent, getAllEvents, getEventById, updateEventById, deleteEventById };
