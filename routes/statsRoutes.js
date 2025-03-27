const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/top-queries', statsController.getTopQueries);
router.get('/top-categories', statsController.getTopCategories);
router.get('/results-by-query/:query', statsController.getResultsByQuery);
router.get('/results-by-category/:category', statsController.getResultsByCategory);

module.exports = router;