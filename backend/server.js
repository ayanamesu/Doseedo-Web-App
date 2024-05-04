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
    Will need to change to /... when implementing to our server
*/

// Sessions
app.use(session({
  secret: 'doseedo',
  resave: false,
  cookie: { maxAge: 60 * 60 *  24 * 360 }, //Cookie expiration - 60ms 60s 24h 360d
  saveUninitialized: false // generates log in system everytime you make a new session id, so make sure to set to false
}));

/** LOGIN
 * Frontend req: email, password
 * Backend res: Status code, session_id, user_id, account_type
 * Postman Check - SUCCESS
 */
app.post('/login', async (req, res) => {
  
  let { email, password } = req.body;

  if (!email || !password){
    return res.status(400).json({ msg: "One or both of the fields are missing"});
  }
  
  try {
    if (email && password) {
      const user_id = await checkCredentials(email, password); // returns the user id
      const userAccType = await getAccountType(user_id);
      // Credentials are good
      if (user_id !== false) {
        const device = req.headers['user-agent']; // gets the login device
        req.session.user_id = user_id; // sets the session user_id to whatever it got back from the database
        
        res.cookie('user_id', user_id, { sameSite: 'none', secure: true, httpOnly: true}); // helps store the user_id in the cookie

        const session_creation = await createSession(req.session.id, user_id, device); // stores session in our db

        if (session_creation) {
          // req.session.id will return the session id to the frontend to create a cookie
          return res.status(200).json({session_id: req.session.id, user_id: user_id, user_accountType: userAccType}); 
        } else {
          return res.status(500);
        }

      } else {
        return res.status(403).json({ msg: "Wrong email or password :(" }); // Error handling style needs to be done in the front end
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------
/** Registration
 * Frontend req: first_name, last_name, email, password, account_type
 * Backend res: Status code, msg
 * Postman Check - SUCCESS
 */ 
app.post("/register", async (req, res) => {
  let { first_name, last_name, email, password, account_type } = req.body;

  if (!first_name || !last_name || !email || !password || !account_type) {
    return res.status(400).json({ msg: "One or more of the fields are missing"});
  }

  try {
    // Check if the user already has an account with that email
    const user_id = await hasAccount(email);
    // Has an account --> show that they already have an account and take them back to the home page for login
    // If the user already has an account, redirect to the login page
    if (user_id) {
      console.log("User already has an account!");
      return res.status(200).json({msg: "User already has an account!"});
    } else {
      // hash the password before storing it on the database
      const hash_pwd = await bcrypt.hash(password, 10);
      const insertQuery = `INSERT INTO user (first_name, last_name, email, password, account_type) 
                       VALUES (?, ?, ?, ?, ?)`;
      const [results, fields] =  await db.query(insertQuery, [first_name, last_name, email, hash_pwd, account_type]);
      
      if (results && results.affectedRows == 1) {
        return res.status(201).json({msg: "ACCOUNT SUCCESSFULLY CREATED"});
      } else {
        return res.status(500).json({ "error": "Account creation failed" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------

/** Session
 * Verifies the session for a user
 * Frontend req:session
 * Backend res: Status code, user_id, session_id
 * Postman Check - SUCESS
 */ 
app.post("/session", async (req, res) => {
  if (!req.body.session_id) {
    return res.status(400).json({ msg: "No session_id in req"});
  }
  try {
    const query = "SELECT user_id, logout_time FROM session WHERE id = ?";
    const [results, fields] = await db.query(query, [req.body.session_id]);

    if (results && results.length == 1 && !results[0].logout_time) {
      return res.status(200).json({user_id: results[0].user_id, session_id: req.body.session_id});
    } else {
      return res.status(401).json({ msg: "No session for this user"});
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

/** Profile
 * Frontend req: user_id
 * Backend res: Status code, all user information (first_name, last_name, email, phone, account_type, address_1, address_2, state, city, zip_code)
 * Postman Check - SUCCESS
 */ 
app.post('/profile', async (req, res) => {
  if (!req.body.user_id) {
    return res.status(400).json({ msg: "No user_id in req"});
  }

  try {
    const query = "SELECT first_name, last_name, email, account_type, phone, address_1, address_2, state, city, zip_code FROM user WHERE id = ?";
    const [results, fields] = await db.query(query, [req.body.user_id]);

    if (results && results.length == 1) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(401).json({ msg: "Invalid User ID"});
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

/** Profile Edit
 * Takes into account any fields that were left blank
 * Frontend req: user_id, IF ANY CHANGES: (first_name, last_name, email, phone, address_1, address_2, state, city, zip_code)
 * Backend res: Status code, msg
 * Postman Check - SUCCESS
 */ 
app.post('/profile/edit', async (req, res) => {
  if (!req.body.user_id) {
    return res.status(400).json({ msg: "No user_id in req"});
  }

  try {
    const modified_columns = [];
    const values = [];

    for (const [key, value] of Object.entries(req.body)) {
      if (value !== '' && key !== 'user_id') {
        modified_columns.push(key);
        values.push(value);
      }
    }

    const column_map = modified_columns.map((column, index) => `${column} = "${values[index]}"`).join(", ");
    const query = `UPDATE user SET ${column_map} WHERE id = ${req.body.id}`;

    console.log(query)

    const [results, fields] = await db.execute(query);
    if (results && results.affectedRows === 1) {
      return res.status(200).json({ msg: "Update successful!"});
    } else {
      return res.status(500).json({ msg: "Something went wrong when updating information"});
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

/** Caregiver List
 * Show the list of caregivers for a patient
 * Frontend req: user_id
 * Backend res: Status code, all user information of caregiver(s) (first_name, last_name, email, phone, address_1, address_2, state, city, zip_code)
 * Postman Check - SUCCESS
 */ 
app.post('/showcaregivers', async (req, res) => {
  if (!req.body.user_id) {
    return res.status(400).json({ msg: "No user_id in req"});
  }

  try {
    const query = "SELECT user.* FROM account_link JOIN user ON account_link.caregiver_id = user.id WHERE account_link.patient_id = ?;";
    const [results, fields] = await db.query(query, [req.body.user_id]);

    if (results && results.length >= 1) {
      console.log(results);
      return res.status(200).json(results);
    } else {
      return res.status(204).json({ msg: "No caregivers for this user"});
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

/** Patient List
 * Show the list of patients for a caregiver
 * Frontend req: user_id
 * Backend res: Status code, all user information of patient(s) (first_name, last_name, email, phone, address_1, address_2, state, city, zip_code)
 * Postman Check - SUCCESS
 */ 
app.post("/showpatients", async (req, res) => {
  console.log("Show patients api")
  console.log(req.body)
  if (!req.body.user_id){
    return res.status(400).json({ msg: "Missing the user_id"});
  }

  try {
    const query = "SELECT user.* FROM account_link JOIN user ON account_link.patient_id = user.id WHERE account_link.caregiver_id = ?;";
    const [results, fields] = await db.query(query, [req.body.user_id]);

    if (results && results.length >= 1) {
      console.log(results);
      return res.status(200).json(results);
    } else {
      return res.status(204).json({ msg: "No patients for this user"});
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

/** Link Accounts
 * Links an account to another account
 * Frontend req: user_id, email
 * Backend res: Status code, msg
 * Postman Check - SUCCESS
 */ 
app.post('/linkAccounts', async (req, res) => {
  const { user_id, email} = req.body;
  if (!user_id || !email) {
    return res.status(400).json({ msg: "Missing field in req"});
  }

    try {
      const userAccType = await getAccountType(user_id);
      const newID = await hasAccount(email);
      if (!newID) {
        return res.status(400).json({ msg: "Incorrect email given"});
      }
      const addAccType = await getAccountType(newID);

      console.log("userAcctType: " + userAccType + "\taddAccType: " + addAccType);

      if (userAccType === addAccType) {
        return res.status(400).json({ msg: "Cannot link two of the same type accounts"})
      }

      if (userAccType === 'caregiver') {
        const insertQuery = "INSERT INTO account_link (caregiver_id, patient_id) VALUES (?, ?);";
        const [results, fields] = await db.query(insertQuery, [user_id, newID]);
        if (results && results.affectedRows == 1) {
          return res.status(201).json({ msg: "Link successful!"});
        } else {
          return res.status(500).json({ msg: "Something went wrong when linking accounts"});
        }
      } else if (userAccType === 'patient') {
        const insertQuery = "INSERT INTO account_link (caregiver_id, patient_id) VALUES (?, ?);";
        const [results, fields] = await db.query(insertQuery, [newID, user_id]);
        if (results && results.affectedRows == 1) {
          return res.status(201).json({ msg: "Link successful!"});
        } else {
          return res.status(500).json({ msg: "Something went wrong when linking accounts"});
        }
      } else {
        return res.status(500).json({ msg: "Incorrect account_type given"});
      }  
    } catch(error) {
      console.error(error);
      throw error;
    }
  });


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
    const query = "SELECT id, password FROM user WHERE email=?;";
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
// Checks if email is valid and return the user id
async function hasAccount(email) {
  console.log("Checking if they have an account...");
  try {
    const query = "SELECT id FROM user WHERE email = ?;";
    const [results, fields] = await db.query(query, [email]);
    if (results && results.length == 1) {
      console.log("account found, user_id: " + results[0].id)
      return results[0].id;
    } else {
      return null;
    } 
  } catch (error) {
    console.log(error);
    throw error;
  }
}
//yuto
//req userID
//res account_type
app.post('/getAccountType', async (req, res) => {
  if (!req.body.user_id) {
    return res.status(400).json({ msg: "No user_id in req"})
  }

  try {
      const userAccType = await getAccountType(user_id);
    if (userAccType){
      return res.status(200).json(userAccType);
    }else{
      return res.status(400).json({ msg: "no userID found" });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});


// Checks the account type
async function getAccountType(user_id) {
  console.log("Getting the account type for user_id: " + user_id);
  try {
    const query = "SELECT account_type FROM user WHERE id = ?;";
    const [results, fields] = await db.query(query, [user_id]);
    if (results && results.length == 1) {
      return results[0].account_type;
    } else {
      console.log("Account has no account_type associated");
      return null;
    } 

  } catch (error) {
    console.log(error);
    throw error;
  }
}
// -----------------------------------------------------------------------------------------------------------------------
/** Add Medication
 * Accounts for nullable entries (description, end date)
 * Frontend req: user_id, med_name, description, dose_amt, start_date, end_date, doctor_first_name, doctor_last_name, doctor_phone
 * Backend res: Status code, msg
 * Postman Check - SUCCESS
 */ 
app.post("/addmedicine", async (req, res) => {
  let { user_id, med_name, dose_amt, start_date, doctor_first_name, doctor_last_name, doctor_phone } = req.body;
  if (!user_id || !med_name || !dose_amt || !start_date || !doctor_first_name || !doctor_last_name || !doctor_phone){
    return res.status(400).json({ msg: "Missing one or more required fields"});
  }

  try {
    const columns = [];
    const placeholders = [];
    const values = [];

    for (const [key, value] of Object.entries(req.body)) {
      if (value !== '') {
        columns.push(key);
        placeholders.push('?');
        values.push(value);
      }
    }

    const query = `INSERT INTO prescription (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`;
    const [results, fields] = await db.query(query, values);

    if (results && results.affectedRows === 1) {
      return res.status(200).json({ msg: "Update successful!"});
    } else {
      return res.status(500).json({ msg: "Something went wrong when updating information"});
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  
});
// -----------------------------------------------------------------------------------------------------------------------
/** Delete Medication
 * Frontend req: prescription id
 * Backend res: Status code, msg
 * Postman Check - SUCCESS
 */ 
app.post("/deletemedicine", async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  if (!id){
    return res.status(400).json({ msg: "Missing the prescription id"});
  }

  try {
    console.log("Deleting medicine...");
    const deleteQuery = "DELETE FROM prescription WHERE id = ?";
    const [results, fields] = await db.query(deleteQuery, [id]);
    if (results && results.affectedRows == 1) {
      return res.status(200).json({msg: "Medicine successfully deleted"});
    } else {
      return res.status(404).json({ "error": "Medicine not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------
/** View Medication
 * Frontend req: user_id
 * Backend res: Status code, prescription information (id, user_id, med_name, description, dose_amt, start_date, end_date, doctor_first_name, doctor_last_name, doctor_phone )
 * Postman Check - SUCCESS
*/ 
app.post("/viewmedicine", async (req, res) => {
  console.log(req.body);
  const { user_id } = req.body;
  console.log("userid backend: " + user_id);

  if (!user_id){
    return res.status(400).json({ msg: "Missing the user_id"});
  }

  try {
    console.log("Viewing medicine...");
    const selectQuery = `SELECT * FROM prescription WHERE user_id = ?`;
    const [results, fields] =  await db.query(selectQuery, [user_id]);
    if (results && results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ "error": "No medicine found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------
/** Logout
 * Frontend req: session_id
 * Backend res: Status code, msg
 * Postman Check - SUCCESS
 */ 
app.post("/logout", async (req, res) => {
  const { session_id } = req.body;
  if (!session_id) {
    return res.status(400).json({ msg: "Missing session_id from req" });
  }

  try {
    console.log("Logging out...");
    console.log(session_id);
    const updateQuery = "UPDATE session SET logout_time = NOW() WHERE id = ?";
    const [results, fields] = await db.query(updateQuery, [session_id]);
    if (results && results.affectedRows == 1) {
      return res.status(200).json({msg: "Logout successful"});
    } else {
      return res.status(404).json({ "error": "Session not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------
/** Add Emergency Contact
 * Frontend req: user_id, first_name, last_name, phone, email
 * Backend res: Status code, msg
 * Postman Check - SUCCESS
 */ 

app.post("/emergencycontact/add", async (req, res) => {
  let { user_id, first_name, last_name, phone, email } = req.body;
  if (!user_id | !first_name | !last_name | !phone | !email) {
    return res.status(400).json({ msg: "Missing one or more required fields in req" });
  }

  try {
    console.log("Adding emergency contact...");
    // const insertQuery = `INSERT INTO contact (user_id, first_name, last_name, phone, email)
    //                       VALUES (?, ?, ?, ?, ?)`;
    const insertQuery = `INSERT INTO contact (user_id, first_name, last_name, phone, email) 
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        phone = VALUES(phone),
        email = VALUES(email);`;
    const [results, fields] =  await db.query(insertQuery, [user_id, first_name, last_name, phone, email]);
    if (results && results.affectedRows == 1) {
      return res.status(201).json({msg: "Emergency contact successfully added"});
    } else {
      return res.status(500).json({ "error": "Emergency contact addition failed" });
    }
  } catch (error) {
     console.error(error);
     return res.status(500).json({ "error": "Internal server error" });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------
/** View Emergency Contact information
 * Frontend req: user_id
 * Backend res: Status code, msg
 * Postman Check - SUCCESS
 */ 

app.post("/emergencycontact", async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ msg: "Missing user_id from req" });
  }

  try {
    console.log("Viewing emergency contact...");
    const selectQuery = `SELECT * FROM contact WHERE user_id = ?`;
    const [results, fields] =  await db.query(selectQuery, [user_id]);
    if (results && results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ "error": "No emergency contact found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
});

module.exports = app; 