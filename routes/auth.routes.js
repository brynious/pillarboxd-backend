const { Router } = require('express');
const authCTRL = require('../controllers/auth.controller');

const router = Router();

router.get('/signup', authCTRL.signup_get);
router.post('/signup', authCTRL.signup_post);
router.get('/login', authCTRL.login_get);
router.post('/login', authCTRL.login_post);
router.get('/logout', authCTRL.logout_get);

module.exports = router;
