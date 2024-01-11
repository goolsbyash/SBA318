// Import Express
const express = require("express");
// Create router
const router = express.Router();
const profiles = require("../data/profiles");

router.route("/").get((req, res) => {
  res.json(profiles);
});


module.exports = router;