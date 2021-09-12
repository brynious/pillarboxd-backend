const { Router } = require('express');
const watchedCTRL = require('../controllers/watched.controller');
const { checkSeriesInDB } = require('../middleware/tmdbapi.middleware');

const router = Router();

router.get('/user/:username/watched', watchedCTRL.user_watched_get);

router.post(
  '/user/:username/watched/:tmdb_id',
  checkSeriesInDB,
  watchedCTRL.user_watched_post
);

router.delete(
  '/user/:username/watched/:tmdb_id',
  watchedCTRL.user_watched_delete
);

module.exports = router;
