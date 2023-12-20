const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const URI = process.env.MONGO_URI;
const connectDB = async() =>{
    try{
        await mongoose.connect(URI);
        console.log("database connected");
    }catch(err){
        console.log(err.message);
        process.exit(0);
    }
}

module.exports = connectDB;