const express = require("express");
var mysql = require("mysql2/promise");
const cors = require("cors");

const bodyParser = require('body-parser'); // parsing middleware - parses incoming request bodies
const cookieParser = require('cookie-parser');
const session = require('express-session');


const db = require('./db');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Configure CORS to allow requests from a specific origin
const corsOptions = {
  origin: 'http://localhost:3006', // Whitelist the specific origin
  methods: ["GET", "POST"],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 

// Sessions
app.use(session({
  secret: 'doseedo',
  resave: false,
  cookie: { expires: 60 * 60 *  24 * 360 }, //Cookie expiration - 60ms 60s 24h 360d
  saveUninitialized: false // generates log in system everytime you make a new session id, so make sure to set to false
}));

/* ROUTES
    Will need to change to /api/... when implementing to our server
*/

// Login page
// Issue: Cookies are created in Postman but not the browser :(/
app.post('/api/login', async (req, res) => {
  let { email, password } = req.body;
  let session_id = req.sessionID;

  try {
    if (email && password) {
      const user_id = await checkCredentials(email, password); //returns the user id

      // Credentials are good
      if (user_id !== false) {
        const device = req.headers['user-agent']; //get's the login device
        req.session.user_id = user_id; // sets the session user_id to whatever it got back from the database

        res.cookie('user_id', user_id, { sameSite: 'none', secure: true, httpOnly: true}); // helps store the user_id in the cookie
        const session_creation = await createSession(session_id, user_id, device); // stores session in our db

        // if session creation was successful
        if (session_creation) {
          //req.session will return the session information to the frontend
          console.log(req.session)
          res.status(200).json(req.session);
        } else {
          res.status(500);
        }

      } else {
        res.status(403).json({ msg: "Wrong email or password :(" }); // Error handling style needs to be done in the front end
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Internal server error" });
  }
});

// This was some test code, but idk how to do frontend things
// // Making sure the user is logged in
// app.get("/api/login", (req, res) => {
//   console.log("API LOGIN")

//   if (req.data.user_id) {
//     console.log("WE IN THIS BITCH")
//     console.log(req.data.user_id);
//     console.log(req.session);

//     res.send({ loggedIn: true, user: req.session.user_id });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

// Sign Up Page
app.post('/api/signup', async (req, res) => {
  let { first_name, last_name, email, password } = req.body;
  console.log("We in the right route\n" + req.body.data);

  try {
    // Check if the user already has an account with that email
    const account = await hasAccount(email);

    if (account) {
      console.log("ALREADY GOT ONE")
      res.status(200).json({msg: "User already has an account!"});
      return;
    } else {
      console.log("oh no more")
      // hash the password before storing it on the database
      const hash_pwd = await bcrypt.hash(password, 10);
      console.log(hash_pwd);

      const insertQuery = `INSERT INTO user (first_name, last_name, email, password) 
                       VALUES (?, ?, ?, ?)`;
      const [results, fields] =  await db.query(insertQuery, [first_name, last_name, email, hash_pwd]);
      
      if (results && results.affectedRows == 1) {
        res.status(201).json({msg: "ACCOUNT SUCCESSFULLY CREATED"});
      } else {
        res.status(500).json({ "error": "Account creation failed" });
      } 
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Internal server error" });
  }
});

/* Where our app will listen from */
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is listening at http://${port}`);
});


/* FUNCTIONS */

// This was a test thing: 
// Checks for cookie information
// function validateCookie(req, res, next) {
//   const { cookies } = req;
//   if ('session_id' in cookies) {
//     console.log('Session ID exists!');
//     if (cookies.session_id === '123456') {
//       next()
//     } else {
//       res.status(403).send({ msg: 'Not authenticated'});
//     }
//   } else {
//     res.status(403).send({ msg: 'Not authenticated'});
//   };
// }

// Checks for user login information
async function checkCredentials(email, password) {
  console.log("Checking credentials...");
  try {
    const query = "SELECT id, password FROM User WHERE email=?;";
    const [results, fields] = await db.query(query, [email]);
    if (results && results.length == 1) {
      let dbPassword = results[0].password;
      const isValid = await bcrypt.compare(password, dbPassword);
      if (isValid) {
        console.log("The user id is " + results[0].id);
        return results[0].id;
      }
      return isValid;
    } else {
      console.log("ERROR No user found :(");
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Craetes a new session when a user logs in
async function createSession(session_id, user_id, device) {
  console.log("Creating new session...");
  try {
    const query = "INSERT INTO session (id, user_id, device, login_time) VALUES (?, ?, ?, NOW());";
    const [results, fields] = await db.query(query, [session_id, user_id, device]);

    if (results && results.affectedRows == 1) {
      return true;
    } else {
      return false;
    } 
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Checks if the user has an account
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


/* Probs Delete from here... 
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
 ... To here */

