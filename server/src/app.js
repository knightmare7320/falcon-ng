const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const compression = require("compression");
const mysql = require("mysql2");

const siteRoutes = require("./routes/site");
const sitesRoutes = require("./routes/sites");
const regionsRoutes = require("./routes/regions");
const l4MarketsRoutes = require("./routes/l4_markets");
const l5MarketsRoutes = require("./routes/l5_markets");
const orgClustersRoutes = require("./routes/org_clusters");
const market99sRoutes = require("./routes/market99s");
const mtasRoutes = require("./routes/mtas");

//connect to db and stuff the object into the app
const dbPool = mysql.createPool({
   host: 'mysqldb',
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: 'gui',
   waitForConnections: true,
   connectionLimit: 10,
   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
   queueLimit: 0,
   enableKeepAlive: true,
   keepAliveInitialDelay: 0
});
app.locals.db = dbPool;

app.use(express.json());
app.use(compression());
app.use(express.urlencoded({extended: false}));
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/site", siteRoutes);
app.use("/api/sites", sitesRoutes);
app.use("/api/regions", regionsRoutes);
app.use("/api/l4_markets", l4MarketsRoutes);
app.use("/api/l5_markets", l5MarketsRoutes);
app.use("/api/org_clusters", orgClustersRoutes);
app.use("/api/market99s", market99sRoutes);
app.use("/api/mtas", mtasRoutes);

app.use((req, res,next) => {
   res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;