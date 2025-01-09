const mongoose = require("mongoose");
// const mongoURI = "mongodb+srv://pranayaranjan4:ranjan%40@12@quickcart.2d5fs.mongodb.net/";
const mongoURI = "mongodb+srv://pranayaranjan4:ranjan%4012@quickcart.2d5fs.mongodb.net/?retryWrites=true&w=majority"
// require("dotenv").config();

// const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, {

    })
    .then(() => console.log("connceted to mongo successfully"))
    .catch((err) => console.error("failed to conncet to mongo", err));
};

module.exports = connectToMongo;