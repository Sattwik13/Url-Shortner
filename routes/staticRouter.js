import Router from "express";
import URL from "../models/url.js";

const router = Router();

router.get("/", async (req, res) => {
    if(!req.user) return res.redirect("/login");
    const allurls = await URL.find({ createdBy: req.user._id});
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