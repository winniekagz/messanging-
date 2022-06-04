const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.MONGOENCRYPTKEY, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;