var express = require("express");
var connection = require("../model/dbConfig");
var { ObjectId } = require("mongodb");
const userController = require('../controller/users.controller')

var router = express.Router();

// GET Users 
router.get("/getUser", async (req, res) => {
  userController.getUser((result)=>{
    res.status(200).json(result)
  })
});

//  Add Users
router.post("/addUser", async (req, res) => {
  let newUser = req.body;
  userController.addUser(newUser,(result)=>{
    res.status(200).json(result)
  })
});

// Delete Users
router.delete("/deleteUser/:id", async (req, res) => {
  let id = req.params.id;
  userController.deleteUser(id,(result)=>{
    res.status(200).json(result)
  })
});

// Update Users
router.put("/editUser", async (req, res) => {
  let data = req.body;
  userController.editUser(data,(result)=>{
    res.status(200).json(result)
  })
});

module.exports = router;
