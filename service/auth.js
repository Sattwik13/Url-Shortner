//--> stateless authentication
import jwt from "jsonwebtoken";

const secret = "SattMann@121";

 function setUser(user) {
    return jwt.sign(
        {
           _id: user._id,
           email: user.email,
           role: user.role,
        }, 
        secret
    );
}

 function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch(error) {
        return null;
    }    
}

export {
    setUser,
    getUser
};