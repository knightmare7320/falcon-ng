const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const jsonParser = bodyParser.json();


app.get("/verify-token/:token", (req, res) => {
   const token = req.params.token;

   // TODO: actual token verification
   if (token === 'abc') {
      return res.status(200).json({ message: "ok", uid: "1"});
   }
   res.status(401).json({ message: "Invalid token." });
});

app.post('/login/:username', jsonParser, (req, res) => {
   const username = req.params.username;
   const password = req.body.password;
   
   // TODO: maybe lookup actual username and password from db/somewhere
   if (username === "fscran" && password === "fscRANper321!") {
      // TODO: generate a real jwt
      return res.status(200).json({ message: "ok", token: token });
   }
   res.status(401).json({ message: "Invalid login."});
});

app.post('/logout/:username', (req, res) => {
   const username = req.params.username;
   // TODO: record logout in db/logs
   return res.status(200).json({ message: "ok"});
});


// TODO: internal ssl
app.listen(80);