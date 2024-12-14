const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");
// const Product = require("../models/Product")
const fetchuser = require("../middleware/fetchuser");
const {body, validationResult} = require("express-validator");
// const isAdmin = require("../middleware/isAdmin")
const { route } = require("./product");

// Route-1: Create a new order using: POST "/api/orders/createorder".
router.post("/createorder", fetchuser(),[
    body("products", "Products are required").isArray({min: 1}).withMessage("Atleast One product is required"),
    body("totalAmount", "Total Amount must be a valid number").isNumeric(),
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {products, totalAmount} = req.body;
        const order = new Order({
            userId: req.user.id,
            products,
            totalAmount,
        });
        await order.save();

        res.status(201).json(order);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    };
});

// Route-2: Get all products for an Admin using: GET "api/orders/allorders".
router.get("/allorders",fetchuser(), async(req, res) => {
    try{
        const orders = await Order.find()
        .populate("userId", "name email")
        .populate("products.productId", "name price");
        res.json(orders)
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route-3: Get specific users order using: GET "api/orders/userorders".
router.get("/userorders", fetchuser(), async(req, res) => {
    try{
        const orders = await Order.find({userId: req.user.id})
        .populate("products.productId", "name price")
        .populate("userId", "name email");
        
        res.json(orders);
    } catch(error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route-4: Update an order status using: PUT "api/orders/updatestatus/:id".
router.put("/updatestatus/:id", fetchuser(), [
    body("status", "Status is required").notEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if(!order) {
            return res.status(400).json({message: "Order not found"});
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route-5: Delete an orders by it's id using DELETE "api/orders/deleteorder/:id".
router.delete("/deleteorder/:id", fetchuser(), async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        // if(!order || order.isDeleted) {
        //     return res.status(404).send({message: "Order not found or already deleted"});
        // }
        if(!order) {
            return res.status(404).json({message: "Order not found"});
        }
        // check if the order already deleted
        if(order.isDeleted) {
            return res.status(400).send({message: "Order is already deleted"});
        }

        // perform soft delete
        // order.softDelete();
        order.isDeleted = true;
        await order.save(); //save the changes

        res.json({message: "Order deleted successfully", order});
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;