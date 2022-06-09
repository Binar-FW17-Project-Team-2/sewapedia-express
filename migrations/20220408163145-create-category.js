'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories')
  },
}
