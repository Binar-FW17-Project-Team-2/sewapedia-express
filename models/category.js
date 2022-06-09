'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, {
        foreignKey: {
          name: 'category',
          type: DataTypes.STRING(),
          allowNull: false,
          validate: {
            notNull: { msg: 'cannot be null' },
          },
        },
        as: 'product',
      })
    }
  }
  Category.init(
    {
      name: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: 'cannot be null' },
        },
        set(value) {
          this.setDataValue('name', value.toLowerCase())
        },
      },
      details: {
        allowNull: false,
        type: DataTypes.TEXT(),
        validate: {
          notNull: { msg: 'cannot be null' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: false,
    }
  )
  return Category
}
