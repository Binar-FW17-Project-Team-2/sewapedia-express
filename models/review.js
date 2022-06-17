'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.Review, {
        foreignKey: 'reviewId',
        as: 'reply',
        useJunctionTable: false,
      })
      Review.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'reviewedProduct',
      })
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'reviewer',
      })
    }
  }
  Review.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      message: {
        type: DataTypes.STRING(),
      },
      star: {
        type: DataTypes.INTEGER,
        validate: {
          max: {
            args: 5,
            msg: 'max 5 star',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews',
    }
  )
  return Review
}
