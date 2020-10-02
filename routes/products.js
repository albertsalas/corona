var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = require('../public/javascripts/connection');

// we use an async function so that the page doesn't render before the results are returned from the database
router.get('/', async function (req, res, next) {
    let products = await getAllProducts();
    res.render('testing', {data: products});
});

// gets all the products from the database
function getAllProducts() {
    return new Promise(function (resolve, reject) {
        connection.query(
            `SELECT * FROM Product`,
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                } else {
                    resolve(results);
                }
            }
        ); // query
    });
}

// Add a product to the database
router.post('/', function (req, res, next) {
    res.send("posting product to database");
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let quantity = req.body.quantity;

    connection.query(
        `INSERT INTO Product (name, description, price, quantity)
        VALUES ("${name}", "${description}", "${price}", "${quantity}");`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
            }
        }
    ); // query
});

// Remove product from the database
router.delete('/', function (req, res, next) {
    let name = req.body.name;
    connection.query(
        `DELETE FROM Product WHERE name = ("${name}");`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
            }
        }
    ); // query
});

// Update product
router.put('/products', function (req, res, next) {
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let quantity = req.body.quantity;

    connection.query(
        `UPDATE Product SET NAME = ("${name}"), DESCRIPTION = ("${description}"), PRICE = ("${price}"), 
                QUANTITY = ("${quantity}"));`,
        (error, results, fields) => {
            if (error) throw error;
        }
    ); // query
});

module.exports = router;
