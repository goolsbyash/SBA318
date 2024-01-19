const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const usersData = require("./data/users");
const users = require("./routes/users");
const profile = require("./routes/profiles");
const grades = require("./routes/grades");

// const error = require("./utilities/error");

const app = express();
const PORT = 3000;

app.set("view engine", "pug");

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

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

app.use(express.json());
// Static expression to add CSS file
app.use(express.static("./styles"));

// app.use("/api/grades", function (req, res, next) {
//   let key1 = req.query["username"];
//   let key2 = req.query["password"];

//   next();
// });

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

// Error Handling Middleware

// Listener
app.listen(PORT, () => {
  console.log(`-- Server is running & listening on port: ${PORT} --`);
});
