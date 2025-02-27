const express = require('express');
const { authenticateJWT } = require('../middleware/authMiddleware');
const router = express.Router();
const passport = require('../config/passport');

router.use('/users', require('./users'));

router.use('/cards', require("./cards"))

router.use('/api-docs', (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();  
    }
    res.redirect('/auth/github'); 
  }, require('./swagger'));


router.use('/auth', require('./auth'));

module.exports = router;