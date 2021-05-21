const { DataTypes } = require("sequelize");
const { sequelize } = require('./index');
const User = sequelize.define('User',{
  firstName:{
    type: DataTypes.STRING
  },
  lastName:{
    type: DataTypes.STRING
  },
  balance:{
    type: DataTypes.INTEGER
  }
},
{
  timestamps: false
});

module.exports= {User};