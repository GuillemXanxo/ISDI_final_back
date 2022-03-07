const debug = require("debug")("pallars:server");
const chalk = require("chalk");

const serverUp = (port, app) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.greenBright(`Server listening on http://localhost:${port}`));
      resolve();
    });

    server.on("error", (error) => {
      const errorMessage = `Couldn't start the server.${
        error.status === "EADDRINUSE" ? ` Port ${port} is busy` : ""
      }`;
      reject(new Error(errorMessage));
    });
  });

module.exports = serverUp;
