const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('combined'));

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
   next();
}); 

app.get('/pictures/:cascade_code', function(req, res) {
  res.status(200).json({message: 'list - ' + req.params.cascade_code});
})

app.get('/pictures/:cascade_code/:selection', function(req, res) {
  res.status(200).json({message: 'picture - ' + req.params.cascade_code + '-' + req.params.selection});
})

app.get('/comments/:cascade_code/:selection', function(req, res) {
  res.status(200).json({message: 'comment - ' + req.params.cascade_code + '-' + req.params.selection});
})

app.get('/', (req, res) => res.send('Hello World!'));

app.get('*', function(req, res){
  res.status(404).json({message: 'Server Error - 404'});
});

module.exports = app;