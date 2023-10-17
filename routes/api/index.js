const router = require('express').Router();
// This variable will import the user routes from the user-routes.js file
const userRoutes = require('./userRoutes');
// This variable will import the thought routes from the thought-routes.js file
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;