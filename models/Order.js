const connection = require('../public/javascripts/connection');

/**
 * Represents an order that a user places
 * @param order
 * @constructor
 */
const Order = function (order) {
    this.username = order.username;
    this.productName = order.productName;
    this.quantity = order.quantity;
    this.totalPrice = order.totalPrice;
}

/**
 * Query to insert new order into the database
 * @param newOrder
 * @param result
 */
Order.create = (newOrder, result) => {
    connection.query("INSERT INTO `Order` (username, productName, quantity, totalPrice) VALUES (?, ?, ?, ?);",
        [newOrder.username, newOrder.productName, newOrder.quantity, newOrder.totalPrice], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created order: ", {order_id: res.insertId, ...newOrder});
            result(null, {order_id: res.insertId, ...newOrder});
        });
};

module.exports = Order;