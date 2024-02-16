const express = require('express');
const app = express();
//this is to be discussed 
const port = process.env.port || 5174; 
const router = require("./routes/router");

app.use(express.json());
app.use("/router", router);
// I used router.js file inside ./src/routes/router to handle /router


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  //root
  res.send("hello World");
});

app.listen(port, err => {
  if(err) {
    return console.log("ERROR", err);
  }
  console.log(`Server is listening at http://localhost:${port}`);
});