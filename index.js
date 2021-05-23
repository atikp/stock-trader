require("dotenv").config();
const express = require("express");
const app = express();
const { User } = require("./models/userModel");
const { Transaction } = require("./models/transactionModel");
const path = require("path");
app.use(express.json());
app.listen(3000, () => {
  console.log("listening on port 3000");
});

// BROWSER ENDPOINTS
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  let userList = [];
  users.forEach((user) => {
    userList.push(user.dataValues);
  });
  console.log(userList);
  res.status(200).json(userList)
});

app.get('/userbalance/:id',async (req, res, next)=>{
  const { id } = req.params;
  const user = await User.findOne({
    where: { id: parseInt(id) },
  });
  // console.log(user)
  // console.log(req.params);
  res.json(user.balance);
})

app.patch('/userbalance/:id',(req, res)=>{
  const {id} = req.params
  const newData = req.body;
  res.status(200).json(newData);
  User.update(newData,{where:{id: id}})
  res.status(200).json(req.body);
});
