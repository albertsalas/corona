var express = require('express');
var router = express.Router();


router.get('/', function(req,res, next) {
  res.render('ShoppingCart', {text:'Express'});
});

module.exports = router;