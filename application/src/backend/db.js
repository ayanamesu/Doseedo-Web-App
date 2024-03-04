var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "webappdb.cfmi4acsy64c.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "SushiTacos4!"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});