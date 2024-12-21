const connection = require('../model/dbConfig')
var { ObjectId } = require("mongodb");

class userController {
    async getUser(callback){
        try {
            let allUsers = await connection.collection("Users").find({}).toArray();
            if (allUsers) {
                callback({ status: true, data: allUsers });
            } else {
              callback({ status: false, msg: "Could not found Users!" });
            }
          } catch (error) {
            callback({ status: false, error: error.message });
          }
    }
    async addUser(newUser,callback){
          try {
            let isAdded = await connection.collection("Users").insertOne(newUser);
            if (isAdded) {
              callback({ status: true, msg: "New User Added" });
            } else {
              callback({ status: false, msg: "Failed to Add New User" });
            }
          } catch (error) {
            callback({ status: false, error: error.message });
          }
    }
    async deleteUser(id,callback){
        try {
            let isDeleted = await connection.collection("Users").deleteOne({ _id: new ObjectId(id)});
            if (isDeleted) {
              callback({ status: true, msg: "User Deleted" });
            } else {
              callback({ status: false, msg: "Failed to Delete User" });
            }
          } catch (error) {
            callback({ status: false, error: error.message });
          }
    }
    async editUser(data,callback){
        try {
            let isUpdated = await connection.collection("Users").updateOne({ "_id":new ObjectId(data.id)},{$set:{'name':data.name, 'email':data.email, 'mobileNumber':data.mobileNumber,'age':data.age}});
            console.log(isUpdated)
            if (isUpdated.modifiedCount > 0 && isUpdated.acknowledged) {
              callback({ status: true, msg: "User Updated" });
            } else if(isUpdated.modifiedCount >= 0) {
              callback({ status: false, msg: "User not updated" });
            }else{
              callback({ status: false, msg: "Failed to Update User" });
            }
          } catch (error) {
            callback({ status: false,error:error.message});
          }
    }
}

module.exports = new userController();