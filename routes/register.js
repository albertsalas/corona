var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('register');
});

// // router.post("/register", function (req, res) { 
// //     var username = req.body.username 
// //     var password = req.body.password 
// //     var firstname = req.body.firstname
// //     var lastname = req.body.lastname

// //     User.create = (username, result) => {
// //         connection.query("INSERT INTO User SET ?", username, (err, res) => {
// //             if (err) {
// //                 console.log("error: ", err);
// //                 result(err, null);
// //                 return;
// //             }
// //             console.log("created user: ", {username: username, password: password, firstname: firstname, lastname: lastname});
// //             result(null, {username: res.username, ...newUser})
// //         });
// //     }; 
// // }); 

module.exports = router;
