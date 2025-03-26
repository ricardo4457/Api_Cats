
const express = require('express');
const { getTags, matchTags, filterCatsByTag } = require('../controllers/catController');

const router = express.Router();

// Rota para obter tags
router.get('/tags', getTags);

// Rota para filtrar gatos
router.get('/cats/filter', filterCatsByTag);

// Rota para buscar tags por substring
router.get('/cats/match', matchTags);

module.exports = router;
