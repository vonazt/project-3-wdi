const router = require('express').Router();
const records = require('../controllers/records');
const auth = require('../controllers/auth');

router.route('/records')
  .get(records.index)
  .post(records.create);

router.route('/records/:id')
  .get(records.show)
  .put(records.update)
  .delete(records.delete);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
