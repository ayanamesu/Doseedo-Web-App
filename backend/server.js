const express = require("express");

const port = process.env.PORT || 8000;
var mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(express.json());
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

app.post("/dbtest2", async (req, res) => {
  console.log(req.body);
  
  try {
    const db = await connectToDB();
    inserttest(db, req);
    return res.send("fuck yes");
  
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
});

//searchtest to get data from mysql
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
    // host: "db-bte.ch4s2cmka1az.us-east-2.rds.amazonaws.com",
    // user: "admin",
    // database: "doseedodb_test", // insert your db info here
    // password: "password", //mysql password here
    // port: "3306", //default port for mysql
    host: "localhost",
    user: "root",
    database: "csc648db", // insert your db info here
    password: "Wing12345678L", //mysql password here
    port: "3306",
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
    db.end();
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
    db.end();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
function inserttest(db, req) {
    console.log("Testing insert into db");
  const reqBody = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  }; 
  const insertQuery = `INSERT INTO user (first_name, last_name, email, password) 
                       VALUES (?, ?, ?, ?)`;
  db.query(insertQuery, [
    reqBody.first_name,
    reqBody.last_name,
    reqBody.email,
    reqBody.password,
  ]);
}

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
