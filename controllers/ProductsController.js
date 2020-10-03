const Product = require("../models/Product.js");

// Create and Save a new Product
exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
    });

    Product.create(product, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error while creating product."
            });
        } else {
            res.send(data);
        }
    });
};

// Find a single product
exports.find = (req, res) => {
    Product.find(req.params.name, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    })
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    Product.findAll((err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "An error occurred when retrieving products."});
        } else {
            res.render('testing', {data: data});
        }
    });
};

// Update a Product identified
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    Product.update(
        new Product(req.body),
        (err, data) => {
            if (err) {
                throw err;
            } else {
                res.send(data);
            }
        }
    )
};

// Delete a Product
exports.delete = (req, res) => {
    Product.delete(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({message: `No product found with name ${req.params.name}.`});
            } else {
                res.status(500).send({message: `Could not delete product with name ${req.params.name}.`});
            }
        } else {
            res.send({message: "Product was deleted successfully"});
        }
    });
};