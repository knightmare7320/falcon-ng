import { createServer } from "http";
import app from "./app.ts";

const server = createServer(app);
server.listen(8000);
