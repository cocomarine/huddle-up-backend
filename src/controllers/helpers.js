const { User, Event, Suggestion, UserEvent } = require('../models');
const getError404 = (model) => ({ error: `${model} does not exist` });

const getModel = (model) => {
  const models = {
    user: User,
    event: Event,
    suggestion: Suggestion,
    userEvent: UserEvent,    
  };

  return models[model];
};

const getOptions = (model) => {
  if (model === 'user') return { include: [Event, Suggestion]};
  if (model === 'event') return { include: [User, Suggestion] };
  if (model === 'userevent') return { include: [User, Event, Suggestion]};
  if (model === 'suggestion') return { include: [User, Event]};

  return {};
};

const removePswd = (obj) => {
  if(Object.prototype.hasOwnProperty.call(obj, 'password')) {
    delete obj.password;
  }

  return obj;
  };

const createEntry = async (res, model, entry) => {    
  try {
    const Model = getModel(model);
    const newEntry = await Model.create(entry);
    const entryWithoutPswd = removePswd(newEntry.get());

    res.status(201).json(entryWithoutPswd);
  } catch (err) {
    const errorMsg = err.errors.map(e => e.message);
    res.status(400).json({ error: errorMsg[0] });
  }
};

const getAllEntry = async (res, model) => {
  try {
    const Model = getModel(model);
    const entries = await Model.findAll(getOptions(model));

    if (model === 'event'|| model === 'suggestion' || model === 'userEvent') {
      entries.forEach((entry) => {
        if (entry.User) {
          removePswd(entry.User.get());
        }
      });
    }

    const entryWithoutPswd = entries.map(entry => removePswd(entry.get()));

    res.status(200).json(entryWithoutPswd);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getEntryById = async (res, model, id) => {
  try {
    const Model = getModel(model);
    const entry = await Model.findByPk(id, getOptions(model));

    if (!entry) res.status(404).json(getError404(model));

    if (entry.User) removePswd(entry.User.get());

    const entryWithoutPswd = removePswd(entry.get());

    res.status(200).json(entryWithoutPswd);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateEntryById = async (res, model, entry, id) => {
  try {
    const Model = getModel(model);
    const [ entryUpdated ] = await Model.update(entry, { where: { id } });

    if (!entryUpdated) res.status(404).json(getError404(model));

    const updatedEntry = await Model.findByPk(id);
    const entryWithoutPswd = removePswd(updatedEntry.get());
    
    res.status(200).json(entryWithoutPswd);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteEntryById = async (res, model, id) => {
  try {
    const Model = getModel(model);
    const deletedEntry = await Model.destroy({ where: { id } });

    if (!deletedEntry) res.status(404).json(getError404(model));

    res.status(204).json(deletedEntry);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { getModel, createEntry, getAllEntry, getEntryById, updateEntryById, deleteEntryById };
