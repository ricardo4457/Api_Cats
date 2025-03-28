'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SearchResult extends Model {
    static associate(models) {
      SearchResult.belongsTo(models.SearchQuery, {
        foreignKey: 'searchQueryId',
        as: 'searchQuery'
      });
    }
  }
  SearchResult.init({
    searchQueryId: DataTypes.INTEGER,
    catId: DataTypes.STRING,
    tags: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'SearchResult',
  });
  return SearchResult;
};