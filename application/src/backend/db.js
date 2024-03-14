var mysql = require('mysql2/promise');

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

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Wing12345678L"
});

async function makeDatabase(connection) {
  //TODO make sure to change yourdbnamehere
  const [result, _] = await connection.query(
    "CREATE DATABASE IF NOT EXISTS csc648db;"
  );
  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Database!");
  }
}

async function makeUsersTable(connection) {
  const [result, _] = await connection.query(
    // Users Table SQL Goes here
    `
      CREATE TABLE IF NOT EXISTS User (
      id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
      first_name varchar(255) NOT NULL,
      last_name varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      address_1 varchar(255) NOT NULL,
      address_2 varchar(255),
      state char(2) NOT NULL,
      city varchar(17) NOT NULL,
      zip_code char(5) NOT NULL,
      phone varchar(10) NOT NULL
    `
  );

  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Users Table!");
  }
}


(async function main() {
  let connection = null;
  try {
    connection = await getConnection();
    await makeDatabase(connection); // make DB
    //TODO make sure to change yourdbnamehere
    await connection.query("USE csc648db"); // set new DB to the current DB
    await makeUsersTable(connection); // try to make user table
    connection.close();
    return;
  } catch (error) {
    console.error(error);
    if (connection != null) {
      connection.close();
    }
  }
})();

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
