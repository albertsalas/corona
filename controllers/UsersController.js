const User = require("../models/User.js");

/**
 * Create a new user by calling on the User constructor
 *
 * @param req - request
 * @param res - response
 */

exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error while creating user."
            });
        } else {
            // res.send(data);
            res.render('login');
        }
    });
};

/**
 * Finds single user using a username
 *
 * @param req - request
 * @param res - response
 */
exports.find = (req, res) => {
    User.find(req.params.username, (err, data) => {
        if (err) {
            res.status(404).send({message: `No user found with username ${req.params.name}.`});
        } else {
            console.log(data);
            res.send(data);
        }
    });
};

/**
 * Update user using the username in the request
 *
 * @param req - request
 * @param res - response
 */
exports.update = (req, res) => {
    User.update(req.params.username, new User(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({message: `No user found with username ${req.params.name}.`});
            } else {
                res.status(500).send({message: `Could not update user with username ${req.params.name}.`});
            }
        } else {
            console.log(data);
            res.send(data);
        }
    });
};

/**
 * Delete a User with the specified username in the request
 *
 * @param req - request
 * @param res - response
 */
exports.delete = (req, res) => {
    User.delete(req.params.username, (err) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({message: `No user found with username ${req.params.username}.`});
            } else {
                res.status(500).send({message: `Could not delete user with username ${req.params.username}.`});
            }
        } else {
            res.send({message: " User was deleted successfully"});
        }
    });
};
