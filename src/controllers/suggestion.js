const { createEntry, getAllEntry, getEntryById, updateEntryById, deleteEntryById } = require('./helpers');

const createSuggestion = (req, res) => createEntry(res, 'suggestion', req.body);
const getAllSuggestions = (_, res) => getAllEntry(res, 'suggestion');
const getSuggestionById = (req, res) => getEntryById(res, 'suggestion', req.params.id);
const updateSuggestionById = (req, res) => updateEntryById(res, 'suggestion', req.body, req.params.id);
const deleteSuggestionById = (req, res) => deleteEntryById(res, 'suggestion', req.params.id);

module.exports = { createSuggestion, getAllSuggestions, getSuggestionById, updateSuggestionById, deleteSuggestionById };
