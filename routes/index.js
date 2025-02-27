const express = require('express');
const { authenticateJWT } = require('../middleware/authMiddleware');
const router = express.Router();

router.use('/users', require('./users'));

router.use('/cards', require("./cards"))

router.use('/api-docs', authenticateJWT, require('./swagger')); 
// router.use('/', require('./swagger')); 


router.use('/auth', require('./auth'));

module.exports = router;