import express, { json, urlencoded } from "express";
const app = express();
import morgan from "morgan";

app.use(json());
app.use(urlencoded({extended: false}));
app.use(morgan('combined'));

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
   next();
}); 


//////
import { promises, createReadStream } from "fs";

const PICTURES_PATH = process.env.PICTURES_PATH || '/data/pictures';

app.get('/list/:cascade_code', async function(req, res) {
  const cascade_code = req.params.cascade_code.toUpperCase();
  if (!/^[A-Z0-9]+$/.test(cascade_code)) {
    return res.status(400).json({ error: 'Invalid cascade code' });
  }
  try {
    await promises.access(`${PICTURES_PATH}/${cascade_code}`);
    const files = await promises.readdir(`${PICTURES_PATH}/${cascade_code}`);
    const fileNames: String[] = [];
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


import sharp from 'sharp';

app.get('/image/:cascade_code/:selection', async function(req, res) {
  const cascade_code = req.params.cascade_code.toUpperCase();
  const selection = req.params.selection.toUpperCase();
  if (!/^[A-Z0-9]+$/.test(cascade_code)) {
    return res.status(400).json({ error: 'Invalid cascade code' });
  }
  try {
    await promises.access(`${PICTURES_PATH}/${cascade_code}/${cascade_code}.${selection}.jpg`);

    const width = req.query.width ? parseInt(req.query.width as string) : null;
    const height = req.query.height ? parseInt(req.query.height as string) : null;
    const format = ((req.query.format as string) || "webp") as keyof sharp.FormatEnum;
    const crop = ((req.query.crop as string) || "inside") as keyof sharp.FitEnum;

    const stream = createReadStream(`${PICTURES_PATH}/${cascade_code}/${cascade_code}.${selection}.jpg`);
    const transform = sharp().resize(width, height, { fit: crop }).toFormat(format, { quality: 85 });
    res.set('Content-Type', `image/${format}`);
    stream.pipe(transform).pipe(res);
  } catch (error) {
    console.log(error);
    res.status(204).send();
  }
})

app.get('/text/:cascade_code/:selection', async function(req, res) {
  const cascade_code = req.params.cascade_code.toUpperCase();
  const selection = req.params.selection.toUpperCase();
  if (!/^[A-Z0-9]+$/.test(cascade_code)) {
    return res.status(400).json({ error: 'Invalid cascade code' });
  }
  try {
    await promises.access(`${PICTURES_PATH}/${cascade_code}/${cascade_code}.${selection}.txt`);


    const stream = createReadStream(`${PICTURES_PATH}/${cascade_code}/${cascade_code}.${selection}.txt`);
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

export default app;