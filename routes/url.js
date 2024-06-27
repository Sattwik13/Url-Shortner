// const express = require("express");
import Router from "express";
// const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url.js");
import {handleGenerateNewShortURL, handleGetAnalytics } from "../controllers/url.js";
const router = Router();

router.post('/', handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics);

// module.exports = router;

export default router;