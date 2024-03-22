var express = require("express");
var connection = require("../model/dbConfig");
var { ObjectId } = require("mongodb");

var router = express.Router();

/* GET users listing. */
router.get("/getUser", async (req, res) => {
  try {
    let allUsers = await connection.collection("Users").find({}).toArray();
    if (allUsers) {
      res.status(200).json({ status: true, data: allUsers });
    } else {
      res.status(200).json({ status: false, msg: "Could Users" });
    }
  } catch (error) {
    res.status(200).json({ status: false, error: error.message });
  }
});

router.post("/addUser", async (req, res) => {
  let newUser = req.body;
  try {
    let isAdded = await connection.collection("Users").insertOne(newUser);
    if (isAdded) {
      res.status(200).json({ status: true, msg: "New User Added" });
    } else {
      res.status(200).json({ status: false, msg: "Failed to Add New User" });
    }
  } catch (error) {
    res.status(200).json({ status: false, error: error.message });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let isDeleted = await connection
      .collection("Users")
      .deleteOne({ _id: new ObjectId(id) });
    if (isDeleted) {
      res.status(200).json({ status: true, msg: "User Deleted" });
    } else {
      res.status(200).json({ status: false, msg: "Failed to Delete User" });
    }
  } catch (error) {
    res.status(200).json({ status: false, error: error.message });
  }
});

router.put("/editUser", async (req, res) => {
  let data = req.body;
  console.log(data.id)
  try {
    isUpdated = await connection.collection("Users").updateOne({ "_id":new ObjectId(data.id)},{$set:{'name':data.name, 'email':data.email, 'mobileNumber':data.mobileNumber,'age':data.age}});
    console.log(isUpdated)
    if (isUpdated.modifiedCount > 0 && isUpdated.acknowledged) {
      res.status(200).json({ status: true, msg: "User Updated" });
    } else if(isUpdated.modifiedCount >= 0) {
      res.status(200).json({ status: false, msg: "User not updated" });
    }else{
      res.status(200).json({ status: false, msg: "Failed to Update User" });
    }
  } catch (error) {
    res.status(200).json({ status: false,error:error.message});
  }
});

module.exports = router;
