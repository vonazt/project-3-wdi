const router = require('express').Router();
const records = require('../controllers/records');
const auth = require('../controllers/auth');

router.route('/records')
  .get(records.index);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
