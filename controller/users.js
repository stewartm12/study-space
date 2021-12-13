const User = require("../models/User");

exports.getUsers = (req, res) => {
  const user =  new User({
    username: "testname",
    email: "test@test.com",
    password: "password"
  });
  user.save();
  return res.status(200).json(user);
};

exports.registerUsers = (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        return res.status(400).json({email: "User is already registered"});
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        newUser
          .save()
          .then((user) => res.status(200).json(user))
          .catch((err) => res.status(400).json({error: "There was an error creating this user"}));
      }
    })
}