const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(11);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (inputPassword, password) => {
  return await bcrypt.compare(inputPassword, password);
};

module.exports = { hashPassword, comparePassword };
