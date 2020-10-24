const express = require('express');
const router = express.Router();
const orders = require("../controllers/OrdersController.js");

router.post('/', orders.create);
router.get('/',
    function (req, res, next) {
        if (!res.locals.username) {
            res.redirect('/');
        } else {
            next();
        }
    },
    orders.findAllUserOrders
);

module.exports = router;