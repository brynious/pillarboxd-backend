const { Router } = require('express');
const watchlistCTRL = require('../controllers/watchlist.controller');
const { checkSeriesInDB } = require('../middleware/tmdbapi.middleware');

const router = Router();

router.get('/user/:username/watchlist', watchlistCTRL.user_watchlist_get);

router.post(
  '/user/:username/watchlist/:tmdb_id',
  checkSeriesInDB,
  watchlistCTRL.user_watchlist_post
);

router.delete(
  '/user/:username/watchlist/:tmdb_id',
  watchlistCTRL.user_watchlist_delete
);

module.exports = router;
