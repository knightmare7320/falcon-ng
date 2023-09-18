const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const compression = require("compression");
const mysql = require("mysql2");

const siteRoutes = require("./routes/site");


app.use(express.json());
app.use(compression());
app.use(express.urlencoded({extended: false}));
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, "public")));

//connect to db
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

// pool.query(
//    'call get_site_info("CH03XC254")',
//    function(err, results) {
//       if (err) console.error(err);
//      console.log(results);
//    }
//  );


app.use("/api/site", siteRoutes);


app.use((req, res,next) => {
   res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;