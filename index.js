// const express = require("express");
// const { connectToMongoDB } = require("./connection.js")
// const urlRoutes = require("./routes/url.js");
import express from "express";
import  connectToMongoDB  from "./connection.js";
import urlRoutes from "./routes/url.js";

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDb connected"));

app.use(express.json());

app.use("/url", urlRoutes);

app.get('/"shortId', async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId,
    }, 
    { 
       $push: {
        visitHistory:{  
          timestamp: Date.now(),
        }
       },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));