require("dotenv").config();
const express = require("express");
const app = express();
const favicon = require('serve-favicon');

const { User } = require("./models/userModel");
const { Transaction } = require("./models/transactionModel");
const { Stock } = require("./models/stockModel");
const path = require("path");
const handlebars = require('express-handlebars');
app.use(express.json());
app.listen(3000,()=>{
  console.log('listening on port 3000')
})
//finnhub
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.SANDBOX_API 
const finnhubClient = new finnhub.DefaultApi()
const request = require("request")
//finhubEnd
setInterval(() => {
  getStocks()

}, 5000);
const getStocks = ()=>{
  finnhubClient.quote("AAPL",(error, data, response) => {
    const newData = {sharePriceCurrent: data.c};
    Stock.update(newData,{where:{companyName:'apple'}})
  });
  finnhubClient.quote("AMZN", (error, data, response) => {
    const newData = {sharePriceCurrent: data.c};
    Stock.update(newData,{where:{companyName:'amazon'}})
  });
  finnhubClient.quote("SAN",  (error, data, response) => {
    const newData = {sharePriceCurrent: data.c};
    Stock.update(newData,{where:{companyName:'santanderUK'}})
  });
  finnhubClient.quote("MSFT", (error, data, response) => {
    const newData = {sharePriceCurrent: data.c};
    Stock.update(newData,{where:{companyName:'microsoft'}})
  });
  finnhubClient.quote("TSLA", (error, data, response) => {
    const newData = {sharePriceCurrent: data.c};
    Stock.update(newData,{where:{companyName:'tesla'}})
  });
}

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: `${__dirname}/views/layouts`,
  extname: 'hbs',
  partialsDir: `${__dirname}/views/partials`
}))
app.use(express.static('public'));
app.get('/favicon.ico', (req, res) => res.status(204));

//requests
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  // res.json(users)
  let userList = []
   users.forEach(user =>{
    userList.push(user.dataValues);
  })
  console.log(userList)
  res.render('main',{
    layout:'index', 
    userList,
  });
  
});
app.get("/", async(req, res)=>{
  const stocks = await Stock.findAll();
  const stockList = stocks.map(stock=> stock.dataValues);
  console.log(stockList);
  res.render('main',{
    layout:'index', 
    stockList,
  });
});

