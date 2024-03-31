const express = require("express");
const db = require('./db');
const bodyParser = require('body-parser'); // parsing middleware - parses incoming request bodies
const port = process.env.PORT || 8000;
var mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


/* Where our get/post routes will go 
    Will need to change to /api/... when implementing to our server
*/

//Sample Get/Post Requests request
app.get('/api', (req, res) => {
  res.send('This is the server!');
});

// Login page
app.post('/api/login', async (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);
  try {
    const creds = await checkCredentials(email, password);
    console.log("creds = ", creds);
    if (creds === true) {
      console.log("Credentials are good B)");
      // TODO: Need to redirect to the user's homepage
    } else {
      res.json({ "message": "WHOOPS something went wrong" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Internal server error" });
  }
});

// Sign Up Page


//dbtest page for select * from user
app.get("/dbtest", async (req, res) => {
  // res.json({message: 'Hello from backend!'});
  //  console.log(`testing db`);
  // const test = JSON.stringify(selecttest(db));
  // res.json(test);
  // console.log(test);

  try {
    const data = await select_user();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/dbtest2", async (req, res) => {
  console.log(req.body);
  
  try {
    const db = await connectToDB();
    insert_test(db, req);
    return res.send("fuck yes");
  
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
});

//searchtest to get data from mysql
app.get("/searchtest", async (req, res) => {
  console.log("/searchtest --> selectMedicine")
  try {
    const data = await select_medicine();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});


/* Where our app will listen from */
app.listen(port, () => {
  console.log(`Server is listening at http://${port}`);
});


/* Where our functions are */

// Checks for user login information
// TODO: Implement bcrypt
async function checkCredentials(email, password) {
  console.log("Checking credentials...");
  try {
    const query = "SELECT password FROM User WHERE email=?;";
    const [results, fields] = await db.query(query, [email]);
    if (results && results.length == 1) {
      let dbPassword = results[0].password;
      return password === dbPassword;
    } else {
      console.log("ERROR No user found :(");
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//post is safer
//get see url database names and etc in url

// Selects all columns from the user table
async function select_user() {
  console.log("selecttest()");
  try {
    const query = "SELECT * FROM User;";
    const [result, fields] = await db.query(query);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Selects all columns from the prescription table
async function select_medicine() {
  const db = await connectToDB();
  console.log("selectmedicine()");
  try {
    const query = "SELECT * FROM prescription;";
    const [result, fields] = await db.execute(query);
    db.end();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Inserts a new user to the db
function insert_test(db, req) {
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

// (async function main() {
//   try {
//     // connection = con.connect;

//     console.log("Connected!");
//     // const db = connectToDB();
//     // selecttest(db);
//     // inserttest(db);
//     // alter_test(db,4, "grand");
//   } catch (error) {
//     console.error(error);
//   }
// })();
