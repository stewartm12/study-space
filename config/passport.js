// We want to use strategy to handle josn web tokens
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const keys = require("./keys");

const options = {};
options.JwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    console.log(jwt_payload);
    done();
  }))
}