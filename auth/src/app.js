const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql2");

const controller = require("../controller");

//connect to db and stuff the object into the app
const dbPool = mysql.createPool({
   host: 'mysqldb',
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
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
app.use(express.urlencoded({extended: false}));
app.use(morgan('combined'));

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
   next();
}); 

app.use("/login", controller.login);
app.use("/logout", controller.logout);
app.use("/verify", controller.verify);

app.get('*', function(req, res){
  res.status(404).json({message: 'Server Error - 404'});
});

module.exports = app;