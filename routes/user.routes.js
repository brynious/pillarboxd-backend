const { Router } = require('express');
const userCTRL = require('../controllers/user.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const { checkSeriesInDB } = require('../middleware/tmdbapi.middleware');

const router = Router();

router.get('/user/:username', userCTRL.username_get);

module.exports = router;
