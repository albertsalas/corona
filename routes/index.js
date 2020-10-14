var express = require('express');
var router = express.Router();
const products = require("../controllers/searchController.js");



router.get('/search/:key', products.find);

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title:"Corona Shop"});
});


module.exports = router;
