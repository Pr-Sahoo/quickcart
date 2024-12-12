const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageURl: {
        type: String
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model("products", productSchema);