const { Router } = require('express');
const watchedCTRL = require('../controllers/watched.controller');
const { requireAuth, checkUser } = require('../middleware/auth.middleware');
const { checkSeriesInDB } = require('../middleware/tmdbapi.middleware');

const router = Router();

router.get('/user/:username/watched', watchedCTRL.user_watched_get);
router.post(
  '/user/:username/watched',
  checkUser,
  checkSeriesInDB,
  watchedCTRL.user_watched_post
);
router.delete(
  '/user/:username/watched',
  checkUser,
  watchedCTRL.user_watched_delete
);

module.exports = router;
