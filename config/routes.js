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

router.post('/records/:id/record-comments', secureRoute, records.commentCreate);
router.route('/records/:id/record-comments/:commentId')
  .put(secureRoute, records.commentUpdate)
  .delete(secureRoute, records.commentDelete);

router.get('/collections', secureRoute, records.collectionsIndex);

router.get('/profiles', profiles.index);

router.route('/profiles/:id')
  .get(profiles.show)
  .put(secureRoute, profiles.update)
  .delete(secureRoute, profiles.delete);

router.post('/profiles/:id/profile-comments', secureRoute, profiles.commentCreate);

router.route('/profiles/:id/profile-comments/:commentId')
  .delete(secureRoute, profiles.commentDelete);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
