const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const jsonParser = bodyParser.json();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/verify-token/:token", (req, res) => {
   const token = req.params.token;

   jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
         res.status(401).json({ message: "Invalid token." });
      }
      return res.status(200).json({ message: "Success", uid: decoded.uid});
   });
});

app.post('/login/:username', jsonParser, (req, res) => {
   const username = req.params.username;
   const password = req.body.password;
   
   // TODO: lookup actual username and password from db/somewhere
   //       and obviously having the username/pw plaintext here is really bad
   //       but this is just sample dev
   if (username === "fscran" && password === "fscRANper321!") {
      jwt.sign(
         { uid: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' }, 
         (err, token) => {
            if (err) {
               console.err(`Login error - ${username}`);
               return res.status(500).json({ message: "Login error."});           
            }
            console.log(`Login success - ${username}`);
            return res.status(200).json({ message: "Success", token: token });
         }
      );
   } else {
      console.log(`Invalid login - ${username}`);
      return res.status(401).json({ message: "Invalid login."}); 
   }
});

app.get('/logout/:username', (req, res) => {
   const username = req.params.username;
   // TODO: record logout in db/logs
   return res.status(200).json({ message: "Success"});
});


app.listen(80);