const express = require('express');
const router = express.Router();
const connection = require('../public/javascripts/connection');

router.get('/', function(req, res){
    res.render('login');
});

// router.post('login', function(req, res){
//     let temp = req.body.username;
//     connection.query("SELECT * FROM User WHERE username = ?", temp, (err, result) => {
//         if (err || result.username != temp) {
//             console.log("error: ", err);
//             res.render('login', {error: true, user: temp});
//             return;
//         }
//         res.render('/Dashboard', {username: temp});
//     });
// });

module.exports = router;