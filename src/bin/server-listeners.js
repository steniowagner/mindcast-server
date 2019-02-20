const debug = require("debug")("mind-cast-api:server-listener");

exports.onListening = server => {
  const { address, port } = server.address();
  debug(`Mind-Cast-API running at http://${address}:${port}`);
};

exports.onError = (err, port) => {
  const errorMessage = `Is not possible to access port ${port} - `;

  switch (err.code) {
    case "EACCES":
      debug(`${errorMessage} Requires elevated privileges.`);
      process.exit(1);
      break;

    case "EADDRINUSE":
      debug(`${errorMessage} It's already in use.`);
      process.exit(1);
      break;

    default:
      throw err;
  }
};
