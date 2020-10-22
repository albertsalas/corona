const connection = require('../public/javascripts/connection');
const Product = require("../models/Product.js");
const sc = require("../models/sc.js");

exports.find = (req, res) => {
    Product.find(req.params.key, (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log(data);
            res.send({item:data});
        }
    });
};


exports.update = (req, res) => {
    
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    sc.update(req.params.name, new sc(req.body), (err, data) => {
        console.log(req.body)
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({message: `No product found with name ${req.params.name}.`});
            } else {
                res.status(500).send({message: `Could not update product with name ${req.params.name}.`});
            }
        } else {
            res.send(data);
        }
    });
};