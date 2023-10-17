// This variable will import the 'express' router
const router = require('express').Router();
// This variable will import the 'api' routes from the api folder
const apiRoutes = require('./api');

// This will use the 'api' routes from the api folder
router.use('/api', apiRoutes);

// This will send a message if the route is wrong
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;