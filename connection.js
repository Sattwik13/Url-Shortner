// const mongoose = require("mongoose");
import mongoose from "mongoose";

async function connectToMongoDB(url) {
    return mongoose.connect(url);
}

// module.exports =  {
//     connectToMongoDB
// };    

export default connectToMongoDB;