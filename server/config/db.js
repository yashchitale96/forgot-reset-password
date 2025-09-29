const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB is connected')
    }
    catch(err){
        console.log("Error in db.js: ", err.message);
    }
}

module.exports = connectDB;