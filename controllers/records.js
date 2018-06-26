const Record = require('../models/record');
const Request = require('../models/request');

function indexRoute(req, res, next) {
  Record
    .find()
    .then(records => res.json(records))
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.owner = req.currentUser;
  Record
    .create(req.body)
    .then(record => res.status(201).json(record))
    .catch(next);
}

function showRoute(req, res, next){
  Record
    .findById(req.params.id)
    .populate('comments.author owner requests')
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

function collectionsIndexRoute(req, res, next){
  Record
    .find()
    .then((records) => {
      res.json(records);
    })
    .catch(next);
}

function commentCreateRoute(req, res, next){
  req.body.author = req.currentUser;
  Record
    .findById(req.params.id)
    .populate('comments.author')
    .then(record => {
      record.comments.push(req.body);
      return record.save();
    })
    .then(record => res.json(record))
    .catch(next);
}

function commentDeleteRoute(req, res, next){
  Record
    .findById(req.params.id)
    .then(record => {
      const comment = record.comments.id(req.params.commentId);
      comment.remove();
      return record.save();
    })
    .then(record => res.json(record))
    .catch(next);
}

function commentUpdateRoute(req, res, next){
  Record
    .findById(req.params.id)
    .then(record => {
      const comment = record.comments.id(req.params.commentId);
      comment.set(req.body);
      return record.save();
    })
    .then(record => res.json(record))
    .catch(next);
}

function showRequestRoute(req, res, next) {
  Record
    .find()
    .populate('owner')
    .then(records => res.json(records))
    .catch(next);
}


function swapRecordsRoute(req, res, next) {
  console.log(req.body);
  Record
    .find({
      '_id': [
        req.body.ownedRecordId,
        req.body.offeredRecordId
      ]
    })
    .then(records => {
      const firstOwnerIdToSwap = records[0].owner;
      const secondOwnerIdToSwap = records[1].owner;
      records[0].owner = secondOwnerIdToSwap;
      records[1].owner = firstOwnerIdToSwap;
      records[0].save();
      records[1].save();
    })
    .then(() => {
      Request
        .findById(req.body.requestId)
        .then(request => {
          request.remove();
        });
    })
    .then(records => res.json(records))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  collectionsIndex: collectionsIndexRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute,
  commentUpdate: commentUpdateRoute,
  showRequest: showRequestRoute,
  swapRecords: swapRecordsRoute
};
