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

function updateRoute(req, res, next){
  Record
    .findById(req.params.id)
    .then(record => record.set(req.body))
    .then(record => record.save())
    .then(record => res.json(record))
    .catch(next);
}

function deleteRoute(req,res,next){
  Record
    .findById(req.params.id)
    .then(record => record.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}


module.exports = {
  index: indexRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
