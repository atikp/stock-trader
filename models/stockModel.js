const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const Stock = sequelize.define(
  "Stock",
  {
    companyName: {
      type: DataTypes.STRING,
    },
    sharePriceCurrent: {
      type: DataTypes.STRING,
    },
    sharePricePrevious: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Stock };
