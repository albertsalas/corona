var mysql = require('mysql');

// database setup
const connection = mysql.createConnection({
    host: process.env.JAWSDB_MARIA_HOST,
    user: process.env.JAWSDB_MARIA_USER,
    password: process.env.JAWSDB_MARIA_PASSWORD,
    database: process.env.JAWSDB_MARIA_DATABASE,
});
console.log("database created!");
module.exports = connection;