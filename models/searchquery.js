'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SearchQuery extends Model {
    static associate(models) {
      SearchQuery.hasMany(models.SearchResult, {
        foreignKey: 'searchQueryId',
        as: 'results'
      });
    }
  }
  SearchQuery.init({
    query: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SearchQuery',
  });
  return SearchQuery;
};