const express = require('express');
const router = express.Router();

// defining route
router
    .route("/")  //<-- to be assigned during meeting
    .get((req, res) => {
     res.send("testing router req");
})
    // POST method route
    .post((req, res) => {
    res.send('POST request to the homepage')
  });
  

module.exports = router;