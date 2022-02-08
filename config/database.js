const mongoose = require("mongoose");
// const session = require('express-session');
// const mongoDBSession = require('connect-mongodb-session')(session)
const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting ...");
      console.error(error);
      process.exit(1);
    });
};

