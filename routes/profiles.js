// Import Express
const express = require("express");
const pug = require("pug");

// Create router
const router = express.Router();
const studentProfile = pug.compileFile("./views/student.pug");
const teacherProfile = pug.compileFile("./views/teacher.pug");
const profile = require("../data/profiles");

router.route("/:role/:id").get((req, res) => {
  let currentProfile = profile.find((p) => p.userId == req.params.id);
  const options = {
    userName: currentProfile.name,
    profilePic: currentProfile.profilePic,
    content: currentProfile.alerts,
    gradeView: `/api/grades/${req.params.role}/${req.params.id}`,
  };
  // Load student profile template
  if (req.params.role == "student") {
    res.send(studentProfile(options));
  }
  // Load teacher profile template
  else if (req.params.role == "teacher") {
    res.send(teacherProfile(options));
  } else res.status(404).send({error: "Invalid User!"});
});

module.exports = router;
