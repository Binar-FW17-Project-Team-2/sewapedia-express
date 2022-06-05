'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'wishlists',
      [
        {
          userId: 1000,
          productId: 1001,
        },
        {
          userId: 1001,
          productId: 1001,
        },
        {
          userId: 1001,
          productId: 1000,
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('wishlists', null, {})
  },
}
