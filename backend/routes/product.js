const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Route-1: create a new product using: POST "api/products/createproduct".
router.post("/createproduct", fetchuser,[
    body("name", "Product Name is required").notEmpty(),
    body("description", "Product description is required").notEmpty(),
    body("price", "price must be a valid number").isNumeric(),
], async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        // Create a new product
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageURL: req.body.imageURL,
            category: req.body.category,
        });
        await product.save();
        res.json(product);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
});

// Route-2: Get all products using: GET "/api/products/getproducts".
router.get("/getproducts", async(req, res) => {
    try{
        const products = await Product.find();
        res.json(products)
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route-3: Get a product by its id using: GET "/api/products/product/:id".
router.get("/product/:id",fetchuser, async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({msg: "Product not found!!"})
        }
        res.json(product)
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route-4: Update a product by its id using: PUT "/api/products/updateproduct/:id".
router.put("/updateproduct/:id", fetchuser,[
    body("name", "Product name is required").notEmpty(),
    body("description", "Product description is required").notEmpty(),
    body("price", "Price must be a valid number").isNumeric(),
], async(req, res)=> {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }
    try{
        let product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).send({msg: "Product is not found!!"});
        }
        // Update product fields 
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.imageURL = req.body.imageURL || product.imageURL;
        product.category = req.body.category || product.category;

        await product.save();
        res.json(product);
    }catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route-5: Delete a Product by its id using: DELETE "api/products/deleteproduct/:id".
router.delete("/product/:id", fetchuser, async(req, res) => {
    try{
        let product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            return res.status(404).send({msg: "Product is not found"});
        }
        // await product.remove();
        res.json({msg: "Product removed"});
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;