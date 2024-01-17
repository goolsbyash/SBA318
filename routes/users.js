// Import Express
const express = require("express");
const pug = require("pug");

// Create router
const router = express.Router();
const mainPage = pug.compileFile("./views/main.pug");
const users = require("../data/users");
const { log } = require("console");

router
  .route("/")
  .get((req, res) => {
    res.send(mainPage());
  })
  .post((req, res) => {
    if (users.find((u) => u.username == req.body.username)) {
      let pendingUser = users.find((u) => u.username == req.body.username)
      res.redirect(`/api/profile/${pendingUser.role}/${pendingUser.userId}`)
    }
  });

module.exports = router;
