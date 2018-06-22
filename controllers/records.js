const Record = require('../models/record');

function indexRoute(req, res, next) {
  Record
    .find()
    .then(records => res.json(records))
    .catch(next);
}

function createRoute(req, res, next) {
  Record
    .create(req.body)
    .then(record => res.status(201).json(record))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute
};
