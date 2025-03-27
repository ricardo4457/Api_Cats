const { SearchHistory, SearchResult } = require('../models');

const statsController = {
  getTopQueries: async (req, res) => {
    try {
      const topQueries = await SearchHistory.findAll({
        attributes: [
          'query',
          [sequelize.fn('COUNT', sequelize.col('query')), 'queryCount']
        ],
        group: ['query'],
        order: [[sequelize.literal('queryCount'), 'DESC']],
        limit: 10
      });
      res.json(topQueries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTopCategories: async (req, res) => {
    try {
      const allResults = await SearchResult.findAll({
        attributes: ['tags']
      });

      // Flatten all tags and count occurrences
      const tagCounts = {};
      allResults.forEach(result => {
        result.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });

      // Convert to array and sort
      const topCategories = Object.entries(tagCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      res.json(topCategories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getResultsByQuery: async (req, res) => {
    try {
      const { query } = req.params;
      const searchHistory = await SearchHistory.findOne({
        where: { query },
        include: {
          model: SearchResult,
          as: 'results'
        }
      });

      if (!searchHistory) {
        return res.status(404).json({ error: 'Query not found' });
      }

      res.json(searchHistory.results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getResultsByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const results = await SearchResult.findAll({
        where: sequelize.where(
          sequelize.fn('JSON_CONTAINS', sequelize.col('tags'), `"${category}"`),
          true
        )
      });

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = statsController;