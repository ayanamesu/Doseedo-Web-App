const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var mysql = require('mysql2/promise');
// import cors from 'cors'

// app.use(cors());

app.get('/dbtest', async (req, res) =>{
    // res.json({message: 'Hello from backend!'});
  //  console.log(`testing db`);
   // const test = JSON.stringify(selecttest(db));
   // res.json(test);
   // console.log(test);

try {
        const data = await selecttest();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
    
    
})

app.listen(port, () => {
    console.log(`Server is listening at http://${port}`)
});


//my sql database

async function connectToDB() {
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
//post is safer 
//get see url database names and etc in url
async function selecttest() {
    const db = await connectToDB();
    try {
        const query = 'SELECT * FROM User;';
        const [result,fields] = await db.execute(query);
        return result; 
    } catch (error) {
        console.error(error);
        throw error; 
    }
}
function inserttest(db) {
//   console.log("Testing insert into db");
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