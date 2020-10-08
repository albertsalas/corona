const express = require('express');
const router = express.Router();
const products = require("../controllers/ProductsController.js");

router.post('/', products.create);

router.get('/edit', products.edit);

router.get('/:name', products.find);

router.get('/', products.findAll);

router.put('/:name', products.update);

router.delete('/:name', products.delete);

module.exports = router;
