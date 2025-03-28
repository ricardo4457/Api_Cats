
const express = require('express');
const { getTags, matchTags, filterCatsByTag } = require('../controllers/catController');

const router = express.Router();

// Route to get tags
router.get('/tags', getTags);

// Route to filter cats
router.get('/cats/filter', filterCatsByTag);

// Route to search tags by substring
router.get('/cats/match', matchTags);

module.exports = router;
