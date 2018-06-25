const router = require('express').Router();
const records = require('../controllers/records');
const requests = require('../controllers/requests');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');


router.route('/records')
  .get(records.index)
  .post(secureRoute, records.create);

router.route('/records/:id')
  .get(records.show)
  .put(secureRoute, records.update)
  .delete(secureRoute, records.delete);

router.get('/records/:id/requests', secureRoute, records.showRequest);

router.post('/records/:id/comments', secureRoute, records.commentCreate);
router.route('/records/:id/comments/:commentId')
  .put(secureRoute, records.commentUpdate)
  .delete(secureRoute, records.commentDelete);

router.route('/records/:id/requests')
  .post(secureRoute, requests.createRequest);
router.route('/requests/:id')
  .put(secureRoute, requests.updateRequest)
  .delete(secureRoute, requests.deleteRequest);

router.get('/collections', secureRoute, records.collectionsIndex);

router.get('/users', users.index);

router.route('/users/:id')
  .get(users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

router.post('/users/:id/comments', secureRoute, users.commentCreate);

router.route('/users/:id/comments/:commentId')
  .put(secureRoute, users.commentUpdate)
  .delete(secureRoute, users.commentDelete);

router.post('/login', auth.login);
router.post('/register', auth.register);

module.exports = router;
