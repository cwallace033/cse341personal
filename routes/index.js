const express = require('express');
const { authenticateJWT } = require('../middleware/authMiddleware');
const router = express.Router();
const passport = require('../config/passport');

router.use('/users', require('./users'));

router.use('/cards', require("./cards"))

router.use('/api-docs', require('./swagger'));


router.use('/auth', require('./auth'));

module.exports = router;