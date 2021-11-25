const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'csc317db',
    password: '0000'
});

module.exports = db.promise();