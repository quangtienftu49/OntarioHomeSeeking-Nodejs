"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Home_listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Home_listing.init(
    {
      price: DataTypes.INTEGER,
      address: DataTypes.STRING,
      description: DataTypes.TEXT("long"),
      province: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      cityId: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Home_listing",
    }
  );
  return Home_listing;
};
