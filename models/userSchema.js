const mongoose = require('mongoose');
const mySchema = mongoose.Schema; 

// 1) Define the Schema structure  
const userSchema = new mySchema({
    username: String
});

// 2) Create a model based on that schema 
// scehma name in MongoDB: data_user
// MongoDB will add 's' at the end -> scehma name will be: data_users 
const UserScehema = mongoose.model("data_user", userSchema); 


// 3) Export the model 
module.exports = UserScehema; 