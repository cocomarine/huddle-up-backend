const express = require('express');
const suggestionController = require('../controllers/suggestion');

const suggestionRouter = express.Router();

suggestionRouter.post('/', suggestionController.createSuggestion);
suggestionRouter.get('/', suggestionController.getAllSuggestions);
suggestionRouter.get('/:id', suggestionController.getSuggestionById);
suggestionRouter.patch('/:id', suggestionController.updateSuggestionById);
suggestionRouter.delete('/:id', suggestionController.deleteSuggestionById);

module.exports = suggestionRouter;