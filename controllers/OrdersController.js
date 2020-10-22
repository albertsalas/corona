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
                message: err.message || "Error while creating product."
            });
        } else {
            res.send("Order placed successfully.")
        }
    })
}
