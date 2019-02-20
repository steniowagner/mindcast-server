const cluster = require("cluster");
const { cpus } = require("os");

const serverListeners = require("./server-listeners");
const environment = require("../config/environment");
const app = require("../app");

const numCPUs = cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const { onListening, onError } = serverListeners;
  const { PORT } = environment;
  const server = app.listen(PORT);

  server.on("listening", () => onListening(server));

  server.on("error", err => onError(err, PORT));
}
