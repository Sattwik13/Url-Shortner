// const express = require("express");
// const { connectToMongoDB } = require("./connection.js")
// const urlRoutes = require("./routes/url.js");
import express from "express";
import  connectToMongoDB  from "./connection.js";

import path from "path";
import URL from "./models/url.js";

import urlRoutes from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";

import cookieParser from "cookie-parser";
// import { restrictToLoggedinUserOnly, checkAuth } from "./middlewares/auth.js";
import { checkForAuthentication, restrictTo} from "./middlewares/auth.js";

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDb connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);

// app.get("/test", async (req, res) => {
//   const allurls = await URL.find({});
//   return res.render('home' , {
//     urls: allurls
//   });
// });

app.use("/user", userRoute);
// app.use("/url", restrictToLoggedinUserOnly, urlRoutes);
// app.use("/", checkAuth, staticRoute);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoutes);
app.use("/", staticRoute);


app.get('/url/:shortId', async(req, res) => {
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