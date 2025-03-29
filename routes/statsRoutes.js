const express = require('express');
const { 
  getTopQueries, 
  getTopCategories, 
  getCatsByCategory,
  recordSearch
} = require('../controllers/statsController');

const router = express.Router();

router.get('/stats/top-queries', getTopQueries);
router.get('/stats/top-categories', getTopCategories);
router.post('/stats/record-search', recordSearch);
router.get('/stats/category/:tag', getCatsByCategory);
module.exports = router;