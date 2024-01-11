// Import Express
const express = require("express");
// Create router
const router = express.Router();
const users = require("../data/users");

router
  .route("/")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username === req.body.username)) {
        res.json({ error: "Username Already Taken. Try again!" });
        return;
      }
      // Email address validation needed
      if (users.find((u) => u.email === req.body.email)) {
        res.json({
          error:
            "This email address is already associated with an account. Try again!",
        });
        return;
      }

      const newUser = {
        userId: users[users.length - 1].userId + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      users.push(newUser);
      res.json(users[users.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

module.exports = router;
