const express = require("express");
const router = express.Router();
const passport = require("passport");
const { registerUsers, loginUser } = require("../../controller/users");

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      institution: req.user.institution,
      institutionName: req.user.institutionName,
      subjects: req.user.subjects,
      date: req.user.date,
    });
  }
);

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
      description: req.user.description,
      institution: req.user.institution,
      institutionName: req.user.institutionName,
      subjects: req.user.subjects,
    });
  }
);

module.exports = router;
