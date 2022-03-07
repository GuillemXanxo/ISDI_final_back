require("dotenv").config();
const debug = require("debug")("pallars:root");
const chalk = require("chalk");
const serverUp = require("./server/serverUp");

const port = process.env.PORT || 3000;

(async () => {
  try {
    await serverUp(port);
    debug(chalk.greenBright(`Server-up in ${port}`));
  } catch (error) {
    debug(chalk.redBright(`Error: `, error.message));
  }
})();
