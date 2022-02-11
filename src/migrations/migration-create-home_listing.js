"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Home_listings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT("long"),
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      cityId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Home_listings");
  },
};
