const connection = require('../public/javascripts/connection');
const Product = require("../models/Product.js");


console.log("HEYYYYY");
console.log("it works????")

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
