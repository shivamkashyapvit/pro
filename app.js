require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require('cors')
const auth = require("./middleware/auth");
const session = require('express-session')
const mongoDBSession = require('connect-mongodb-session')(session)

require('./config/database')
const app = express();
// const stores =require("dotenv").config();
const { MONGO_URI } = process.env;

const store = new mongoDBSession({
  uri :MONGO_URI,
  collection :'session'
})
app.use(session({
  secret : 'key value',
  resave : false,
  saveUninitialized : false,
  store : store
}))




const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/order');


app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", '*')

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

  if (req.method === 'OPTIONS') {

      res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,PATCH,DELETE')

      return res.status(200).json({})

  }

  next()

})


app.use(express.json({ limit: "50mb" }));




app.use(adminRoutes)
app.use(authRoutes)
app.use(orderRoutes)



app.get("/welcome",  (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});



module.exports = app;
