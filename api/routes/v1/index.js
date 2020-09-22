const express = require('express');
const libraryRoutes = require('./library.route');
const router = express.Router();

/**
 * API status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * Library end points
 */
router.use('/library', libraryRoutes);

module.exports = router;
