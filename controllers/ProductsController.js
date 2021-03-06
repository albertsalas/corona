const Product = require("../models/Product.js");

/**
 * Create and Save a new Product
 * @param req - request
 * @param res - response
 */
exports.create = (req, res) => {
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
            res.redirect("products/edit");
        }
    });
};

exports.edit = (req, res) => {
    Product.findAll((err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "An error occurred when retrieving products."});
        } else {
            console.log(data);
            res.render('EditProducts', {title: "Edit Products", data: data});
        }
    });
};

/**
 * Finds a single product
 * @param req - request
 * @param res - response
 */
exports.find = (req, res) => {
    Product.find(req.params.name, (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log(data);
            // res.send(data);
            res.render('productDetails', {item: data, title: req.params.name});
        }
    });
};

/**
 * Retrieves all products
 * @param req - request
 * @param res - response
 */
exports.findAll = (req, res) => {
    Product.findAll((err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "An error occurred when retrieving products."});
        } else {
            console.log(data);
            res.render('product', {data: data, title: "Products"});
        }
    });
};

/**
 * Updates a product
 * @param req - request
 * @param res - response
 */
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    Product.update(req.params.name, new Product(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({message: `No product found with name ${req.params.name}.`});
            } else {
                res.status(500).send({message: `Could not update product with name ${req.params.name}.`});
            }
        } else {
            console.log(data);
            res.send(data);
        }
    });
};

/**
 * Deletes a product
 * @param req - request
 * @param res - response
 */
exports.delete = (req, res) => {
    Product.delete(req.params.name, (err) => {
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

/**
 * Update a product's quantity. To be used by the shopping cart after a user checks out, then send how much the user
 * purchased. If the product isn't found then it'll return 404.
 * @param req
 * @param res
 */
exports.updateQuantity = (req, res) => {
    Product.updateQuantity(req.body.productName, req.body.quantityToBeRemoved, (err) => {
        // console.log(req.body)
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({message: `No product found with name ${req.body.productName}.`});
            } else {
                res.send(err);
            }
        } else {
            res.status(200).send({message: "Product quantity updated successfully."});
        }
    })
}