const express = require('express');
const router = express.Router();
const connection = require('../public/javascripts/connection');
const User = require("../models/User.js");

router.get('/', function(req, res){
    res.render('login');
});

router.post('/', function (req, res) {
    User.find(req.body.username, (err, data) => {
        var pass = req.body.password;
        if (err || pass !== data[0].password) {
            console.log(req.body.username);
            console.log(pass);
            console.log(data);
            res.render('login', {error: true, user: data[0].username});
        } else {
            res.render('Dashboard', {username: data[0].username, title: "Corona Shop"});
        }
    });
});

module.exports = router;