const User = require("../models/User");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

exports.getUsers = (req, res) => {
  const user = new User({
    username: "testname",
    email: "test@test.com",
    password: "password",
  });
  user.save();
  return res.status(200).json(user);
};

exports.registerUsers = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "User is already registered" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.status(200).json(user))
            .catch((err) =>
              res.status(400).json({ error: "User has been taken" })
            );
        });
      });
    }
  });
};

exports.loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user)
      return res.status(400).json({ error: "This user does not exist" });

    bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) return res.status(400).json({ error: err });
            return res
              .status(200)
              .json({ success: "true", token: "Bearer " + token });
          }
        );
      } else {
        return res.status(400).json({ error: "Wrong password" });
      }
    });
  });
};
