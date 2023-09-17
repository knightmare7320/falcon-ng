const http = require("http");
const app = require("./app");

const server = http.createServer(app);
// server.on("error", onError);
// server.on("listening", onListening);
server.listen(80);