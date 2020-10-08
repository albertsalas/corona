var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/register', function(req, res){
    res.render('register');
});

// router.post("/register", function (req, res) { 
//     var username = req.body.username 
//     var password = req.body.password 
//     User.register(new User({ username: username }), 
//             password, function (err, user) { 
//         if (err) { 
//             console.log(err); 
//             return res.render("register"); 
//         } 
  
//         passport.authenticate("local")( 
//             req, res, function () { 
//             res.render("/"); 
//         }); 
//     }); 
// }); 

module.exports = router;
