const connection = require('../model/dbConfig')

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
}

module.exports = new userController();