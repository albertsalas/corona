const express = require('express');
const router = express.Router();
const products = require("../controllers/searchController.js");
const User = require("../models/User.js");

router.get('/search/:key', products.find);

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: "Corona Shop"});
});

router.get('/login', function (req, res) {
    res.render('login');
})

router.post('/login', function (req, res) {
    User.find(req.body.username, (err, data) => {
        // first we check if the username is valid
        if (!err && data.length === 1) {
            // then we check if the password is correct
            if (req.body.password === data[0].password) {
                req.session.loggedin = true;
                req.session.username = req.body.username;
                res.redirect('/');
                return;
            }
        }
        res.render('login', {error: true, user: req.body.username});
    });
});


module.exports = router;
