const mongoose = require('mongoose');
const MongoUrl = "mongodb://localhost:27017/Crud"

mongoose.connect(MongoUrl)
const connection = mongoose.connection;

mongoose.connection.on('connected',()=>{
    console.log("Connection established")
})

module.exports = connection;