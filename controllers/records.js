const Record = require('../models/record');
const Request = require('../models/request');
const Promise = require('bluebird');

function indexRoute(req, res, next) {
  Record
    .find()
    .populate('owner')
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


function showRequestRoute(req, res, next) {
  Record
    .find()
    .populate('owner')
    .then(records => res.json(records))
    .catch(next);
}


function swapRecordsRoute(req, res, next) {
  Record
    .find({
      '_id': [
        req.body.ownedRecordId,
        ...req.body.offeredRecordId
      ]
    })
    .populate('owner')
    .then(records => {
      const ownedRecord = records.filter(record => record._id.toString() === req.body.ownedRecordId.toString());
      const offeredRecords = records.filter(record => record._id.toString() !== req.body.ownedRecordId.toString());
      const firstOwnerIdToSwap = ownedRecord[0].owner;
      const secondOwnerIdToSwap = offeredRecords[0].owner;
      ownedRecord[0].owner = secondOwnerIdToSwap;
      offeredRecords.forEach(record => {
        record.owner = firstOwnerIdToSwap;
      });
      ownedRecord[0].owner.numberOfTrades ++;
      offeredRecords[0].owner.numberOfTrades ++;
      ownedRecord[0].owner.save();
      offeredRecords[0].owner.save();

      return Promise.all(records.map(record => record.save()))
        .then(() => Request.findById(req.body.requestId))
        .then(request => request.remove())
        .then(() => res.json(records));
    })
    .catch((err) => next(err));
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
  showRequest: showRequestRoute,
  swapRecords: swapRecordsRoute
};
