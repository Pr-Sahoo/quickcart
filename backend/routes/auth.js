const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
// var fetchadmin = require("../middleware/fetchadmin");

const JWT_SECRET = "homelander$great";

// Route1 - Create a User using: POST "/api/auth/createuser". no login required
router.post("/createuser", [
    body("name", "Enter a valid name").isLength({min: 3}),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be minimum 5 character").isLength({min: 5}),
], async (req, res)=> {
    // If there are errors return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    } try {
        // Check weather the user with this email exist already
        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.status(400).json("Sorry the user already exist");
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        const role = req.body.role || "user"  // default to user if not provided

        //Create a new user 
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            role: role,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        
        // res.json(user)
        res.json({authtoken})
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    };
});

// Route-2: Authenticate a user using: POST "/api/auth/login". no login required
router.post("/login",[
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank").exists(),
], async (req, res) => {
    // If there are errors return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json("Please enter valid credentials");
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).json("Please enter valid credentials");
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})
    } catch(error) {
        console.error(error.message);
        res.status(500).json("Internal Server Error");
    }
});

// Route-3: Get Loggedin user details using: POST "/api/auth/getuser". login required.
// router.post("/getuser", fetchuser, async (req, res) => {

//     try{
//         userId = req.user.id;
//         const user = await User.findById(userId).select("-password")
//         res.send(user)
//     } catch(error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// }),

router.post("/getuser",fetchuser(), async (req, res) => {
    try {
        console.log("Request user ID:", req.user.id);
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }
        console.log("User data retrieved:", user);
        res.send(user);
    } catch (error) {
        console.error("Error in getuser route:", error.message);
        res.status(500).send("Internal Server Error");
    }
});


// Route:4 Create an admin using: POST "api.auth/createadmin".
// router.post("/createadmin", fetchadmin, async(req, res) => {
//     try {
//         const {name, email, password} = req.body;

//         //Checked if the logged-in user is admin or not
//         const loggedInUser = await User.findById(req.user.id);
//         if(!loggedInUser.role !== "admin") {
//             return res.status(403).send("Access Denied: Only admin can create new admins");

//         }
//     }
// })

// Route:4 Create an admin using: POST "api/auth/createadmin".
router.post("/createadmin", fetchuser("admin"), async(req, res) => {
    try{
        const loggedInUser = await User.findById(req.user.id);
        if(!loggedInUser || loggedInUser.role !== "admin") {
            return res.status(403).send("Access Denied: Only admins can create new admins");
        }
        const {name, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const newAdmin = await User.create({
            name,
            email,
            password: secPass,
            role: "admin",
        });
        res.status(201).json(newAdmin);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    };
});

module.exports = router