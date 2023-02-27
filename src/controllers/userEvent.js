const { createEntry, getAllEntry, getEntryById, updateEntryById, deleteEntryById } = require('./helpers');

const createUserEvent = (req, res) => createEntry(res, 'userEvent', req.body);
const getAllUserEvents = (_, res) => getAllEntry(res, 'userEvent');
const getUserEventById = (req, res) => getEntryById(res, 'userEvent', req.params.id);
const updateUserEventById = (req, res) => updateEntryById(res, 'userEvent', req.body, req.params.id);
const deleteUserEventById = (req, res) => deleteEntryById(res, 'userEvent', req.params.id);

module.exports = { createUserEvent, getAllUserEvents, getUserEventById, updateUserEventById, deleteUserEventById };
