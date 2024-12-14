const jwt = require("jsonwebtoken");
const JWT_SECRET = "homelander$great";

// const fetchuser = (requiredRole = null) => {
//     // console.log("fetchuser middleware invoked");  // debugging log
//     return (req, res, next) => {
//         //Get the user from the jwt token and add id to the req object
//         // const token = jwt.header("auth-token");
//         const token = req.header("auth-token");
//         if (!token) {
//             res.status(401).send({ error: "Please authenticate using a valid token" });
//         }
//         try {
//             const data = jwt.verify(token, JWT_SECRET);
//             req.user = data.user;
//             // console.log(req.user);

//             // if(req.user.role !== "admin") {
//             //     return res.status(403).send({error: "Access denied. Admins only."})
//             // }
//             if (requiredRole && req.user.role !== requiredRole) {
//                 return res.status(403).send({ error: "Access Denied! Admins only" });
//             }
//             // console.log("token verified", req.user); //debugging log
//             next();
//         } catch (error) {
//             res.status(401).send({ error: "Please authenticate using a valid token" });
//         }
//     };
// };

// module.exports = fetchuser;


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