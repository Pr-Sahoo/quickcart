const jwt = require("jsonwebtoken");
const JWT_SECRET = "homelander$great";
// require("dotenv").config();

// const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (requiredRole = null) => {
    return (req, res, next) => {
        // Get the user form the jwt token and add id to the req object
        const token = req.header("auth-token");
        if(!token) {
            res.status(401).send({error: "Please authenticate using a valid token"});
        } 
        try {
            const data = jwt.verify(token, JWT_SECRET);
            req.user = data.user;

            // verification of the admin added now
            if(requiredRole && req.user.role !== requiredRole) {
                return res.status(403).send({error: "Access denied. Admins only"});
            }

            next();
        } catch(error) {
            res.status(401).send({error: "please authenticate using a valid token"});
        }
    };
};

module.exports = fetchuser;