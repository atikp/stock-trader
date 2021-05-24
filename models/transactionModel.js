const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const Transaction = sequelize.define(
  "Transaction",
  {
    shareName: {
      type: DataTypes.STRING,
    },
    sharePriceOnPurchase: {
      type: DataTypes.STRING,
    },
    sharePriceOnSell: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    shareAmmount: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: false,
  }
);

module.exports = { Transaction };
