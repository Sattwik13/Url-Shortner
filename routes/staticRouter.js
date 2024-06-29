import Router from "express";
import URL from "../models/url.js";

const router = Router();

router.get("/", async (req, res) => {
    const allurls = await URL.find({});
    return res.render('home1', {
        urls: allurls
    });
});

router.get('/Signup', (req, res) => {
    return res.render("signup");
});

router.get('/login', (req, res) => {
    return res.render("login");
});

export default router;