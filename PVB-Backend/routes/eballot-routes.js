const router = require('express').Router();
const handle = require('../handlers');

router.route('/').get(handle.showBallots);

module.exports = router;