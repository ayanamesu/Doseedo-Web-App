const express = require("express");
const db = require('./db');
const bodyParser = require('body-parser'); // parsing middleware - parses incoming request bodies
const port = process.env.PORT || 8000;
var mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Configure CORS to allow requests from a specific origin
const corsOptions = {
  origin: 'http://localhost:3006', // Whitelist the specific origin
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

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

  // Just as an example - delete this
  const userAgent = req.headers['user-agent'];
  console.log("Here is the device info:" + userAgent);
  
  try {
    const creds = await checkCredentials(email, password);
    console.log("creds = ", creds);
    if (creds === true) {
      console.log("Credentials are good B)");
      res.json({ "message": "Credentials are good" });
      // TODO: Need to redirect to the user's homepage
    } else {
      res.json({ "message": "WHOOPS something went wrong" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Internal server error" });
  }
});

app.get('/login', (req, res) => {
  res.redirect('/login'); 
});

// Sign Up Page
app.post('/api/signup', async (req, res) => {
  let { fname, lname, email, password } = req.body;
  console.log("We're in the backend now!\n");
  try {
    // Check if the user already has an account with that email
    const account = await hasAccount(email);
      // Has an account --> show that they already have an account and take them back to the home page for login
    // If the user already has an account, redirect to the login page
    if (account) {
      console.log("User already has an account!");
      res.redirect('http://localhost:3006/login');
      return;
    } else {
      console.log("Creating new account...");
      const insertQuery = `INSERT INTO user (first_name, last_name, email, password) 
                       VALUES (?, ?, ?, ?)`;
      const [results, feilds] =  await db.query(insertQuery, [fname, lname, email, password]);
      if (results && results.affectedRows == 1) {
        console.log("ACCOUNT SUCCESSFULLY CREATED");
        res.redirect('http://localhost:3006/login');
      } else {
        console.log("Error has occured :(");
        res.status(500).json({ "error": "Account creation failed" });
      } 
    }
      // No account --> create the account 
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Internal server error" });
  }
});

//dbtest page for select * from user
app.get("/api/dbtest", async (req, res) => {
  try {
    const data = await select_user();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/api/dbtest2", async (req, res) => {
  let { first_name, last_name, email, password } = req.body;
  console.log(req.body);
  try {
    // Check if the user already has an account with that email
    const account = await hasAccount(email);
      // Has an account --> show that they already have an account and take them back to the home page for login
    // If the user already has an account, redirect to the login page
    if (account) {
      console.log("User already has an account!");
      res.json({"data": "True"});
      return;
    } else {
      console.log("Creating new account...");
      const insertQuery = `INSERT INTO user (first_name, last_name, email, password) 
                       VALUES (?, ?, ?, ?)`;
      const [results, feilds] =  await db.query(insertQuery, [first_name, last_name, email, password]);
      if (results && results.affectedRows == 1) {
        console.log("ACCOUNT SUCCESSFULLY CREATED");
        res.json({"data": "False"});
      } else {
        console.log("Error has occured :(");
        res.status(500).json({ "error": "Account creation failed" });
      } 
    }
      // No account --> create the account 
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Internal server error" });
  }
});


//searchtest to get data from mysql
app.get("/api/searchtest", async (req, res) => {
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

async function hasAccount(email) {
  console.log("Checking if they have an account...");
  try {
    const query = "SELECT * FROM user WHERE email = ?;"
    const [results, fields] = await db.query(query, [email]);
    if (results && results.length == 1) {
      return true;
    } else {
      return false;
    } 
  } catch (error) {
    console.log(error);
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

// Back Up method for insert test for the dbtest2 page




