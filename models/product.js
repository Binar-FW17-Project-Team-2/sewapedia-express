'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {
        through: models.Wishlist,
        as: 'user_wishlist',
        foreignKey: 'productId',
        otherKey: 'userId',
      })
      Product.belongsTo(models.Category, {
        foreignKey: 'category',
        as: 'Category',
      })
      Product.hasMany(models.OrderItem, {
        foreignKey: 'productId',
        as: 'productOrderItem',
      })
    }
  }
  Product.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `name can't be empty`,
          },
          notNull: { msg: `can't be null` },
        },
      },
      details: {
        type: DataTypes.TEXT(),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `details can't be empty`,
          },
          notNull: { msg: `can't be null` },
        },
      },
      img_url: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'cannot be null' },
          isInt: { msg: 'price must be number' },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'cannot be null' },
          isInt: { msg: 'stock must be number' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      hooks: {
        beforeCreate: categoryLowercase,
        beforeUpdate: categoryLowercase,
      },
    }
  )
  return Product
}

function categoryLowercase(product, options) {
  product.category = product.category.toLowerCase()
}
