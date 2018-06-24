const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .then(users => res.json(users))
    .catch(next);
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('userComments.author')
    .then(user => res.json(user))
    .catch(next);
}

function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function commentCreateRoute(req, res, next) {
  req.body.author = req.currentUser;
  User
    .findById(req.params.id)
    .populate('userComments.author')
    .then(user => {
      user.userComments.push(req.body);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

function commentDeleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => {
      const comment = user.userComments.id(req.params.commentId);
      comment.remove();
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
};
