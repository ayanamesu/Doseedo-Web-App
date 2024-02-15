const express = require('express');
const app = express();
//this is to be discussed
const port = 4444; 
const things = require("./src/routes/router");

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  //root
  res.send("hello World");
});


// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
});

app.listen(port, err => {
  if(err) {
    return console.log("ERROR", err);
  }
  console.log('Server is listening at http://localhost:${port}');
});