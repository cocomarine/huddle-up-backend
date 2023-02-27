const { createEntry, getAllEntry, getEntryById, updateEntryById, deleteEntryById } = require('./helpers');

const createUser = (req, res) => createEntry(res, 'user', req.body);
const getAllUsers = (_, res) => getAllEntry(res, 'user');
const getUserById = (req, res) => getEntryById(res, 'user', req.params.id);
const updateUserById = (req, res) => updateEntryById(res, 'user', req.body, req.params.id);
const deleteUserById = (req, res) => deleteEntryById(res, 'user', req.params.id);

module.exports = { createUser, getAllUsers, getUserById, updateUserById, deleteUserById };
