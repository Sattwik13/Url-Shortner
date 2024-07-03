import User from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser, getUser } from "../service/auth.js";

async function handleUserSignup(req, res) {
    const  { name, email, password } = req.body
    await User.create({
        name,
        email,
        password
    });
    return res.render("home1");
};

async function handleUserLogin(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email, password });
    if(!user) {
        return res.render("login", {
            error: "Invalid Username or Password",
        })
    }

    // const sessionId = uuidv4(); // -> when we use statefull authentication
    // setUser(sessionId, user);
    // res.cookie("uid", sessionId);
    // return res.redirect("/");

    const token = setUser(user);
    res.cookie("token", token);    
    return res.redirect("/");
};

export {
     handleUserLogin,
     handleUserSignup
    };