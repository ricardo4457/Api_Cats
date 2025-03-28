'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SearchResults', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      searchQueryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SearchQueries',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      catId: {
        type: Sequelize.STRING,
        allowNull: false

      },
      tags: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('SearchResults', ['searchQueryId']);
    await queryInterface.addIndex('SearchResults', ['catId']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SearchResults');
  }
};