const { Sequelize }= require("sequelize");
const sequelize = new Sequelize('stock_trade','root','rootroot',{
  host:'localhost',
  dialect: 'mysql',
  timestamps:false,
});

module.exports= {
  sequelize,
};