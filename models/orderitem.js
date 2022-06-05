'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'productDetails',
      })
      OrderItem.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'tenant',
      })
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order',
      })
    }
  }
  OrderItem.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      lamaSewa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: 'minimal 1 hari',
          },
          notNull: { msg: 'cannot be null' },
          isInt: { msg: 'lama sewa must be number' },
        },
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: 'minimal 1 buah',
          },
          notNull: { msg: 'cannot be null' },
          isInt: { msg: 'quantity must be number' },
        },
      },
      priceItem: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'cannot be null' },
          isInt: { msg: 'price Item must be number' },
        },
      },
      subTotalPrice: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: { msg: 'price Item must be number' },
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ['cart', 'order', 'rented'],
      },
    },
    {
      sequelize,
      modelName: 'OrderItem',
      tableName: 'order_items',
      // setterMethods: {
      //   subTotalPrice() {
      //     const price = this.priceItem * this.qty * this.lamaSewa
      //     this.setDataValue('subTotalPrice', price);
      //   }
      // },
      hooks: {
        beforeCreate: setSubToTalPrice,
        beforeUpdate: setSubToTalPrice,
      },
    }
  )
  return OrderItem

  function setSubToTalPrice(item, options) {
    item.subTotalPrice = item.priceItem * item.qty * item.lamaSewa
  }
}
