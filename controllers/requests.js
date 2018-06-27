const Request = require('../models/request');

function createRequestRoute(req, res, next) {
  req.body.wantedRecord = req.params.id;
  Request
    .create(req.body)
    .then(request => {
      res.status(201).json(request);
    })
    .catch(next);
}

function showRequestRoute(req, res, next){
  Request
    .findById(req.params.id)
    .populate({
      path: 'wantedRecord',
      populate: { path: 'owner' }
    })
    .populate({
      path: 'offeredRecord',
      populate: {
        path: 'owner',
        populate: {
          path: 'records'
        }
      }
    })
    .then(request => res.json(request))
    .catch(next);
}

function updateRequestRoute(req, res, next) {
  Request
    .findById(req.params.id)
    .then(request => {
      request.set(req.body);
      return request.save();
    })
    .then(request => res.json(request))
    .catch(next);
}

function deleteRequestRoute(req, res, next) {
  Request
    .findById(req.params.id)
    .then(request => {
      request.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  createRequest: createRequestRoute,
  showRequest: showRequestRoute,
  updateRequest: updateRequestRoute,
  deleteRequest: deleteRequestRoute
};
