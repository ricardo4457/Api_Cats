
const express = require('express');
const { getTags, filterCats, matchCats } = require('../controllers/catController');

const router = express.Router();

// Rota para obter tags
router.get('/tags', getTags);

// Rota para filtrar gatos
router.get('/cats/filter', filterCats);

// Rota para buscar tags por substring
router.get('/cats/match', matchCats);

module.exports = router;
