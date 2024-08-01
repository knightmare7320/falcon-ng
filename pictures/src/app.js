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


//////
const fs = require("fs");

app.get('/list/:cascade_code', async function(req, res) {
  const cascade_code = req.params.cascade_code.toUpperCase();
  try {
    await fs.promises.access(`/data/pictures/${cascade_code}`);
    const files = await fs.promises.readdir(`/data/pictures/${cascade_code}`);
    const fileNames = [];
    files.map(fileName => {
      const splitFile = fileName.split('.');
      if(splitFile[2]==='jpg') {
        if (splitFile[1])
          fileNames.push(splitFile[1])
      }
    });
    res.status(200).json(fileNames);
  } catch (error) {
    res.status(200).send([]);
  }
});


const sharp = require('sharp');

app.get('/image/:cascade_code/:selection', async function(req, res) {
  const cascade_code = req.params.cascade_code.toUpperCase();
  const selection = req.params.selection.toUpperCase();
  try {
    await fs.promises.access(`/data/pictures/${cascade_code}/${cascade_code}.${selection}.jpg`);

    const format = req.query.format ? req.query.format : "webp";
    const width = req.query.width ? parseInt(req.query.width) : null;
    const height = req.query.height ? parseInt(req.query.height) : null;
    const crop = req.query.crop ?  req.query.crop : "inside";

    const stream = fs.createReadStream(`/data/pictures/${cascade_code}/${cascade_code}.${selection}.jpg`);
    const transform = sharp().resize(width, height, { fit: crop}).toFormat(format, {quality: 85});
    res.set('Content-Type', 'image/webp');
    stream.pipe(transform).pipe(res);
  } catch (error) {
    console.log(error);
    res.status(204).send();
  }
})

app.get('/text/:cascade_code/:selection', async function(req, res) {
  const cascade_code = req.params.cascade_code.toUpperCase();
  const selection = req.params.selection.toUpperCase();
  try {
    await fs.promises.access(`/data/pictures/${cascade_code}/${cascade_code}.${selection}.txt`);


    const stream = fs.createReadStream(`/data/pictures/${cascade_code}/${cascade_code}.${selection}.txt`);
    res.set('Content-Type', 'text/plain');
    stream.pipe(res);
  } catch (error) {
    res.status(200).send('');
  }
})

//////


app.get('*', function(req, res){
  res.status(404).json({message: 'Server Error - 404'});
});

module.exports = app;