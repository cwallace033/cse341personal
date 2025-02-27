const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const passport = require('../config/passport');
const swaggerDocument = require('../swagger.json');


// router.use('/api-docs', (req, res, next) => {
//     res. setHeader ('Content-Type', 'text/html'); // Ensure correct content type next); 
//     if (req.path.endsWith('.css')) {
//         res.setHeader('Content-Type', 'text/css');
//       }
//     next();
//     }, swaggerUi.serve, swaggerUi.setup (swaggerDocument));
    

router.use('/api-docs', passport.authenticate('github', { session: false }), swaggerUi.serve, swaggerUi.setup(swaggerDocument));



module.exports = router;