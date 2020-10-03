const express = require('express');
const router = express.Router();
const users = require("../controllers/UsersController.js");

router.post('/', users.create);

router.get('/:username', users.find);

router.put('/:name', users.update);

router.delete('/:username', users.delete);

module.exports = router;
