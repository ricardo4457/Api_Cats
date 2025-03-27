'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class SearchHistory extends Model {
    static associate(models) {
      this.hasMany(models.SearchResult, {
        foreignKey: 'searchId',
        as: 'results',
      })
    }
  }

  SearchHistory.init(
    {
      query: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'SearchHistory',
      tableName: 'SearchHistories',
    },
  )

  return SearchHistory
}
