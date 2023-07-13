const { login, signup } = require('../controllers/auth');

const router = require('express').Router();

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
