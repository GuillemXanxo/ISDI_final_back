const bcrypt = require("bcrypt");

const salt = 12;
const encrypt = async (inputString) => bcrypt.hash(inputString, salt);

module.exports = encrypt;
