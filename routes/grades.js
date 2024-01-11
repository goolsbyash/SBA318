// Import Express
const express = require("express");
// Create router
const router = express.Router();
const grades = require("../data/grades");

router.route("/").get((req, res) => {
  res.json(grades);
});


module.exports = router;