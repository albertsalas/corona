const Order = require("../models/Order.js");


exports.create = (req, res) => {
    const order = new Order({
       username: req.body.username,
       productName: req.body.productName,
       quantity: req.body.quantity,
        totalPrice: req.body.totalPrice
    });

    Order.create(order, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error while placing order."
            });
        } else {
            res.send("Order placed successfully.")
        }
    })
}

exports.findAllUserOrders = (req, res) => {
    Order.findAllUserOrders(res.locals.username,(err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "An error occurred when retrieving orders."});
        } else {
            console.log(data);
            res.send(data);
        }
    });
}
