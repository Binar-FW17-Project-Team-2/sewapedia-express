'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {
        through: models.Wishlist,
        as: 'product_wishlist',
        foreignKey: 'userId',
        otherKey: 'productId',
      })
      User.hasMany(models.Order, {
        foreignKey: 'userId',
        as: 'myOrder',
      })
      User.hasOne(models.OrderItem, {
        foreignKey: 'userId',
        as: 'myItem',
      })
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      email: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'email not valid',
          },
          notNull: { msg: 'cannot be null' },
        },
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          len: {
            args: [8],
            msg: 'password minimal 8 char',
          },
          notNull: { msg: 'cannot be null' },
        },
      },
      name: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `first name can't be empty`,
          },
          len: {
            args: [0, 70],
            msg: `first name must be less than 50`,
          },
          notNull: { msg: 'cannot be null' },
        },
      },
      image: {
        type: DataTypes.STRING(),
        defaultValue:
          'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2Fno-profile.png?alt=media&token=101d0caf-0639-4cb1-9db6-b3fe6448d52a',
      },
      role: {
        type: DataTypes.ENUM,
        values: ['admin', 'user'],
        defaultValue: 'user',
      },
      provider: {
        type: DataTypes.ENUM,
        values: ['credentials', 'github', 'google'],
        defaultValue: 'credentials',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    }
  )
  return User
}

function hashPassword(user, options) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(user.password, salt)
  user.password = hash
}
