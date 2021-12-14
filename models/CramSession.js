const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CramSessionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  usersAttending: {
    type: Array,
    default: [],
  },
  address: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  created: {
    type: Date,
    default: () => Date.now() - 4 * 60 * 60 * 1000,
  },
});

const CramSession = mongoose.model("CramSession", CramSessionSchema);
module.exports = CramSession;
