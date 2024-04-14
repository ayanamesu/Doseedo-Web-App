const express = require("express");
const db = require('./db');
const bodyParser = require('body-parser'); // parsing middleware - parses incoming request bodies
const cookieParser = require('cookie-parser');
const session = require('express-session');


const bcrypt = require('bcrypt');

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
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
/* Where our get/post routes will go 
    Will need to change to /api/... when implementing to our server
*/

// Sessions
app.use(session({
  secret: 'doseedo',
  resave: false,
  cookie: { maxAge: 60 * 60 *  24 * 360 }, //Cookie expiration - 60ms 60s 24h 360d
  saveUninitialized: false // generates log in system everytime you make a new session id, so make sure to set to false
}));


//Sample Get/Post Requests request
app.get('/api', (req, res) => {
  res.send('This is the server!');
});

// Login page
// Issue: Cookies are created in Postman but not the browser :(/
app.post('/api/login', async (req, res) => {
  let { email, password } = req.body;
  console.log("req.session.id: " + req.session.id);

  try {
    if (email && password) {
      const user_id = await checkCredentials(email, password); // returns the user id

      // Credentials are good
      if (user_id !== false) {
        const device = req.headers['user-agent']; // gets the login device
        req.session.user_id = user_id; // sets the session user_id to whatever it got back from the database
        
        res.cookie('user_id', user_id, { sameSite: 'none', secure: true, httpOnly: true}); // helps store the user_id in the cookie

        const session_creation = await createSession(req.session.id, user_id, device); // stores session in our db

        // if session creation was successful
        if (session_creation) {
          // req.session.id will return the session id to the frontend to create a cookie
          // We can add to this if we like
          res.status(200).json({session_id: req.session.id, user_id: user_id}); 
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
//--------------------------------------------------------------------------------------------------------------------------------
// WE DONT NEED THIS ANYMORE
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
//--------------------------------------------------------------------------------------------------------------------------------
//dbtest page for select * from user
app.get("/api/dbtest", async (req, res) => {
  try {
    const data = await select_user();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
//--------------------------------------------------------------------------------------------------------------------------------
//HomePage Register 
app.post("/api/Register", async (req, res) => {
  let { first_name, last_name, email, password } = req.body;
  console.log(req.body);
  try {
    // Check if the user already has an account with that email
    const account = await hasAccount(email);
      // Has an account --> show that they already have an account and take them back to the home page for login
    // If the user already has an account, redirect to the login page
    if (account) {
      console.log("User already has an account!");
      res.status(200).json({msg: "User already has an account!"});
      return;
    } else {
      console.log("Creating new account...");
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

//--------------------------------------------------------------------------------------------------------------------------------
//searchmedicine to get data from mysql
app.get("/api/searchmedicine", async (req, res) => {
  console.log("/searchtest --> selectMedicine")
  try {
    const data = await search_medicine();
    //this console.log is to see the data in the terminal
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Sessions - return  [ session_id, user_id]
// Postman Test - SUCCESS
app.post("/api/session", async (req, res) => {
  // Assuming the frontend is sending a res of the session_id from cookie
  try {
    const query = "SELECT user_id, logout_time FROM session WHERE id = ?";
    const [results, fields] = await db.query(query, [req.body.session_id]);

    if (results && results.length == 1 && !results[0].logout_time) {
      res.status(200).json({user_id: results[0].user_id, session_id: req.body.session_id});
    } else {
      res.status(401).json({ msg: "No session for this user"});
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Profile - return user information [ everything but password]
// Postman Test - SUCCESS
app.post('/api/profile', async (req, res) => {
  // Assuming the frontend is sending a res of the user_id
  console.log("api/profile");
  try {
    const query = "SELECT first_name, last_name, email, phone, address_1, address_2, state, city, zip_code FROM user WHERE id = ?";
    const [results, fields] = await db.query(query, [req.body.user_id]);

    if (results && results.length == 1) {
      res.status(200).json(results[0]);
    } else {
      res.status(401).json({ msg: ""});
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Profile Edit - When a user edits their basic information
// Postman Test - SUCCESS
app.post('/api/profile/edit', async (req, res) => {
  // Assuming the frontend is sending a res of the user_id
  try {
    const modified_columns = [];
    const values = [];

    Object.entries(req.body.values).forEach(([key, value]) => {
      if (value !== null) {
        modified_columns.push(key);
        values.push(value);
      }
    });

    const column_map = modified_columns.map((column, index) => `${column} = "${values[index]}"`).join(", ");
    const query = `UPDATE user SET ${column_map} WHERE id = ?`;

    const [results, fields] = await db.query(query, [req.body.user_id]);
    if (results && results.affectedRows === 1) {
      res.status(200).json({ msg: "Update successful!"});
    } else {
      res.status(500).json({ msg: "Something went wrong when updating information"});
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Account Link - Show ever patient linked to user ID (caregiver)
// Postman Test - SUCCESS
// TODO: change this name later
app.post('/api/accountLink', async (req, res) => {
  // Assuming the frontend is sending a res of the logged in user id
  try {
    const query = "SELECT user.* FROM account_link JOIN user ON account_link.patient_id = user.id WHERE account_link.caregiver_id = ?;";
    const [results, fields] = await db.query(query, [req.body.user_id]);

    if (results && results.length == 1) {
      res.status(200).json(results);
    } else {
      res.status(204).json({ msg: "No patients for this user"});
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Account Link - Links the accounts
// Postman Test - SUCCESS
app.post('/api/linkAccounts', async (req, res) => {
  // Assuming the frontend sends the logged in user id AND an email
  console.log("Linking accounts")
  console.log(req.body); 
    try {
      if (req.body.account_type === "Caregiver") {
        const insertQuery1 = "INSERT INTO account_link (caregiver_id, patient_id) SELECT ?, id FROM user WHERE email = ?;";
        const [results, fields] = await db.query(insertQuery1, [req.body.user_id, req.body.email]);
        if (results && results.affectedRows == 1) {
          res.status(201).json({ msg: "Link successful!"});
        } else {
          res.status(500).json({ msg: "Something went wrong when linking accounts"});
        }
      } else if (req.body.account_type === "Patient") {
        const insertQuery = "INSERT INTO account_link (patient_id, caregiver_id) SELECT ?, id FROM user WHERE email = ?;";
        const [results, fields] = await db.query(insertQuery, [req.body.user_id, req.body.email]);
        if (results && results.affectedRows == 1) {
          res.status(201).json({ msg: "Link successful!"});
        } else {
          res.status(500).json({ msg: "Something went wrong when linking accounts"});
        }
      } else {
        res.status(500).json({ msg: "Incorrect account_type given"});
      }
    } catch(error) {
      console.error(error);
      throw error;
    }
  });
  
  // app.post('/api/linkAccounts', async (req, res) => {
  //   // Assuming the frontend sends the logged in user id AND an email
  //     try {
  //       if (req.body.account_type === "caregiver") {
  //         var q1 = false;
  //         const insertQuery1 = "INSERT INTO account_link (caregiver_id, patient_id) SELECT ?, id FROM user WHERE email = ?;";
  //         const [results, fields] = await db.query(insertQuery1, [req.body.user_id, req.body.email]);
  //         if (results && results.affectedRows == 1) {
  //           q1 = true;
  //         }
  //         const insertQuery2 = `INSERT INTO account (user_id, account_type) VALUES (?, 'caregiver');`
  //         const [results2, fields2] = await db.query(insertQuery2, [req.body.user_id]);
  //         if (results2 && results2.affectedRows == 1 && q1) {
  //           res.status(201).json({ msg: "Link successful!"});
  //         } else {
  //           res.status(500).json({ msg: "Something went wrong when linking accounts"});
  //         }
  //       } else if (req.body.account_type === "patient") {
  //         var q1 = false;
  //         const insertQuery = "INSERT INTO account_link (patient_id, caregiver_id) SELECT ?, id FROM user WHERE email = ?;";
  //         const [results, fields] = await db.query(insertQuery, [req.body.user_id, req.body.email]);
  //         if (results && results.affectedRows == 1) {
  //           q1 = true;
  //         }
  //         const insertQuery2 = `INSERT INTO account (user_id, account_type) VALUES (?, 'patient');`
  //         const [results2, fields2] = await db.query(insertQuery2, [req.body.user_id]);
  //         if (results2 && results2.affectedRows == 1 && q1) {
  //           res.status(201).json({ msg: "Link successful!"});
  //         } else {
  //           res.status(500).json({ msg: "Something went wrong when linking accounts"});
  //         }
    
  //       } else {
  //         res.status(500).json({ msg: "Incorrect account_type given"});
  //       }
  //     } catch(error) {
  //       console.error(error);
  //       throw error;
  //     }
  //   });

/* Where our app will listen from */
app.listen(port, () => {
  console.log(`Server is listening at http://${port}`);
});

//--------------------------------------------------------------------------------------------------------------------------------
/* Where our functions are */

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
//--------------------------------------------------------------------------------------------------------------------------------
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
//--------------------------------------------------------------------------------------------------------------------------------
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

//--------------------------------------------------------------------------------------------------------------------------------
// Selects all columns from the user table
async function select_user() {
  console.log("selectuser()");
  try {
    const query = "SELECT * FROM User;";
    const [result, fields] = await db.query(query);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//--------------------------------------------------------------------------------------------------------------------------------
// Selects all columns from the prescription table
async function search_medicine() {
  console.log("searchmedicine()");
  try {
    const query = "SELECT * FROM prescription;";
    const [result, fields] = await db.execute(query);
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// -----------------------------------------------------------------------------------------------------------------------
// Add medicine to the prescription table (Tested with postman and works with mysql database)
app.post("/api/addmedicine", async (req, res) => {
  let { user_id, med_name, description, med_type, dose_amt, dose_unit, start_date, end_date, doctor_first_name, doctor_last_name, doctor_phone } = req.body;
  console.log(req.body);
  try {

    console.log("Adding medicine...");
    const insertQuery = `INSERT INTO prescription (user_id, med_name, description, med_type, dose_amt, dose_unit, start_date, end_date, 
                          doctor_first_name, doctor_last_name, doctor_phone) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [results, fields] =  await db.query(insertQuery, [user_id, med_name, description, med_type, dose_amt, dose_unit, start_date, end_date, doctor_first_name, doctor_last_name, doctor_phone]);
    if (results && results.affectedRows == 1) {
      res.status(201).json({msg: "Medicine successfully added"});
    } else {
      res.status(500).json({ "error": "Medicine addition failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Internal server error" });
  }
});
// -----------------------------------------------------------------------------------------------------------------------
// delete medicine in the prescription table (Tested with postman and works with mysql database)
app.post("/api/deletemedicine", async (req, res) => {
  const { id } = req.body;
  try {
    console.log("Deleting medicine...");
    const deleteQuery = "DELETE FROM prescription WHERE id = ?";
    const [results, fields] = await db.query(deleteQuery, [id]);
    if (results && results.affectedRows == 1) {
      res.status(200).json({msg: "Medicine successfully deleted"});
    } else {
      res.status(404).json({ "error": "Medicine not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Internal server error" });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------
// View medicine in the prescription table (Tested with postman and works with mysql database)
app.get("/api/viewmedicine", async (req, res) => {
  let { user_id } = req.body;
  console.log(req.body);
  try {
    console.log("Viewing medicine...");
    const selectQuery = `SELECT * FROM prescription WHERE user_id = ?`;
    const [results, fields] =  await db.query(selectQuery, [user_id]);
    if (results && results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ "error": "No medicine found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Internal server error" });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------
// logout api
app.post("/api/logout", async (req, res) => {
  const { session_id } = req.body;
  try {
    console.log("Logging out...");
    const updateQuery = "UPDATE session SET logout_time = NOW() WHERE id = ?";
    const [results, fields] = await db.query(updateQuery, [session_id]);
    if (results && results.affectedRows == 1) {
      res.status(200).json({msg: "Logout successful"});
    } else {
      res.status(404).json({ "error": "Session not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Internal server error" });
  }
});