const { Router } = require('express');
const testCTRL = require('../controllers/test.controller');
const { checkSeriesInDB } = require('../middleware/tmdbapi.middleware');

const router = Router();

router.get('/test/user/:username/series', testCTRL.test_user_series_get);

router.post('/test/user/:username/series/:tmdb_id', checkSeriesInDB, testCTRL.test_user_series_post);

router.delete('/test/user/:username/series/:tmdb_id', testCTRL.test_user_series_delete);

module.exports = router;
