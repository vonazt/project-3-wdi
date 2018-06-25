const router = require('express').Router();
const records = require('../controllers/records');
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

router.post('/records/:id/comments', secureRoute, records.commentCreate);
router.route('/records/:id/comments/:commentId')
  .put(secureRoute, records.commentUpdate)
  .delete(secureRoute, records.commentDelete);

router.get('/requests', secureRoute, records.indexRequest);

router.route('/records/:id/requests')
  .get(secureRoute, records.showRequest)
  .post(secureRoute, records.createRequest);
router.route('/records/:id/requests/:requestId')
  .put(secureRoute, records.updateRequest)
  .delete(secureRoute, records.deleteRequest);

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

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
