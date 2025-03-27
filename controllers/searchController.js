const { SearchHistory, SearchResult } = require('../models');
const sequelize = require('../config/database');

class SearchController {

  static async logSearch(query, results) {
    const t = await sequelize.transaction();
    
    try {
      const search = await SearchHistory.create({ query }, { transaction: t });
      

      await SearchResult.bulkCreate(
        results.map(cat => ({
          searchId: search.id,
          catId: cat.id,
          imageUrl: cat.imageUrl,
          tags: cat.tags
        })),
        { transaction: t }
      );
      
      await t.commit();
      return search;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }


  static async getTopSearches(limit = 10) {
    return await SearchHistory.findAll({
      attributes: [
        'query',
        [sequelize.fn('COUNT', sequelize.col('query')), 'count']
      ],
      group: ['query'],
      order: [[sequelize.literal('count'), 'DESC']],
      limit
    });
  }


  static async getPopularTags(limit = 20) {
    return await SearchResult.findAll({
      attributes: [
        [sequelize.literal('JSON_UNQUOTE(JSON_EXTRACT(tags, "$[0]"))'), 'name'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['name'],
      order: [[sequelize.literal('count'), 'DESC']],
      limit
    });
  }


  static async getRecentSearches(limit = 10) {
    return await SearchHistory.findAll({
      order: [['createdAt', 'DESC']],
      limit
    });
  }
}

module.exports = SearchController;