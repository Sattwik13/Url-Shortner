import express from "express";
import URL from "../models/url.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const allurls = await URL.find({});
    return res.render('home1', {
        urls: allurls
    });
});

export default router;