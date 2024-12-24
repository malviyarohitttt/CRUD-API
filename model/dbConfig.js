const express = require("express");
const mongoose = require("mongoose");
const MongoUrl =
  "mongodb+srv://malviyarohitttt:malviyarohitttt123%40%23@cluster0.dzx0s6y.mongodb.net/Crud-Api?retryWrites=true&w=majority";

mongoose.connect(MongoUrl,)
  .then(() => {
    console.log("Connected to Mongo Server!");
  })
  .catch((err) => {
    console.log(err);
  });

const connection = mongoose.connection;

module.exports = connection;
