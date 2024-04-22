const mysql = require('mysql2');
const pool = mysql.createPool({
        /* Make sure to uncomment this when we move this to the server! */
        // host: "db-bte.ch4s2cmka1az.us-east-2.rds.amazonaws.com",
        // user: "admin",
        // database: "doseedodb", 
        // password: "pass", 
        // port: "3306", 
        // connectionLimit: 10,
        /* Make sure to comment this out when we move this to the server! */
        // WING DB
        // host: "localhost",
        // user: "root",
        // database: "csc648newdb", // insert your db info here
        // password: "Wing12345678L", //mysql password here
        // port: "3306",

        // ALEIA DB
       host: "localhost",
       user: "root",
       database: "doseedodb", // insert your db info here
       password: "pass", //mysql password here
       port: "3306",
        //Yuto DB
        //      host: "localhost",
        //      user: "root",
        //      database: "doseedodb", // insert your db info here
        //      password: "password", //mysql password here
        //      port: "3306",
});

const promisePool = pool.promise();
module.exports = promisePool;
