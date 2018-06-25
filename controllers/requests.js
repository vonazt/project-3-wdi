function showRequestRoute(req, res, next) {
  Request
    .findById(req.params.id)
    .then(request => res.json(request))
    .catch(next);
}

function createRequestRoute(req, res, next) {
  Request
    .findById(req.params.id)
    .then(request => {
      request.requests.push(req.body);
      return request.save();
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
      return request.save();
    })
    .then(request => res.json(request))
    .catch(next);
}

module.exports = {
  showRequest: showRequestRoute,
  createRequest: createRequestRoute,
  updateRequest: updateRequestRoute,
  deleteRequest: deleteRequestRoute
};
