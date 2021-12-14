const User = require("../models/User");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

exports.registerUsers = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "User is already registered" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        description: req.body.description,
        institution: req.body.institution,
        institutionName: req.body.institutionName,
        subjects: req.body.subjects,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                description: user.description,
                institution: user.institution,
                institutionName: user.institutionName,
                subjects: user.subjects,
              };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  return res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

exports.loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

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
          description: user.description,
          institution: user.institution,
          institutionName: user.institutionName,
          subjects: user.subjects,
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
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
};
