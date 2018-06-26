const Message = require('../models/message');

function indexRoute(req, res, next) {
  Message
    .find()
    .then(messages => res.json(messages))
    .catch(next);
}

function createRoute(req, res, next) {
  Message
    .create(req.body)
    .then(message => res.status(201).json(message))
    .catch(next);
}

function showRoute(req, res, next){
  Message
    .findById(req.params.id)
    .then(message => res.json(message))
    .catch(next);
}

function updateRoute(req, res, next){
  Message
    .findById(req.params.id)
    .then(message => message.set(req.body))
    .then(message => message.save())
    .then(message => res.json(message))
    .catch(next);
}

function deleteRoute(req,res,next){
  Message
    .findById(req.params.id)
    .then(message => message.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function commentCreateRoute(req, res, next){
  req.body.author = req.currentUser;
  Message
    .findById(req.params.id)
    .populate('comments.author')
    .then(message => {
      message.comments.push(req.body);
      return message.save();
    })
    .then(message => res.json(message))
    .catch(next);
}

function commentDeleteRoute(req, res, next){
  Message
    .findById(req.params.id)
    .then(message => {
      const comment = message.comments.id(req.params.commentId);
      comment.remove();
      return message.save();
    })
    .then(message => res.json(message))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute

};
