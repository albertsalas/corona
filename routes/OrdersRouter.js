const express = require('express');
const router = express.Router();
const orders = require("../controllers/OrdersController.js");

router.post('/', orders.create);
router.get('/', function(req,res, next) {
    res.render('orders', {title:'Orders'});
});

module.exports = router;