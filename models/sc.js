const connection = require('../public/javascripts/connection');

/**
 * Represents a product
 * @param product - new product object
 * @constructor
 */
const Product = function (product) {
    // this.name = product.name;
    // this.description = product.description;
    // this.price = product.price;
    this.quantity = product.quantity;
};

/**
 * Updates a product's information
 * @param name - the product name
 * @param product - the product object
 * @param result - the query result
 */
Product.update = (name, product, result) => {
    connection.query("UPDATE Product SET quantity = ? WHERE name = ?",
        [name.quantity, name], (err) => {
            // console.log(product)
            if (err) {
                result(null, err);
                return;
            }
            result(null, {name: product.name, ...product});
        }
    );
};


module.exports = Product;