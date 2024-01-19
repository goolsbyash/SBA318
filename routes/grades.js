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

router.post("/add", (req, res) => {
  if (req.body.userId && req.body.course && req.body.grade) {
    const newGrade = {
      userId: req.body.userId,
      course: req.body.course,
      grade: req.body.grade,
    };
    grades.push(newGrade);
    res.json({ 'Grade Submitted Successfully': newGrade})
  } else res.json({ error: "Insufficient Data" });
});

router.delete("/delete", (req, res) => {
  if (
    grades.find(
      (g) => g.userId == req.body.userId && g.course == req.body.course
    )
  ) {
    const deleteGrade = {
      userId: req.body.userId,
      course: req.body.course,
      grade: req.body.grade,
    };
    grades.splice(grades.indexOf(deleteGrade), 1);
    res.json({ "Grade Deleted Successfully": deleteGrade, "Other Grades": grades });
  } else res.status(404).send({error: "Grade Not Found"});
});

module.exports = router;
