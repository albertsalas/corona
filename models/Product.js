const connection = require('../public/javascripts/connection');

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
    });
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
 * @param name - the product name
 * @param product - the product object
 * @param result - the query result
 */
Product.update = (name, product, result) => {
    connection.query("UPDATE Product SET name = ?, description = ?, price = ?, quantity = ? WHERE name = ?",
        [product.name, product.description, product.price, product.quantity, name], (err) => {
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


Product.updateQuantity = (productName, quantityToBeRemoved, result) => {
    connection.query("UPDATE Product SET quantity = quantity - ? WHERE name = ?;", [quantityToBeRemoved, productName],
        (err, res) => {
            if (err) {
                result(null, err);
            } else if (res.affectedRows === 0) {
                result({kind: "not_found"}, null);
            } else {
                console.log(res);
                result(null, {name: productName})
            }
        }
    );
};

module.exports = Product;