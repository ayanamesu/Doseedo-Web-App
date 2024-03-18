const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var mysql = require("mysql2/promise");
const cors = require("cors");

// import cors from 'cors'

app.use(cors());

app.get("/dbtest", async (req, res) => {
  // res.json({message: 'Hello from backend!'});
  //  console.log(`testing db`);
  // const test = JSON.stringify(selecttest(db));
  // res.json(test);
  // console.log(test);

  try {
    const data = await selecttest();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});


app.get("/searchtest", async (req, res) => {
  // res.json({message: 'Hello from backend!'});
  //  console.log(`testing db`);
  // const test = JSON.stringify(selecttest(db));
  // res.json(test);
  // console.log(test);

  try {
    const data = await selectmedicine();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
// app.get("/searchtest", async (req, res) => {
//   console.log("hello user has searched something");
// });

app.listen(port, () => {
  console.log(`Server is listening at http://${port}`);
});

//my sql database

async function connectToDB() {
  //console.log("Hello from connectToDB!");
  const db = mysql.createConnection({
    host: "db-bte.ch4s2cmka1az.us-east-2.rds.amazonaws.com",
    user: "admin",
    database: "doseedodb_test", // insert your db info here
    password: "password", //mysql password here
    port: "3306", //default port for mysql
  });
  return db;
}
//post is safer
//get see url database names and etc in url
async function selecttest() {
  const db = await connectToDB();
  try {
    const query = "SELECT * FROM User;";
    const [result, fields] = await db.execute(query);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function selectmedicine() {
  const db = await connectToDB();
  try {
    const query = "SELECT * FROM Prescription;";
    const [result, fields] = await db.execute(query);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
function inserttest(db) {
  //   console.log("Testing insert into db");
  const reqBody = {
    first_name: req.body.fname,
    last_name: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    address_1: req.body.address1,
    state: req.body.state,
    city: req.body.city,
    zip_code: req.body.zipCode,
    phone: req.body.phone,
  };
  const insertQuery = `INSERT INTO User (first_name, last_name, email, password, address_1, state, city, zip_code, phone) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(insertQuery, [
    reqBody.first_name,
    reqBody.last_name,
    reqBody.email,
    reqBody.password,
    reqBody.address_1,
    reqBody.state,
    reqBody.city,
    reqBody.zip_code,
    reqBody.phone,
  ]);

  res.send("Successfully inserted into table!");
}

// function alter_test(db, id, name) {
//   db.query(`UPDATE test SET name=(?) WHERE id=(?)`, [name, id], function(err) {
//     if (err) {
//       console.error('Error executing query: ' + err.stack);
//       return;
//     }
//     console.log("Successfully updated table!");
//   })
// }

(async function main() {
  try {
    // connection = con.connect;

    console.log("Connected!");
    // const db = connectToDB();
    // selecttest(db);
    // inserttest(db);
    // alter_test(db,4, "grand");
  } catch (error) {
    console.error(error);
  }
})();
