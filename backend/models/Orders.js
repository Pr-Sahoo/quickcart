// const mongoose = require("mongoose");
// const User = require("./User");
// const { type } = require("@testing-library/user-event/dist/type");
// const Product = require("./Product");

// const ordersSchema = new mongoose.Schema({
//     userId: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
//     products: [{type: mongoose.Schema.ObjectId, quantity: Number}],
//     totalAmount: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         default: "Pending"
//     }
// });

// module.exports = ("orders", ordersSchema);

const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Reference to the user schema
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",  // Reference to the product schema
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,  // total price for the order
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],// Valid statuses
        default: "Pending"
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,  // Automatically set up the date and time
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

// Middleware to set "updatedAt" before save 
// ordersSchema.pre("save", function(next) {
//     this.updatedAt = Date.now();
//     next();
// });

// Query middleware to execlude soft-deleted records
// ordersSchema.pre(/^find/, function(next) {
//     this.where({isDeleted: false});
//     next()
// });

//Methods for soft delete
ordersSchema.methods.softDelete = function() {
    this.isDeleted = true;
    return this.save();
};

module.exports = mongoose.model("Orders", ordersSchema);