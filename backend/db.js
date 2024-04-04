const mysql = require('mysql2');
const pool = mysql.createPool({
        // host: "db-bte.ch4s2cmka1az.us-east-2.rds.amazonaws.com",
        // user: "admin",
        // database: "doseedodb_test", // insert your db info here
        // password: "password", //mysql password here
        // port: "3306", //default port for mysql
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        database: "csc648db", // insert your db info here
        password: "Wing12345678L", //mysql password here
        port: "3306",
});

const promisePool = pool.promise();
module.exports = promisePool;
