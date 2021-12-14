const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  getCramSessions,
  postCramSession,
} = require("../../controller/cramSession");

router.get("/", getCramSessions);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postCramSession
);

module.exports = router;
