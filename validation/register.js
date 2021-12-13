const Validator = require("validator");
const validText = require("./valid-text");

module.exports = (data) => {
  let errors = {};

  data.username = validText(data.username) ? data.username : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.passwordConfirmation = validText(data.passwordConfirmation)
    ? data.passwordConfirmation
    : "";

  if (!Validator.isLength(data.username, { min: 6, max: 50 })) {
    errors.username = "Username must be between 6 and 50 characters long";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 100 })) {
    errors.password = "Password must be between 6 and 50 characters long";
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.password = "Passwords must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
