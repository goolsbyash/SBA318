// Import Express
const express = require("express");
const pug = require("pug");

// Create router
const router = express.Router();
const mainPage = pug.compileFile("./views/main.pug");
const users = require("../data/users");

router
  .route("/")
  .get((req, res) => {
    res.send(mainPage());
  })
  .post((req, res) => {
    if (
      users.find(
        (u) =>
          u.username == req.body.username && u.password == req.body.password
      )
    ) {
      let pendingUser = users.find((u) => u.username == req.body.username);
      res.redirect(`/api/profile/${pendingUser.role}/${pendingUser.userId}`);
    } else   // return to "sign in" page if incorrect user/pw combo
      res
        .status(404)
        .send(
          '<p>Incorrect username/password</p> <br> <a href="/api/users"> Try again! </a>'
        );
  });

module.exports = router;
