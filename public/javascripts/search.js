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


// Product.find = (name, result) => {
//     connection.query("SELECT * FROM Product WHERE name = ?", name, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//         else{
//             console.log("zzzz")
//             //res.render('index', {data: beer});
//         }
       
//     });
// };