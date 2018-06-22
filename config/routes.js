const router = require('express').Router();
const records = require('../controllers/records');

router.route('/records')
  .get(records.index);

module.exports = router;
