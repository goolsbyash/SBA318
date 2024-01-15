// Import Express
const express = require("express");
// Create router
const router = express.Router();
const grades = require("../data/grades");
const users = require("../data/users");

router.get("/", (req, res) => {
  res.json({
    links: [
      {
        href: "/teacher/:id",
        rel: "api",
        type: "GET",
      },
      {
        href: "/student/:id",
        rel: "api",
        type: "GET",
      },
    ],
  });
});

router.get("/:role/:id", (req, res) => {
  if (req.params.role == "teacher") {
    if (users.find((u) => u.userId == req.params.id && u.role == "teacher"))
      res.json(grades);
    else res.json({ error: "Invalid User" });
  } else if (req.params.role == "student") {
    if (users.find((u) => u.userId == req.params.id && u.role == "student")) {
      const studentGrades = grades.filter((g) => g.userId == req.params.id);
      res.json(studentGrades);
    } else res.json({ error: "Invalid User" });
  } else res.json({ error: "Invalid User" });
});

module.exports = router;
