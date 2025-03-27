'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SearchResults', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      searchId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SearchHistories',
          key: 'id',
        },
      },
      catId: Sequelize.STRING,
      imageUrl: Sequelize.STRING,
      tags: Sequelize.JSON,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('SearchResults')
  },
}
