// const mongoose = require("mongoose");
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: { // original URL
        type: String,
        required: true
    },
    visitHistory: [{ timestamp: { type: Number } }], // how many click on URL
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},
{ timestamps: true }
);

 const URL = mongoose.model("url", urlSchema);

// module.exports = URL;

export default URL;