const connection = require('../public/javascripts/connection');

/**
 * Represents a User
 * @param user - new User object
 * @constructor
 */
const User = function (user) {
    this.username = user.username;
    this.password = user.password;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
};

/**
 * Query to insert new user into database
 * @param newUser - the new user object
 * @param result - the result of the query
 */
User.create = (newUser, result) => {
    connection.query("INSERT INTO User SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", {username: res.username, ...newUser});
        result(null, {username: res.username, ...newUser})
    });
};

/**
 * Queries the database to find a user using a username
 * @param username - the user's username
 * @param result - the query result
 */
User.find = (username, result) => {
    connection.query("SELECT * FROM User WHERE username = ?", username, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

/**
 * Updates a user's profile
 * @param username - the user's username
 * @param user - the user object
 * @param result - the query result
 */
User.update = (username, user, result) => {
    connection.query("UPDATE User SET username = ?, password = ?, firstName = ?, lastName = ? WHERE username = ?",
        [user.username, user.password, user.firstName, user.lastName, username], (err) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, {username: user.username, ...user});
        }
    );
};

/**
 * Delete a user using a username
 * @param username - the user's username
 * @param result - the query result
 */
User.delete = (username, result) => {
    connection.query(
        `DELETE FROM User WHERE username = ("${username}");`, (error, res) => {
            if (error) {
                console.log(error);
                return;
            }

            if (res.affectedRows === 0) {
                result({kind: "not_found"}, null);
                return;
            }

            console.log("deleted user with username: ", username);
            result(null, res);
        }
    );
};

module.exports = User;