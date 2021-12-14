exports.validSubjects = (arr) => {
  for (let subject of arr) {
  }
  return true;
};

exports.validText = (str) => {
  return typeof str === "string" && str.trim().length > 0;
};
