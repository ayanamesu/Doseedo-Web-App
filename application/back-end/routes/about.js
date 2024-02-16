const express = require("express");
const router = express.Router();

router.get("/", (_req, res) => {
    res.send("This is the about page or whatever")
});

// router.get("/yakoub", (_req, res) => {
//     res.send("This is YAKOUB")
// });

// router.get("/aleia", (_req, res) => {
//     res.send("This is ALEIA")
// });

// router.get("/wing", (_req, res) => {
//     res.send("This is WING")
// });

// router.get("/paige", (_req, res) => {
//     res.send("This is PAIGE")
// });

// router.get("/yuto", (_req, res) => {
//     res.send("This is YUTO")
// });

// router.get("/carlos", (_req, res) => {
//     res.send("This is CARLOS")
// });

module.exports = router;