const chalk = require("chalk");
const debug = require("debug")("pallars:errors");

const notFoundError = (req, res) => {
  debug(chalk.red(`Error: 404`));
  res.status(404).json({ error: true, message: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  debug(chalk.red(`Error: ${err.message}`));
  const errorCode = err.status ?? 500;
  const errorMessage = err.message ? err.message : "General fail";
  res.status(errorCode).json({ error: true, message: errorMessage });
};

module.exports = {
  notFoundError,
  generalError,
};
