const express = require('express');
const router = express.Router();
const users = require("../controllers/UsersController.js");

// router.get('/', user.register);

router.post('/', users.create);

router.post('/login', users.compare);

router.get('/user/:username', users.find);

router.put('/:username', users.update);

router.delete('/:username', users.delete);

module.exports = router;
