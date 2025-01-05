import { join } from "path";
import express, { json, urlencoded } from "express";
const app = express();
import morgan from "morgan";
import compression from "compression";
import { createPool } from "mysql2";

import authRoutes from "./routes/auth.js";
import siteRoutes from "./routes/site.js";
import sitesRoutes from "./routes/sites.js";
import regionsRoutes from "./routes/regions.js";
import l4MarketsRoutes from "./routes/l4Markets.js";
import l5MarketsRoutes from "./routes/l5Markets.js";
import orgClustersRoutes from "./routes/orgClusters.js";
import mscsRoutes from "./routes/mscs.js";
import bscsRoutes from "./routes/bscs.js";
import geoRoutes from "./routes/geo.js";
import searchRoutes from "./routes/search.js";


import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname  = path.dirname(__filename);       // get the name of the directory

//connect to db and stuff the object into the app
const dbPool = createPool({
   host: 'mysqldb',
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: 'FalconCode',
   waitForConnections: true,
   connectionLimit: 10,
   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
   queueLimit: 0,
   enableKeepAlive: true,
   keepAliveInitialDelay: 0
});
app.locals.db = dbPool;

app.use(json());
app.use(compression());
app.use(urlencoded({extended: false}));
app.use(morgan('combined'));
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
   next();
}); 

app.use("/auth", authRoutes);
app.use("/site", siteRoutes);
app.use("/sites", sitesRoutes);
app.use("/regions", regionsRoutes);
app.use("/l4Markets", l4MarketsRoutes);
app.use("/l5Markets", l5MarketsRoutes);
app.use("/orgClusters", orgClustersRoutes);
app.use("/mscs", mscsRoutes);
app.use("/bscs", bscsRoutes);
app.use("/geo", geoRoutes);
app.use("/search", searchRoutes);

// app.use((req, res,next) => {
//    res.sendFile(path.join(__dirname, "public", "index.html"));
// });
app.get('*', function(req, res){
  res.status(404).json({message: 'Server Error - 404'});
});

export default app;