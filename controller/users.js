const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
        res.status(200).json({ message: "Success" });
      } else {
        res.status(400).json({ error: "Wrong password" });
      }
    });
  });
};
