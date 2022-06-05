'use strict'
const { User } = require('../models')
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.create({
      id: 1000,
      email: 'admin@sewapedia.com',
      password: 'password00',
      image:
        'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2Fjisooya.jpg?alt=media&token=0fcac42a-22be-4b25-8ef0-66913e86a372',
      role: 'admin',
      name: 'Kim Ji Soo',
    })
    await User.create({
      id: 1001,
      email: 'user01@gmail.com',
      password: 'password00',
      image:
        'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2Fjang%20won-young.jpg?alt=media&token=0496fc50-4de3-4b05-845a-97318a2c9e61',
      name: 'Jang Won Young',
      role: 'user',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
