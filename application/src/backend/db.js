var mysql = require('mysql2');

function displayWarningMessage(warning) {
  switch (warning.Code) {
    case 1007:
      console.log(`Skipping Database Creation --> ${warning.Message}`);
      break;
    case 1050:
      console.log(`Skipping Table Creation --> ${warning.Message}`);
      break;
  }
}

function connectToDB() {
  console.log("Hello from connectToDB!");
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "csc648db",  // insert your db info here
    password: "Wing12345678L", //mysql password here
    port: "3306"  //default port for mysql
  }
  );
  return db;
}

function selecttest(db) {
  console.log("Hello from test");
  db.query('SELECT * FROM User;', function(err, rows) {
  if (err) {
    console.error('Error executing query: ' + err.stack);
    return;
  }

  // Log the fetched rows
  console.log('Fetched rows:', rows);
  });
}
function inserttest(db) {
  console.log("Testing insert into db");
  const insertQuery = `INSERT INTO User (first_name, last_name, email, password, address_1, state, city, zip_code, phone) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = ["Bob", "Miller", "miller74@email.com", "dada", "123 Back Street", "CA", "SF", "12345", "1234567890"];

  db.query(insertQuery, values, function(err, result) {
    if (err) {
      console.error('Error inserting into database:', err);
      return;
    }
    console.log('Insert successful:', result);
  });
}
(async function main() {
  try {
    // connection = con.connect;
  
    console.log("Connected!");
    const db = connectToDB();
    selecttest(db);
    inserttest(db);
  } catch (error) {
    console.error(error);
    // if (connection != null) {
    //   connection.close();
    // }
  }
})();

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


// async function makeDatabase(connection) {
//   //TODO make sure to change yourdbnamehere
//   const [result, _] = await connection.query(
//     "CREATE DATABASE IF NOT EXISTS csc648db;"
//   );
//   if (result && result.warningStatus > 0) {
//     const [warningResult, _] = await connection.query("SHOW WARNINGS");
//     displayWarningMessage(warningResult[0]);
//   } else {
//     console.log("Created Database!");
//   }
// }

// async function makeUsersTable(connection) {
//   const [result, _] = await connection.query(
//     // Users Table SQL Goes here
//     `
//       CREATE TABLE IF NOT EXISTS User (
//       id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
//       first_name varchar(255) NOT NULL,
//       last_name varchar(255) NOT NULL,
//       email varchar(255) NOT NULL,
//       password varchar(255) NOT NULL,
//       address_1 varchar(255) NOT NULL,
//       address_2 varchar(255),
//       state char(2) NOT NULL,
//       city varchar(17) NOT NULL,
//       zip_code char(5) NOT NULL,
//       phone varchar(10) NOT NULL
//     `
//   );

//   if (result && result.warningStatus > 0) {
//     const [warningResult, _] = await connection.query("SHOW WARNINGS");
//     displayWarningMessage(warningResult[0]);
//   } else {
//     console.log("Created Users Table!");
//   }
// }
// async function makeAccountTable(connection) {
//   const [result, _] = await connection.query(
//     // Account Table SQL Goes here
//     ` 
//     CREATE TABLE Account (
//       user_id int PRIMARY KEY,
//       permission_number smallint NOT NULL,
//       account_type enum('user', 'value2')
//     `
//   );
//   if (result && result.warningStatus > 0) {
//     const [warningResult, _] = await connection.query("SHOW WARNINGS");
//     displayWarningMessage(warningResult[0]);
//   } else {
//     console.log("Created Account Table!");
//   }
// }