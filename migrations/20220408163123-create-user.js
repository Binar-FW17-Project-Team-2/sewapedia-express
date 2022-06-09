'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        email: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(60),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(70),
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING,
          defaultValue:
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2Fno-profile.png?alt=media&token=101d0caf-0639-4cb1-9db6-b3fe6448d52a',
        },
        role: {
          type: Sequelize.ENUM,
          values: ['admin', 'user'],
          defaultValue: 'user',
        },
        provider: {
          type: Sequelize.ENUM,
          values: ['credentials', 'github', 'google'],
          defaultValue: 'credentials',
        },
      },
      {
        uniqueKeys: {
          Items_unique: {
            fields: ['email', 'provider'],
          },
        },
      }
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  },
}
