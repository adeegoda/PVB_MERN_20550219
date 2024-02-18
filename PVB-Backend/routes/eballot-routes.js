const router = require('express').Router();
const handle = require('../handlers');

router.route('/').get(handle.showBallots);
router.route('/').post(handle.submitBallot);

module.exports = router;