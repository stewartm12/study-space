const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getUsers,
  registerUsers,
  loginUser,
} = require("../../controller/users");

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      date: req.user.date,
    });
  }
);

router.get("/", getUsers);

router.post("/register", registerUsers);

router.post("/login", loginUser);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    });
  }
);

module.exports = router;
