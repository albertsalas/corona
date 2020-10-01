var mysql = require('mysql');

// database setup
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
console.log("database created!");
module.exports = connection;