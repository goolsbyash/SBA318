const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const usersData = require("./data/users");
const users = require("./routes/users");
const profile = require("./routes/profiles");
const grades = require("./routes/grades");
const morgan = require("morgan");

// const error = require("./utilities/error");

const app = express();
const PORT = 3000;

app.set("view engine", "pug");

app.use(express.json());

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Static expression to add CSS file
app.use("/api/users", express.static("./styles"));

app.use(morgan("dev"));

// Method Override so HTML form may support DELETE request for /grades/delete
//* Reference: https://medium.com/@mohammdowais/sending-put-and-delete-requests-through-html-f9ffe9e1b6cb

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      console.log(method, req.body._method);
      delete req.body._method;
      return method;
    }
  })
);

// Custom Middleware
// Middleware to check that id matches valid teacher/student
app.use((req, res, next) => {
  if (req.url.includes("/api/profile")) {
    const urlPieces = req.url.split("/");
    const checkId = urlPieces.pop();
    console.log(checkId);
    if (
      req.url.includes("teacher") &&
      usersData.find((u) => u.userId == checkId && u.role == "teacher")
    ) {
      console.log("Going to teacher profile...");
      next();
    } else if (
      req.url.includes("student") &&
      usersData.find((u) => u.userId == checkId && u.role == "student")
    ) {
      console.log("Going to student profile...");
      next();
    } else {
      console.log("Invalid Teacher or Student. Redirecting to login page...");
      res.redirect("/api/users");
    }
  }
  next();
});

// Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/grades", grades);

// Adding some HATEOAS links.
// Will be replaced by view engine templates
app.get("/", (req, res) => {
  res.json({
    links: [
      {
        href: "/api",
        rel: "api",
        type: "GET",
      },
    ],
  });
});

app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "/api/users",
        rel: "users",
        type: "GET",
      },
      {
        href: "/api/users",
        rel: "users",
        type: "POST",
      },
      {
        href: "/api/users",
        rel: "users",
        type: "DELETE",
      },
      {
        href: "/api/profiles",
        rel: "profiles",
        type: "GET",
      },
      {
        href: "api/grades",
        rel: "grades",
        type: "POST",
      },
      {
        href: "api/grades",
        rel: "users",
        type: "DELETE",
      },
    ],
  });
});

// Custom Error Handling Middleware
app.use((req, res, next) => {
  res
    .status(404)
    .send(
      '<h4>Sorry! Resource Not Available</h4><br/><a href="/api/users"> Return to signin page</a>'
    );
});
// Listener
app.listen(PORT, () => {
  console.log(`-- Server is running & listening on port: ${PORT} --`);
});
