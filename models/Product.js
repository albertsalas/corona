express = require('express');
const connection = require('../public/javascripts/connection');

// TODO: write documentation

const Product = function (product) {
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;
};

Product.create = (newProduct, result) => {
    connection.query("INSERT INTO Product SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created product: ", {name: res.name, ...newProduct});
        result(null, {name: res.name, ...newProduct})
    }); // query
};

Product.find = (name, result) => {
    connection.query("SELECT * FROM Product WHERE name = ?", name, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })
};

/**
 * Evaluates query and resolves promise if there are no errors with the query.
 */
Product.findAll = result => {
    connection.query(`SELECT * FROM Product`, (error, res) => {
        if (error) {
            console.log(error);
        } else {
            result(null, res);
        }
    }); // query
};

Product.update = (product, result) => {
    connection.query("UPDATE Product SET name = ? description = ?, price = ?, quantity = ?",
        [product.name, product.description, product.price, product.quantity],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, {name: product.name, ...product});
        }
    )
};

Product.delete = (name, result) => {
    connection.query(
        `DELETE FROM Product WHERE name = ("${name}");`, (error, res) => {
            if (error) {
                console.log(error);
                return;
            }

            if (res.affectedRows === 0) {
                result({kind: "not_found"}, null);
                return;
            }

            console.log("deleted product with name: ", name);
            result(null, res);
        }
    ); // query
};

module.exports = Product;