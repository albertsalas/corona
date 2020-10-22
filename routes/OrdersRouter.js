const express = require('express');
const router = express.Router();
const orders = require("../controllers/OrdersController.js");

router.post('/', orders.create);

module.exports = router;