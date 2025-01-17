// const { nanoid } = require("nanoid");
import { nanoid } from 'nanoid';
// const URL = require('../models/url.js');
import URL from "../models/url.js";

async function handleGenerateNewShortURL(req, res) {
   const body = req.body;
   if(!body.url) return res.status(400).json({ error: "url is required"});
   const shortID = nanoid(8);
   await URL.create({
     shortId: shortID,
     redirectURL: body.url,
     visitHistory: [],
     createdBy: req.user._id
   });

   return res.render('home1', {
    id: shortID
   });
  //  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory})
}

// 
export {
  handleGenerateNewShortURL,
  handleGetAnalytics
};