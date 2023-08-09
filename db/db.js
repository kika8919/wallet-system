const mongoose = require("mongoose");
require("../model/Transaction");
require("../model/Wallet");

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(`error connecting mongodb ${err}`);
  });
