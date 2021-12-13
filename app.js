const express = require("express");
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

mongoose
  .connect(db)
  .then(() => console.log("Connected to mongoDB"))
  .catch((error) => console.log(error));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);

app.listen(PORT, () => {
  console.log(`Example app listening at port ${PORT}`);
});

module.exports = app;
