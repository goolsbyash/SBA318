const express = require("express");
const bodyParser = require("body-parser");

const users = require("./routes/users");
const profiles = require("./routes/profiles");
const grades = require("./routes/grades");

// const error = require("./utilities/error");

const app = express();
const PORT = 3000;

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));


// Routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/grades", grades);

// Listener
app.listen(PORT, () => {
    console.log(`---Server is running & listening on port: ${PORT}`);
})