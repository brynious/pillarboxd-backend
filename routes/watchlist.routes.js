const { Router } = require('express');
const watchlistCTRL = require('../controllers/watchlist.controller');
const { requireAuth, checkUser } = require('../middleware/auth.middleware');
const { checkSeriesInDB } = require('../middleware/tmdbapi.middleware');

const router = Router();

router.get('/user/:username/watchlist', watchlistCTRL.user_watchlist_get);
router.post(
  '/user/:username/watchlist',
  checkUser,
  checkSeriesInDB,
  watchlistCTRL.user_watchlist_post
);
router.delete(
  '/user/:username/watchlist',
  checkUser,
  watchlistCTRL.user_watchlist_delete
);

module.exports = router;
