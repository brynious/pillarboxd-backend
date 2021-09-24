const { Router } = require('express');
const testCTRL = require('../controllers/test.controller');
const { checkSeriesInDB } = require('../middleware/tmdbapi.middleware');

const router = Router();

router.get('/test/user/:username/watchlist', testCTRL.test_user_watchlist_get);

router.post('/test/user/:username/watchlist/:tmdb_id', checkSeriesInDB, testCTRL.test_user_watchlist_post);

router.delete('/test/user/:username/watchlist/:tmdb_id', testCTRL.test_user_watchlist_delete);

module.exports = router;
