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

function showRoute(req, res, next){
  Record
    .findById(req.params.id)
    .then(record => res.json(record))
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

function commentCreateRoute(req, res, next){
  req.body.author = req.currentUser;
  Record
    .findById(req.params.id)
    .then(record => {
      record.comments.push(req.body);
      return record.save;
    })
    .then(record => res.json(record))
    .catch(next);
}

function commentDeleteRoute(req, res, next){
  Record.findById(req.params.id)
    .then(record => {
      const comment = record.comments.id(req.params.commentId);
      comment.remove();
      return record.save();
    })
    .then(boat => res.json(boat))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
};
