// need to connect to our server and shit

const express = require("express");
const app = express();
const port = 3000;
const publicIpAddress = '18.217.138.186';

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://${publicIpAddress}:${port}`)
});

// app.get("/", (_req, res) => {
//     res.send("This is the home page!")
// });

// Establish Routers
const aboutRoute = require("../routes/about.js");

// Mount Routers
/* We can change this later to the homeRoute or index
but for now this will be our about page
*/
app.use("/", aboutRoute); 
