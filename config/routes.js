const router = require('express').Router();
const records = require('../controllers/records');
const profiles = require('../controllers/profiles');
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
router.delete('/records/:id/comments/:commentId', secureRoute, records.commentDelete);
router.put('/records/:id/comments/:commentId', secureRoute, records.commentUpdate);

router.get('/profiles', profiles.index);

router.route('/profiles/:id')
  .get(profiles.show)
  .put(secureRoute, profiles.update);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
