const validateCramSessionInput = require("../validation/cramSession");
const CramSession = require("../models/CramSession");

exports.getCramSessions = (req, res) => {
  CramSession.find()
    .sort({ dateTime: 1 }) // find all events and send them back in
    // with newest events first
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json(err));
};

exports.postCramSession = (req, res) => {
  const { errors, isValid } = validateCramSessionInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const parsedDate = Date.parse(req.body.dateTime);

  const newCramSession = new CramSession({
    title: req.body.title,
    description: req.body.description,
    host: req.user.id,
    subject: req.body.subject,
    usersAttending: req.body.usersAttending,
    address: req.body.address,
    dateTime: parsedDate,
  });

  newCramSession
    .save()
    .then((newSession) => res.json(newSession))
    .catch((err) => console.log(err));
};
