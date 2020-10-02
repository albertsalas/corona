var express = require('express');
var router = express.Router();

router.get('/', function(req,res, next) {
    res.render('productDetails', {text:'Express'});
  });

module.exports = router;