const express = require("express");
const app = express();
const port = proves.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is listening at http://${port}`)
});

app.post('/login', (req, res)  => {
    const sql = "SELECT * FROM Users WHERE username = ? AND password = ?";
    const values = [
        req.body.emal,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Login Failed");
        return res.json(data);
    })
})

// app.get("/", (_req, res) => {
//     res.send("This is the home page!")
// });

// Establish Routers
// const aboutRoute = require("../routes/about.js");

// // Mount Routers
// /* We can change this later to the homeRoute or index
// but for now this will be our about page
// */
// app.use("/", aboutRoute); 