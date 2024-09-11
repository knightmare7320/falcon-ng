const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const compression = require("compression");
const mysql = require("mysql2");

const authRoutes = require("./routes/auth");
const siteRoutes = require("./routes/site");
const sitesRoutes = require("./routes/sites");
const regionsRoutes = require("./routes/regions");
const l4MarketsRoutes = require("./routes/l4Markets");
const l5MarketsRoutes = require("./routes/l5Markets");
const orgClustersRoutes = require("./routes/orgClusters");
const mscsRoutes = require("./routes/mscs");
const bscsRoutes = require("./routes/bscs");
const geoRoutes = require("./routes/geo");
const searchRoutes = require("./routes/search");

//connect to db and stuff the object into the app
const dbPool = mysql.createPool({
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

app.use(express.json());
app.use(compression());
app.use(express.urlencoded({extended: false}));
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, "public")));

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

module.exports = app;