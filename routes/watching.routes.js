const { Router } = require('express');
const watchingCTRL = require('../controllers/watching.controller');
const { checkSeriesInDB } = require('../middleware/tmdbapi.middleware');

const router = Router();

router.get('/user/:username/watching', watchingCTRL.user_watching_get);

router.post(
  '/user/:username/watching/:tmdb_id',
  checkSeriesInDB,
  watchingCTRL.user_watching_post
);

router.delete(
  '/user/:username/watching/:tmdb_id',
  watchingCTRL.user_watching_delete
);

module.exports = router;
