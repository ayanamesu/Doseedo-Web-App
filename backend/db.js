const mysql = require('mysql2');

let host, user, database, password;
if (process.env.STATUS === 'dev') {
        host = process.env.DB_HOST;
        user = process.env.DB_USER;
        database = process.env.DB_SCHEMA;
        password = process.env.DB_PASS;
} else if (process.env.STATUS === 'prod') {
        host = process.env.PROD_DB_HOST;
        user = process.env.PROD_DB_USER;
        database = process.env.PROD_DB_SCHEMA;
        password = process.env.PROD_DB_PASS;
} else { // Without an ENV file, you can input your DB data here
        host = "localhost";
        user = "root";
        database = "doseedodb";
        password = "pass";
}

const pool = mysql.createPool({
        host: host,
        user: user,
        database: database,
        password: password,
        port: "3306",
        connectionLimit: 10
});

const promisePool = pool.promise();
module.exports = promisePool;
