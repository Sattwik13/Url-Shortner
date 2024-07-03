import { getUser } from "../service/auth.js"; 

function checkForAuthentication(req, res, next) {

    const tokenCookie = req.cookies?.token;
    req.user = null;

    if(!tokenCookie) return next();
        
    const token = tokenCookie
    const user = getUser(token);

    req.user = user;
    return next();
}; 

// function checkForAuthentication(req, res, next) {
//     // const authorizationHeaderValue = req.headers["authorization"];

//     console.log(authorizationHeaderValue);
//     req.user = null;

//     if(!authorizationHeaderValue || 
//        !authorizationHeaderValue.startsWith("Bearer")
//     ) 
//     return next();
        
//     const token = authorizationHeaderValue.split("Bearer")[1];
//     const user = getUser(token);

//     req.user = user;
//     return next();
// }; 

function restrictTo(roles = []) {
  return function(req,  res, next) {
    if(!req.user) return res.redirect("/login");

    if(!roles.includes(req.user.role)) return res.end("unauthorized");

    return next();
  }
};

// -> for cookies
// async function restrictToLoggedinUserOnly(req, res, next) {
//     const userUid = req.cookies?.uid;

//     if(!userUid) return res.redirect("/login");

//     const user = getUser(userUid);
//     if(!user) return res.redirect("/login");

//     req.user = user; // when user exist
//     next();
// }

// -> for bearer token
// async function restrictToLoggedinUserOnly(req, res, next) {
//         const userUid = req.headers["authentication"];
    
//         if(!userUid) return res.redirect("/login");
//         const token =userUid.split("Bearer ")[1];
//         const user = getUser(token);

//         if(!user) return res.redirect("/login");
    
//         req.user = user; // when user exist
//         next();
//     }

// --> for cookies    
// async function checkAuth(req, res, next) { 
//     const userUid = req.cookies?.uid;

//     const user = getUser(userUid);

//     req.user = user; 
//     next();
// }

// -> for bearer token 
// async function checkAuth(req, res, next) { 
//     console.log(req.headers);
//     const userUid = req.headers["authorization"];
//     const token = userUid.split("Bearer")[1];

//     const user = getUser(token);

//     req.user = user;
//     next();
// }

export {
    // restrictToLoggedinUserOnly,
    // checkAuth
    checkForAuthentication,
    restrictTo
};