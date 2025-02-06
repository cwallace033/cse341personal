const express = require('express');

const router = express.Router();

router.use('/users', require('./users'));

router.use('/cards', require("./cards"))

router.use('/', require('./swagger'));

module.exports = router;