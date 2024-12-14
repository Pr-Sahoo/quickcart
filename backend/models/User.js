const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // role: {
    //     type: String,
    //     default: "user",   // Default is user
    //     enum: ["user", "admin"], // Restrict role to user and admin
    // }
},{timestamps: true});

module.exports = mongoose.model("User", userSchema)