var express = require('express');
const  connection = require('../public/javascripts/connection');

const User = function(user) {
    this.username = user.username;
    this.password = user.password;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
};

User.create = (newCustomer, result) => {
    // TODO: mySQL
};

User.find = (name) => {
    // TODO: SQL
};

User.update = (name) => {
    // TODO: SQL
};

User.remove = (username, result) => {
    // TODO: mySQL
};

module.exports = User;