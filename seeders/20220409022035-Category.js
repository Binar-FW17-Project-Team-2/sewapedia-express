'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'kendaraan',
          details: 'mainan yg mempunyai roda',
        },
        {
          name: 'boneka',
          details: 'boneka manekin',
        },
        {
          name: 'trap',
          details: 'jaldkfjl kja ldfj',
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {})
  },
}
