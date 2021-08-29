const { Router } = require('express');
const watchingCTRL = require('../controllers/watching.controller');
const { requireAuth, checkUser } = require('../middleware/auth.middleware');
const { checkSeriesInDB } = require('../middleware/tmdbapi.middleware');

const router = Router();

router.get('/user/:username/watching', watchingCTRL.user_watching_get);
router.post(
  '/user/:username/watching',
  checkUser,
  checkSeriesInDB,
  watchingCTRL.user_watching_post
);
router.delete(
  '/user/:username/watching',
  checkUser,
  watchingCTRL.user_watching_delete
);

module.exports = router;
