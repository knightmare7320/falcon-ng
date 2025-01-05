import { createServer } from "http";
import app from "./app.js";

const server = createServer(app);
server.listen(8000);
