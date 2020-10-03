const connection = require('../public/javascripts/connection');

// TODO: write documentation
/**
 * Represents a product
 * @param product - new product object
 * @constructor
 */
const Product = function (product) {
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;
};

/**
 * Query to insert new product into database
 * @param newProduct - the product object
 * @param result - the result of the query
 */
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

/**
 * Queries the database to find a product using a name
 * @param name - the product name
 * @param result - the query result
 */
Product.find = (name, result) => {
    connection.query("SELECT * FROM Product WHERE name = ?", name, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

/**
 * Finds all products in the database
 * @param result - the query results
 */
Product.findAll = result => {
    connection.query(`SELECT * FROM Product`, (error, res) => {
        if (error) {
            console.log(error);
        } else {
            result(null, res);
        }
    });
};

/**
 * Updates a product's information
 * @param product - the product object
 * @param result - the query result
 */
Product.update = (product, result) => {
    connection.query("UPDATE Product SET name = ? description = ?, price = ?, quantity = ?",
        [product.name, product.description, product.price, product.quantity], (err) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, {name: product.name, ...product});
        }
    );
};

/**
 * Delete a product using a name
 * @param name - the product name
 * @param result - the query result
 */
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
    );
};

module.exports = Product;